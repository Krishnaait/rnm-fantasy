/**
 * Cricket API Integration
 * Fetches match data from CricAPI for live, upcoming, and completed matches
 */

const CRIC_API_KEY = process.env.CRIC_API_KEY || "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

export interface CricMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: {
    name: string;
    shortname: string;
    img: string;
  }[];
  score?: {
    r: number;
    w: number;
    o: number;
    inning: string;
  }[];
  series_id?: string;
  fantasyEnabled?: boolean;
  bbbEnabled?: boolean;
  hasSquad?: boolean;
  matchStarted?: boolean;
  matchEnded?: boolean;
}

export interface CricScoreMatch {
  id: string;
  t1: string;
  t2: string;
  t1img?: string;
  t2img?: string;
  t1s?: string;
  t2s?: string;
  ms: "live" | "fixture" | "result";
  dateTimeGMT: string;
  series: string;
  matchType: string;
  status?: string;
}

export interface SquadPlayer {
  id: string;
  name: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
}

export interface SquadTeam {
  teamName: string;
  players: SquadPlayer[];
}

/**
 * Fetch current matches with scores (live, upcoming, completed)
 */
export async function getMatches(): Promise<CricScoreMatch[]> {
  if (!CRIC_API_KEY) {
    console.warn("[CricketAPI] No API key configured");
    return [];
  }

  try {
    const url = `${BASE_URL}/cricScore?apikey=${CRIC_API_KEY}`;
    const res = await fetch(url, { 
      headers: { "Content-Type": "application/json" }
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }
    
    const data = await res.json();
    if (data.status !== "success") {
      console.error("[CricketAPI] API Error:", data.info || data.reason);
      return [];
    }
    return data.data || [];
  } catch (error) {
    console.error("[CricketAPI] Failed to fetch matches:", error);
    return [];
  }
}

/**
 * Fetch match list with more details
 */
export async function getMatchList(): Promise<CricMatch[]> {
  if (!CRIC_API_KEY) {
    console.warn("[CricketAPI] No API key configured");
    return [];
  }

  try {
    const url = `${BASE_URL}/matches?apikey=${CRIC_API_KEY}&offset=0`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" }
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }
    
    const data = await res.json();
    if (data.status !== "success") {
      console.error("[CricketAPI] API Error:", data.info || data.reason);
      return [];
    }
    return data.data || [];
  } catch (error) {
    console.error("[CricketAPI] Failed to fetch match list:", error);
    return [];
  }
}

/**
 * Fetch squad for a specific match
 */
export async function getMatchSquad(matchId: string): Promise<SquadTeam[]> {
  if (!CRIC_API_KEY) {
    console.warn("[CricketAPI] No API key configured");
    return [];
  }

  try {
    const url = `${BASE_URL}/match_squad?apikey=${CRIC_API_KEY}&id=${matchId}`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" }
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }
    
    const data = await res.json();
    if (data.status !== "success") {
      console.error("[CricketAPI] API Error:", data.info || data.reason);
      return [];
    }
    return data.data || [];
  } catch (error) {
    console.error("[CricketAPI] Failed to fetch squad:", error);
    return [];
  }
}

/**
 * Fetch match info/details
 */
export async function getMatchInfo(matchId: string): Promise<CricMatch | null> {
  if (!CRIC_API_KEY) {
    console.warn("[CricketAPI] No API key configured");
    return null;
  }

  try {
    const url = `${BASE_URL}/match_info?apikey=${CRIC_API_KEY}&id=${matchId}`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" }
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }
    
    const data = await res.json();
    if (data.status !== "success") {
      console.error("[CricketAPI] API Error:", data.info || data.reason);
      return null;
    }
    return data.data || null;
  } catch (error) {
    console.error("[CricketAPI] Failed to fetch match info:", error);
    return null;
  }
}

/**
 * Fetch player info
 */
export async function getPlayerInfo(playerId: string) {
  if (!CRIC_API_KEY) {
    console.warn("[CricketAPI] No API key configured");
    return null;
  }

  try {
    const url = `${BASE_URL}/players_info?apikey=${CRIC_API_KEY}&id=${playerId}`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" }
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }
    
    const data = await res.json();
    if (data.status !== "success") {
      console.error("[CricketAPI] API Error:", data.info || data.reason);
      return null;
    }
    return data.data || null;
  } catch (error) {
    console.error("[CricketAPI] Failed to fetch player info:", error);
    return null;
  }
}

/**
 * Categorize matches by status
 */
export function categorizeMatches(matches: CricScoreMatch[]) {
  const live = matches.filter((m) => m.ms === "live");
  const upcoming = matches
    .filter((m) => m.ms === "fixture")
    .sort((a, b) => new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime());
  const completed = matches
    .filter((m) => m.ms === "result")
    .sort((a, b) => new Date(b.dateTimeGMT).getTime() - new Date(a.dateTimeGMT).getTime());

  return { live, upcoming, completed };
}
