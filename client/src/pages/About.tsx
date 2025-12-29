import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Shield, Users, Target, MapPin, Mail, Building2 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About RNM Fantasy
              </h1>
              <p className="text-lg text-muted-foreground">
                India's premier free-to-play fantasy cricket platform, 
                bringing the excitement of cricket to your fingertips.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At RNM Fantasy, we believe that everyone should have the opportunity to 
                  experience the thrill of fantasy cricket without any financial barriers. 
                  Our platform is designed to be 100% free to play, ensuring that cricket 
                  enthusiasts from all walks of life can participate and enjoy.
                </p>
                <p className="text-muted-foreground mb-4">
                  We are committed to providing a fair, transparent, and engaging fantasy 
                  cricket experience where skill and cricket knowledge are the only factors 
                  that determine success.
                </p>
                <p className="text-muted-foreground">
                  Our goal is to build a community of passionate cricket fans who compete 
                  for bragging rights and the love of the game, not money.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">100% Free</h3>
                    <p className="text-sm text-muted-foreground">No entry fees or real money involved</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground">Join thousands of cricket fans</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Compete</h3>
                    <p className="text-sm text-muted-foreground">Climb leaderboards and earn glory</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Skill-Based</h3>
                    <p className="text-sm text-muted-foreground">Your cricket knowledge matters</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Company Details Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Company Information</h2>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  RNM PARKING AND SECURITY SOLUTIONS PRIVATE LIMITED
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Brand Name</p>
                    <p className="font-medium">RNM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Domain</p>
                    <p className="font-medium">rnmfantasy.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CIN</p>
                    <p className="font-medium">U93000DL2019PTC357485</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GST</p>
                    <p className="font-medium">07AAJCR9113K1Z1</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">PAN</p>
                    <p className="font-medium">AAJCR9113K</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Registered Address</p>
                      <p className="font-medium">
                        S/O. KALU LAL MEENA JHUGGI.NO.RC-82-A, J.J.BANDU CAMP SEC-B PKT- 5 and 6,
                        VASANT KUNJ, New Delhi, South Delhi, Delhi, 110070
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">support@rnmfantasy.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe in complete transparency in our operations. Our scoring system, 
                    contest rules, and leaderboard calculations are all clearly documented and 
                    accessible to all users.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Fair Play</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every user has an equal opportunity to succeed on our platform. We employ 
                    strict measures to prevent any form of cheating or unfair advantage, ensuring 
                    a level playing field for all.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your privacy is our priority. We collect only the necessary information 
                    required to provide our services and never share your personal data with 
                    third parties without your consent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
