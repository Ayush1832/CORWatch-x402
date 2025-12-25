import { SessionEvidence } from "../ingestion/cortensor";

export function calculateTrustScore(evidence: SessionEvidence): number {
  // Simple weighted average of validator scores scaled by agreement
  const scores = Object.values(evidence.validatorScores);
  const avgValidatorScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  return avgValidatorScore * evidence.agreementScore;
}
