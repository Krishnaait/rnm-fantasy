import { Card, CardContent } from "@/components/ui/card";
import { 
  Trophy, 
  Users, 
  Target, 
  ShieldCheck, 
  Globe, 
  Heart,
  Sparkles,
  History,
  Award
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-card/30 border-b border-border">
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            About <span className="text-primary">RNM Fantasy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are on a mission to democratize fantasy cricket in India by providing 
            a 100% free, skill-based platform for every cricket fan.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <History className="w-4 h-4" />
              <span>Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Born from Passion for Cricket</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              RNM Fantasy was founded by a group of cricket enthusiasts who believed that 
              fantasy sports should be about skill and passion, not just money. We saw 
              millions of fans being excluded from the fantasy sports revolution due to 
              high entry fees and financial risks.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In 2025, we launched RNM Fantasy with a simple promise: 100% Free to Play, 
              Forever. Today, we are one of India's fastest-growing free fantasy platforms, 
              connecting thousands of fans through the sport they love.
            </p>
          </div>
          <div className="relative">
            <img 
              src="/hero-cricket-player.png" 
              alt="Cricket Passion" 
              className="rounded-2xl shadow-2xl opacity-80 border border-primary/10"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-card/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These principles guide everything we do at RNM Fantasy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Inclusivity",
                description: "Fantasy cricket for everyone, regardless of their financial background.",
                icon: <Globe className="w-8 h-8 text-primary" />
              },
              {
                title: "Integrity",
                description: "Fair play is at our core. We ensure a level playing field for all users.",
                icon: <ShieldCheck className="w-8 h-8 text-primary" />
              },
              {
                title: "Innovation",
                description: "Constantly improving our platform to provide the best user experience.",
                icon: <Sparkles className="w-8 h-8 text-primary" />
              }
            ].map((value, i) => (
              <Card key={i} className="border-primary/10 bg-card/50">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Are Different */}
      <section className="py-24 container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Why We Are Different</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "No Real Money Involved",
              description: "Unlike other platforms, we never ask for your money. Play freely and enjoy the game.",
              icon: <Heart className="w-6 h-6 text-primary" />
            },
            {
              title: "Skill-Based Competition",
              description: "Our scoring system is designed to reward deep cricket knowledge and strategic thinking.",
              icon: <Target className="w-6 h-6 text-primary" />
            },
            {
              title: "Real-Time Engagement",
              description: "Experience the match live with our lightning-fast score updates and point calculations.",
              icon: <Zap className="w-6 h-6 text-primary" />
            },
            {
              title: "Community Focused",
              description: "Join a growing community of cricket fans who share your passion for the game.",
              icon: <Users className="w-6 h-6 text-primary" />
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-6 rounded-xl border border-primary/10 bg-card/50">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 bg-primary/5">
        <div className="container max-w-4xl">
          <Card className="border-primary/20">
            <CardContent className="p-12 text-center space-y-6">
              <Award className="w-16 h-16 text-primary mx-auto" />
              <h2 className="text-3xl font-bold">RNM PARKING AND SECURITY SOLUTIONS PRIVATE LIMITED</h2>
              <p className="text-muted-foreground">
                RNM Fantasy is a flagship product of RNM Parking and Security Solutions Private Limited, 
                a company dedicated to creating innovative digital solutions for the Indian market.
              </p>
              <div className="pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block">CIN</span>
                  <span className="font-bold">U93000DL2019PTC357485</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Headquarters</span>
                  <span className="font-bold">Vasant Kunj, New Delhi</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
