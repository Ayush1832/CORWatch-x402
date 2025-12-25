import { Pool } from 'pg';
import dotenv from 'dotenv';
import { SessionEvidence } from '../ingestion/cortensor';

dotenv.config();

// Using a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const dbRequest = async (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export class StorageService {
  public static async saveSession(evidence: SessionEvidence) {
    // Schema assumption: table sessions (id, data, timestamp)
    // In a real scenario, we would use proper schema
    
    // Stub implementation to avoid crashing without a real DB in this demo environment
    // console.log("Saving session to DB:", evidence.sessionId);
    return; 
    
    /* 
    const query = 'INSERT INTO sessions(id, data, created_at) VALUES($1, $2, $3)';
    await dbRequest(query, [evidence.sessionId, evidence, new Date()]);
    */
  }

  public static async getSession(id: string) {
    // Stub
    return { id, data: "Mock DB Data" };
  }
}
