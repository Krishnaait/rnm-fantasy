import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Terms & Conditions
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: December 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardContent className="py-8 prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-6">
                  By accessing and using RNM Fantasy ("the Platform"), you accept and agree to be bound by 
                  these Terms and Conditions. If you do not agree to these terms, please do not use the Platform.
                </p>

                <h2 className="text-2xl font-bold mb-4">2. Platform Description</h2>
                <p className="text-muted-foreground mb-6">
                  RNM Fantasy is a free-to-play fantasy cricket platform operated by RNM PARKING AND SECURITY 
                  SOLUTIONS PRIVATE LIMITED. The Platform allows users to create virtual cricket teams, 
                  participate in contests, and compete for rankings based on real cricket match performances.
                </p>

                <h2 className="text-2xl font-bold mb-4">3. Free-to-Play Nature</h2>
                <p className="text-muted-foreground mb-4">
                  RNM Fantasy is entirely free to play. Users acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>There are no entry fees for any contests</li>
                  <li>There are no real money prizes or rewards</li>
                  <li>No financial transactions are required to use the Platform</li>
                  <li>The Platform is for entertainment purposes only</li>
                  <li>Rankings and points have no monetary value</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">4. Eligibility</h2>
                <p className="text-muted-foreground mb-4">
                  To use RNM Fantasy, you must:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Be at least 18 years of age</li>
                  <li>Be a resident of India</li>
                  <li>Have the legal capacity to enter into these Terms</li>
                  <li>Not be prohibited from using the Platform under applicable laws</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">5. User Account</h2>
                <p className="text-muted-foreground mb-4">
                  When creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Not share your account with others</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">6. Prohibited Activities</h2>
                <p className="text-muted-foreground mb-4">
                  Users are prohibited from:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Creating multiple accounts</li>
                  <li>Using automated systems or bots</li>
                  <li>Manipulating or attempting to manipulate contest results</li>
                  <li>Engaging in collusion with other users</li>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Interfering with the Platform's operation</li>
                  <li>Harassing or abusing other users</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground mb-6">
                  All content on the Platform, including but not limited to text, graphics, logos, and software, 
                  is the property of RNM PARKING AND SECURITY SOLUTIONS PRIVATE LIMITED and is protected by 
                  intellectual property laws. Users may not copy, modify, or distribute any content without 
                  prior written permission.
                </p>

                <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground mb-6">
                  The Platform is provided "as is" without warranties of any kind. We do not guarantee that 
                  the Platform will be uninterrupted, error-free, or secure. Cricket match data is provided 
                  by third-party sources and may not always be accurate or up-to-date.
                </p>

                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-6">
                  To the maximum extent permitted by law, RNM PARKING AND SECURITY SOLUTIONS PRIVATE LIMITED 
                  shall not be liable for any indirect, incidental, special, or consequential damages arising 
                  from your use of the Platform.
                </p>

                <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
                <p className="text-muted-foreground mb-6">
                  We reserve the right to suspend or terminate your account at any time for violation of these 
                  Terms or for any other reason at our sole discretion. Upon termination, your right to use 
                  the Platform will immediately cease.
                </p>

                <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="text-muted-foreground mb-6">
                  We may modify these Terms at any time. Continued use of the Platform after changes constitutes 
                  acceptance of the modified Terms. We encourage you to review these Terms periodically.
                </p>

                <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground mb-6">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any 
                  disputes arising from these Terms shall be subject to the exclusive jurisdiction of the 
                  courts in New Delhi, India.
                </p>

                <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  For any questions regarding these Terms, please contact us at:
                </p>
                <p className="text-muted-foreground">
                  <strong>RNM PARKING AND SECURITY SOLUTIONS PRIVATE LIMITED</strong><br />
                  Email: support@rnmfantasy.com<br />
                  Address: S/O. KALU LAL MEENA JHUGGI.NO.RC-82-A, J.J.BANDU CAMP SEC-B PKT- 5 and 6,
                  VASANT KUNJ, New Delhi, South Delhi, Delhi, 110070
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

    </div>
  );
}
