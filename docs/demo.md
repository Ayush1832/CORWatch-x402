# Demo Instructions

## Prerequisites

- Node.js (v18+)
- npm or bun

## Setup

1. `cd backend`
2. `npm install` (or install dependencies manually if needed)
3. `npm run dev`

## Usage

1. Open dashboard to view real-time metrics (ingestion starts automatically).
2. To test premium endpoints:
   ```bash
   curl -X POST http://localhost:3000/validate \
     -H "Content-Type: application/json" \
     -H "x-402-payment: mock-payment-proof"
   ```
3. Without payment header, you will receive a 402 Payment Required error.
