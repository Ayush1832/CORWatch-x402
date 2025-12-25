import { LucideIcon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  locked?: boolean;
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, locked }: StatCardProps) {
  return (
    <div className={cn(
      "stat-card group",
      locked && "relative overflow-hidden"
    )}>
      {locked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Premium</span>
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-mono font-bold text-foreground">{value}</p>
          {change && (
            <Badge
              variant={changeType === "positive" ? "success" : changeType === "negative" ? "destructive" : "secondary"}
              className="text-xs"
            >
              {change}
            </Badge>
          )}
        </div>
        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
