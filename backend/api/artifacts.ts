import { Request, Response } from 'express';
import { PRICING } from '../x402/pricing';

export const getArtifact = (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Check if paid (middleware handled mostly, but here we return data)
  res.json({
    artifactId: id,
    downloadUrl: `https://ipfs.io/ipfs/QmHash...`,
    content: {
      poi: "proof_of_intelligence_data...",
      miners: ["miner1", "miner2"]
    }
  });
};
