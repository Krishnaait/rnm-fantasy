import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Trophy, Users, Zap, Target, Heart, Globe } from "lucide-react";

export default function About() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="py-16 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              About RNM Fantasy
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            India's Premier Free-to-Play Fantasy Cricket Platform
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-green-400">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              At RNM Fantasy, we believe that fantasy cricket should be accessible to everyone. Our mission is to provide a completely free, fair, and engaging platform where cricket enthusiasts can showcase their knowledge, strategy, and passion for the game. We're dedicated to creating a community where players compete purely for bragging rights, skill-based rankings, and the joy of the game.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We envision a world where fantasy cricket is a beloved pastime for millions of Indians. By eliminating financial barriers and focusing on pure skill and strategy, we're building a platform that celebrates cricket knowledge and competitive spirit. Our vision extends to creating a global community of fantasy cricket enthusiasts who share their passion for the sport.
            </p>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-20 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Company Information
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 p-8">
              <h3 className="text-xl font-bold text-green-400 mb-4">Legal Details</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <span className="text-green-400 font-semibold">Company Name:</span>
                  <p>RNM Parking and Security Solutions Private Limited</p>
                </div>
                <div>
                  <span className="text-green-400 font-semibold">CIN:</span>
                  <p>U93000DL2019PTC357485</p>
                </div>
                <div>
                  <span className="text-green-400 font-semibold">GST Number:</span>
                  <p>07AAJCR9113K1Z1</p>
                </div>
                <div>
                  <span className="text-green-400 font-semibold">PAN:</span>
                  <p>AAJCR9113K</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-cyan-500/30 p-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Registered Address</h3>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  S/O. Kalu Lal Meena<br />
                  Jhuggi No. RC-82-A<br />
                  J.J. Bandu Camp Sec-B<br />
                  Pkt- 5 and 6<br />
                  Vasant Kunj<br />
                  New Delhi, South Delhi<br />
                  Delhi, 110070<br />
                  India
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Our Core Values
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Value 1 */}
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Fair Play</h3>
                  <p className="text-gray-300">We maintain the highest standards of fairness and integrity. Every player has equal opportunities, and all contests are transparent and auditable.</p>
                </div>
              </div>
            </Card>

            {/* Value 2 */}
            <Card className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-cyan-500/30 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">Passion for Cricket</h3>
                  <p className="text-gray-300">We're cricket enthusiasts ourselves. Our platform is built by fans, for fans, with a deep understanding of what makes fantasy cricket exciting.</p>
                </div>
              </div>
            </Card>

            {/* Value 3 */}
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Community First</h3>
                  <p className="text-gray-300">We prioritize our community's needs and feedback. Your suggestions shape our platform's evolution and features.</p>
                </div>
              </div>
            </Card>

            {/* Value 4 */}
            <Card className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-cyan-500/30 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">Innovation</h3>
                  <p className="text-gray-300">We continuously innovate to bring new features, better scoring algorithms, and enhanced user experiences to our platform.</p>
                </div>
              </div>
            </Card>

            {/* Value 5 */}
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Accessibility</h3>
                  <p className="text-gray-300">We believe fantasy cricket should be free and accessible to everyone. No hidden charges, no premium features – just pure cricket fun.</p>
                </div>
              </div>
            </Card>

            {/* Value 6 */}
            <Card className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-cyan-500/30 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">Transparency</h3>
                  <p className="text-gray-300">All scoring algorithms, contest rules, and leaderboard calculations are transparent and clearly documented for player trust.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Why Choose RNM Fantasy?
            </span>
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-3">100% Free to Play</h3>
              <p className="text-gray-300 text-lg">No entry fees, no registration charges, no hidden costs. Play as many contests as you want without spending a single rupee. Fantasy cricket should be fun, not expensive.</p>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">Advanced Scoring Algorithm</h3>
              <p className="text-gray-300 text-lg">Our sophisticated scoring system rewards both strategy and player performance. Captain gets 2x points, Vice-Captain gets 1.5x points, ensuring strategic team selection matters.</p>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-3">Real-Time Live Scores</h3>
              <p className="text-gray-300 text-lg">Watch your fantasy team's performance with live match updates. Our auto-refresh feature ensures you never miss any action, with updates every 30 seconds.</p>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">Global Community</h3>
              <p className="text-gray-300 text-lg">Compete with thousands of cricket fans across India. Our global leaderboards and rankings celebrate the best fantasy cricket strategists in the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 border border-green-500/30 rounded-2xl p-12 bg-gradient-to-br from-green-500/5 to-cyan-500/5">
          <h2 className="text-4xl font-bold">Join the RNM Fantasy Community</h2>
          <p className="text-xl text-gray-300">
            Be part of India's fastest-growing free fantasy cricket platform. Start playing today and compete with cricket fans worldwide.
          </p>
          <Button 
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-green-500/50"
          >
            Start Playing Free
          </Button>
        </div>
      </section>
    </div>
  );
}
