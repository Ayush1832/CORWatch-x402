import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Zap,
  Lock,
  ArrowRight,
  Eye,
  BarChart3,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useToast } from "@/hooks/use-toast";
import { PaymentModal } from "@/components/modals/PaymentModal";

const freeFeatures = [
  { icon: Eye, text: "Real-time session monitoring" },
  { icon: BarChart3, text: "Basic analytics dashboard" },
  { icon: Users, text: "Validator count & status" },
  { icon: Shield, text: "Basic validation queries" },
];

const premiumFeatures = [
  {
    feature: "Validator Leaderboard",
    price: "0.001 ETH",
    description: "Full ranking with historical scores",
  },
  {
    feature: "Latency Heatmaps",
    price: "0.002 ETH",
    description: "Global latency visualization by region",
  },
  {
    feature: "Model Usage Analytics",
    price: "0.002 ETH",
    description: "Detailed model usage breakdown",
  },
  {
    feature: "Evidence Bundle Download",
    price: "0.001 ETH",
    description: "Full PoI/PoUW artifacts & proofs",
  },
  {
    feature: "Score History API",
    price: "0.0005 ETH",
    description: "Per-validator historical data",
  },
  {
    feature: "Bulk Session Export",
    price: "0.005 ETH",
    description: "Export up to 1000 sessions",
  },
];

export default function Pricing() {
  const { isConnected, address } = useAccount();
  const { open } = useAppKit();
  const { sendTransactionAsync } = useSendTransaction();
  const { toast } = useToast();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({
    name: "Premium Access",
    price: "0.001 ETH",
  });

  const handleStartPremium = () => {
    if (!isConnected) {
      open({ view: "Connect" });
      return;
    }
    setSelectedFeature({
      name: "Premium Access (Per Call)",
      price: "0.001 ETH",
    });
    setPaymentModalOpen(true);
  };

  const handlePayment = async () => {
    try {
      // Send 0.001 ETH (Sepolia/Testnet) to receiver
      // Receiver: 0x2beD...666E
      const hash = await sendTransactionAsync({
        to: "0x2beD2911366C582Ab52F11f849F5C0E942Ba666E",
        value: 1000000000000000n, // 0.001 ETH in wei
      });

      console.log("Transaction sent:", hash);

      toast({
        title: "Payment Sent!",
        description: "Transaction submitted. Unlocking premium features...",
      });

      // Optimistic unlock for demo
      localStorage.setItem("x402_premium", "true");

      // Small delay for UX then redirect
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);

      return true;
    } catch (error: unknown) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment Cancelled",
        description: "Transaction was rejected.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="premium" className="mb-4">
            x402 Protocol
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Simple Pay-Per-Call Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No subscriptions. No commitments. Pay only for the premium features
            you use.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Tier */}
          <Card className="bg-card border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">
                Free
              </Badge>
              <CardTitle className="text-2xl">Basic Access</CardTitle>
              <CardDescription>
                Essential observability for Cortensor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-4xl font-bold font-mono">
                $0
                <span className="text-lg font-normal text-muted-foreground">
                  {" "}
                  / forever
                </span>
              </div>

              <ul className="space-y-3">
                {freeFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="p-1 rounded bg-success/10 text-success">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Link to="/dashboard">
                <Button variant="outline" className="w-full">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="bg-card border-primary/50 relative overflow-hidden shadow-lg shadow-primary/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
            <CardHeader>
              <Badge variant="premium" className="w-fit mb-2">
                Premium
              </Badge>
              <CardTitle className="text-2xl">Pay-Per-Call</CardTitle>
              <CardDescription>
                Advanced analytics via x402 protocol
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-4xl font-bold font-mono">
                x402
                <span className="text-lg font-normal text-muted-foreground">
                  {" "}
                  / per call
                </span>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded bg-success/10 text-success">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>All Free tier features</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span>Validator leaderboards</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span>Evidence bundles</span>
                </li>
              </ul>

              <Button
                variant="premium"
                className="w-full"
                onClick={handleStartPremium}
              >
                Start Using
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Pricing Table */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Premium Feature Pricing
          </h2>

          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-left p-4 font-semibold">Description</th>
                    <th className="text-right p-4 font-semibold">
                      Price per Call
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {premiumFeatures.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-border hover:bg-secondary/20 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-primary" />
                          <span className="font-medium">{item.feature}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {item.description}
                      </td>
                      <td className="p-4 text-right">
                        <Badge variant="premium" className="font-mono">
                          {item.price}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* x402 Explanation */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-secondary/30 border-border">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">How x402 Works</h3>
                  <p className="text-muted-foreground mb-4">
                    x402 is a pay-per-call protocol that enables micropayments
                    for API access. When you request a premium feature, you'll
                    be prompted to authorize a payment from your connected
                    wallet. Once confirmed, you'll receive immediate access to
                    the requested data.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Badge variant="outline">No subscriptions</Badge>
                    <Badge variant="outline">Instant access</Badge>
                    <Badge variant="outline">Wallet-based auth</Badge>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    x402 Protocol
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        feature={selectedFeature.name}
        price={selectedFeature.price}
        onPayment={handlePayment}
      />
    </div>
  );
}
