import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Ban, Eye, Scale } from "lucide-react";

export default function FairPlay() {
  const principles = [
    {
      icon: Shield,
      title: "Equal Opportunity",
      description: "Every user has the same chance to succeed. No user receives preferential treatment or unfair advantages."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Our scoring system, contest rules, and ranking algorithms are clearly documented and consistently applied."
    },
    {
      icon: Scale,
      title: "Skill-Based Competition",
      description: "Success on RNM Fantasy is determined by cricket knowledge and strategic thinking, not luck or manipulation."
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We maintain the highest standards of integrity in all our operations and user interactions."
    },
  ];

  const prohibitedActivities = [
    "Creating multiple accounts to gain unfair advantages",
    "Using automated bots or scripts to play",
    "Colluding with other users to manipulate results",
    "Sharing account credentials with others",
    "Exploiting bugs or glitches in the platform",
    "Attempting to manipulate leaderboard rankings",
    "Harassing or intimidating other users",
    "Spreading false information about the platform",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Fair Play Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Our commitment to maintaining a fair and enjoyable gaming environment
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardContent className="py-8">
                <h2 className="text-2xl font-bold mb-4">Our Commitment to Fair Play</h2>
                <p className="text-muted-foreground mb-4">
                  At RNM Fantasy, we believe that fair play is the foundation of an enjoyable gaming experience. 
                  We are committed to providing a platform where every user can compete on equal footing, 
                  and where skill and knowledge are the only factors that determine success.
                </p>
                <p className="text-muted-foreground">
                  This Fair Play Policy outlines our principles, prohibited activities, and the measures we 
                  take to ensure a level playing field for all users.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Fair Play Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {principles.map((principle, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <principle.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{principle.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Prohibited Activities */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <Card className="border-destructive/30">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Ban className="w-6 h-6 text-destructive" />
                  </div>
                  <CardTitle>Prohibited Activities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  The following activities are strictly prohibited on RNM Fantasy. Violation of these rules 
                  may result in immediate account suspension or permanent ban:
                </p>
                <ul className="space-y-3">
                  {prohibitedActivities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Anti-Fraud Measures */}
        <section className="py-16 bg-card/50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Anti-Fraud Measures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We employ robust verification processes to ensure each user has only one account. 
                    Multiple accounts from the same user are detected and removed.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Activity Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our systems continuously monitor user activity for suspicious patterns that may 
                    indicate cheating, collusion, or automated play.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pattern Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advanced algorithms analyze gameplay patterns to identify and flag potential 
                    violations of fair play rules.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We encourage users to report any suspicious activity. All reports are thoroughly 
                    investigated by our team.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Consequences */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Consequences of Violations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Users found violating our Fair Play Policy may face the following consequences:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span><strong>Warning:</strong> First-time minor violations may result in a warning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span><strong>Temporary Suspension:</strong> Repeated or moderate violations may lead to temporary account suspension</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span><strong>Permanent Ban:</strong> Serious violations or repeated offenses will result in permanent account termination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span><strong>Leaderboard Removal:</strong> Violators may have their scores and rankings removed from leaderboards</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="py-8">
                <h2 className="text-2xl font-bold mb-4">Report a Violation</h2>
                <p className="text-muted-foreground mb-6">
                  If you suspect any user is violating our Fair Play Policy, please report it to us. 
                  All reports are treated confidentially.
                </p>
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Contact Us
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
