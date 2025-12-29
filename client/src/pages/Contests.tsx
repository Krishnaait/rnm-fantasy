import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trophy, Users, Loader2, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Contests() {
  const { data: contests, isLoading, error } = trpc.contests.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Contests</h1>
          <p className="text-muted-foreground mt-1">
            Join free contests and compete for the top spot on the leaderboard
          </p>
        </div>

        {/* Free to Play Banner */}
        <Card className="mb-8 gradient-primary border-0">
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-foreground">100% Free to Play</h2>
                <p className="text-primary-foreground/80">
                  No entry fees, no real money. Just pure cricket fantasy fun!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="py-6">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border-destructive">
            <CardContent className="py-8 text-center">
              <p className="text-destructive">Failed to load contests. Please try again later.</p>
            </CardContent>
          </Card>
        ) : contests && contests.length > 0 ? (
          <div className="space-y-4">
            {contests.map((contest) => (
              <Card key={contest.id} className="card-hover">
                <CardContent className="py-6">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{contest.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          contest.status === "live" 
                            ? "bg-red-500/20 text-red-400" 
                            : contest.status === "upcoming"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {contest.status.toUpperCase()}
                        </span>
                      </div>
                      {contest.description && (
                        <p className="text-muted-foreground mb-3">{contest.description}</p>
                      )}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{contest.currentEntries}/{contest.maxEntries} joined</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-medium">
                          <Trophy className="w-4 h-4" />
                          <span>FREE ENTRY</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button asChild>
                        <Link href={`/contests/${contest.id}`}>
                          {contest.status === "upcoming" ? "Join Contest" : "View Details"}
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={`/leaderboard/${contest.id}`}>Leaderboard</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Contests Available</h2>
              <p className="text-muted-foreground mb-6">
                There are no contests available at the moment. Check back later!
              </p>
              <Button asChild>
                <Link href="/matches">Browse Matches</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

    </div>
  );
}
