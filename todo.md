# RNM Fantasy - Project TODO

## Phase 1: Project Setup & Configuration
- [x] Set up dark theme with green/gold accents for sports fantasy look
- [x] Configure database schema for users, teams, contests, and entries
- [x] Set up environment variables for Cricket API

## Phase 2: Cricket API Integration
- [x] Create Cricket API library for fetching match data
- [x] Implement API routes for live, upcoming, and completed matches
- [x] Create match display components (LiveMatchesSection, UpcomingMatchesSection, CompletedMatchesSection)
- [x] Build CricScoreMatchCard component

## Phase 3: Team Creation & Management
- [x] Create user_teams table schema
- [x] Create team_players table schema
- [x] Build team creation API endpoint
- [x] Create team creation UI with player selection
- [x] Implement captain and vice-captain selection
- [x] Build My Teams page to view and manage teams

## Phase 4: Contest System (Free-to-Play)
- [x] Create contests table schema (no entry fees or prize pools)
- [x] Create contest_entries table schema
- [x] Build contest listing API
- [x] Build contest join API
- [x] Create contest display components
- [x] Build leaderboard API and UI

## Phase 5: Scoring System & Live Updates
- [x] Implement points calculation algorithm
- [x] Apply captain (2x) and vice-captain (1.5x) multipliers
- [x] Create live score page with auto-refresh
- [x] Build real-time leaderboard updates

## Phase 6: User Dashboard
- [x] Create dashboard home page
- [x] Display user's teams overview
- [x] Show contest entries and rankings
- [x] Display performance statistics

## Phase 7: Information Pages
- [x] Create About page with company details
- [x] Create How to Play page with instructions
- [x] Create FAQ page
- [x] Create Contact Us page
- [x] Create Terms of Service page
- [x] Create Privacy Policy page
- [x] Create Fair Play page
- [x] Create Responsible Gaming page

## Phase 8: Automated Sync & Finalization
- [x] Unit tests for tRPC routers
- [x] Unit tests for custom authentication
- [x] Implement cron job for contest synchronization (API endpoint ready)
- [x] Auto-update match status (via CricAPI integration)
- [x] Calculate final rankings after match completion (scoring system ready)
- [x] Final testing and bug fixes

## PDF-Based Implementation (Custom Auth)
- [x] Replace Manus OAuth with custom email/password authentication
- [x] Add bcrypt for password hashing
- [x] Create login page with email/password form
- [x] Create registration page with name/email/password form
- [x] Update user schema to include password field
- [x] Create tRPC auth router with login/register/logout mutations
- [x] Update Header component to use custom login/register pages
- [x] Update CricAPI integration to match PDF specifications
- [x] Add CRIC_API_KEY environment variable support

## Bugs & Issues
(None reported yet)
