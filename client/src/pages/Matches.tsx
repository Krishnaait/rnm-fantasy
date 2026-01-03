import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Zap, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MatchCard } from "@/components/MatchCard";

export default function Matches() {
  const { data: matchData, isLoading, error } = trpc.matches.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Matches</h1>
          <p className="text-muted-foreground mt-1">
            Browse live, upcoming, and completed cricket matches
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-48 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border-destructive">
            <CardContent className="py-8 text-center">
              <p className="text-destructive">Failed to load matches. Please try again later.</p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="live" className="gap-2">
                <Zap className="w-4 h-4" />
                Live ({matchData?.live.length || 0})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="w-4 h-4" />
                Upcoming ({matchData?.upcoming.length || 0})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed ({matchData?.completed.length || 0})
              </TabsTrigger>
            </TabsList>

            {/* Live Matches */}
            <TabsContent value="live" className="space-y-4">
              {matchData?.live.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No live matches at the moment</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchData?.live.map((match) => (
                    <MatchCard key={match.id} match={match} status="live" />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Upcoming Matches */}
            <TabsContent value="upcoming" className="space-y-4">
              {matchData?.upcoming.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming matches scheduled</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchData?.upcoming.map((match) => (
                    <MatchCard key={match.id} match={match} status="upcoming" />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Completed Matches */}
            <TabsContent value="completed" className="space-y-4">
              {matchData?.completed.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No completed matches to show</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchData?.completed.slice(0, 12).map((match) => (
                    <MatchCard key={match.id} match={match} status="completed" />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>

    </div>
  );
}


