import { Request, Response } from 'express';
import { Aggregator } from '../processing/aggregation';

// Shared aggregator instance for the demo
export const aggregator = new Aggregator();

export const getMetrics = (req: Request, res: Response) => {
  const history = aggregator.getHistory();
  const avg = aggregator.getAverageTrust();
  
  res.json({
    metrics: history,
    averageTrust: avg,
    nodeCount: 12, // Mock
    activeSessions: 3 // Mock
  });
};
