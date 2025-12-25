import { Badge } from "@/components/ui/badge";
import { Lock, Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Validator {
  rank: number;
  address: string;
  score: number;
  sessions: number;
  uptime: number;
}

interface ValidatorLeaderboardProps {
  validators: Validator[];
  locked?: boolean;
}

export function ValidatorLeaderboard({ validators, locked }: ValidatorLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Award className="h-4 w-4 text-amber-600" />;
      default:
        return <span className="text-muted-foreground font-mono text-sm">#{rank}</span>;
    }
  };

  return (
    <div className={cn(
      "bg-card border border-border rounded-lg p-6",
      locked && "relative overflow-hidden"
    )}>
      {locked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3">
          <Lock className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            Premium feature<br />
            <span className="text-primary">0.001 ETH per query</span>
          </p>
        </div>
      )}

      <h3 className="font-semibold text-foreground mb-4">Validator Leaderboard</h3>
      
      <div className="space-y-3">
        {validators.map((validator) => (
          <div 
            key={validator.address}
            className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="w-8 flex justify-center">
              {getRankIcon(validator.rank)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm text-foreground truncate">
                {validator.address}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {validator.sessions.toLocaleString()} sessions
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {validator.uptime}% uptime
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-mono text-lg font-bold text-primary">
                {validator.score.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
