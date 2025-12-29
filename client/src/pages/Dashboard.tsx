import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Users, Trophy, Calendar, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  
  const { data: myTeams, isLoading: teamsLoading } = trpc.teams.myTeams.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  const { data: myEntries, isLoading: entriesLoading } = trpc.contests.myEntries.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  const { data: matchData } = trpc.matches.list.useQuery();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      title: "My Teams",
      value: myTeams?.length || 0,
      icon: Users,
      href: "/my-teams",
    },
    {
      title: "Contest Entries",
      value: myEntries?.length || 0,
      icon: Trophy,
      href: "/contests",
    },
    {
      title: "Live Matches",
      value: matchData?.live.length || 0,
      icon: TrendingUp,
      href: "/live-scores",
    },
    {
      title: "Upcoming Matches",
      value: matchData?.upcoming.length || 0,
      icon: Calendar,
      href: "/matches",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name || "Player"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your fantasy cricket dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <Button asChild variant="ghost" className="w-full mt-4 justify-between">
                  <Link href={stat.href}>
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with your fantasy cricket journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/matches">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Browse Matches
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/contests">
                  <span className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Join Contests
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/live-scores">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Live Scores
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Teams */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Teams</CardTitle>
              <CardDescription>Your recently created teams</CardDescription>
            </CardHeader>
            <CardContent>
              {teamsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : myTeams && myTeams.length > 0 ? (
                <div className="space-y-3">
                  {myTeams.slice(0, 3).map((team) => (
                    <div 
                      key={team.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(team.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href="/my-teams">View</Link>
                      </Button>
                    </div>
                  ))}
                  {myTeams.length > 3 && (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/my-teams">View All Teams</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">You haven't created any teams yet</p>
                  <Button asChild>
                    <Link href="/matches">Create Your First Team</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Matches */}
        {matchData && matchData.upcoming.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Matches</CardTitle>
                  <CardDescription>Create teams for these matches</CardDescription>
                </div>
                <Button asChild variant="outline">
                  <Link href="/matches">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchData.upcoming.slice(0, 3).map((match) => (
                  <div 
                    key={match.id} 
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="text-xs text-muted-foreground mb-2">{match.series}</div>
                    <div className="font-medium mb-2">{match.t1} vs {match.t2}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
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
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/create-team/${match.id}`}>Create Team</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
