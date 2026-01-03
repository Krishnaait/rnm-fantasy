import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar } from "lucide-react";

interface MatchCardProps {
  match: {
    id: string;
    t1: string;
    t2: string;
    t1img?: string;
    t2img?: string;
    t1s?: string;
    t2s?: string;
    series: string;
    matchType: string;
    dateTimeGMT: string;
  };
  status: "live" | "upcoming" | "completed";
}

export function MatchCard({ match, status }: MatchCardProps) {
  const statusBadge = {
    live: "badge-live",
    upcoming: "badge-upcoming",
    completed: "badge-completed",
  };

  const statusLabel = {
    live: "LIVE",
    upcoming: "UPCOMING",
    completed: "COMPLETED",
  };

  return (
    <Card className={`card-hover ${status === "live" ? "border-red-500/30" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className={statusBadge[status]}>
            {status === "live" && (
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live mr-1 inline-block" />
            )}
            {statusLabel[status]}
          </span>
          <span className="text-xs text-muted-foreground uppercase">{match.matchType}</span>
        </div>
        <CardTitle className="text-base mt-2 line-clamp-1">{match.series}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {match.t1img ? (
                <img src={match.t1img} alt={match.t1} className="w-8 h-8 object-contain rounded-full bg-muted p-1" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {match.t1.substring(0, 2).toUpperCase()}
                </div>
              )}
              <span className="font-semibold text-sm truncate max-w-[100px]">{match.t1}</span>
            </div>
            {status !== "upcoming" ? (
              <span className="text-primary font-bold text-lg">{match.t1s || "0/0"}</span>
            ) : (
              <span className="text-muted-foreground font-medium">vs</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {match.t2img ? (
                <img src={match.t2img} alt={match.t2} className="w-8 h-8 object-contain rounded-full bg-muted p-1" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {match.t2.substring(0, 2).toUpperCase()}
                </div>
              )}
              <span className="font-semibold text-sm truncate max-w-[100px]">{match.t2}</span>
            </div>
            {status !== "upcoming" && (
              <span className="text-primary font-bold text-lg">{match.t2s || "0/0"}</span>
            )}
          </div>
          
          {status === "upcoming" && (
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {match.dateTimeGMT && !isNaN(new Date(match.dateTimeGMT).getTime())
                ? new Date(match.dateTimeGMT).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Date TBA"}
            </div>
          )}
        </div>
        
        <Button asChild className="w-full mt-4" variant={status === "live" ? "default" : "secondary"}>
          <Link href={`/matches/${match.id}`}>
            {status === "upcoming" ? "Create Team" : "View Details"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
