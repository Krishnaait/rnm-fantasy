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
  hasUserJoinedContest, updateEntryPoints
} from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
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

        // Create the team
        const teamId = await createTeam({
          userId: ctx.user.id,
          matchId: input.matchId,
          name: input.name,
          captainId: input.captainId,
          viceCaptainId: input.viceCaptainId,
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
        
        // In a real implementation, you would fetch player performance data
        // and calculate points based on runs, wickets, catches, etc.
        // For now, we'll return a placeholder
        
        let totalPoints = 0;
        const playerPointsBreakdown = players.map(player => {
          // Placeholder scoring - in production, fetch from match data
          const basePoints = Math.random() * 100; // Replace with actual calculation
          let multiplier = 1;
          
          if (player.playerId === team.captainId) {
            multiplier = 2; // Captain gets 2x points
          } else if (player.playerId === team.viceCaptainId) {
            multiplier = 1.5; // Vice-captain gets 1.5x points
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
