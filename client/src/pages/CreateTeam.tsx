import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, Users, Check, Crown, Star, Loader2, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getLoginUrl } from "@/const";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface SelectedPlayer {
  playerId: string;
  playerName: string;
  playerRole?: string;
  teamName?: string;
}

export default function CreateTeam() {
  const { matchId } = useParams<{ matchId: string }>();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  const { data: match, isLoading: matchLoading } = trpc.matches.getById.useQuery({ matchId: matchId || "" });
  const { data: squad, isLoading: squadLoading } = trpc.matches.getSquad.useQuery({ matchId: matchId || "" });
  
  const createTeamMutation = trpc.teams.create.useMutation({
    onSuccess: () => {
      toast.success("Team created successfully!");
      setLocation(`/matches/${matchId}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create team");
    },
  });

  const [teamName, setTeamName] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [captainId, setCaptainId] = useState<string | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "captain">("select");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  const isLoading = matchLoading || squadLoading || authLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 container py-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 container py-8">
          <Card className="border-destructive">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Match Not Found</h2>
              <p className="text-muted-foreground mb-4">Unable to create team for this match.</p>
              <Button asChild>
                <Link href="/matches">Back to Matches</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const togglePlayer = (player: SelectedPlayer) => {
    const isSelected = selectedPlayers.some(p => p.playerId === player.playerId);
    
    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter(p => p.playerId !== player.playerId));
      if (captainId === player.playerId) setCaptainId(null);
      if (viceCaptainId === player.playerId) setViceCaptainId(null);
    } else if (selectedPlayers.length < 11) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      toast.error("You can only select 11 players");
    }
  };

  const isPlayerSelected = (playerId: string) => selectedPlayers.some(p => p.playerId === playerId);

  const handleContinue = () => {
    if (selectedPlayers.length !== 11) {
      toast.error("Please select exactly 11 players");
      return;
    }
    setStep("captain");
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }
    if (!captainId) {
      toast.error("Please select a captain");
      return;
    }
    if (!viceCaptainId) {
      toast.error("Please select a vice-captain");
      return;
    }

    createTeamMutation.mutate({
      matchId: matchId || "",
      name: teamName,
      captainId,
      viceCaptainId,
      players: selectedPlayers,
      totalCreditsUsed: (selectedPlayers.length * 8.5).toString(), // Placeholder for now
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1 container py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/matches/${matchId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Match
          </Link>
        </Button>

        {/* Match Info */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{match.series}</p>
                <p className="font-semibold">{match.t1} vs {match.t2}</p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg">{selectedPlayers.length}/11</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {step === "select" ? (
          <>
            {/* Player Selection */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Select Your Players</h2>
              <p className="text-muted-foreground">Choose 11 players for your team</p>
            </div>

            {squad && squad.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {squad.map((team, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{team.teamName}</CardTitle>
                      <CardDescription>
                        {team.players.filter(p => isPlayerSelected(p.id)).length} selected
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {team.players.map((player) => {
                          const selected = isPlayerSelected(player.id);
                          return (
                            <button
                              key={player.id}
                              onClick={() => togglePlayer({
                                playerId: player.id,
                                playerName: player.name,
                                playerRole: player.role,
                                teamName: team.teamName,
                              })}
                              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                                selected 
                                  ? "bg-primary/20 border border-primary" 
                                  : "bg-muted/50 hover:bg-muted border border-transparent"
                              }`}
                            >
                              <div className="text-left">
                                <div className="font-medium">{player.name}</div>
                                <div className="text-xs text-muted-foreground">{player.role || "Player"}</div>
                              </div>
                              {selected && <Check className="w-5 h-5 text-primary" />}
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="mb-6">
                <CardContent className="py-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Squad information not available for this match</p>
                </CardContent>
              </Card>
            )}

            {/* Selected Players Summary */}
            {selectedPlayers.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Selected Players ({selectedPlayers.length}/11)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlayers.map((player) => (
                      <div 
                        key={player.playerId}
                        className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm"
                      >
                        <span>{player.playerName}</span>
                        <button 
                          onClick={() => togglePlayer(player)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              onClick={handleContinue}
              disabled={selectedPlayers.length !== 11}
              className="w-full md:w-auto"
              size="lg"
            >
              Continue to Captain Selection
            </Button>
          </>
        ) : (
          <>
            {/* Captain Selection */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Select Captain & Vice-Captain</h2>
              <p className="text-muted-foreground">
                Captain gets 2x points, Vice-Captain gets 1.5x points
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Team Name</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="teamName">Enter your team name</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="My Dream Team"
                    maxLength={50}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Choose Captain & Vice-Captain</CardTitle>
                <CardDescription>
                  Tap once for Captain (C), tap again for Vice-Captain (VC)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedPlayers.map((player) => {
                    const isCaptain = captainId === player.playerId;
                    const isViceCaptain = viceCaptainId === player.playerId;
                    
                    return (
                      <button
                        key={player.playerId}
                        onClick={() => {
                          if (isCaptain) {
                            setCaptainId(null);
                          } else if (isViceCaptain) {
                            setViceCaptainId(null);
                          } else if (!captainId) {
                            setCaptainId(player.playerId);
                          } else if (!viceCaptainId) {
                            setViceCaptainId(player.playerId);
                          } else {
                            toast.error("Captain and Vice-Captain already selected");
                          }
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                          isCaptain 
                            ? "bg-secondary/20 border-2 border-secondary" 
                            : isViceCaptain
                            ? "bg-accent/20 border-2 border-accent"
                            : "bg-muted/50 hover:bg-muted border border-transparent"
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium">{player.playerName}</div>
                          <div className="text-xs text-muted-foreground">
                            {player.teamName} • {player.playerRole || "Player"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isCaptain && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-bold">
                              <Crown className="w-3 h-3" />
                              2x
                            </div>
                          )}
                          {isViceCaptain && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                              <Star className="w-3 h-3" />
                              1.5x
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={() => setStep("select")}
              >
                Back to Selection
              </Button>
              <Button 
                onClick={handleCreateTeam}
                disabled={!teamName.trim() || !captainId || !viceCaptainId || createTeamMutation.isPending}
                className="flex-1 md:flex-none"
                size="lg"
              >
                {createTeamMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Team"
                )}
              </Button>
            </div>
          </>
        )}
      </main>

    </div>
  );
}
