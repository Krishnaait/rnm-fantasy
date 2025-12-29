import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "wouter";
import { Calendar, Users, Trophy, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getLoginUrl } from "@/const";

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  
  const { data: match, isLoading: matchLoading } = trpc.matches.getById.useQuery({ matchId: id || "" });
  const { data: squad, isLoading: squadLoading } = trpc.matches.getSquad.useQuery({ matchId: id || "" });
  const { data: contests, isLoading: contestsLoading } = trpc.contests.list.useQuery({ matchId: id });
  const { data: myTeams } = trpc.teams.myTeamsByMatch.useQuery(
    { matchId: id || "" },
    { enabled: isAuthenticated }
  );

  const isLoading = matchLoading || squadLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <Card className="border-destructive">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Match Not Found</h2>
              <p className="text-muted-foreground mb-4">The match you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link href="/matches">Back to Matches</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const statusBadge = match.ms === "live" ? "badge-live" : match.ms === "fixture" ? "badge-upcoming" : "badge-completed";
  const statusLabel = match.ms === "live" ? "LIVE" : match.ms === "fixture" ? "UPCOMING" : "COMPLETED";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/matches">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Matches
          </Link>
        </Button>

        {/* Match Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={statusBadge}>
                    {match.ms === "live" && (
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live mr-1 inline-block" />
                    )}
                    {statusLabel}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase">{match.matchType}</span>
                </div>
                <CardTitle className="text-2xl">{match.series}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(match.sdt).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardDescription>
              </div>
              
              {match.ms === "fixture" && (
                isAuthenticated ? (
                  <Button asChild size="lg" className="gradient-primary">
                    <Link href={`/create-team/${id}`}>
                      <Users className="w-4 h-4 mr-2" />
                      Create Team
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="gradient-primary">
                    <a href={getLoginUrl()}>Sign In to Create Team</a>
                  </Button>
                )
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 items-center gap-4 py-4">
              <div className="text-center">
                <div className="text-xl font-bold">{match.t1}</div>
                {match.t1s && <div className="text-2xl font-bold text-primary mt-2">{match.t1s}</div>}
              </div>
              <div className="text-center text-2xl font-bold text-muted-foreground">VS</div>
              <div className="text-center">
                <div className="text-xl font-bold">{match.t2}</div>
                {match.t2s && <div className="text-2xl font-bold text-primary mt-2">{match.t2s}</div>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="squad" className="space-y-6">
          <TabsList>
            <TabsTrigger value="squad" className="gap-2">
              <Users className="w-4 h-4" />
              Squad
            </TabsTrigger>
            <TabsTrigger value="contests" className="gap-2">
              <Trophy className="w-4 h-4" />
              Contests ({contests?.length || 0})
            </TabsTrigger>
            {isAuthenticated && myTeams && myTeams.length > 0 && (
              <TabsTrigger value="my-teams" className="gap-2">
                My Teams ({myTeams.length})
              </TabsTrigger>
            )}
          </TabsList>

          {/* Squad Tab */}
          <TabsContent value="squad">
            {squadLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      {[1, 2, 3, 4, 5].map((j) => (
                        <Skeleton key={j} className="h-10 w-full mb-2" />
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : squad && squad.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {squad.map((team, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{team.teamName}</CardTitle>
                      <CardDescription>{team.players.length} players</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {team.players.map((player) => (
                          <div 
                            key={player.id} 
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-xs text-muted-foreground">{player.role || "Player"}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Squad information not available for this match</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Contests Tab */}
          <TabsContent value="contests">
            {contestsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : contests && contests.length > 0 ? (
              <div className="space-y-4">
                {contests.map((contest) => (
                  <Card key={contest.id} className="card-hover">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{contest.name}</h3>
                          {contest.description && (
                            <p className="text-sm text-muted-foreground">{contest.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{contest.currentEntries}/{contest.maxEntries} joined</span>
                            <span className="text-primary font-medium">FREE ENTRY</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild variant="outline">
                            <Link href={`/leaderboard/${contest.id}`}>Leaderboard</Link>
                          </Button>
                          {isAuthenticated && match.ms === "fixture" && (
                            <Button asChild>
                              <Link href={`/contests/${contest.id}`}>Join Contest</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No contests available for this match yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Teams Tab */}
          {isAuthenticated && myTeams && myTeams.length > 0 && (
            <TabsContent value="my-teams">
              <div className="space-y-4">
                {myTeams.map((team) => (
                  <Card key={team.id} className="card-hover">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{team.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created {new Date(team.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button asChild variant="outline">
                          <Link href={`/my-teams`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
