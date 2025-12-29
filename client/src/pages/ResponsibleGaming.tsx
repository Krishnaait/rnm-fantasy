import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Clock, Users, AlertCircle, CheckCircle, Shield } from "lucide-react";

export default function ResponsibleGaming() {
  const guidelines = [
    {
      icon: Clock,
      title: "Set Time Limits",
      description: "Decide in advance how much time you want to spend on fantasy cricket and stick to it. Take regular breaks."
    },
    {
      icon: Heart,
      title: "Play for Fun",
      description: "Remember that RNM Fantasy is meant for entertainment. Enjoy the game without letting it affect your daily life."
    },
    {
      icon: Users,
      title: "Maintain Balance",
      description: "Don't let fantasy cricket interfere with your work, studies, relationships, or other important activities."
    },
    {
      icon: Shield,
      title: "Stay in Control",
      description: "If you feel that gaming is becoming a problem, take a step back and seek support if needed."
    },
  ];

  const tips = [
    "Set a daily or weekly time limit for playing fantasy cricket",
    "Take regular breaks during gaming sessions",
    "Don't play when you're stressed, tired, or emotional",
    "Keep fantasy cricket as one of many leisure activities",
    "Talk to friends or family if you feel you're spending too much time gaming",
    "Remember that it's just a game – winning and losing are both part of the experience",
    "Don't let fantasy cricket affect your sleep schedule",
    "Stay hydrated and maintain a healthy lifestyle",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Responsible Gaming
              </h1>
              <p className="text-lg text-muted-foreground">
                Play responsibly and keep fantasy cricket fun
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardContent className="py-8">
                <h2 className="text-2xl font-bold mb-4">Our Commitment to Responsible Gaming</h2>
                <p className="text-muted-foreground mb-4">
                  At RNM Fantasy, we are committed to promoting responsible gaming practices. While our 
                  platform is 100% free to play with no real money involved, we understand that any form 
                  of gaming should be enjoyed in moderation.
                </p>
                <p className="text-muted-foreground mb-4">
                  We want all our users to have a positive experience on our platform. This means playing 
                  in a way that is healthy, balanced, and doesn't negatively impact other areas of your life.
                </p>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-primary font-medium">
                    Remember: RNM Fantasy is completely free to play. There are no entry fees, no real 
                    money prizes, and no financial risk involved.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Guidelines */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Responsible Gaming Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {guidelines.map((guideline, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <guideline.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{guideline.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guideline.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Tips for Healthy Gaming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-16 bg-card/50">
          <div className="container max-w-4xl">
            <Card className="border-yellow-500/30">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                  </div>
                  <CardTitle>Warning Signs to Watch For</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  While RNM Fantasy is free to play, it's important to recognize if gaming is becoming 
                  problematic. Watch for these signs:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Spending more time on fantasy cricket than intended</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Neglecting work, studies, or relationships due to gaming</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Feeling restless or irritable when not playing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Using gaming as an escape from problems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Lying to others about how much time you spend gaming</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Self-Exclusion */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Self-Exclusion Option</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you feel that you need a break from fantasy cricket, we offer a self-exclusion option. 
                  You can request to have your account temporarily or permanently deactivated.
                </p>
                <p className="text-muted-foreground mb-4">
                  To request self-exclusion, please contact our support team at support@rnmfantasy.com 
                  with your request. We will process your request within 24 hours.
                </p>
                <p className="text-muted-foreground">
                  During the self-exclusion period, you will not be able to access your account or 
                  participate in any contests.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="py-8">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Need Support?</h2>
                <p className="text-muted-foreground mb-6">
                  If you or someone you know is struggling with gaming-related issues, please reach out 
                  for help. Our support team is here to assist you.
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> support@rnmfantasy.com</p>
                  <p className="text-sm">
                    You can also seek help from professional counseling services in your area.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

    </div>
  );
}
