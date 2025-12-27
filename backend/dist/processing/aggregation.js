"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
class Aggregator {
    constructor() {
        this.trustHistory = [];
    }
    addDataPoint(evidence, trustScore) {
        this.trustHistory.push({
            timestamp: Date.now(),
            value: trustScore
        });
        // Keep only last 100 points
        if (this.trustHistory.length > 100) {
            this.trustHistory.shift();
        }
    }
    getHistory() {
        return this.trustHistory;
    }
    getAverageTrust() {
        if (this.trustHistory.length === 0)
            return 0;
        const sum = this.trustHistory.reduce((acc, curr) => acc + curr.value, 0);
        return sum / this.trustHistory.length;
    }
}
exports.Aggregator = Aggregator;
