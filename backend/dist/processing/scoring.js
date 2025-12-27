"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTrustScore = calculateTrustScore;
function calculateTrustScore(evidence) {
    // Simple weighted average of validator scores scaled by agreement
    const scores = Object.values(evidence.validatorScores);
    const avgValidatorScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avgValidatorScore * evidence.agreementScore;
}
