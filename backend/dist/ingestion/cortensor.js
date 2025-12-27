"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CortensorIngestion = void 0;
// Mock simulator for Cortensor data ingestion
class CortensorIngestion {
    constructor() {
        this.subscribers = [];
        this.startSimulation();
    }
    subscribe(callback) {
        this.subscribers.push(callback);
    }
    startSimulation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Starting Cortensor Testnet Ingestion...");
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const response = yield fetch('https://testnet1.explorer.cortensor.network/api/v2/stats');
                    if (response.ok) {
                        const data = yield response.json();
                        // Transform real L3 data into SessionEvidence
                        // Use block height as the core "session" marker
                        const blockHeight = data.height || Date.now();
                        const txCount = data.tx_count || 5;
                        const realEvidence = {
                            sessionId: `block_${blockHeight}`,
                            agreementScore: Math.min(0.99, 0.9 + (txCount * 0.001)), // More traffic = slightly higher "network weight"
                            validatorScores: {
                                [`0x${data.miner_hash || 'a1b2'}`]: 0.98,
                                [`0x${((_a = data.parent_hash) === null || _a === void 0 ? void 0 : _a.slice(0, 4)) || 'c3d4'}`]: 0.95
                            },
                            miners: [`miner_${blockHeight}_A`, `miner_${blockHeight}_B`],
                            hash: data.hash || "0xRealTestnetHash"
                        };
                        this.subscribers.forEach(cb => cb(realEvidence));
                    }
                    else {
                        this.emitMockData();
                    }
                }
                catch (err) {
                    console.warn("Cortensor Ingestion Error:", err);
                    this.emitMockData();
                }
            }), 5000);
        });
    }
    emitMockData() {
        const mockEvidence = {
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
exports.CortensorIngestion = CortensorIngestion;
