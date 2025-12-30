import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Trophy, 
  Users, 
  Zap, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Smartphone,
  Sparkles
} from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: "Zero Entry Fee",
      description: "Join any contest for free. No financial risk, just pure cricket passion.",
      icon: <Trophy className="w-6 h-6 text-primary" />,
      image: "/feature-contests.png"
    },
    {
      title: "Live Score Updates",
      description: "Real-time match tracking and fantasy point calculations.",
      icon: <Zap className="w-6 h-6 text-primary" />,
      image: "/feature-live-scores.png"
    },
    {
      title: "Global Leaderboard",
      description: "Compete with thousands of players and climb the rankings.",
      icon: <Users className="w-6 h-6 text-primary" />,
      image: "/feature-leaderboard.png"
    }
  ];

  const steps = [
    {
      title: "Register Free",
      description: "Create your account in seconds and join our community.",
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
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Button 
                    size="lg" 
                    onClick={() => setLocation("/matches")}
                    className="gradient-primary text-lg px-8 py-6 h-auto flex-1 sm:flex-none"
                  >
                    View Matches <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setLocation("/dashboard")}
                    className="text-lg px-8 py-6 h-auto border-primary/50 hover:bg-primary/10 flex-1 sm:flex-none"
                  >
                    My Dashboard
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    onClick={() => setLocation("/register")}
                    className="gradient-primary text-lg px-8 py-6 h-auto"
                  >
                    Join Now Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setLocation("/how-to-play")}
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

      {/* Trust Badges Section */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              { label: "100% Free to Play", icon: <Trophy className="w-5 h-5" /> },
              { label: "Secure Platform", icon: <ShieldCheck className="w-5 h-5" /> },
              { label: "Skill Based", icon: <Star className="w-5 h-5" /> },
              { label: "24/7 Support", icon: <Smartphone className="w-5 h-5" /> }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-full bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary">
                  {badge.icon}
                </div>
                <span className="font-bold text-sm uppercase tracking-wide whitespace-nowrap">
                  {badge.label}
                </span>
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
              {isAuthenticated ? "READY FOR THE NEXT MATCH?" : "READY TO DOMINATE?"}
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto font-medium">
              {isAuthenticated 
                ? "Your team is waiting. Check out the latest matches and join new contests to climb the leaderboard!"
                : "Join India's fastest-growing free fantasy cricket community today. Show off your skills and claim your spot on the leaderboard!"}
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setLocation(isAuthenticated ? "/matches" : "/register")}
              className="text-xl px-12 py-8 h-auto font-bold shadow-2xl hover:scale-105 transition-transform"
            >
              {isAuthenticated ? "VIEW UPCOMING MATCHES" : "START PLAYING NOW"}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
