import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Wallet } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: string;
  price: string;
  onPayment: () => Promise<boolean>;
}

type PaymentStatus = "idle" | "pending" | "success" | "failed";

export function PaymentModal({ open, onOpenChange, feature, price, onPayment }: PaymentModalProps) {
  const [status, setStatus] = useState<PaymentStatus>("idle");

  useEffect(() => {
    if (!open) {
      setStatus("idle");
    }
  }, [open]);

  const handlePayment = async () => {
    setStatus("pending");
    try {
      const success = await onPayment();
      setStatus(success ? "success" : "failed");
      if (success) {
        setTimeout(() => onOpenChange(false), 2000);
      }
    } catch {
      setStatus("failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>x402 Payment</span>
            <Badge variant="premium">Pay-per-call</Badge>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Unlock premium access to {feature}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Price display */}
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Feature</span>
              <span className="font-medium">{feature}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">Price</span>
              <span className="font-mono text-xl font-bold text-primary">{price}</span>
            </div>
          </div>

          {/* Status display */}
          {status === "pending" && (
            <div className="flex items-center justify-center gap-3 py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-muted-foreground">Awaiting payment confirmation...</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center justify-center gap-3 py-4 text-success">
              <CheckCircle className="h-6 w-6" />
              <span>Payment successful! Unlocking access...</span>
            </div>
          )}

          {status === "failed" && (
            <div className="flex items-center justify-center gap-3 py-4 text-destructive">
              <XCircle className="h-6 w-6" />
              <span>Payment failed. Please try again.</span>
            </div>
          )}

          {/* Action buttons */}
          {status === "idle" && (
            <div className="flex flex-col gap-3">
              <Button variant="hero" size="lg" onClick={handlePayment} className="w-full">
                <Wallet className="h-4 w-4 mr-2" />
                Pay with Wallet
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Powered by x402 Protocol • One-time payment
              </p>
            </div>
          )}

          {status === "failed" && (
            <Button variant="outline" onClick={() => setStatus("idle")} className="w-full">
              Try Again
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
