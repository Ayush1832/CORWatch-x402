# API Documentation

## Base URL

`http://localhost:3000`

## Public Endpoints

### GET /metrics

Returns aggregated system metrics and trust scores.

- **Response**: JSON object with history and average trust.

### GET /session/:id

Get status of a specific session.

## Premium Endpoints (x402)

Requires `x-402-payment` header.

### POST /validate

Validate a session or data blob.

- **Cost**: $0.01
- **Header**: `x-402-payment: <proof>`

### GET /artifact/:id

Download full evidence bundle.

- **Cost**: $0.05
- **Header**: `x-402-payment: <proof>`
