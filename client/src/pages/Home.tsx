import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Users, Trophy, Gamepad2, Target, Shield, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Image */}
      <section className="relative py-20 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/50">
                <span className="text-green-400 text-sm font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  100% Free to Play • No Real Money
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-white">Play Fantasy Cricket</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  Win Bragging Rights
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Create your dream team, join free contests, and compete against cricket fans across India. No money involved – just pure cricket passion and skill-based competition.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Button 
                    onClick={() => navigate("/matches")}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-green-500/50"
                  >
                    Start Playing <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={() => navigate("/dashboard")}
                    variant="outline"
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold text-lg px-8 py-6 rounded-lg"
                  >
                    Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-green-500/50"
                  >
                    Start Playing Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={() => navigate("/login")}
                    variant="outline"
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold text-lg px-8 py-6 rounded-lg"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-green-500/20">
              <div>
                <div className="text-3xl font-bold text-green-400">142+</div>
                <div className="text-sm text-gray-400">Live Matches</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">∞</div>
                <div className="text-sm text-gray-400">Free Contests</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">0₹</div>
                <div className="text-sm text-gray-400">Entry Fee</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 md:h-full rounded-xl overflow-hidden border border-green-500/30 shadow-2xl shadow-green-500/20">
            <img 
              src="/hero-cricket-player.png" 
              alt="Cricket Player in Action" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Why Choose RNM Fantasy?
              </span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to play fantasy cricket like a pro</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 p-6 hover:border-green-500/60 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <div className="mb-4 w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-400">Team Creation</h3>
              <p className="text-gray-300">Select 11 players, choose your captain (2x points) and vice-captain (1.5x points) for maximum strategy.</p>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 p-6 hover:border-green-500/60 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <div className="mb-4 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400">Live Scores</h3>
              <p className="text-gray-300">Real-time match updates and live scoring with auto-refresh every 30 seconds. Never miss a moment.</p>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 p-6 hover:border-green-500/60 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <div className="mb-4 w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-400">Free Contests</h3>
              <p className="text-gray-300">Join unlimited free contests with no entry fees. Compete for bragging rights and global rankings.</p>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/30 p-6 hover:border-green-500/60 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <div className="mb-4 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400">Smart Scoring</h3>
              <p className="text-gray-300">Advanced points calculation based on player performance. Captain gets 2x, Vice-Captain gets 1.5x multiplier.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                How to Play
              </span>
            </h2>
            <p className="text-xl text-gray-300">Get started in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <span className="text-green-400 font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-400">Register</h3>
                <p className="text-gray-300 text-sm">Create your free account with email and password. Takes less than 1 minute.</p>
              </div>
              {/* Connector */}
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <span className="text-cyan-400 font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Select Match</h3>
                <p className="text-gray-300 text-sm">Browse upcoming cricket matches and choose the one you want to play.</p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <span className="text-green-400 font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-400">Build Team</h3>
                <p className="text-gray-300 text-sm">Select 11 players and choose your captain & vice-captain for maximum points.</p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <span className="text-cyan-400 font-bold text-lg">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Compete</h3>
                <p className="text-gray-300 text-sm">Join free contests and compete against other fantasy cricket fans for bragging rights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Images */}
      <section className="py-20 px-4 md:px-8 border-b border-green-500/30">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Team Creation Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="/feature-team-creation.png" 
                alt="Team Creation" 
                className="rounded-xl border border-green-500/30 shadow-2xl shadow-green-500/20"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  Smart Team Creation
                </span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Select your 11 best players from both teams competing in the match. Our intelligent interface shows player stats, recent form, and role information to help you make the best choices. Choose your captain to earn 2x points and vice-captain for 1.5x points.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Real-time player statistics</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Gamepad2 className="w-5 h-5 text-green-400" />
                  <span>Intuitive selection interface</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  <span>Captain & Vice-Captain multipliers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Live Scores Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/feature-live-scores.png" 
                alt="Live Scores" 
                className="rounded-xl border border-green-500/30 shadow-2xl shadow-green-500/20"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  Real-Time Live Scores
                </span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Watch your fantasy team's performance with live match updates. Our platform automatically refreshes every 30 seconds to show you the latest scores, wickets, and player performances. Never miss a crucial moment of the match.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span>Auto-refresh every 30 seconds</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>Live player performance tracking</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Trophy className="w-5 h-5 text-cyan-400" />
                  <span>Real-time points calculation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Leaderboard Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="/feature-leaderboard.png" 
                alt="Leaderboard" 
                className="rounded-xl border border-green-500/30 shadow-2xl shadow-green-500/20"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  Global Leaderboards
                </span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Compete with fantasy cricket fans across India and see where you rank globally. Our leaderboards show top performers in each contest and overall rankings. Climb the ranks and earn bragging rights in the fantasy cricket community.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <span>Contest-specific rankings</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Users className="w-5 h-5 text-green-400" />
                  <span>Global player rankings</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  <span>Achievement badges</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 border border-green-500/30 rounded-2xl p-12 bg-gradient-to-br from-green-500/5 to-cyan-500/5">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Play Fantasy Cricket?
          </h2>
          <p className="text-xl text-gray-300">
            Join thousands of cricket fans playing free fantasy cricket contests. No registration fees, no hidden charges – just pure cricket passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button 
                onClick={() => navigate("/matches")}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-green-500/50"
              >
                Start Playing <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <>
                <Button 
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-green-500/50"
                >
                  Sign Up Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => navigate("/how-to-play")}
                  variant="outline"
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold text-lg px-8 py-6 rounded-lg"
                >
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
