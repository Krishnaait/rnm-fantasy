import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Users, Crown, Star, Trash2, Loader2, Calendar } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function MyTeams() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  
  const { data: myTeams, isLoading } = trpc.teams.myTeams.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<number | null>(null);

  const { data: teamDetails } = trpc.teams.getDetails.useQuery(
    { teamId: expandedTeam || 0 },
    { enabled: !!expandedTeam }
  );

  const deleteTeamMutation = trpc.teams.delete.useMutation({
    onSuccess: () => {
      toast.success("Team deleted successfully");
      utils.teams.myTeams.invalidate();
      setTeamToDelete(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete team");
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Teams</h1>
          <p className="text-muted-foreground mt-1">
            Manage your fantasy cricket teams
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="py-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-5 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : myTeams && myTeams.length > 0 ? (
          <div className="space-y-4">
            {myTeams.map((team) => (
              <Card key={team.id} className="card-hover">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{team.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Created {new Date(team.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                      >
                        {expandedTeam === team.id ? "Hide Players" : "View Players"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setTeamToDelete(team.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Team Details */}
                  {expandedTeam === team.id && teamDetails && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {teamDetails.players.map((player) => {
                          const isCaptain = player.playerId === team.captainId;
                          const isViceCaptain = player.playerId === team.viceCaptainId;
                          
                          return (
                            <div
                              key={player.id}
                              className={`p-3 rounded-lg ${
                                isCaptain 
                                  ? "bg-secondary/20 border border-secondary" 
                                  : isViceCaptain
                                  ? "bg-accent/20 border border-accent"
                                  : "bg-muted/50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm">{player.playerName}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {player.teamName} • {player.playerRole || "Player"}
                                  </p>
                                </div>
                                {isCaptain && (
                                  <div className="flex items-center gap-1 px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs font-bold">
                                    <Crown className="w-3 h-3" />
                                    C
                                  </div>
                                )}
                                {isViceCaptain && (
                                  <div className="flex items-center gap-1 px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                                    <Star className="w-3 h-3" />
                                    VC
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Teams Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't created any fantasy teams yet. Browse matches and create your first team!
              </p>
              <Button asChild>
                <Link href="/matches">Browse Matches</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!teamToDelete} onOpenChange={() => setTeamToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this team? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => teamToDelete && deleteTeamMutation.mutate({ teamId: teamToDelete })}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteTeamMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
