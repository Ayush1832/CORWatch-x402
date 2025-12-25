import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  locked?: boolean;
  className?: string;
  onUnlock?: () => void;
}

export function ChartCard({ title, children, locked, className, onUnlock }: ChartCardProps) {
  return (
    <div className={cn(
      "bg-card border border-border rounded-lg p-6 transition-all duration-200 hover:border-border/80",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {locked && (
          <Button variant="locked" size="sm" onClick={onUnlock}>
            <Lock className="h-3 w-3 mr-1" />
            Unlock
          </Button>
        )}
      </div>
      
      <div className={cn(
        "relative min-h-[200px]",
        locked && "select-none"
      )}>
        {locked && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3">
            <Lock className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Premium feature<br />
              <span className="text-primary">Pay-per-call via x402</span>
            </p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
