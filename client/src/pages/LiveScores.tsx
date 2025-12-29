import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Zap, RefreshCw, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export default function LiveScores() {
  const { data: matchData, isLoading, refetch, isRefetching } = trpc.matches.list.useQuery();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleRefresh = () => {
    refetch();
    setLastUpdated(new Date());
  };

  const liveMatches = matchData?.live || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Zap className="w-8 h-8 text-red-500" />
              Live Scores
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time cricket scores • Auto-refreshes every 30 seconds
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefetching}
            >
              {isRefetching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span className="ml-2">Refresh</span>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="py-6">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : liveMatches.length > 0 ? (
          <div className="space-y-6">
            {liveMatches.map((match) => (
              <Card key={match.id} className="border-red-500/30 overflow-hidden">
                <div className="h-1 bg-red-500 animate-pulse" />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="badge-live flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live" />
                        LIVE
                      </span>
                      <span className="text-xs text-muted-foreground uppercase">{match.matchType}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{match.series}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    {/* Team 1 */}
                    <div className="text-center md:text-left">
                      <div className="text-xl font-bold mb-2">{match.t1}</div>
                      <div className="text-3xl font-bold text-primary">
                        {match.t1s || "-"}
                      </div>
                    </div>

                    {/* VS */}
                    <div className="flex items-center justify-center">
                      <div className="text-2xl font-bold text-muted-foreground">VS</div>
                    </div>

                    {/* Team 2 */}
                    <div className="text-center md:text-right">
                      <div className="text-xl font-bold mb-2">{match.t2}</div>
                      <div className="text-3xl font-bold text-primary">
                        {match.t2s || "-"}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-4 border-t border-border">
                    <Button asChild variant="outline">
                      <Link href={`/matches/${match.id}`}>Match Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Live Matches</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                There are no live cricket matches at the moment. Check back later or browse upcoming matches.
              </p>
              <Button asChild>
                <Link href="/matches">View Upcoming Matches</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">About Live Scores</h3>
                <p className="text-sm text-muted-foreground">
                  Live scores are automatically updated every 30 seconds. You can also manually refresh 
                  using the refresh button. Create teams for upcoming matches and join contests to 
                  compete with other fantasy cricket enthusiasts!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

    </div>
  );
}
