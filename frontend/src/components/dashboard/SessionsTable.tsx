import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Session {
  id: string;
  timestamp: string;
  model: string;
  validators: number;
  agreement: number;
  latency: number;
  status: "verified" | "pending" | "disputed";
}

interface SessionsTableProps {
  sessions: Session[];
  onViewSession: (session: Session) => void;
}

export function SessionsTable({ sessions, onViewSession }: SessionsTableProps) {
  const getStatusVariant = (status: Session["status"]) => {
    switch (status) {
      case "verified":
        return "success";
      case "pending":
        return "warning";
      case "disputed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="font-mono text-xs text-muted-foreground">SESSION ID</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">TIMESTAMP</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">MODEL</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground text-right">VALIDATORS</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground text-right">AGREEMENT</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground text-right">LATENCY</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">STATUS</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow 
              key={session.id} 
              className="border-border cursor-pointer hover:bg-secondary/50 transition-colors"
              onClick={() => onViewSession(session)}
            >
              <TableCell className="font-mono text-sm text-primary">
                <div className="flex items-center gap-1">
                  {session.id.slice(0, 8)}...
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {session.timestamp}
              </TableCell>
              <TableCell className="font-mono text-sm">{session.model}</TableCell>
              <TableCell className="font-mono text-sm text-right">{session.validators}</TableCell>
              <TableCell className="font-mono text-sm text-right">
                <span className={session.agreement >= 90 ? "text-success" : session.agreement >= 70 ? "text-warning" : "text-destructive"}>
                  {session.agreement}%
                </span>
              </TableCell>
              <TableCell className="font-mono text-sm text-right">{session.latency}ms</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(session.status)} className="capitalize">
                  {session.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
