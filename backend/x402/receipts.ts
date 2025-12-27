import { Request, Response, NextFunction } from 'express';
import { verifyMessage } from 'ethers';

export function x402Middleware(cost: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const paymentHeader = req.headers['x-402-payment'] as string;
    
    if (!paymentHeader) {
      return res.status(402).json({
        error: "Payment Required",
        cost: cost,
        paymentAddress: "0x2beD2911366C582Ab52F11f849F5C0E942Ba666E"
      });
    }

    try {
        const { sessionId } = req.body;
        
        if (!sessionId && req.path === '/validate') {
             console.warn("x402: No sessionId in body for verification");
        }

        const message = `Authorize 0.001 ETH payment for session ${sessionId}`;
        
        const recoveredAddress = verifyMessage(message, paymentHeader);
        
        console.log(`x402: Verified signature from ${recoveredAddress}`);
        
        (req as any).user = { address: recoveredAddress };
        
        next();
    } catch (error) {
        console.error("x402: Signature verification failed", error);
        return res.status(403).json({ error: "Invalid Payment Signature" });
    }
  };
}
