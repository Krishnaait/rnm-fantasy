import { Router, Request, Response } from "express";
import { getDb } from "./db";
import { getMatches, getMatchSquad } from "./cricketApi";
import { contests, contestEntries, userTeams, teamPlayers, playerPoints } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const router = Router();

// GET /api/matches - Fetch all matches from CricAPI
router.get("/matches", async (req: Request, res: Response) => {
  try {
    const matches = await getMatches();
    res.json({ success: true, data: matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ success: false, error: "Failed to fetch matches" });
  }
});

// GET /api/matches/:id/squad - Fetch squad for a specific match
router.get("/matches/:id/squad", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const squad = await getMatchSquad(id);
    res.json({ success: true, data: squad });
  } catch (error) {
    console.error("Error fetching squad:", error);
    res.status(500).json({ success: false, error: "Failed to fetch squad" });
  }
});

// POST /api/teams/create - Create a new team
router.post("/teams/create", async (req: Request, res: Response) => {
  try {
    const { userId, matchId, teamName, selectedPlayers, captainId, viceCaptainId, totalCreditsUsed } = req.body;

    if (!userId || !matchId || !teamName || !selectedPlayers || selectedPlayers.length !== 11) {
      return res.status(400).json({ success: false, error: "Invalid team data" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ success: false, error: "Database connection failed" });
    }

    // Create team
    const teamResult = await db.insert(userTeams).values({
      userId,
      matchId,
      name: teamName,
      captainId,
      viceCaptainId,
      totalCreditsUsed: totalCreditsUsed || "0",
    });

    const teamId = (teamResult as any).insertId;

    // Add players to team
    for (const player of selectedPlayers) {
      await db.insert(teamPlayers).values({
        teamId,
        playerId: player.id,
        playerName: player.name,
        playerRole: player.role,
      });
    }

    res.json({ success: true, data: { teamId, teamName } });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ success: false, error: "Failed to create team" });
  }
});

// POST /api/contests/join - Join a contest
router.post("/contests/join", async (req: Request, res: Response) => {
  try {
    const { userId, contestId, teamId } = req.body;

    if (!userId || !contestId || !teamId) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ success: false, error: "Database connection failed" });
    }

    // Check if already joined
    const existing = await db
      .select()
      .from(contestEntries)
      .where(eq(contestEntries.contestId, contestId))
      .limit(1);

    if (existing.length > 0) {
      return res.status(409).json({ success: false, error: "Already joined this contest" });
    }

    // Add entry to contest
    await db.insert(contestEntries).values({
      contestId: parseInt(contestId),
      userId,
      teamId,
      points: "0",
    });

    res.json({ success: true, message: "Successfully joined contest" });
  } catch (error) {
    console.error("Error joining contest:", error);
    res.status(500).json({ success: false, error: "Failed to join contest" });
  }
});

// GET /api/contests/:id/leaderboard - Get contest leaderboard
router.get("/contests/:id/leaderboard", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ success: false, error: "Database connection failed" });
    }

    const leaderboard = await db
      .select()
      .from(contestEntries)
      .where(eq(contestEntries.contestId, parseInt(id)))
      .orderBy((table) => table.points);

    res.json({ success: true, data: leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ success: false, error: "Failed to fetch leaderboard" });
  }
});

// POST /api/cron/sync-contests - Sync contests and update points (called by cron job)
router.post("/cron/sync-contests", async (req: Request, res: Response) => {
  try {
    const { secret } = req.body;
    if (secret !== process.env.CRON_SECRET) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ success: false, error: "Database connection failed" });
    }

    // Get all active contests
    const activeContests = await db.select().from(contests);

    for (const contest of activeContests) {
      // Fetch match data from CricAPI
      const matches = await getMatches();
      const match = matches.find((m: any) => m.id === contest.matchId);

      if (match && match.ms === "result") {
        // Match is completed - calculate final points
        const entries = await db
          .select()
          .from(contestEntries)
          .where(eq(contestEntries.contestId, contest.id));

        // Sort by points and update rank positions
        const sorted = entries.sort((a, b) => {
      const aPoints = typeof a.points === 'string' ? parseFloat(a.points) : (a.points || 0);
      const bPoints = typeof b.points === 'string' ? parseFloat(b.points) : (b.points || 0);
      return bPoints - aPoints;
    });
        for (let i = 0; i < sorted.length; i++) {
          await db
            .update(contestEntries)
            .set({ rankPosition: i + 1 })
            .where(eq(contestEntries.id, sorted[i].id));
        }

        // Update contest status
        await db.update(contests).set({ status: "completed" }).where(eq(contests.id, contest.id));
      }
    }

    res.json({ success: true, message: "Contests synced successfully" });
  } catch (error) {
    console.error("Error syncing contests:", error);
    res.status(500).json({ success: false, error: "Failed to sync contests" });
  }
});

export default router;
