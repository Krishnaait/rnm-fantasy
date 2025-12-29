import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Users, Trophy, Crown, Star, Calendar, 
  CheckCircle, ArrowRight, Zap 
} from "lucide-react";

export default function HowToPlay() {
  const steps = [
    {
      number: 1,
      title: "Select a Match",
      description: "Browse upcoming cricket matches and choose the one you want to play. You can create teams for any upcoming match on our platform.",
      icon: Calendar,
    },
    {
      number: 2,
      title: "Create Your Team",
      description: "Select 11 players from both teams playing in the match. Use your cricket knowledge to pick the best performers.",
      icon: Users,
    },
    {
      number: 3,
      title: "Choose Captain & Vice-Captain",
      description: "Select your Captain (2x points) and Vice-Captain (1.5x points). These choices can make or break your team's performance.",
      icon: Crown,
    },
    {
      number: 4,
      title: "Join Contests",
      description: "Enter free contests to compete against other players. All contests on RNM Fantasy are 100% free to join.",
      icon: Trophy,
    },
    {
      number: 5,
      title: "Track Live Scores",
      description: "Watch your team's performance in real-time as the match progresses. Points are calculated automatically based on player performance.",
      icon: Zap,
    },
    {
      number: 6,
      title: "Climb the Leaderboard",
      description: "Compete for the top spot on the leaderboard. The better your team performs, the higher you rank!",
      icon: Star,
    },
  ];

  const pointsSystem = [
    { category: "Batting", points: [
      { action: "Run scored", value: "+1 point" },
      { action: "Boundary (4)", value: "+1 bonus point" },
      { action: "Six (6)", value: "+2 bonus points" },
      { action: "Half-century (50)", value: "+10 bonus points" },
      { action: "Century (100)", value: "+25 bonus points" },
      { action: "Duck (0 runs)", value: "-5 points" },
    ]},
    { category: "Bowling", points: [
      { action: "Wicket taken", value: "+25 points" },
      { action: "Maiden over", value: "+10 points" },
      { action: "3-wicket haul", value: "+10 bonus points" },
      { action: "5-wicket haul", value: "+25 bonus points" },
    ]},
    { category: "Fielding", points: [
      { action: "Catch taken", value: "+10 points" },
      { action: "Stumping", value: "+15 points" },
      { action: "Run out (direct)", value: "+15 points" },
      { action: "Run out (indirect)", value: "+10 points" },
    ]},
    { category: "Multipliers", points: [
      { action: "Captain", value: "2x all points" },
      { action: "Vice-Captain", value: "1.5x all points" },
    ]},
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How to Play
              </h1>
              <p className="text-lg text-muted-foreground">
                Learn how to create winning fantasy cricket teams and compete for glory
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step) => (
                <Card key={step.number} className="card-hover relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-xl font-bold text-primary-foreground">
                        {step.number}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Points System Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-4 text-center">Points System</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Points are awarded based on real player performance during the match. 
              Here's how the scoring works:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pointsSystem.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.category === "Multipliers" ? (
                        <Crown className="w-5 h-5 text-secondary" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.points.map((point, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                          <span className="text-muted-foreground">{point.action}</span>
                          <span className={`font-medium ${
                            point.value.includes("-") ? "text-destructive" : "text-primary"
                          }`}>
                            {point.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Pro Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Research Player Form</h3>
                  <p className="text-sm text-muted-foreground">
                    Check recent performances, pitch conditions, and head-to-head records 
                    before selecting your team.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Captain Wisely</h3>
                  <p className="text-sm text-muted-foreground">
                    Your captain gets 2x points. Choose a consistent performer who's 
                    likely to have a big impact on the match.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Balance Your Team</h3>
                  <p className="text-sm text-muted-foreground">
                    Include a mix of batsmen, bowlers, all-rounders, and wicket-keepers 
                    to maximize point-scoring opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <Card className="gradient-primary border-0">
              <CardContent className="py-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                  Ready to Start Playing?
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                  Put your cricket knowledge to the test. Create your first team and 
                  join free contests today!
                </p>
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <Link href="/matches">
                    Browse Matches
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
