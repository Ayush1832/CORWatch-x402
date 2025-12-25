import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Info,
} from "lucide-react";

type ValidationStatus = "idle" | "loading" | "success" | "error" | "not-found";

interface ValidationResult {
  sessionId: string;
  status: "verified" | "disputed" | "pending";
  agreement: number;
  validators: number;
  timestamp: string;
  model: string;
}

const mockResult: ValidationResult = {
  sessionId: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
  status: "verified",
  agreement: 98,
  validators: 5,
  timestamp: "2024-01-15 14:32:01",
  model: "Llama-3-70B",
};

import { useSignMessage, useAccount } from "wagmi";
import { validateSession } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Validate() {
  const [sessionId, setSessionId] = useState("");
  const [status, setStatus] = useState<ValidationStatus>("idle");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const { signMessageAsync } = useSignMessage();
  const { isConnected, address } = useAccount();
  const { toast } = useToast();

  const handleValidate = async () => {
    if (!sessionId.trim()) return;
    setStatus("loading");
    setResult(null);

    try {
      let paymentProof = null;

      // Check if premium validation is needed (e.g. detailed report) - simplified for demo
      // In this demo, we can assume ALL validations require "payment" sign-off if wallet is connected
      if (isConnected && address) {
        try {
          const signature = await signMessageAsync({
            account: address,
            message: `Authorize 0.01 ETH payment for session ${sessionId}`,
          });
          paymentProof = signature;
        } catch (err) {
          toast({
            title: "Payment Cancelled",
            description: "You rejected the signature request.",
            variant: "destructive",
          });
          setStatus("idle");
          return;
        }
      }

      const data = await validateSession(paymentProof);

      if (data) {
        setResult({
          sessionId: sessionId,
          status: data.valid ? "verified" : "disputed",
          agreement: Math.floor(data.score * 100),
          validators: 3, // Mock form backend
          timestamp: new Date(data.timestamp).toLocaleString(),
          model: "Llama-3-70B",
        });
        setStatus("success");

        if (data.details) {
          toast({
            title: "Validation Complete",
            description: data.details,
          });
        }
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error && error.message === "Payment Required") {
        toast({
          title: "Payment Required",
          description: "Please connect wallet and sign to pay for validation.",
          variant: "destructive",
        });
      }
      setStatus("error");
    }
  };

  const getStatusIcon = () => {
    switch (result?.status) {
      case "verified":
        return <CheckCircle className="h-6 w-6 text-success" />;
      case "disputed":
        return <XCircle className="h-6 w-6 text-destructive" />;
      case "pending":
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Validate Session</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Enter a session ID to verify its PoI agreement status and
              validator consensus
            </p>
          </div>

          {/* Input */}
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Session Lookup</CardTitle>
              <CardDescription>
                Enter the session ID from a Cortensor inference request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="0x1a2b3c4d5e6f7890..."
                    className="pl-10 font-mono bg-secondary/50 border-border"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleValidate()}
                  />
                </div>
                <Button
                  variant="hero"
                  onClick={handleValidate}
                  disabled={!sessionId.trim() || status === "loading"}
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Validate
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Info */}
          <Card className="bg-secondary/30 border-border mb-8">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Pay-per-call Pricing</p>
                    <p className="text-xs text-muted-foreground">
                      Basic validation is free. Advanced features require x402
                      payment.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="success">Basic: Free</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Evidence: 0.001 ETH
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {status === "loading" && (
            <Card className="bg-card border-border">
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-muted-foreground">
                    Querying validators...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Not Found State */}
          {status === "not-found" && (
            <Card className="bg-card border-border border-destructive/50">
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-destructive">
                      Session Not Found
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      The session ID could not be found in the Cortensor network
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result */}
          {status === "success" && result && (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-3">
                    {getStatusIcon()}
                    Validation Result
                  </CardTitle>
                  <Badge
                    variant={
                      result.status === "verified"
                        ? "success"
                        : result.status === "disputed"
                        ? "destructive"
                        : "warning"
                    }
                    className="capitalize"
                  >
                    {result.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Session Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Session ID
                    </p>
                    <p className="font-mono text-sm truncate">
                      {result.sessionId}
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Model</p>
                    <p className="font-mono text-sm">{result.model}</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Validators
                    </p>
                    <p className="font-mono text-sm">
                      {result.validators} participated
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Timestamp
                    </p>
                    <p className="font-mono text-sm">{result.timestamp}</p>
                  </div>
                </div>

                {/* Agreement */}
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">PoI Agreement</p>
                    <span
                      className={`font-mono font-bold text-lg ${
                        result.agreement >= 90
                          ? "text-success"
                          : result.agreement >= 70
                          ? "text-warning"
                          : "text-destructive"
                      }`}
                    >
                      {result.agreement}%
                    </span>
                  </div>
                  <Progress value={result.agreement} className="h-2" />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    View Full Details
                  </Button>
                  <Button variant="premium" className="flex-1">
                    Download Evidence (0.001 ETH)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
