import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Calendar, Loader2, Zap, Trophy, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Matches() {
  const { data: matchData, isLoading, error } = trpc.matches.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Matches</h1>
          <p className="text-muted-foreground mt-1">
            Browse live, upcoming, and completed cricket matches
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-48 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border-destructive">
            <CardContent className="py-8 text-center">
              <p className="text-destructive">Failed to load matches. Please try again later.</p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="live" className="gap-2">
                <Zap className="w-4 h-4" />
                Live ({matchData?.live.length || 0})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="w-4 h-4" />
                Upcoming ({matchData?.upcoming.length || 0})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed ({matchData?.completed.length || 0})
              </TabsTrigger>
            </TabsList>

            {/* Live Matches */}
            <TabsContent value="live" className="space-y-4">
              {matchData?.live.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No live matches at the moment</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchData?.live.map((match) => (
                    <MatchCard key={match.id} match={match} status="live" />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Upcoming Matches */}
            <TabsContent value="upcoming" className="space-y-4">
              {matchData?.upcoming.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming matches scheduled</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchData?.upcoming.map((match) => (
                    <MatchCard key={match.id} match={match} status="upcoming" />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Completed Matches */}
            <TabsContent value="completed" className="space-y-4">
              {matchData?.completed.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No completed matches to show</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchData?.completed.slice(0, 12).map((match) => (
                    <MatchCard key={match.id} match={match} status="completed" />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>

    </div>
  );
}

interface MatchCardProps {
  match: {
    id: string;
    t1: string;
    t2: string;
    t1s?: string;
    t2s?: string;
    series: string;
    matchType: string;
    dateTimeGMT: string;
  };
  status: "live" | "upcoming" | "completed";
}

function MatchCard({ match, status }: MatchCardProps) {
  const statusBadge = {
    live: "badge-live",
    upcoming: "badge-upcoming",
    completed: "badge-completed",
  };

  const statusLabel = {
    live: "LIVE",
    upcoming: "UPCOMING",
    completed: "COMPLETED",
  };

  return (
    <Card className={`card-hover ${status === "live" ? "border-red-500/30" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className={statusBadge[status]}>
            {status === "live" && (
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live mr-1 inline-block" />
            )}
            {statusLabel[status]}
          </span>
          <span className="text-xs text-muted-foreground uppercase">{match.matchType}</span>
        </div>
        <CardTitle className="text-base mt-2 line-clamp-1">{match.series}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm truncate max-w-[120px]">{match.t1}</span>
            {status !== "upcoming" ? (
              <span className="text-primary font-bold">{match.t1s || "-"}</span>
            ) : (
              <span className="text-muted-foreground">vs</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm truncate max-w-[120px]">{match.t2}</span>
            {status !== "upcoming" && (
              <span className="text-primary font-bold">{match.t2s || "-"}</span>
            )}
          </div>
          
          {status === "upcoming" && (
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {match.dateTimeGMT && !isNaN(new Date(match.dateTimeGMT).getTime())
                ? new Date(match.dateTimeGMT).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Date TBA"}
            </div>
          )}
        </div>
        
        <Button asChild className="w-full mt-4" variant={status === "live" ? "default" : "secondary"}>
          <Link href={`/matches/${match.id}`}>
            {status === "upcoming" ? "Create Team" : "View Details"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
