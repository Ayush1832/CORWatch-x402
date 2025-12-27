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

  private async startSimulation() {
    console.log("Starting Cortensor Testnet Ingestion...");
    
    setInterval(async () => {
      try {
        const response = await fetch('https://testnet1.explorer.cortensor.network/api/v2/stats');
        
        if (response.ok) {
           const data = await response.json();
          
           const blockHeight = data.height || Date.now();
           const txCount = data.tx_count || 5;
           
           const realEvidence: SessionEvidence = {
             sessionId: `block_${blockHeight}`, 
             agreementScore: Math.min(0.99, 0.9 + (txCount * 0.001)), // More traffic = slightly higher "network weight"
             validatorScores: { 
                [`0x${data.miner_hash || 'a1b2'}`]: 0.98,
                [`0x${data.parent_hash?.slice(0,4) || 'c3d4'}`]: 0.95
             },
             miners: [`miner_${blockHeight}_A`, `miner_${blockHeight}_B`],
             hash: data.hash || "0xRealTestnetHash"
           };

           this.subscribers.forEach(cb => cb(realEvidence));
        } else {
           this.emitMockData();
        }
      } catch (err) {
        console.warn("Cortensor Ingestion Error:", err);
        this.emitMockData();
      }
    }, 5000);
  }

  private emitMockData() {
      const mockEvidence: SessionEvidence = {
        sessionId: `sess_${Date.now()}`,
        agreementScore: 0.9 + Math.random() * 0.1, 
        validatorScores: {
          "val_1": 0.95,
          "val_2": 0.98,
          "val_3": 0.92
        },
        miners: ["miner_alpha", "miner_beta", "miner_gamma"],
        hash: "0x" + Math.random().toString(16).slice(2)
      };
      this.subscribers.forEach(cb => cb(mockEvidence));
  }
}
