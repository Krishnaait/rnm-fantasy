import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Trophy, ShieldCheck, Info, Zap } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      category: "General",
      icon: <HelpCircle className="w-5 h-5 text-primary" />,
      questions: [
        {
          q: "What is DraftZonePro?",
          a: "DraftZonePro is India's premier free-to-play fantasy cricket platform. It allows cricket fans to use their knowledge and skills to create dream teams and compete in various contests without any real money involved."
        },
        {
          q: "Is it really free to play?",
          a: "Yes, 100%! DraftZonePro is strictly for entertainment purposes. There are no entry fees, no hidden charges, and no real money prizes. It's all about the passion for cricket and bragging rights."
        },
        {
          q: "How do I get started?",
          a: "Simply register for a free account, select an upcoming match, build your dream team of 11 players, and join any of our free contests."
        }
      ]
    },
    {
      category: "Gameplay & Scoring",
      icon: <Trophy className="w-5 h-5 text-primary" />,
      questions: [
        {
          q: "How are points calculated?",
          a: "Points are awarded based on the real-life performance of the players you select in your team. This includes runs scored, wickets taken, catches, stumpings, and more. Check our 'How to Play' page for a detailed scoring breakdown."
        },
        {
          q: "What is the role of Captain and Vice-Captain?",
          a: "Your Captain earns 2x points and your Vice-Captain earns 1.5x points for their performance. Choosing them wisely is key to winning contests!"
        },
        {
          q: "When are the points updated?",
          a: "Points are updated in real-time during live matches. Our system auto-refreshes every 30 seconds to give you the most accurate standings."
        }
      ]
    },
    {
      category: "Account & Security",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      questions: [
        {
          q: "Can I have multiple accounts?",
          a: "To ensure fair play, we only allow one account per user. Multiple accounts may lead to disqualification from contests."
        },
        {
          q: "What should I do if I forget my password?",
          a: "You can use the 'Forgot Password' link on the login page to reset your password via your registered email address."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-card/30 border-b border-border">
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about DraftZonePro. Can't find what you're 
            looking for? Reach out to our support team.
          </p>
        </div>
      </section>

      <main className="container py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold">{category.category}</h2>
              </div>
              
              <Card className="border-primary/10 bg-card/50 overflow-hidden">
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, fIdx) => (
                      <AccordionItem 
                        key={fIdx} 
                        value={`item-${idx}-${fIdx}`} 
                        className="border-b border-border/50 last:border-0 px-6"
                      >
                        <AccordionTrigger className="hover:text-primary transition-colors text-left py-6 text-lg font-medium">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* CTA Section */}
          <Card className="gradient-primary border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <CardContent className="relative z-10 p-12 text-center space-y-6">
              <Info className="w-16 h-16 text-primary-foreground mx-auto" />
              <h2 className="text-3xl font-bold text-primary-foreground">Still have questions?</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Our support team is here to help you 24/7 with any queries or issues.
              </p>
              <div className="pt-4">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-md text-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-muted h-14 px-10"
                >
                  Contact Support
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
