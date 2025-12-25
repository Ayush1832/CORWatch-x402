import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Shield,
  Zap,
  Eye,
  Users,
  Lock,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Database,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const features = [
  {
    icon: Eye,
    title: "PoI Insights",
    description: "Real-time visibility into Proof-of-Inference outputs from Cortensor validators",
    badge: "Free",
  },
  {
    icon: Users,
    title: "Validator Reputation",
    description: "Track validator scores, uptime, and historical performance metrics",
    badge: "Free + Premium",
  },
  {
    icon: Lock,
    title: "x402 Access",
    description: "Pay-per-call API access to premium analytics and evidence bundles",
    badge: "Premium",
  },
];

const stats = [
  { value: "2.4M+", label: "Sessions Indexed" },
  { value: "847", label: "Active Validators" },
  { value: "99.7%", label: "Avg Agreement" },
  { value: "12ms", label: "Avg Latency" },
];

const premiumFeatures = [
  "Miner leaderboard access",
  "Validator score history",
  "Latency heatmaps",
  "Model usage analytics",
  "Evidence bundle downloads",
  "Priority API endpoints",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="premium" className="text-sm px-4 py-1">
              Powered by x402 Protocol
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-gradient">Paid, Verifiable Observability</span>
              <br />
              <span className="text-foreground">for Decentralized Inference</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              CORWatch x402 indexes, analyzes, and serves validator-produced trust signals 
              from Cortensor — enabling developers, operators, and agents to query, verify, 
              and pay for trusted inference insights.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button variant="hero" size="xl">
                  Open Dashboard
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="xl">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="stat-card text-center"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <p className="text-3xl md:text-4xl font-mono font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Observability Infrastructure for Cortensor
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access PoI and PoUW validator outputs through dashboards, APIs, and evidence bundles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <Badge variant={feature.badge === "Free" ? "success" : feature.badge === "Premium" ? "premium" : "secondary"}>
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <Badge variant="premium">x402 Premium</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Unlock Advanced Analytics
              </h2>
              <p className="text-lg text-muted-foreground">
                Pay-per-call access to premium features using the x402 protocol. 
                No subscriptions, no commitments — just pay for what you use.
              </p>
              
              <ul className="space-y-3">
                {premiumFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/pricing">
                <Button variant="premium" size="lg" className="mt-4">
                  View Pricing
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Premium Dashboard Preview</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">Top Validator</p>
                    <p className="font-mono text-lg font-bold text-primary">98.7</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                    <p className="font-mono text-lg font-bold">92.4</p>
                  </div>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-4 h-32 flex items-center justify-center border border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    <Database className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Heatmap visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Start Monitoring Cortensor Today
            </h2>
            <p className="text-lg text-muted-foreground">
              Free tier available. Upgrade to premium for advanced analytics.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button variant="hero" size="lg">
                  <Activity className="h-4 w-4 mr-2" />
                  Open Dashboard
                </Button>
              </Link>
              <Link to="/validate">
                <Button variant="outline" size="lg">
                  <Shield className="h-4 w-4 mr-2" />
                  Validate Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
