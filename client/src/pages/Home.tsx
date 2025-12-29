import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { 
  Trophy, Users, Zap, Calendar, ArrowRight, 
  Shield, Award, Target, TrendingUp
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { data: matchData, isLoading } = trpc.matches.list.useQuery();

  const features = [
    {
      icon: Users,
      title: "Create Your Dream Team",
      description: "Select 11 players from the match squad and pick your captain and vice-captain for maximum points.",
    },
    {
      icon: Trophy,
      title: "Join Free Contests",
      description: "Compete in 100% free contests against other fantasy enthusiasts. No entry fees, no real money.",
    },
    {
      icon: Zap,
      title: "Live Score Updates",
      description: "Track your team's performance in real-time with automatic score updates and live leaderboards.",
    },
    {
      icon: Award,
      title: "Climb the Leaderboard",
      description: "Earn points based on player performance and compete for the top spot on the leaderboard.",
    },
  ];

  const stats = [
    { value: "100%", label: "Free to Play" },
    { value: "2x", label: "Captain Points" },
    { value: "1.5x", label: "Vice-Captain Points" },
    { value: "11", label: "Players per Team" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Shield className="w-4 h-4" />
              100% Free to Play • No Real Money
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Play Fantasy Cricket
              <span className="block text-primary">Win Bragging Rights</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Create your dream team, join free contests, and compete against cricket fans 
              across India. No money involved – just pure cricket passion!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="gradient-primary text-lg px-8">
                    <Link href="/matches">
                      View Matches
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8">
                    <Link href="/dashboard">My Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="gradient-primary text-lg px-8">
                    <a href={getLoginUrl()}>
                      Start Playing Free
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8">
                    <Link href="/how-to-play">How to Play</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      {matchData && matchData.live.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Live Matches</h2>
                <p className="text-muted-foreground mt-1">Create teams and join contests now!</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/live-scores">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchData.live.slice(0, 3).map((match) => (
                <Card key={match.id} className="card-hover border-red-500/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="badge-live flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live" />
                        LIVE
                      </span>
                      <span className="text-xs text-muted-foreground">{match.matchType}</span>
                    </div>
                    <CardTitle className="text-lg mt-2">{match.series}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{match.t1}</span>
                        <span className="text-primary font-bold">{match.t1s || "-"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{match.t2}</span>
                        <span className="text-primary font-bold">{match.t2s || "-"}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full mt-4" variant="secondary">
                      <Link href={`/matches/${match.id}`}>View Match</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Matches Section */}
      {matchData && matchData.upcoming.length > 0 && (
        <section className="py-16 bg-card/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Upcoming Matches</h2>
                <p className="text-muted-foreground mt-1">Create your teams before the match starts</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/matches">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchData.upcoming.slice(0, 6).map((match) => (
                <Card key={match.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="badge-upcoming">UPCOMING</span>
                      <span className="text-xs text-muted-foreground">{match.matchType}</span>
                    </div>
                    <CardTitle className="text-lg mt-2">{match.series}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{match.t1}</span>
                        <span className="text-muted-foreground">vs</span>
                        <span className="font-medium">{match.t2}</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(match.sdt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <Button asChild className="w-full mt-4">
                      <Link href={`/matches/${match.id}`}>Create Team</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Get started with RNM Fantasy in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover text-center">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <Card className="gradient-primary border-0">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Ready to Play?
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                Join thousands of cricket fans and start your fantasy cricket journey today. 
                It's completely free!
              </p>
              {isAuthenticated ? (
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <Link href="/matches">
                    Browse Matches
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <a href={getLoginUrl()}>
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
