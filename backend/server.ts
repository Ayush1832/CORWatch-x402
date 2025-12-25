import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getMetrics } from './api/metrics';
import { validateSession } from './api/validate';
import { getArtifact } from './api/artifacts';
import { x402Middleware } from './x402/receipts';
import { PRICING } from './x402/pricing';
import { CortensorIngestion } from './ingestion/cortensor';
import { aggregator } from './api/metrics';
import { calculateTrustScore } from './processing/scoring';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Start Ingestion Simulation
const ingestion = new CortensorIngestion();
ingestion.subscribe((data) => {
  const score = calculateTrustScore(data);
  aggregator.addDataPoint(data, score);
});

// Public Endpoints
app.get('/metrics', getMetrics);
app.get('/session/:id', (req, res) => {
  res.json({ id: req.params.id, status: "pending_verification" });
});

// x402 Paid Endpoints
app.post('/validate', x402Middleware(PRICING.VALIDATE_CALL), validateSession);
app.get('/artifact/:id', x402Middleware(PRICING.ARTIFACT_DOWNLOAD), getArtifact);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`x402 Middleware enabled.`);
});
