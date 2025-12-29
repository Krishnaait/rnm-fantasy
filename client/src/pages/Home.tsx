import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Trophy, 
  Users, 
  Zap, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Smartphone,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const features = [
    {
      title: "100% Free to Play",
      description: "No entry fees, no real money. Just pure cricket fantasy fun for everyone.",
      icon: <Trophy className="w-8 h-8 text-primary" />,
      image: "/feature-contests.png"
    },
    {
      title: "Real-Time Live Scores",
      description: "Watch your fantasy team's performance with live match updates every 30 seconds.",
      icon: <Zap className="w-8 h-8 text-primary" />,
      image: "/feature-live-scores.png"
    },
    {
      title: "Global Leaderboards",
      description: "Compete with cricket fans across India and climb the global rankings.",
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      image: "/feature-leaderboard.png"
    }
  ];

  const steps = [
    {
      title: "Register Free",
      description: "Create your free account in seconds and join the community.",
      image: "/how-to-play-step1.png"
    },
    {
      title: "Select Match",
      description: "Choose from upcoming international and domestic cricket matches.",
      image: "/how-to-play-step2.png"
    },
    {
      title: "Create Team",
      description: "Build your dream team of 11 players and select your Captain.",
      image: "/how-to-play-step3.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-cricket-player.png" 
            alt="Cricket Action" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>India's Premier Free Fantasy Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Play Cricket <br />
              <span className="text-primary">Fantasy for Free</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Experience the thrill of fantasy cricket without any financial risk. 
              Build your dream team, join contests, and compete for the top spot 
              on the leaderboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {isAuthenticated ? (
                <Button 
                  size="lg" 
                  onClick={() => navigate("/matches")}
                  className="gradient-primary text-lg px-8 py-6 h-auto"
                >
                  Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    onClick={() => navigate("/register")}
                    className="gradient-primary text-lg px-8 py-6 h-auto"
                  >
                    Join Now Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate("/how-to-play")}
                    className="text-lg px-8 py-6 h-auto border-primary/50 hover:bg-primary/10"
                  >
                    How to Play
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "50K+" },
              { label: "Matches Covered", value: "1000+" },
              { label: "Free Contests", value: "5000+" },
              { label: "User Rating", value: "4.8/5" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Why Choose RNM Fantasy?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We provide the most authentic fantasy cricket experience with zero entry fees.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="card-hover border-primary/10 bg-card/50 overflow-hidden">
              <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover opacity-80" />
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-24 bg-card/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Start Playing in 3 Steps</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              It's quick, easy, and completely free to join the action.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center space-y-6">
                <div className="relative z-10">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-64 object-contain mb-6 drop-shadow-[0_0_30px_rgba(0,255,0,0.2)]" 
                  />
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              What Our <span className="text-primary">Players Say</span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  name: "Rahul Sharma",
                  role: "Cricket Enthusiast",
                  text: "The best part about RNM Fantasy is that it's completely free. I can test my cricket knowledge without worrying about losing money."
                },
                {
                  name: "Priya Patel",
                  role: "Fantasy Pro",
                  text: "The live score updates are incredibly fast. It makes watching the match so much more exciting when you see your fantasy points climbing!"
                }
              ].map((t, i) => (
                <Card key={i} className="bg-card/50 border-primary/10">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-primary text-primary" />)}
                    </div>
                    <p className="italic text-muted-foreground">"{t.text}"</p>
                    <div className="font-bold">{t.name} <span className="text-sm font-normal text-muted-foreground ml-2">— {t.role}</span></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="/testimonials-section.png" 
              alt="Community" 
              className="rounded-2xl shadow-2xl shadow-primary/20 border border-primary/10"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container">
        <Card className="gradient-primary border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <CardContent className="relative z-10 py-16 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-primary-foreground">
              READY TO DOMINATE?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto font-medium">
              Join India's fastest-growing free fantasy cricket community today. 
              Show off your skills and claim your spot on the leaderboard!
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/register")}
              className="text-xl px-12 py-8 h-auto font-bold shadow-2xl hover:scale-105 transition-transform"
            >
              START PLAYING NOW
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
