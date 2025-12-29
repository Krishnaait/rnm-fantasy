import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  ArrowRight, 
  Trophy, 
  Users, 
  Zap, 
  Crown, 
  Star,
  ShieldCheck,
  Smartphone
} from "lucide-react";

export default function HowToPlay() {
  const steps = [
    {
      title: "1. Select a Match",
      description: "Choose an upcoming match from the 'Matches' section. We cover all major international and domestic cricket tournaments.",
      image: "/how-to-play-step1.png"
    },
    {
      title: "2. Create Your Team",
      description: "Build your dream team of 11 players within the virtual budget. You must select players from both competing teams.",
      image: "/how-to-play-step2.png"
    },
    {
      title: "3. Choose Captain & VC",
      description: "Select a Captain (2x points) and a Vice-Captain (1.5x points). These choices are crucial for your final score.",
      image: "/how-to-play-step3.png"
    },
    {
      title: "4. Join Contests",
      description: "Enter your team into any of our free contests. You can create multiple teams for the same match to increase your chances.",
      image: "/feature-contests.png"
    }
  ];

  const pointsSystem = [
    {
      category: "Batting",
      points: [
        { action: "Run", value: "+1" },
        { action: "Boundary Bonus", value: "+1" },
        { action: "Six Bonus", value: "+2" },
        { action: "Half-Century Bonus", value: "+8" },
        { action: "Century Bonus", value: "+16" },
        { action: "Duck (Dismissal for 0)", value: "-2" }
      ]
    },
    {
      category: "Bowling",
      points: [
        { action: "Wicket (Excluding Run Out)", value: "+25" },
        { action: "3 Wicket Bonus", value: "+4" },
        { action: "4 Wicket Bonus", value: "+8" },
        { action: "5 Wicket Bonus", value: "+16" },
        { action: "Maiden Over", value: "+8" }
      ]
    },
    {
      category: "Fielding",
      points: [
        { action: "Catch", value: "+8" },
        { action: "Stumping", value: "+12" },
        { action: "Run Out (Direct Hit)", value: "+12" },
        { action: "Run Out (Involved)", value: "+6" }
      ]
    },
    {
      category: "Multipliers",
      points: [
        { action: "Captain", value: "2x Points" },
        { action: "Vice-Captain", value: "1.5x Points" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-card/30 border-b border-border">
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            How to <span className="text-primary">Play</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master the art of fantasy cricket. Follow these simple steps to start 
            your journey and dominate the leaderboards.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 container">
        <div className="space-y-24">
          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">{step.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                <div className="flex items-center gap-4 text-primary font-medium">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Pro Tip: Research player form before selecting.</span>
                </div>
              </div>
              <div className="flex-1">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="rounded-2xl shadow-2xl border border-primary/10 w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Points System Section */}
      <section className="py-24 bg-card/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Points System</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Understand how your players earn points based on their real-match performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pointsSystem.map((cat, i) => (
              <Card key={i} className="border-primary/10 bg-card/50">
                <CardHeader className="border-b border-border/50">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {cat.category === "Multipliers" ? <Crown className="w-5 h-5 text-primary" /> : <Zap className="w-5 h-5 text-primary" />}
                    {cat.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {cat.points.map((p, pi) => (
                      <li key={pi} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{p.action}</span>
                        <span className="font-bold text-primary">{p.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fair Play Section */}
      <section className="py-24 container">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Fair Play Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We maintain the highest standards of integrity. Our automated systems 
                  detect and prevent any form of collusion or multiple account usage. 
                  Every player has an equal chance to win based on their skill.
                </p>
                <Button asChild variant="outline">
                  <Link href="/fair-play">Read Full Policy</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Verified Players",
                  "Secure Platform",
                  "Transparent Scoring",
                  "24/7 Monitoring"
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-background border border-primary/10 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="py-24 container text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold">Ready to Build Your Team?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The next big match is just around the corner. Don't miss out on the action!
        </p>
        <Button asChild size="lg" className="gradient-primary text-lg px-12 py-8 h-auto">
          <Link href="/matches">
            Browse Upcoming Matches <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
