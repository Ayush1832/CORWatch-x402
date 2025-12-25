import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ValidatorLeaderboard } from "@/components/dashboard/ValidatorLeaderboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentModal } from "@/components/modals/PaymentModal";
import {
  Activity,
  Clock,
  Users,
  CheckCircle,
  TrendingUp,
  Zap,
  Lock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import { fetchMetrics, MetricsData } from "@/lib/api";

const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    refetchInterval: 5000,
  });
};

// Placeholder data for charts that aren't fully real-time in this demo
const sessionData_static = [
  { time: "00:00", sessions: 1200, latency: 45 },
  { time: "04:00", sessions: 800, latency: 42 },
  { time: "08:00", sessions: 2100, latency: 48 },
  { time: "12:00", sessions: 3500, latency: 52 },
  { time: "16:00", sessions: 2800, latency: 47 },
  { time: "20:00", sessions: 2200, latency: 44 },
];

const agreementData = [
  { day: "Mon", agreement: 98.2 },
  { day: "Tue", agreement: 97.8 },
  { day: "Wed", agreement: 99.1 },
  { day: "Thu", agreement: 98.5 },
  { day: "Fri", agreement: 97.9 },
  { day: "Sat", agreement: 99.4 },
  { day: "Sun", agreement: 99.7 },
];

const modelUsageData = [
  { model: "Llama-3-70B", usage: 42 },
  { model: "Mistral-7B", usage: 28 },
  { model: "GPT-4-Turbo", usage: 18 },
  { model: "Claude-3", usage: 12 },
];

const validators = [
  {
    rank: 1,
    address: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    score: 98.7,
    sessions: 124532,
    uptime: 99.9,
  },
  {
    rank: 2,
    address: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
    score: 97.2,
    sessions: 118234,
    uptime: 99.7,
  },
  {
    rank: 3,
    address: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
    score: 96.8,
    sessions: 112456,
    uptime: 99.5,
  },
  {
    rank: 4,
    address: "0x4d5e6f7890abcdef1234567890abcdef12345678",
    score: 95.1,
    sessions: 98765,
    uptime: 99.2,
  },
  {
    rank: 5,
    address: "0x5e6f7890abcdef1234567890abcdef1234567890",
    score: 94.3,
    sessions: 87654,
    uptime: 98.8,
  },
];

export default function Dashboard() {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentFeature, setPaymentFeature] = useState("");
  const { data: metrics } = useDashboardMetrics();

  const handleUnlock = (feature: string) => {
    setPaymentFeature(feature);
    setPaymentOpen(true);
  };

  const handlePayment = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return Math.random() > 0.3;
  };

  // Transform API data for chart if available, else use static
  const chartData =
    metrics?.metrics?.map((m) => ({
      time: new Date(m.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sessions: Math.floor(m.value * 1000), // Scale up trust score for visualization
      latency: 40 + Math.random() * 10,
    })) || sessionData_static;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time observability for Cortensor validator network
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success" className="flex items-center gap-1">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Live
            </Badge>
            <Badge variant="outline">Last updated: 2 min ago</Badge>
          </div>
        </div>

        <Tabs defaultValue="free" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="free">Free Tier</TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              Premium
              <Badge variant="premium" className="text-[10px] px-1.5 py-0">
                x402
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Free Tier */}
          <TabsContent value="free" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Sessions"
                value="2,451,238"
                change="+12.5% today"
                changeType="positive"
                icon={Activity}
              />
              <StatCard
                title="Avg Latency"
                value="47ms"
                change="-3ms vs yesterday"
                changeType="positive"
                icon={Clock}
              />
              <StatCard
                title="Active Validators"
                value="847"
                change="+5 this week"
                changeType="positive"
                icon={Users}
              />
              <StatCard
                title="Agreement Rate"
                value="99.7%"
                change="+0.2%"
                changeType="positive"
                icon={CheckCircle}
              />
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <ChartCard title="Sessions Over Time">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="sessionGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(185, 80%, 50%)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(185, 80%, 50%)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(220, 15%, 18%)"
                    />
                    <XAxis
                      dataKey="time"
                      stroke="hsl(215, 15%, 55%)"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 18%, 7%)",
                        border: "1px solid hsl(220, 15%, 18%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stroke="hsl(185, 80%, 50%)"
                      fill="url(#sessionGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Agreement Rate Trend">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={agreementData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(220, 15%, 18%)"
                    />
                    <XAxis
                      dataKey="day"
                      stroke="hsl(215, 15%, 55%)"
                      fontSize={12}
                    />
                    <YAxis
                      domain={[95, 100]}
                      stroke="hsl(215, 15%, 55%)"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 18%, 7%)",
                        border: "1px solid hsl(220, 15%, 18%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="agreement"
                      stroke="hsl(160, 70%, 45%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(160, 70%, 45%)", strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </TabsContent>

          {/* Premium Tier */}
          <TabsContent value="premium" className="space-y-6">
            {/* Locked Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Top Validator Score"
                value="98.7"
                icon={TrendingUp}
                locked
              />
              <StatCard
                title="Network Efficiency"
                value="94.2%"
                icon={Zap}
                locked
              />
              <StatCard
                title="Total Sessions"
                value="2,451,238"
                change="+12.5% today"
                changeType="positive"
                icon={Activity}
              />
              <StatCard title="Active Validators" value="847" icon={Users} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Validator Leaderboard (Locked) */}
              <ValidatorLeaderboard validators={validators} locked />

              {/* Model Usage (Locked) */}
              <ChartCard
                title="Model Usage Analytics"
                locked
                onUnlock={() => handleUnlock("Model Usage Analytics")}
              >
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={modelUsageData} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(220, 15%, 18%)"
                    />
                    <XAxis
                      type="number"
                      stroke="hsl(215, 15%, 55%)"
                      fontSize={12}
                    />
                    <YAxis
                      dataKey="model"
                      type="category"
                      stroke="hsl(215, 15%, 55%)"
                      fontSize={12}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 18%, 7%)",
                        border: "1px solid hsl(220, 15%, 18%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="usage"
                      fill="hsl(185, 80%, 50%)"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Latency Heatmap (Locked) */}
            <ChartCard
              title="Latency Heatmap by Region"
              locked
              onUnlock={() => handleUnlock("Latency Heatmap")}
            >
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Global latency visualization</p>
                  <p className="text-sm text-primary mt-1">
                    0.002 ETH per query
                  </p>
                </div>
              </div>
            </ChartCard>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        feature={paymentFeature}
        price="0.002 ETH"
        onPayment={handlePayment}
      />
    </div>
  );
}
