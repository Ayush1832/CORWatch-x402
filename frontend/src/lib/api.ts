export const API_BASE_URL = 'http://localhost:3000';

export interface MetricsData {
  metrics: { timestamp: number; value: number }[];
  averageTrust: number;
  nodeCount: number;
  activeSessions: number;
}

export async function fetchMetrics(): Promise<MetricsData> {
  const response = await fetch(`${API_BASE_URL}/metrics`);
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  return response.json();
}

export interface ValidationResponse {
    valid: boolean;
    score: number;
    timestamp: number;
    details?: string;
}

export async function validateSession(paymentProof: string | null): Promise<ValidationResponse> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };
    
    if (paymentProof) {
        headers['x-402-payment'] = paymentProof;
    }

    const response = await fetch(`${API_BASE_URL}/validate`, {
        method: 'POST',
        headers
    });
    
    if (response.status === 402) {
        throw new Error("Payment Required");
    }
    
    return response.json() as Promise<ValidationResponse>;
}
