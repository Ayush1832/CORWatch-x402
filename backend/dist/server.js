"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const metrics_1 = require("./api/metrics");
const validate_1 = require("./api/validate");
const artifacts_1 = require("./api/artifacts");
const receipts_1 = require("./x402/receipts");
const pricing_1 = require("./x402/pricing");
const cortensor_1 = require("./ingestion/cortensor");
const metrics_2 = require("./api/metrics");
const scoring_1 = require("./processing/scoring");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Start Ingestion Simulation
const ingestion = new cortensor_1.CortensorIngestion();
ingestion.subscribe((data) => {
    const score = (0, scoring_1.calculateTrustScore)(data);
    metrics_2.aggregator.addDataPoint(data, score);
});
// Public Endpoints
app.get('/metrics', metrics_1.getMetrics);
app.get('/session/:id', (req, res) => {
    res.json({ id: req.params.id, status: "pending_verification" });
});
// x402 Paid Endpoints
app.post('/validate', (0, receipts_1.x402Middleware)(pricing_1.PRICING.VALIDATE_CALL), validate_1.validateSession);
app.get('/artifact/:id', (0, receipts_1.x402Middleware)(pricing_1.PRICING.ARTIFACT_DOWNLOAD), artifacts_1.getArtifact);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`x402 Middleware enabled.`);
});
