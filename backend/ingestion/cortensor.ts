export interface ValidatorOutput {
  sessionId: string;
  minerId: string;
  model: string;
  inferenceResult: any;
  confidence: number;
  timestamp: number;
}

export interface SessionEvidence {
  sessionId: string;
  agreementScore: number;
  validatorScores: Record<string, number>;
  miners: string[];
  hash: string;
}

// Mock simulator for Cortensor data ingestion
export class CortensorIngestion {
  private subscribers: ((data: SessionEvidence) => void)[] = [];

  constructor() {
    this.startSimulation();
  }

  public subscribe(callback: (data: SessionEvidence) => void) {
    this.subscribers.push(callback);
  }

  private startSimulation() {
    setInterval(() => {
      const mockEvidence: SessionEvidence = {
        sessionId: `sess_${Date.now()}`,
        agreementScore: 0.9 + Math.random() * 0.1, // High agreement > 0.9
        validatorScores: {
          "val_1": 0.95,
          "val_2": 0.98,
          "val_3": 0.92
        },
        miners: ["miner_alpha", "miner_beta", "miner_gamma"],
        hash: "0x" + Math.random().toString(16).slice(2)
      };

      this.subscribers.forEach(cb => cb(mockEvidence));
    }, 5000); // New session every 5 seconds
  }
}
