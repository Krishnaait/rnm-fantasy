import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is RNM Fantasy?",
          a: "RNM Fantasy is a free-to-play fantasy cricket platform where you can create virtual teams, join contests, and compete against other cricket enthusiasts. There are no entry fees or real money prizes – it's purely for fun and bragging rights!"
        },
        {
          q: "Is RNM Fantasy free to play?",
          a: "Yes, RNM Fantasy is 100% free to play. There are no entry fees, no in-app purchases, and no real money involved. All contests are free to join."
        },
        {
          q: "Do I need to pay to create a team?",
          a: "No, creating teams is completely free. You can create as many teams as you want for any match without any cost."
        },
        {
          q: "Are there any real money prizes?",
          a: "No, RNM Fantasy does not offer any real money prizes. This is a skill-based game for entertainment purposes only. You compete for rankings and bragging rights."
        },
      ]
    },
    {
      category: "Team Creation",
      questions: [
        {
          q: "How many players can I select in my team?",
          a: "You must select exactly 11 players for your fantasy team, just like a real cricket team."
        },
        {
          q: "What is the role of Captain and Vice-Captain?",
          a: "The Captain earns 2x (double) the points scored by that player, while the Vice-Captain earns 1.5x the points. Choose wisely as these selections can significantly impact your total score."
        },
        {
          q: "Can I edit my team after creating it?",
          a: "You can create multiple teams for the same match. However, once a match has started, you cannot edit or create new teams for that match."
        },
        {
          q: "How many teams can I create for a single match?",
          a: "You can create multiple teams for the same match. This allows you to try different strategies and player combinations."
        },
      ]
    },
    {
      category: "Contests",
      questions: [
        {
          q: "How do I join a contest?",
          a: "To join a contest, first create a team for the match. Then go to the contest page and select the team you want to use. Click 'Join Contest' and you're in!"
        },
        {
          q: "Can I join multiple contests with the same team?",
          a: "Yes, you can use the same team to join multiple contests for the same match."
        },
        {
          q: "What happens if a contest doesn't fill up?",
          a: "Contests will proceed regardless of how many participants join. There's no minimum requirement for a contest to start."
        },
        {
          q: "How are winners determined?",
          a: "Winners are determined based on the total points scored by their fantasy team. The player with the highest points ranks first on the leaderboard."
        },
      ]
    },
    {
      category: "Points & Scoring",
      questions: [
        {
          q: "How are points calculated?",
          a: "Points are calculated based on real player performance during the match. Actions like runs scored, wickets taken, catches, and more contribute to points. Visit our 'How to Play' page for the complete points system."
        },
        {
          q: "When are points updated?",
          a: "Points are updated in real-time as the match progresses. You can track your team's performance on the live scores page."
        },
        {
          q: "What happens if a player doesn't play?",
          a: "If a player in your team doesn't play in the match, they will score 0 points. This is why it's important to check team news before the match."
        },
        {
          q: "How does the Captain multiplier work?",
          a: "All points earned by your Captain are multiplied by 2. For example, if your Captain scores 50 points, they will contribute 100 points to your team total."
        },
      ]
    },
    {
      category: "Account & Technical",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on 'Sign In' and follow the authentication process. You can sign in using your existing credentials through our secure login system."
        },
        {
          q: "Is my personal information safe?",
          a: "Yes, we take data privacy seriously. We only collect necessary information and never share your personal data with third parties. Read our Privacy Policy for more details."
        },
        {
          q: "What browsers are supported?",
          a: "RNM Fantasy works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
        },
        {
          q: "Can I use RNM Fantasy on mobile?",
          a: "Yes, our website is fully responsive and works great on mobile devices. You can access all features from your smartphone or tablet browser."
        },
      ]
    },
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
                <HelpCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about RNM Fantasy
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                <Card>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="py-8">
                <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-muted-foreground mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Contact Support
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
