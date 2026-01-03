import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  getMatches, getMatchSquad, getMatchInfo, categorizeMatches 
} from "./cricketApi";
import {
  createTeam, addTeamPlayers, getUserTeams, getUserTeamsByMatch, 
  getTeamById, getTeamPlayers, deleteTeam,
  createContest, getContests, getContestById, updateContestStatus,
  joinContest, getUserContestEntries, getContestEntries, getContestLeaderboard,
  hasUserJoinedContest, updateEntryPoints,
  createUser, getUserByEmail, verifyUserCredentials, getUserById,
  seedContests, syncContests
} from "./db";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

// Create JWT token for authenticated user
async function createAuthToken(userId: number, email: string, name: string | null): Promise<string> {
  return new SignJWT({ userId, email, name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export const appRouter = router({
  system: systemRouter,
  
  // Custom Auth Router (as per PDF guide - NextAuth.js style)
  auth: router({
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

    // Get current user
    me: publicProcedure.query(opts => opts.ctx.user),
    
    // Logout user
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ==================== MATCHES ====================
  matches: router({
    // Get all matches categorized by status
    list: publicProcedure.query(async () => {
      const matches = await getMatches();
      return categorizeMatches(matches);
    }),

    // Get single match by ID
    getById: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        const matches = await getMatches();
        return matches.find(m => m.id === input.matchId) || null;
      }),

    // Get match info with more details
    getInfo: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return await getMatchInfo(input.matchId);
      }),

    // Get squad for a match
    getSquad: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return await getMatchSquad(input.matchId);
      }),
  }),

  // ==================== TEAMS ====================
  teams: router({
    // Create a new team
    create: protectedProcedure
      .input(z.object({
        matchId: z.string(),
        name: z.string().min(1).max(50),
        captainId: z.string(),
        viceCaptainId: z.string(),
        players: z.array(z.object({
          playerId: z.string(),
          playerName: z.string(),
          playerRole: z.string().optional(),
          teamName: z.string().optional(),
        })).length(11),
      }))
      .mutation(async ({ ctx, input }) => {
        // Validate captain and vice-captain are in the team
        const playerIds = input.players.map(p => p.playerId);
        if (!playerIds.includes(input.captainId)) {
          throw new Error("Captain must be in the team");
        }
        if (!playerIds.includes(input.viceCaptainId)) {
          throw new Error("Vice-captain must be in the team");
        }
        if (input.captainId === input.viceCaptainId) {
          throw new Error("Captain and vice-captain must be different players");
        }

        // Calculate total credits used (placeholder for now, in production fetch from player data)
        const totalCreditsUsed = (input.players.length * 8.5).toString(); // Average 8.5 credits per player

        // Create the team
        const teamId = await createTeam({
          userId: ctx.user.id,
          matchId: input.matchId,
          name: input.name,
          captainId: input.captainId,
          viceCaptainId: input.viceCaptainId,
          totalCreditsUsed,
        });

        if (!teamId) {
          throw new Error("Failed to create team");
        }

        // Add players to the team
        const teamPlayers = input.players.map(p => ({
          teamId,
          playerId: p.playerId,
          playerName: p.playerName,
          playerRole: p.playerRole || null,
          teamName: p.teamName || null,
        }));

        const success = await addTeamPlayers(teamPlayers);
        if (!success) {
          throw new Error("Failed to add players to team");
        }

        return { success: true, teamId };
      }),

    // Get user's teams
    myTeams: protectedProcedure.query(async ({ ctx }) => {
      return await getUserTeams(ctx.user.id);
    }),

    // Get user's teams for a specific match
    myTeamsByMatch: protectedProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ ctx, input }) => {
        return await getUserTeamsByMatch(ctx.user.id, input.matchId);
      }),

    // Get team details with players
    getDetails: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .query(async ({ ctx, input }) => {
        const team = await getTeamById(input.teamId);
        if (!team) {
          throw new Error("Team not found");
        }
        if (team.userId !== ctx.user.id) {
          throw new Error("Not authorized to view this team");
        }
        const players = await getTeamPlayers(input.teamId);
        return { team, players };
      }),

    // Delete a team
    delete: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const team = await getTeamById(input.teamId);
        if (!team) {
          throw new Error("Team not found");
        }
        if (team.userId !== ctx.user.id) {
          throw new Error("Not authorized to delete this team");
        }
        const success = await deleteTeam(input.teamId);
        return { success };
      }),
  }),

  // ==================== CONTESTS ====================
  contests: router({
    // List contests (optionally by match)
    list: publicProcedure
      .input(z.object({ matchId: z.string().optional() }).optional())
      .query(async ({ input }) => {
        if (input?.matchId) {
          // Auto-seed contests if they don't exist
          await seedContests(input.matchId);
        }
        return await getContests(input?.matchId);
      }),





    // Get contest by ID
    getById: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        return await getContestById(input.contestId);
      }),

    // Create a contest (admin only in production, but open for now)
    create: protectedProcedure
      .input(z.object({
        matchId: z.string(),
        name: z.string().min(1).max(100),
        description: z.string().optional(),
        maxEntries: z.number().min(2).max(10000).default(100),
      }))
      .mutation(async ({ input }) => {
        const contestId = await createContest({
          matchId: input.matchId,
          name: input.name,
          description: input.description || null,
          maxEntries: input.maxEntries,
          currentEntries: 0,
          status: "upcoming",
        });

        if (!contestId) {
          throw new Error("Failed to create contest");
        }

        return { success: true, contestId };
      }),

    // Join a contest
    join: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        teamId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check if contest exists and has space
        const contest = await getContestById(input.contestId);
        if (!contest) {
          throw new Error("Contest not found");
        }
        if (contest.currentEntries >= contest.maxEntries) {
          throw new Error("Contest is full");
        }
        if (contest.status === "completed") {
          throw new Error("Contest has ended");
        }

        // Check if user owns the team
        const team = await getTeamById(input.teamId);
        if (!team) {
          throw new Error("Team not found");
        }
        if (team.userId !== ctx.user.id) {
          throw new Error("Not authorized to use this team");
        }

        // Check if team is for the same match
        if (team.matchId !== contest.matchId) {
          throw new Error("Team is not for this match");
        }

        // Check if user already joined this contest
        const alreadyJoined = await hasUserJoinedContest(ctx.user.id, input.contestId);
        if (alreadyJoined) {
          throw new Error("You have already joined this contest");
        }

        // Join the contest
        const entryId = await joinContest({
          contestId: input.contestId,
          userId: ctx.user.id,
          teamId: input.teamId,
          points: "0",
          rankPosition: null,
        });

        if (!entryId) {
          throw new Error("Failed to join contest");
        }

        return { success: true, entryId };
      }),

    // Get user's contest entries
    myEntries: protectedProcedure.query(async ({ ctx }) => {
      return await getUserContestEntries(ctx.user.id);
    }),

    // Get leaderboard for a contest
    leaderboard: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        return await getContestLeaderboard(input.contestId);
      }),

    // Check if user joined a contest
    hasJoined: protectedProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await hasUserJoinedContest(ctx.user.id, input.contestId);
      }),
    // Seed contests for a match
    seed: protectedProcedure
      .input(z.object({ matchId: z.string() }))
      .mutation(async ({ input }) => {
        const success = await seedContests(input.matchId);
        return { success };
      }),
    // Sync contests with CricAPI
    sync: publicProcedure.mutation(async () => {
      const matches = await getMatches();
      const categorized = categorizeMatches(matches);
      
      // 1. Update status for existing contests
      const allContests = await getContests();
      for (const contest of allContests) {
        let newStatus: "upcoming" | "live" | "completed" | null = null;
        
        if (categorized.live.some(m => m.id === contest.matchId)) {
          newStatus = "live";
        } else if (categorized.completed.some(m => m.id === contest.matchId)) {
          newStatus = "completed";
        }
        
        if (newStatus && newStatus !== contest.status) {
          await updateContestStatus(contest.id, newStatus);
        }
      }
      
      // 2. Auto-seed contests for new upcoming matches
      // Only seed for the first 5 upcoming matches to save API hits/DB space
      const upcomingToSeed = categorized.upcoming.slice(0, 5);
      for (const match of upcomingToSeed) {
        await seedContests(match.id);
      }
      
      return { 
        success: true, 
        syncedCount: allContests.length,
        seededCount: upcomingToSeed.length 
      };
    }),
  }),

  // ==================== SCORING ====================
  scoring: router({
    // Calculate points for a team in a match (called by cron or admin)
    calculateTeamPoints: protectedProcedure
      .input(z.object({
        teamId: z.number(),
        matchId: z.string(),
      }))
      .mutation(async ({ input }) => {
        const team = await getTeamById(input.teamId);
        if (!team) {
          throw new Error("Team not found");
        }

        const players = await getTeamPlayers(input.teamId);
        const matchInfo = await getMatchInfo(input.matchId);
        
        // Fetch existing points from DB if available
        const dbPoints = await getPlayerPointsByMatch(input.matchId);
        
        let totalPoints = 0;
        const playerPointsBreakdown = players.map(player => {
          const dbPoint = dbPoints.find(p => p.playerId === player.playerId);
          
          // Use DB points if available, otherwise fallback to placeholder for live matches
          // In production, this would be calculated from real-time ball-by-ball data
          const basePoints = dbPoint ? parseFloat(dbPoint.totalPoints || "0") : (matchInfo?.matchEnded ? 0 : Math.random() * 50);
          
          let multiplier = 1;
          if (player.playerId === team.captainId) {
            multiplier = 2;
          } else if (player.playerId === team.viceCaptainId) {
            multiplier = 1.5;
          }
          
          const points = basePoints * multiplier;
          totalPoints += points;
          
          return {
            playerId: player.playerId,
            playerName: player.playerName,
            basePoints,
            multiplier,
            totalPoints: points,
          };
        });

        return {
          teamId: input.teamId,
          totalPoints,
          breakdown: playerPointsBreakdown,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
