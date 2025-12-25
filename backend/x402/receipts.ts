import { Request, Response, NextFunction } from 'express';

export function x402Middleware(cost: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const paymentHeader = req.headers['x-402-payment'];
    
    if (!paymentHeader) {
      return res.status(402).json({
        error: "Payment Required",
        cost: cost,
        paymentAddress: "0x1234..." // The receiver address
      });
    }

    // Verify payment logic here
    // For demo, we accept any "valid-signature" string or similar
    if (paymentHeader === "mock-payment-proof") {
      next();
    } else {
      return res.status(403).json({ error: "Invalid Payment" });
    }
  };
}
