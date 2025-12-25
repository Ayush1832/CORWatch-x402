# CORWatch x402 Architecture

## Overview

CORWatch x402 is a system to ingest, process, and sell access to Cortensor validator artifacts.

## Components

### Ingestion Layer (`backend/ingestion`)

- Simulates or connects to Cortensor validator nodes.
- Normalizes PoI (Proof of Intelligence) and PoUW (Proof of Useful Work) data.

### Processing Engine (`backend/processing`)

- **Scoring**: Calculus trust scores based on agreement and historical performance.
- **Aggregation**: Maintains time-series data for dashboards.

### Storage (`backend/storage`)

- **PostgreSQL**: Stores session metadata and metrics.
- **IPFS**: Stores large raw evidence bundles.

### x402 Gating (`backend/x402`)

- **Pricing**: Defines costs for premium endpoints.
- **Receipts**: Validates payment headers (`x-402-payment`).

### Contracts (`contracts/`)

- Solidity contracts to handle EVM-based payments for API access.
