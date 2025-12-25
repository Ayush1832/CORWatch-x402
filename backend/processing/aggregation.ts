import { SessionEvidence } from "../ingestion/cortensor";

interface MetricPoint {
  timestamp: number;
  value: number;
}

export class Aggregator {
  private trustHistory: MetricPoint[] = [];

  public addDataPoint(evidence: SessionEvidence, trustScore: number) {
    this.trustHistory.push({
      timestamp: Date.now(),
      value: trustScore
    });

    // Keep only last 100 points
    if (this.trustHistory.length > 100) {
      this.trustHistory.shift();
    }
  }

  public getHistory() {
    return this.trustHistory;
  }
  
  public getAverageTrust(): number {
    if (this.trustHistory.length === 0) return 0;
    const sum = this.trustHistory.reduce((acc, curr) => acc + curr.value, 0);
    return sum / this.trustHistory.length;
  }
}
