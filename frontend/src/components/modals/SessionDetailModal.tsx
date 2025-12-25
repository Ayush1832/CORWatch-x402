import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, Download, CheckCircle, AlertTriangle, XCircle, Copy, ExternalLink } from "lucide-react";
import type { Session } from "@/components/dashboard/SessionsTable";
import { PaymentModal } from "./PaymentModal";
import { useToast } from "@/hooks/use-toast";

interface SessionDetailModalProps {
  session: Session | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockValidators = [
  { address: "0x1a2b...3c4d", score: 98.5, agreed: true },
  { address: "0x5e6f...7g8h", score: 94.2, agreed: true },
  { address: "0x9i0j...1k2l", score: 91.8, agreed: true },
  { address: "0x3m4n...5o6p", score: 88.1, agreed: false },
  { address: "0x7q8r...9s0t", score: 96.3, agreed: true },
];

export function SessionDetailModal({ session, open, onOpenChange }: SessionDetailModalProps) {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { toast } = useToast();

  if (!session) return null;

  const copySessionId = () => {
    navigator.clipboard.writeText(session.id);
    toast({
      title: "Copied",
      description: "Session ID copied to clipboard",
    });
  };

  const handlePayment = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return Math.random() > 0.3;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Session Details</span>
              <Badge
                variant={
                  session.status === "verified"
                    ? "success"
                    : session.status === "pending"
                    ? "warning"
                    : "destructive"
                }
                className="capitalize"
              >
                {session.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Session Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Session ID</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm truncate">{session.id}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copySessionId}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                <span className="font-mono text-sm">{session.timestamp}</span>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Model</p>
                <span className="font-mono text-sm">{session.model}</span>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Latency</p>
                <span className="font-mono text-sm">{session.latency}ms</span>
              </div>
            </div>

            {/* Agreement Visualization */}
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium">PoI Agreement</p>
                <span
                  className={`font-mono font-bold ${
                    session.agreement >= 90
                      ? "text-success"
                      : session.agreement >= 70
                      ? "text-warning"
                      : "text-destructive"
                  }`}
                >
                  {session.agreement}%
                </span>
              </div>
              <Progress value={session.agreement} className="h-2" />
            </div>

            {/* Validator Scores */}
            <div>
              <h4 className="font-medium mb-3">Validator Score Breakdown</h4>
              <div className="space-y-2">
                {mockValidators.map((validator, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {validator.agreed ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className="font-mono text-sm">{validator.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={validator.agreed ? "success" : "destructive"}>
                        {validator.agreed ? "Agreed" : "Disputed"}
                      </Badge>
                      <span className="font-mono text-sm font-medium">{validator.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Download (Locked) */}
            <div className="bg-secondary/30 rounded-lg p-4 relative">
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <Lock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Evidence bundle locked</p>
                  <Button variant="premium" size="sm" onClick={() => setPaymentOpen(true)}>
                    Unlock for 0.001 ETH
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between opacity-50">
                <div>
                  <p className="font-medium">Download Evidence Bundle</p>
                  <p className="text-sm text-muted-foreground">
                    Full PoI/PoUW artifacts, validator signatures, merkle proofs
                  </p>
                </div>
                <Button variant="outline" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* External Links */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-3 w-3 mr-2" />
                View on Explorer
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-3 w-3 mr-2" />
                View on IPFS
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        feature="Evidence Bundle Download"
        price="0.001 ETH"
        onPayment={handlePayment}
      />
    </>
  );
}
