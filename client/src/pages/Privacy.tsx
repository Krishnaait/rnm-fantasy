import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
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
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-6">
                  RNM PARKING AND SECURITY SOLUTIONS PRIVATE LIMITED ("we", "us", or "our") operates 
                  RNM Fantasy (the "Platform"). This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you use our Platform.
                </p>

                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We may collect the following types of information:
                </p>
                <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Username</li>
                  <li>Profile information</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2">Usage Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address</li>
                  <li>Pages visited and features used</li>
                  <li>Time and date of visits</li>
                  <li>Game activity and preferences</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li>To provide and maintain the Platform</li>
                  <li>To create and manage your account</li>
                  <li>To enable participation in contests and leaderboards</li>
                  <li>To communicate with you about updates and features</li>
                  <li>To improve our services and user experience</li>
                  <li>To detect and prevent fraud or abuse</li>
                  <li>To comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li><strong>Public Leaderboards:</strong> Your username and scores may be displayed on public leaderboards</li>
                  <li><strong>Service Providers:</strong> With third-party vendors who assist in operating our Platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground mb-6">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information. However, no method of transmission over the Internet is 100% secure, 
                  and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground mb-6">
                  We retain your personal information for as long as your account is active or as needed to 
                  provide services. We may retain certain information as required by law or for legitimate 
                  business purposes.
                </p>

                <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking</h2>
                <p className="text-muted-foreground mb-6">
                  We use cookies and similar tracking technologies to enhance your experience on our Platform. 
                  Cookies help us remember your preferences, analyze usage patterns, and improve our services. 
                  You can control cookie settings through your browser.
                </p>

                <h2 className="text-2xl font-bold mb-4">9. Third-Party Links</h2>
                <p className="text-muted-foreground mb-6">
                  Our Platform may contain links to third-party websites. We are not responsible for the 
                  privacy practices of these external sites. We encourage you to review their privacy policies.
                </p>

                <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground mb-6">
                  Our Platform is not intended for users under 18 years of age. We do not knowingly collect 
                  personal information from children. If we become aware that we have collected information 
                  from a child, we will take steps to delete it.
                </p>

                <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
                <p className="text-muted-foreground mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy, please contact us at:
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
