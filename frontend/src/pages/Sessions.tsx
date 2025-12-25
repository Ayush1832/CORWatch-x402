import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SessionsTable, type Session } from "@/components/dashboard/SessionsTable";
import { SessionDetailModal } from "@/components/modals/SessionDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, RefreshCw } from "lucide-react";

const mockSessions: Session[] = [
  {
    id: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    timestamp: "2024-01-15 14:32:01",
    model: "Llama-3-70B",
    validators: 5,
    agreement: 100,
    latency: 45,
    status: "verified",
  },
  {
    id: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
    timestamp: "2024-01-15 14:31:45",
    model: "Mistral-7B",
    validators: 5,
    agreement: 80,
    latency: 38,
    status: "verified",
  },
  {
    id: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
    timestamp: "2024-01-15 14:31:22",
    model: "GPT-4-Turbo",
    validators: 4,
    agreement: 75,
    latency: 62,
    status: "pending",
  },
  {
    id: "0x4d5e6f7890abcdef1234567890abcdef12345678",
    timestamp: "2024-01-15 14:30:58",
    model: "Llama-3-70B",
    validators: 5,
    agreement: 60,
    latency: 51,
    status: "disputed",
  },
  {
    id: "0x5e6f7890abcdef1234567890abcdef1234567890",
    timestamp: "2024-01-15 14:30:33",
    model: "Claude-3",
    validators: 5,
    agreement: 100,
    latency: 44,
    status: "verified",
  },
  {
    id: "0x6f7890abcdef1234567890abcdef12345678901a",
    timestamp: "2024-01-15 14:30:12",
    model: "Mistral-7B",
    validators: 5,
    agreement: 100,
    latency: 36,
    status: "verified",
  },
  {
    id: "0x7890abcdef1234567890abcdef12345678901a2b",
    timestamp: "2024-01-15 14:29:55",
    model: "Llama-3-70B",
    validators: 4,
    agreement: 75,
    latency: 48,
    status: "pending",
  },
  {
    id: "0x890abcdef1234567890abcdef12345678901a2b3c",
    timestamp: "2024-01-15 14:29:31",
    model: "GPT-4-Turbo",
    validators: 5,
    agreement: 100,
    latency: 58,
    status: "verified",
  },
];

export default function Sessions() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewSession = (session: Session) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

  const filteredSessions = mockSessions.filter(
    (session) =>
      session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Session Explorer</h1>
            <p className="text-muted-foreground">
              Browse and analyze inference sessions across the Cortensor network
            </p>
          </div>
          <Badge variant="outline">
            {mockSessions.length.toLocaleString()} sessions indexed
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by session ID or model..."
              className="pl-10 bg-secondary/50 border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-secondary/50 border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-secondary/50 border-border">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="llama">Llama-3-70B</SelectItem>
              <SelectItem value="mistral">Mistral-7B</SelectItem>
              <SelectItem value="gpt4">GPT-4-Turbo</SelectItem>
              <SelectItem value="claude">Claude-3</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Sessions Table */}
        <SessionsTable sessions={filteredSessions} onViewSession={handleViewSession} />

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSessions.length} of {mockSessions.length} sessions
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      <SessionDetailModal
        session={selectedSession}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
