"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING = void 0;
exports.getPrice = getPrice;
exports.PRICING = {
    VALIDATE_CALL: 0.001, // $0.001 equivalent or ETH
    ARTIFACT_DOWNLOAD: 0.05,
    REALTIME_METRICS: 0.10 // Subscription or one-time access
};
function getPrice(endpoint) {
    switch (endpoint) {
        case '/validate': return exports.PRICING.VALIDATE_CALL;
        case '/artifact': return exports.PRICING.ARTIFACT_DOWNLOAD;
        default: return 0;
    }
}
