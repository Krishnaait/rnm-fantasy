import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar } from "lucide-react";

interface MatchCardProps {
  match: {
    id: string;
    t1: string;
    t2: string;
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm truncate max-w-[120px]">{match.t1}</span>
            {status !== "upcoming" ? (
              <span className="text-primary font-bold">{match.t1s || "-"}</span>
            ) : (
              <span className="text-muted-foreground">vs</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm truncate max-w-[120px]">{match.t2}</span>
            {status !== "upcoming" && (
              <span className="text-primary font-bold">{match.t2s || "-"}</span>
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
