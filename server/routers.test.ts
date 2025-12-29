import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database module
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  getUserByOpenId: vi.fn(),
  upsertUser: vi.fn(),
  createTeam: vi.fn(),
  addTeamPlayers: vi.fn(),
  getUserTeams: vi.fn().mockResolvedValue([]),
  getUserTeamsByMatch: vi.fn().mockResolvedValue([]),
  getTeamById: vi.fn(),
  getTeamPlayers: vi.fn(),
  deleteTeam: vi.fn(),
  createContest: vi.fn(),
  getContests: vi.fn().mockResolvedValue([]),
  getContestById: vi.fn(),
  updateContestStatus: vi.fn(),
  joinContest: vi.fn(),
  getUserContestEntries: vi.fn().mockResolvedValue([]),
  getContestEntries: vi.fn().mockResolvedValue([]),
  getContestLeaderboard: vi.fn().mockResolvedValue([]),
  hasUserJoinedContest: vi.fn().mockResolvedValue(false),
  updateEntryPoints: vi.fn(),
}));

// Mock the cricket API module with all required exports
vi.mock("./cricketApi", () => ({
  getMatches: vi.fn().mockResolvedValue([]),
  getMatchById: vi.fn().mockResolvedValue(null),
  getMatchSquad: vi.fn().mockResolvedValue([]),
  getMatchInfo: vi.fn().mockResolvedValue(null),
  categorizeMatches: vi.fn().mockReturnValue({
    live: [],
    upcoming: [],
    completed: [],
  }),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(authenticated: boolean = false): TrpcContext {
  const user: AuthenticatedUser | null = authenticated
    ? {
        id: 1,
        openId: "test-user-123",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }
    : null;

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("auth router", () => {
  it("auth.me returns null for unauthenticated user", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeNull();
  });

  it("auth.me returns user for authenticated user", async () => {
    const ctx = createMockContext(true);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).not.toBeNull();
    expect(result?.name).toBe("Test User");
    expect(result?.email).toBe("test@example.com");
  });

  it("auth.logout clears cookie and returns success", async () => {
    const ctx = createMockContext(true);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(ctx.res.clearCookie).toHaveBeenCalled();
  });
});

describe("matches router", () => {
  it("matches.list returns categorized match data", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.list();

    expect(result).toHaveProperty("live");
    expect(result).toHaveProperty("upcoming");
    expect(result).toHaveProperty("completed");
    expect(Array.isArray(result.live)).toBe(true);
    expect(Array.isArray(result.upcoming)).toBe(true);
    expect(Array.isArray(result.completed)).toBe(true);
  });

  it("matches.getSquad returns empty array for non-existent match", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matches.getSquad({ matchId: "non-existent" });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

describe("teams router", () => {
  it("teams.myTeams throws for unauthenticated user", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(caller.teams.myTeams()).rejects.toThrow();
  });

  it("teams.create throws for unauthenticated user", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.teams.create({
        matchId: "test-match",
        name: "Test Team",
        captainId: "player-1",
        viceCaptainId: "player-2",
        players: [
          { playerId: "player-1", playerName: "Player 1" },
          { playerId: "player-2", playerName: "Player 2" },
          { playerId: "player-3", playerName: "Player 3" },
          { playerId: "player-4", playerName: "Player 4" },
          { playerId: "player-5", playerName: "Player 5" },
          { playerId: "player-6", playerName: "Player 6" },
          { playerId: "player-7", playerName: "Player 7" },
          { playerId: "player-8", playerName: "Player 8" },
          { playerId: "player-9", playerName: "Player 9" },
          { playerId: "player-10", playerName: "Player 10" },
          { playerId: "player-11", playerName: "Player 11" },
        ],
      })
    ).rejects.toThrow();
  });

  it("teams.delete throws for unauthenticated user", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(caller.teams.delete({ teamId: 1 })).rejects.toThrow();
  });

  it("teams.myTeams returns empty array for authenticated user with no teams", async () => {
    const ctx = createMockContext(true);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.teams.myTeams();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

describe("contests router", () => {
  it("contests.list returns array", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contests.list();

    expect(Array.isArray(result)).toBe(true);
  });

  it("contests.join throws for unauthenticated user", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contests.join({ contestId: 1, teamId: 1 })
    ).rejects.toThrow();
  });

  it("contests.myEntries throws for unauthenticated user", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(caller.contests.myEntries()).rejects.toThrow();
  });

  it("contests.hasJoined throws for unauthenticated user", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(caller.contests.hasJoined({ contestId: 1 })).rejects.toThrow();
  });

  it("contests.leaderboard returns array", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contests.leaderboard({ contestId: 1 });

    expect(Array.isArray(result)).toBe(true);
  });

  it("contests.myEntries returns empty array for authenticated user with no entries", async () => {
    const ctx = createMockContext(true);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contests.myEntries();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});
