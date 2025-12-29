import { Link } from "wouter";
import { Trophy, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/matches", label: "Matches" },
    { href: "/contests", label: "Contests" },
    { href: "/live-scores", label: "Live Scores" },
    { href: "/how-to-play", label: "How to Play" },
  ];

  const legalLinks = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/fair-play", label: "Fair Play" },
    { href: "/responsible-gaming", label: "Responsible Gaming" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/rnm-logo.png" alt="RNM Fantasy" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              India's premier free-to-play fantasy cricket platform. 
              Create teams, join contests, and compete for bragging rights!
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Vasant Kunj, New Delhi, Delhi 110070</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>support@rnmfantasy.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-border mt-8 pt-8 mb-6">
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Legal Disclaimer:</strong> RNM Fantasy is a free-to-play fantasy sports platform. This platform is for entertainment purposes only and does not involve real money, gambling, or any form of wagering. Users participate in fantasy cricket contests based on skill and knowledge of the sport. All contests are completely free to join with no entry fees or monetary prizes. By using this platform, you agree to our Terms of Service, Privacy Policy, and Fair Play Policy. Please read our Responsible Gaming guidelines for more information.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>© {currentYear} RNM PARKING AND SECURITY SOLUTIONS PRIVATE LIMITED</p>
              <p className="text-xs mt-1">CIN: U93000DL2019PTC357485 | GST: 07AAJCR9113K1Z1</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">
                100% Free to Play • No Real Money Involved
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
