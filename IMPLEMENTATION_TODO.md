# RNM Fantasy - Implementation To-Do List
## Based on PDF API Documentation (Adapted for Vite + React + tRPC)

**Project**: RNM Fantasy Cricket Platform  
**Stack**: Vite + React + TypeScript + tRPC + Drizzle ORM + MySQL  
**API**: CricAPI (https://api.cricapi.com/v1)

---

## Phase 1: Cricket API Integration ⚠️ PRIORITY

### Task 1.1: Get Cricket API Key
- [ ] Sign up at https://cricapi.com or https://www.cricketdata.org
- [ ] Get API key
- [ ] Add `CRIC_API_KEY` to `.env` file
- [ ] Test API key with a simple request

### Task 1.2: Create Cricket API Library
- [ ] Create `server/cricketApi.ts` file
- [ ] Implement `getMatches()` function
  - Endpoint: `https://api.cricapi.com/v1/cricScore`
  - Returns all matches with status
- [ ] Implement `getMatchSquad(matchId)` function
  - Endpoint: `https://api.cricapi.com/v1/match_squad?apikey=${key}&id=${matchId}`
  - Returns squad data for specific match
- [ ] Implement `getMatchInfo(matchId)` function (optional)
  - For detailed match information
- [ ] Add proper error handling and logging
- [ ] Add TypeScript interfaces for API responses

### Task 1.3: Create tRPC Procedures for Matches
- [ ] Update `server/routers.ts`
- [ ] Create `matches.getAll` procedure
  - Fetches all matches from CricAPI
  - Categorizes into: live, upcoming, completed
  - Returns: `{ live: Match[], upcoming: Match[], completed: Match[] }`
- [ ] Create `matches.getById` procedure
  - Fetches specific match details
- [ ] Create `matches.getSquad` procedure
  - Fetches squad for a specific match
  - Returns player list with roles and credits

---

## Phase 2: Database Schema Updates

### Task 2.1: Verify Existing Schema
- [ ] Check `drizzle/schema.ts` for all required tables:
  - `users` ✓
  - `teams` (userTeams) ✓
  - `teamPlayers` ✓
  - `contests` ✓
  - `contestEntries` ✓

### Task 2.2: Add Missing Columns
- [ ] Ensure `teams` table has:
  - `totalCreditsUsed` column (integer)
  - `captainId` column (string)
  - `viceCaptainId` column (string)
- [ ] Ensure `contests` table has:
  - `status` column (enum: 'upcoming', 'live', 'completed')
  - `matchId` column (string)
- [ ] Ensure `teamPlayers` table has:
  - `role` column (string: batsman, bowler, all-rounder, wicket-keeper)
  - `credits` column (integer: 7-10)

### Task 2.3: Create Database Migration
- [ ] Run `pnpm drizzle-kit generate:mysql`
- [ ] Review generated migration
- [ ] Apply migration to database
- [ ] Test with sample data

---

## Phase 3: Match Display System

### Task 3.1: Update Home Page
- [ ] Update `client/src/pages/Home.tsx`
- [ ] Add `LiveMatchesSection` component
  - Fetches live matches using tRPC
  - Displays match cards with scores
  - Links to match detail page
- [ ] Add `UpcomingMatchesSection` component
  - Fetches upcoming matches
  - Displays match cards with start time
  - "Create Team" button for each match
- [ ] Add `CompletedMatchesSection` component
  - Fetches completed matches
  - Displays final scores
  - Links to leaderboard

### Task 3.2: Update Matches Page
- [ ] Update `client/src/pages/Matches.tsx`
- [ ] Add tabs for: Live, Upcoming, Completed
- [ ] Fetch matches using `utils.matches.getAll.useQuery()`
- [ ] Display match cards for each category
- [ ] Add "Create Team" button for upcoming matches
- [ ] Add "View Score" button for live matches
- [ ] Add "View Leaderboard" button for completed matches

### Task 3.3: Create Match Detail Page
- [ ] Create `client/src/pages/MatchDetail.tsx` (if not exists)
- [ ] Display full match information
- [ ] Show team lineups
- [ ] Display current score (if live)
- [ ] Show "Create Team" button (if upcoming)
- [ ] Show "View Contests" button

---

## Phase 4: Team Creation System

### Task 4.1: Update Create Team Page
- [ ] Update `client/src/pages/CreateTeam.tsx`
- [ ] Fetch squad using `utils.matches.getSquad.useQuery(matchId)`
- [ ] Implement player selection UI
  - Display all players with roles and credits
  - Allow selection of exactly 11 players
  - Show total credits used (max 100)
  - Highlight selected players
- [ ] Implement captain selection
  - Radio buttons or dropdown
  - Captain gets 2x points
- [ ] Implement vice-captain selection
  - Must be different from captain
  - Vice-captain gets 1.5x points
- [ ] Add validation:
  - Exactly 11 players
  - Captain and vice-captain selected
  - Within credit budget
- [ ] Submit team to backend

### Task 4.2: Create Team Creation tRPC Procedure
- [ ] Add `teams.create` procedure in `server/routers.ts`
- [ ] Validate input:
  - Exactly 11 players
  - Captain and vice-captain exist in player list
  - Total credits within budget
- [ ] Insert into `teams` table
- [ ] Insert all players into `teamPlayers` table
- [ ] Return teamId and success message

### Task 4.3: Create My Teams Page
- [ ] Update `client/src/pages/MyTeams.tsx`
- [ ] Fetch user's teams using tRPC
- [ ] Display team cards with:
  - Team name
  - Match info
  - Player count
  - Captain and vice-captain
  - Edit/Delete buttons
- [ ] Add "Create New Team" button

---

## Phase 5: Contest System

### Task 5.1: Create Contest Seeding System
- [ ] Add `contests.seed` procedure in `server/routers.ts`
- [ ] Input: `matchId`
- [ ] Create 3 sample contests:
  - Mega Contest (entryFee: 0, prizePool: 1000, maxEntries: 100)
  - Head to Head (entryFee: 0, prizePool: 90, maxEntries: 2)
  - Winner Takes All (entryFee: 0, prizePool: 225, maxEntries: 10)
- [ ] Insert into `contests` table with status: 'upcoming'
- [ ] Return success message

### Task 5.2: Update Contests Page
- [ ] Update `client/src/pages/Contests.tsx`
- [ ] Fetch all contests using tRPC
- [ ] Display contest cards with:
  - Contest name
  - Entry fee (show "FREE" if 0)
  - Prize pool
  - Current entries / Max entries
  - Progress bar
  - "Join Contest" button
- [ ] Filter by match (optional)
- [ ] Show contest status (upcoming/live/completed)

### Task 5.3: Create Contest Detail Page
- [ ] Update `client/src/pages/ContestDetail.tsx`
- [ ] Display contest information
- [ ] Show list of participants
- [ ] Show prize distribution
- [ ] "Join with Team" button
- [ ] Dropdown to select team (if user has multiple teams for this match)

### Task 5.4: Implement Join Contest Functionality
- [ ] Add `contests.join` procedure in `server/routers.ts`
- [ ] Input: `contestId`, `teamId`
- [ ] Validate:
  - Contest exists
  - Contest not full
  - User owns the team
  - User hasn't already joined this contest
- [ ] Insert into `contestEntries` table
- [ ] Increment `currentEntries` in contests table
- [ ] Return success message

---

## Phase 6: Live Score System

### Task 6.1: Create Live Score Page
- [ ] Update `client/src/pages/LiveScores.tsx`
- [ ] Fetch all live matches using tRPC
- [ ] Display match cards with:
  - Team names
  - Current score
  - Match status
  - Last updated timestamp
- [ ] Implement auto-refresh (every 30 seconds)
- [ ] Add toggle button to enable/disable auto-refresh
- [ ] Add manual refresh button

### Task 6.2: Create Match Live Score Detail Page
- [ ] Create route: `/live-scores/:matchId`
- [ ] Fetch specific match score
- [ ] Display detailed scorecard:
  - Team 1 vs Team 2
  - Current score
  - Overs
  - Run rate
  - Recent balls
- [ ] Auto-refresh every 30 seconds
- [ ] Add "View My Teams" button
- [ ] Add "View Contests" button

---

## Phase 7: Contest Synchronization System ⚠️ CRITICAL

### Task 7.1: Create Contest Sync Procedure
- [ ] Add `contests.sync` procedure in `server/routers.ts`
- [ ] Fetch all matches from CricAPI
- [ ] Categorize matches by status:
  - `liveMatchIds` (ms === "live")
  - `upcomingMatchIds` (ms === "fixture")
  - `completedMatchIds` (ms === "result")
- [ ] Update contest statuses:
  - Set contests to 'live' for live matches
  - Set contests to 'completed' for completed matches
- [ ] Auto-create contests for new upcoming matches:
  - Get existing contest matchIds
  - Find new matches without contests
  - Call seed procedure for each new match
- [ ] Return sync summary

### Task 7.2: Create Cron Endpoint
- [ ] Add `contests.syncCron` procedure
- [ ] Protect with `CRON_SECRET` validation
- [ ] Call `contests.sync` internally
- [ ] Return success/error message
- [ ] Add logging for debugging

### Task 7.3: Set Up Automated Cron Job
- [ ] Option 1: Use Railway Cron (if available)
- [ ] Option 2: Use external service (cron-job.org, EasyCron)
- [ ] Option 3: Use GitHub Actions workflow
- [ ] Schedule to run every 5-10 minutes
- [ ] Test cron job execution
- [ ] Monitor logs

---

## Phase 8: Leaderboard System

### Task 8.1: Create Leaderboard Page
- [ ] Update `client/src/pages/Leaderboard.tsx`
- [ ] Fetch contest entries for specific contest
- [ ] Calculate and display rankings:
  - Rank
  - Username
  - Team name
  - Total points
  - Prize (if applicable)
- [ ] Highlight current user's entry
- [ ] Add filters: By contest, by match
- [ ] Add sorting options

### Task 8.2: Implement Point Calculation (Simplified)
- [ ] Add `contests.calculatePoints` procedure
- [ ] For completed matches:
  - Fetch match scorecard (if available from API)
  - Calculate points for each player based on performance
  - Update team scores in database
- [ ] **Note**: Full point calculation is complex and requires:
  - Detailed scorecard data
  - Fantasy cricket scoring rules
  - This can be simplified or done manually for MVP

---

## Phase 9: Dashboard Enhancements

### Task 9.1: Update Dashboard Page
- [ ] Update `client/src/pages/Dashboard.tsx`
- [ ] Add sections:
  - **My Teams** - List of user's teams
  - **My Contests** - Contests user has joined
  - **Live Matches** - Quick view of live matches
  - **Upcoming Matches** - Matches user can create teams for
- [ ] Add quick stats:
  - Total teams created
  - Total contests joined
  - Total points earned
  - Current rank (if applicable)

### Task 9.2: Add User Profile Section
- [ ] Display user information
- [ ] Show user stats
- [ ] Add edit profile button
- [ ] Show recent activity

---

## Phase 10: Testing & Verification

### Task 10.1: Manual Testing Checklist
- [ ] Test user registration and login
- [ ] Verify matches are fetched from CricAPI
- [ ] Test match categorization (live/upcoming/completed)
- [ ] Create a team with 11 players
- [ ] Verify captain and vice-captain selection
- [ ] Seed contests for a match
- [ ] Join a contest with a team
- [ ] Verify contest entry count increments
- [ ] Check live score updates
- [ ] Test auto-refresh functionality
- [ ] Verify contest sync updates statuses
- [ ] Check leaderboard displays correctly

### Task 10.2: Database Verification
- [ ] Verify all tables exist
- [ ] Check data integrity
- [ ] Test foreign key relationships
- [ ] Verify indexes are created
- [ ] Check for orphaned records

### Task 10.3: API Testing
- [ ] Test CricAPI connection
- [ ] Verify API key works
- [ ] Test rate limiting (if applicable)
- [ ] Handle API errors gracefully
- [ ] Test with no matches available
- [ ] Test with multiple live matches

---

## Phase 11: UI/UX Polish

### Task 11.1: Improve Match Cards
- [ ] Add match status badges (Live, Upcoming, Completed)
- [ ] Show countdown timer for upcoming matches
- [ ] Add team logos (if available from API)
- [ ] Improve mobile responsiveness

### Task 11.2: Enhance Team Creation UI
- [ ] Add player search/filter
- [ ] Add role-based filtering
- [ ] Show credit budget meter
- [ ] Add player stats (if available)
- [ ] Improve player selection UX

### Task 11.3: Contest UI Improvements
- [ ] Add contest type badges
- [ ] Show prize distribution breakdown
- [ ] Add "Featured" contests section
- [ ] Improve contest card design
- [ ] Add contest rules modal

### Task 11.4: Loading States & Errors
- [ ] Add loading skeletons for all pages
- [ ] Implement error boundaries
- [ ] Show user-friendly error messages
- [ ] Add retry buttons for failed requests
- [ ] Add empty states for all lists

---

## Phase 12: Deployment & Monitoring

### Task 12.1: Environment Setup
- [ ] Add all required environment variables to Railway
- [ ] Verify database connection string
- [ ] Test CricAPI key in production
- [ ] Set up CRON_SECRET for cron job

### Task 12.2: Build & Deploy
- [ ] Run `pnpm build` locally to verify
- [ ] Fix any build errors
- [ ] Push to GitHub
- [ ] Verify Railway auto-deployment
- [ ] Check deployment logs

### Task 12.3: Post-Deployment Verification
- [ ] Test live site functionality
- [ ] Verify matches are loading
- [ ] Test team creation
- [ ] Test contest joining
- [ ] Verify cron job is running
- [ ] Check database for data

### Task 12.4: Monitoring & Logging
- [ ] Set up error logging (Sentry, LogRocket, etc.)
- [ ] Monitor API usage
- [ ] Track user activity
- [ ] Set up alerts for critical errors

---

## Optional Enhancements (Future)

### Future Task 1: Advanced Features
- [ ] Player statistics and history
- [ ] Team comparison tool
- [ ] Contest recommendations
- [ ] Social features (share teams, invite friends)
- [ ] Push notifications for match start
- [ ] Email notifications for contest results

### Future Task 2: Performance Optimization
- [ ] Implement caching for match data
- [ ] Add service worker for offline support
- [ ] Optimize images and assets
- [ ] Implement lazy loading
- [ ] Add CDN for static assets

### Future Task 3: Analytics
- [ ] Track user engagement
- [ ] Monitor conversion rates
- [ ] Analyze popular contests
- [ ] Track team creation patterns
- [ ] Generate reports

---

## Priority Order

### 🔴 HIGH PRIORITY (Do First)
1. Phase 1: Cricket API Integration
2. Phase 2: Database Schema Updates
3. Phase 3: Match Display System
4. Phase 4: Team Creation System

### 🟡 MEDIUM PRIORITY (Do Second)
5. Phase 5: Contest System
6. Phase 6: Live Score System
7. Phase 7: Contest Synchronization System

### 🟢 LOW PRIORITY (Do Last)
8. Phase 8: Leaderboard System
9. Phase 9: Dashboard Enhancements
10. Phase 10: Testing & Verification
11. Phase 11: UI/UX Polish
12. Phase 12: Deployment & Monitoring

---

## Notes

- **API Key**: Get from https://www.cricketdata.org (paid API recommended for reliability)
- **Tech Stack Difference**: PDF uses Next.js, we use Vite + React + tRPC
- **Authentication**: PDF uses NextAuth.js, we already have custom auth ✓
- **Database**: PDF and our project both use Drizzle ORM + MySQL ✓
- **Real-time Updates**: Implement using polling (every 30 seconds) or WebSockets (advanced)
- **Point Calculation**: Complex feature, can be simplified for MVP
- **Free to Play**: All contests have entryFee: 0 (no real money)

---

**Last Updated**: December 29, 2025  
**Status**: Ready for Implementation  
**Estimated Time**: 2-3 days for core features
