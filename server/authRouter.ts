/**
 * Custom Authentication Router (as per PDF guide)
 * Implements email/password authentication using bcrypt
 */
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { createUser, getUserByEmail, verifyUserCredentials, getUserById } from "./db";
import { TRPCError } from "@trpc/server";
import { SignJWT, jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

// Create JWT token for authenticated user
async function createAuthToken(userId: number, email: string, name: string | null): Promise<string> {
  return new SignJWT({ userId, email, name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyAuthToken(token: string): Promise<{ userId: number; email: string; name: string | null } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { algorithms: ["HS256"] });
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      name: payload.name as string | null,
    };
  } catch {
    return null;
  }
}

export const customAuthRouter = router({
  // Register new user (as per PDF Step 3.2)
  register: publicProcedure
    .input(z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    }))
    .mutation(async ({ input }) => {
      // Check if user already exists
      const existingUser = await getUserByEmail(input.email);
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this email already exists",
        });
      }

      // Create new user with hashed password
      const userId = await createUser(input.name, input.email, input.password);
      if (!userId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }

      return { success: true, message: "User registered successfully" };
    }),

  // Login user (as per PDF Step 3.1)
  login: publicProcedure
    .input(z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(1, "Password is required"),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verify credentials
      const user = await verifyUserCredentials(input.email, input.password);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Create JWT token
      const token = await createAuthToken(user.id, user.email, user.name);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    }),

  // Logout user
  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return { success: true };
  }),

  // Get current user
  me: publicProcedure.query(async ({ ctx }) => {
    // Try to get user from custom auth token
    const cookies = ctx.req.headers.cookie;
    if (!cookies) return null;

    const cookieMap = new Map(
      cookies.split(";").map((c) => {
        const [key, ...val] = c.trim().split("=");
        return [key, val.join("=")];
      })
    );

    const token = cookieMap.get(COOKIE_NAME);
    if (!token) return null;

    const payload = await verifyAuthToken(token);
    if (!payload) return null;

    const user = await getUserById(payload.userId);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastSignedIn: user.lastSignedIn,
    };
  }),
});
