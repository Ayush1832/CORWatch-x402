export const PRICING = {
  VALIDATE_CALL: 0.001, // $0.001 equivalent or ETH
  ARTIFACT_DOWNLOAD: 0.05,
  REALTIME_METRICS: 0.10 // Subscription or one-time access
};

export function getPrice(endpoint: string): number {
  switch(endpoint) {
    case '/validate': return PRICING.VALIDATE_CALL;
    case '/artifact': return PRICING.ARTIFACT_DOWNLOAD;
    default: return 0;
  }
}
