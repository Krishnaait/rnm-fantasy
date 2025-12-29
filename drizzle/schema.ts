import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table with email/password authentication (as per PDF guide)
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User Teams - stores fantasy teams created by users for specific matches
 */
export const userTeams = mysqlTable("user_teams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  matchId: varchar("matchId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  captainId: varchar("captainId", { length: 255 }).notNull(),
  viceCaptainId: varchar("viceCaptainId", { length: 255 }).notNull(),
  totalCreditsUsed: decimal("totalCreditsUsed", { precision: 5, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserTeam = typeof userTeams.$inferSelect;
export type InsertUserTeam = typeof userTeams.$inferInsert;

/**
 * Team Players - stores players selected in each team
 */
export const teamPlayers = mysqlTable("team_players", {
  id: int("id").autoincrement().primaryKey(),
  teamId: int("teamId").notNull().references(() => userTeams.id),
  playerId: varchar("playerId", { length: 255 }).notNull(),
  playerName: varchar("playerName", { length: 255 }).notNull(),
  playerRole: varchar("playerRole", { length: 100 }),
  teamName: varchar("teamName", { length: 255 }),
});

export type TeamPlayer = typeof teamPlayers.$inferSelect;
export type InsertTeamPlayer = typeof teamPlayers.$inferInsert;

/**
 * Contests - free-to-play leagues/contests for matches (no entry fees or prizes)
 */
export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  maxEntries: int("maxEntries").default(100).notNull(),
  currentEntries: int("currentEntries").default(0).notNull(),
  status: mysqlEnum("status", ["upcoming", "live", "completed"]).default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;

/**
 * Contest Entries - tracks user participation in contests
 */
export const contestEntries = mysqlTable("contest_entries", {
  id: int("id").autoincrement().primaryKey(),
  contestId: int("contestId").notNull().references(() => contests.id),
  userId: int("userId").notNull().references(() => users.id),
  teamId: int("teamId").notNull().references(() => userTeams.id),
  points: decimal("points", { precision: 10, scale: 2 }).default("0"),
  rankPosition: int("rankPosition"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContestEntry = typeof contestEntries.$inferSelect;
export type InsertContestEntry = typeof contestEntries.$inferInsert;

/**
 * Player Points - stores calculated points for players in matches
 */
export const playerPoints = mysqlTable("player_points", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 255 }).notNull(),
  playerId: varchar("playerId", { length: 255 }).notNull(),
  playerName: varchar("playerName", { length: 255 }).notNull(),
  runs: int("runs").default(0),
  wickets: int("wickets").default(0),
  catches: int("catches").default(0),
  stumpings: int("stumpings").default(0),
  runOuts: int("runOuts").default(0),
  totalPoints: decimal("totalPoints", { precision: 10, scale: 2 }).default("0"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PlayerPoint = typeof playerPoints.$inferSelect;
export type InsertPlayerPoint = typeof playerPoints.$inferInsert;
