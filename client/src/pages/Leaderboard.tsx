import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { ArrowLeft, Trophy, Medal, Crown, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Leaderboard() {
  const { contestId } = useParams<{ contestId: string }>();
  const id = parseInt(contestId || "0");
  const { user } = useAuth();
  
  const { data: contest, isLoading: contestLoading } = trpc.contests.getById.useQuery({ contestId: id });
  const { data: leaderboard, isLoading: leaderboardLoading } = trpc.contests.leaderboard.useQuery({ contestId: id });

  const isLoading = contestLoading || leaderboardLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/contests/${id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contest
          </Link>
        </Button>

        {/* Contest Info */}
        {contest && (
          <Card className="mb-8">
            <CardContent className="py-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{contest.name}</h1>
                  <p className="text-muted-foreground">
                    {contest.currentEntries} participants
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  <span className="text-lg font-bold text-primary">FREE CONTEST</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top 3 Podium */}
        {leaderboard && leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <Card className="text-center pt-8">
              <CardContent>
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-3">
                  <Medal className="w-8 h-8 text-gray-700" />
                </div>
                <p className="font-bold text-lg">{leaderboard[1]?.userName || "Anonymous"}</p>
                <p className="text-sm text-muted-foreground mb-2">{leaderboard[1]?.teamName}</p>
                <p className="text-2xl font-bold text-primary">{leaderboard[1]?.points || "0"}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className="text-center border-yellow-500/50 bg-yellow-500/5">
              <CardContent className="pt-4">
                <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-10 h-10 text-yellow-950" />
                </div>
                <p className="font-bold text-xl">{leaderboard[0]?.userName || "Anonymous"}</p>
                <p className="text-sm text-muted-foreground mb-2">{leaderboard[0]?.teamName}</p>
                <p className="text-3xl font-bold text-primary">{leaderboard[0]?.points || "0"}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className="text-center pt-8">
              <CardContent>
                <div className="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center mx-auto mb-3">
                  <Medal className="w-8 h-8 text-amber-950" />
                </div>
                <p className="font-bold text-lg">{leaderboard[2]?.userName || "Anonymous"}</p>
                <p className="text-sm text-muted-foreground mb-2">{leaderboard[2]?.teamName}</p>
                <p className="text-2xl font-bold text-primary">{leaderboard[2]?.points || "0"}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard && leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                  const isCurrentUser = user && entry.userId === user.id;
                  return (
                    <div 
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        isCurrentUser 
                          ? "bg-primary/20 border border-primary" 
                          : index < 3 
                          ? "bg-primary/10" 
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          index === 0 ? "bg-yellow-500 text-yellow-950" :
                          index === 1 ? "bg-gray-300 text-gray-800" :
                          index === 2 ? "bg-amber-600 text-amber-950" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            {entry.userName || "Anonymous"}
                            {isCurrentUser && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">{entry.teamName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{entry.points || "0"}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Entries Yet</h2>
                <p className="text-muted-foreground mb-6">
                  Be the first to join this contest and claim the top spot!
                </p>
                <Button asChild>
                  <Link href={`/contests/${id}`}>Join Contest</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
