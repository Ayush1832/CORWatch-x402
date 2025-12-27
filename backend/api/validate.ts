import { Request, Response } from 'express';
import { calculateTrustScore } from '../processing/scoring';
import { aggregator } from './metrics';

import { createHash } from 'crypto';

export const validateSession = (req: Request, res: Response) => {
  const { sessionId } = req.body; // or req.query if GET? req.body used in receipts.ts middleware logic

  // Deterministic validation based on Session ID
  // This simulates a real node checking the chain state for this specific ID.
  
  if (!sessionId) {
    return res.status(400).json({ error: "Session ID required" });
  }

  // Create a deterministic "random" seed from the ID
  const hash = createHash('sha256').update(sessionId).digest('hex');
  const seed = parseInt(hash.substring(0, 8), 16);
  
  // Use seed to determine properties
  const score = (seed % 1000) / 1000; // 0.000 to 0.999
  const isValid = score > 0.7; // 70% threshold
  const validatorCount = (seed % 10) + 3; // 3 to 12 validators
  
  const result = {
    valid: isValid,
    score: 0.9 + (score * 0.1), // Normalize to high range for demo (0.90 - 0.99)
    timestamp: Date.now() - (seed % 86400000), // Random time in last 24h
    details: isValid 
        ? `Verified: Agreement found among ${validatorCount} validators on-chain.`
        : `Disputed: Consensus threshold not met (Score: ${score.toFixed(2)})`
  };
  
  res.json(result);
};
