import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, Trophy, Users, Loader2, AlertCircle, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContestDetail() {
  const { id } = useParams<{ id: string }>();
  const contestId = parseInt(id || "0");
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  
  const { data: contest, isLoading: contestLoading } = trpc.contests.getById.useQuery({ contestId });
  const { data: myTeams } = trpc.teams.myTeamsByMatch.useQuery(
    { matchId: contest?.matchId || "" },
    { enabled: isAuthenticated && !!contest?.matchId }
  );
  const { data: hasJoined } = trpc.contests.hasJoined.useQuery(
    { contestId },
    { enabled: isAuthenticated && contestId > 0 }
  );
  const { data: leaderboard } = trpc.contests.leaderboard.useQuery({ contestId });

  const [selectedTeamId, setSelectedTeamId] = useState<string>("");

  const joinContestMutation = trpc.contests.join.useMutation({
    onSuccess: () => {
      toast.success("Successfully joined the contest!");
      utils.contests.hasJoined.invalidate({ contestId });
      utils.contests.leaderboard.invalidate({ contestId });
      utils.contests.getById.invalidate({ contestId });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to join contest");
    },
  });

  if (contestLoading) {
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

  if (!contest) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <Card className="border-destructive">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Contest Not Found</h2>
              <p className="text-muted-foreground mb-4">The contest you're looking for doesn't exist.</p>
              <Button asChild>
                <Link href="/contests">Back to Contests</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleJoinContest = () => {
    if (!selectedTeamId) {
      toast.error("Please select a team");
      return;
    }
    joinContestMutation.mutate({
      contestId,
      teamId: parseInt(selectedTeamId),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/contests">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contests
          </Link>
        </Button>

        {/* Contest Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    contest.status === "live" 
                      ? "bg-red-500/20 text-red-400" 
                      : contest.status === "upcoming"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {contest.status.toUpperCase()}
                  </span>
                </div>
                <CardTitle className="text-2xl">{contest.name}</CardTitle>
                {contest.description && (
                  <CardDescription className="mt-2">{contest.description}</CardDescription>
                )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">FREE</div>
                <div className="text-sm text-muted-foreground">Entry</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8 py-4 border-t border-border">
              <div>
                <div className="text-2xl font-bold">{contest.currentEntries}</div>
                <div className="text-sm text-muted-foreground">Joined</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{contest.maxEntries}</div>
                <div className="text-sm text-muted-foreground">Max Entries</div>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(contest.currentEntries / contest.maxEntries) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {contest.maxEntries - contest.currentEntries} spots left
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Join Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Join Contest</CardTitle>
              </CardHeader>
              <CardContent>
                {!isAuthenticated ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">Sign in to join this contest</p>
                    <Button asChild className="w-full">
                      <a href={getLoginUrl()}>Sign In</a>
                    </Button>
                  </div>
                ) : hasJoined ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-medium text-primary">You've joined this contest!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Check the leaderboard to see your ranking
                    </p>
                  </div>
                ) : contest.status === "completed" ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">This contest has ended</p>
                  </div>
                ) : myTeams && myTeams.length > 0 ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Team</label>
                      <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a team" />
                        </SelectTrigger>
                        <SelectContent>
                          {myTeams.map((team) => (
                            <SelectItem key={team.id} value={team.id.toString()}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleJoinContest}
                      disabled={!selectedTeamId || joinContestMutation.isPending}
                      className="w-full"
                    >
                      {joinContestMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        "Join Contest (FREE)"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      You need to create a team for this match first
                    </p>
                    <Button asChild className="w-full">
                      <Link href={`/create-team/${contest.matchId}`}>Create Team</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Leaderboard</CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/leaderboard/${contestId}`}>View Full</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {leaderboard && leaderboard.length > 0 ? (
                  <div className="space-y-2">
                    {leaderboard.slice(0, 10).map((entry, index) => (
                      <div 
                        key={entry.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          index < 3 ? "bg-primary/10" : "bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index === 0 ? "bg-yellow-500 text-yellow-950" :
                            index === 1 ? "bg-gray-300 text-gray-800" :
                            index === 2 ? "bg-amber-600 text-amber-950" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{entry.userName || "Anonymous"}</p>
                            <p className="text-xs text-muted-foreground">{entry.teamName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{entry.points || "0"}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No entries yet. Be the first to join!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
