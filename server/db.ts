import { eq, and, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  userTeams, InsertUserTeam, UserTeam,
  teamPlayers, InsertTeamPlayer, TeamPlayer,
  contests, InsertContest, Contest,
  contestEntries, InsertContestEntry, ContestEntry,
  playerPoints, InsertPlayerPoint, PlayerPoint
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== USER QUERIES ====================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== TEAM QUERIES ====================

export async function createTeam(team: InsertUserTeam): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(userTeams).values(team);
    return result[0].insertId;
  } catch (error) {
    console.error("[Database] Failed to create team:", error);
    return null;
  }
}

export async function addTeamPlayers(players: InsertTeamPlayer[]): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.insert(teamPlayers).values(players);
    return true;
  } catch (error) {
    console.error("[Database] Failed to add team players:", error);
    return false;
  }
}

export async function getUserTeams(userId: number): Promise<UserTeam[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(userTeams).where(eq(userTeams.userId, userId)).orderBy(desc(userTeams.createdAt));
}

export async function getUserTeamsByMatch(userId: number, matchId: string): Promise<UserTeam[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(userTeams)
    .where(and(eq(userTeams.userId, userId), eq(userTeams.matchId, matchId)))
    .orderBy(desc(userTeams.createdAt));
}

export async function getTeamById(teamId: number): Promise<UserTeam | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(userTeams).where(eq(userTeams.id, teamId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getTeamPlayers(teamId: number): Promise<TeamPlayer[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(teamPlayers).where(eq(teamPlayers.teamId, teamId));
}

export async function deleteTeam(teamId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    // Delete team players first
    await db.delete(teamPlayers).where(eq(teamPlayers.teamId, teamId));
    // Delete the team
    await db.delete(userTeams).where(eq(userTeams.id, teamId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete team:", error);
    return false;
  }
}

// ==================== CONTEST QUERIES ====================

export async function createContest(contest: InsertContest): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(contests).values(contest);
    return result[0].insertId;
  } catch (error) {
    console.error("[Database] Failed to create contest:", error);
    return null;
  }
}

export async function getContests(matchId?: string): Promise<Contest[]> {
  const db = await getDb();
  if (!db) return [];

  if (matchId) {
    return await db.select().from(contests)
      .where(eq(contests.matchId, matchId))
      .orderBy(desc(contests.createdAt));
  }

  return await db.select().from(contests).orderBy(desc(contests.createdAt));
}

export async function getContestById(contestId: number): Promise<Contest | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(contests).where(eq(contests.id, contestId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateContestStatus(contestId: number, status: "upcoming" | "live" | "completed"): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.update(contests).set({ status }).where(eq(contests.id, contestId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update contest status:", error);
    return false;
  }
}

export async function incrementContestEntries(contestId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.update(contests)
      .set({ currentEntries: sql`${contests.currentEntries} + 1` })
      .where(eq(contests.id, contestId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to increment contest entries:", error);
    return false;
  }
}

// ==================== CONTEST ENTRY QUERIES ====================

export async function joinContest(entry: InsertContestEntry): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(contestEntries).values(entry);
    await incrementContestEntries(entry.contestId);
    return result[0].insertId;
  } catch (error) {
    console.error("[Database] Failed to join contest:", error);
    return null;
  }
}

export async function getUserContestEntries(userId: number): Promise<ContestEntry[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contestEntries)
    .where(eq(contestEntries.userId, userId))
    .orderBy(desc(contestEntries.createdAt));
}

export async function getContestEntries(contestId: number): Promise<ContestEntry[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contestEntries)
    .where(eq(contestEntries.contestId, contestId))
    .orderBy(asc(contestEntries.rankPosition));
}

export async function getContestLeaderboard(contestId: number) {
  const db = await getDb();
  if (!db) return [];

  const entries = await db.select({
    id: contestEntries.id,
    contestId: contestEntries.contestId,
    userId: contestEntries.userId,
    teamId: contestEntries.teamId,
    points: contestEntries.points,
    rankPosition: contestEntries.rankPosition,
    userName: users.name,
    teamName: userTeams.name,
  })
    .from(contestEntries)
    .leftJoin(users, eq(contestEntries.userId, users.id))
    .leftJoin(userTeams, eq(contestEntries.teamId, userTeams.id))
    .where(eq(contestEntries.contestId, contestId))
    .orderBy(desc(contestEntries.points));

  return entries;
}

export async function updateEntryPoints(entryId: number, points: string, rank: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.update(contestEntries)
      .set({ points, rankPosition: rank })
      .where(eq(contestEntries.id, entryId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update entry points:", error);
    return false;
  }
}

export async function hasUserJoinedContest(userId: number, contestId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db.select().from(contestEntries)
    .where(and(eq(contestEntries.userId, userId), eq(contestEntries.contestId, contestId)))
    .limit(1);

  return result.length > 0;
}

// ==================== PLAYER POINTS QUERIES ====================

export async function upsertPlayerPoints(playerPoint: InsertPlayerPoint): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.insert(playerPoints).values(playerPoint).onDuplicateKeyUpdate({
      set: {
        runs: playerPoint.runs,
        wickets: playerPoint.wickets,
        catches: playerPoint.catches,
        stumpings: playerPoint.stumpings,
        runOuts: playerPoint.runOuts,
        totalPoints: playerPoint.totalPoints,
      }
    });
    return true;
  } catch (error) {
    console.error("[Database] Failed to upsert player points:", error);
    return false;
  }
}

export async function getPlayerPointsByMatch(matchId: string): Promise<PlayerPoint[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(playerPoints)
    .where(eq(playerPoints.matchId, matchId))
    .orderBy(desc(playerPoints.totalPoints));
}

export async function getPlayerPoints(matchId: string, playerId: string): Promise<PlayerPoint | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(playerPoints)
    .where(and(eq(playerPoints.matchId, matchId), eq(playerPoints.playerId, playerId)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}
