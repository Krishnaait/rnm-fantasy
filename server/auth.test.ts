import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  getUserByEmail: vi.fn(),
  createUser: vi.fn(),
  verifyUserCredentials: vi.fn(),
  getUserById: vi.fn(),
  // Other exports needed by routers
  createTeam: vi.fn(),
  addTeamPlayers: vi.fn(),
  getUserTeams: vi.fn(),
  getUserTeamsByMatch: vi.fn(),
  getTeamById: vi.fn(),
  getTeamPlayers: vi.fn(),
  deleteTeam: vi.fn(),
  createContest: vi.fn(),
  getContests: vi.fn(),
  getContestById: vi.fn(),
  updateContestStatus: vi.fn(),
  joinContest: vi.fn(),
  getUserContestEntries: vi.fn(),
  getContestEntries: vi.fn(),
  getContestLeaderboard: vi.fn(),
  hasUserJoinedContest: vi.fn(),
  updateEntryPoints: vi.fn(),
}));

// Mock cricket API
vi.mock("./cricketApi", () => ({
  getMatches: vi.fn().mockResolvedValue([]),
  getMatchSquad: vi.fn().mockResolvedValue([]),
  getMatchInfo: vi.fn().mockResolvedValue(null),
  categorizeMatches: vi.fn().mockReturnValue({ live: [], upcoming: [], completed: [] }),
}));

import * as db from "./db";

type CookieCall = {
  name: string;
  value?: string;
  options: Record<string, unknown>;
};

function createMockContext(user: TrpcContext["user"] = null): { 
  ctx: TrpcContext; 
  setCookies: CookieCall[];
  clearedCookies: CookieCall[];
} {
  const setCookies: CookieCall[] = [];
  const clearedCookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        setCookies.push({ name, value, options });
      },
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, setCookies, clearedCookies };
}

describe("auth.register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully registers a new user", async () => {
    const { ctx } = createMockContext();
    
    vi.mocked(db.getUserByEmail).mockResolvedValue(null);
    vi.mocked(db.createUser).mockResolvedValue(1);

    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.register({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(result).toEqual({ success: true, message: "User registered successfully" });
    expect(db.getUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(db.createUser).toHaveBeenCalledWith("Test User", "test@example.com", "password123");
  });

  it("fails when email already exists", async () => {
    const { ctx } = createMockContext();
    
    vi.mocked(db.getUserByEmail).mockResolvedValue({
      id: 1,
      name: "Existing User",
      email: "test@example.com",
      password: "hashedpassword",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    });

    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.auth.register({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    })).rejects.toThrow("User with this email already exists");
  });

  it("fails when user creation fails", async () => {
    const { ctx } = createMockContext();
    
    vi.mocked(db.getUserByEmail).mockResolvedValue(null);
    vi.mocked(db.createUser).mockResolvedValue(null);

    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.auth.register({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    })).rejects.toThrow("Failed to create user");
  });
});

describe("auth.login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully logs in a user and sets cookie", async () => {
    const { ctx, setCookies } = createMockContext();
    
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      role: "user" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
    
    vi.mocked(db.verifyUserCredentials).mockResolvedValue(mockUser);

    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.login({
      email: "test@example.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
    expect(result.user).toEqual({
      id: 1,
      name: "Test User",
      email: "test@example.com",
      role: "user",
    });
    expect(setCookies).toHaveLength(1);
    expect(setCookies[0]?.name).toBe(COOKIE_NAME);
    expect(setCookies[0]?.value).toBeDefined();
  });

  it("fails with invalid credentials", async () => {
    const { ctx } = createMockContext();
    
    vi.mocked(db.verifyUserCredentials).mockResolvedValue(null);

    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.auth.login({
      email: "test@example.com",
      password: "wrongpassword",
    })).rejects.toThrow("Invalid email or password");
  });
});

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      role: "user" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
    
    const { ctx, clearedCookies } = createMockContext(mockUser);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
    });
  });
});

describe("auth.me", () => {
  it("returns null when not authenticated", async () => {
    const { ctx } = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeNull();
  });

  it("returns user when authenticated", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      role: "user" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
    
    const { ctx } = createMockContext(mockUser);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toEqual(mockUser);
  });
});
