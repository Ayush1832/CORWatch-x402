"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetrics = exports.aggregator = void 0;
const aggregation_1 = require("../processing/aggregation");
// Shared aggregator instance for the demo
exports.aggregator = new aggregation_1.Aggregator();
const getMetrics = (req, res) => {
    const history = exports.aggregator.getHistory();
    const avg = exports.aggregator.getAverageTrust();
    res.json({
        metrics: history,
        averageTrust: avg,
        nodeCount: 12, // Mock
        activeSessions: 3 // Mock
    });
};
exports.getMetrics = getMetrics;
