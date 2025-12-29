CREATE TABLE `contest_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contestId` int NOT NULL,
	`userId` int NOT NULL,
	`teamId` int NOT NULL,
	`points` decimal(10,2) DEFAULT '0',
	`rankPosition` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contest_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`maxEntries` int NOT NULL DEFAULT 100,
	`currentEntries` int NOT NULL DEFAULT 0,
	`status` enum('upcoming','live','completed') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `player_points` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(255) NOT NULL,
	`playerId` varchar(255) NOT NULL,
	`playerName` varchar(255) NOT NULL,
	`runs` int DEFAULT 0,
	`wickets` int DEFAULT 0,
	`catches` int DEFAULT 0,
	`stumpings` int DEFAULT 0,
	`runOuts` int DEFAULT 0,
	`totalPoints` decimal(10,2) DEFAULT '0',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `player_points_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_players` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teamId` int NOT NULL,
	`playerId` varchar(255) NOT NULL,
	`playerName` varchar(255) NOT NULL,
	`playerRole` varchar(100),
	`teamName` varchar(255),
	CONSTRAINT `team_players_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_teams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`matchId` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`captainId` varchar(255) NOT NULL,
	`viceCaptainId` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_teams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `contest_entries` ADD CONSTRAINT `contest_entries_contestId_contests_id_fk` FOREIGN KEY (`contestId`) REFERENCES `contests`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contest_entries` ADD CONSTRAINT `contest_entries_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contest_entries` ADD CONSTRAINT `contest_entries_teamId_user_teams_id_fk` FOREIGN KEY (`teamId`) REFERENCES `user_teams`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_players` ADD CONSTRAINT `team_players_teamId_user_teams_id_fk` FOREIGN KEY (`teamId`) REFERENCES `user_teams`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_teams` ADD CONSTRAINT `user_teams_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;