# Kong API Gateway POC

## Overview

This project demonstrates how to build a Microservices Architecture using:

- Node.js
- Express.js
- Kong API Gateway
- PostgreSQL
- Redis
- Docker Compose

The goal of this Proof of Concept (POC) is to understand:

- API Gateway fundamentals
- Request routing through Kong
- Microservices communication
- Authentication and authorization patterns
- Rate limiting
- Monitoring and observability
- Production-grade architecture patterns

---

# System Architecture

## Current Phase (Phase 1)

```text
                Kong API Gateway
                        |
        --------------------------------
        |                              |
   User Service                 Product Service
        |
   PostgreSQL

Redis (available for future phases)
```

---

# Project Structure

```text
kong-poc/

├── docker-compose.yml
│
├── kong/
│   └── kong.yml
│
├── services/
│   ├── user-service/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── index.js
│   │
│   └── product-service/
│       ├── Dockerfile
│       ├── package.json
│       └── index.js
│
├── postgres/
│
├── redis/
│
└── README.md
```

---

# Components

## Kong API Gateway

Acts as the single entry point for all client requests.

Responsibilities:

- Request Routing
- Authentication
- Authorization
- Rate Limiting
- Logging
- Monitoring
- Load Balancing

---

## User Service

Responsible for:

- User APIs
- User Profile Operations
- Authentication Integration (Future)

Example Endpoint:

```http
GET /users
```

---

## Product Service

Responsible for:

- Product APIs
- Product Catalog Operations

Example Endpoint:

```http
GET /products
```

---

## PostgreSQL

Used for:

- Persistent Storage
- Service Databases

Future Usage:

- User Data
- Product Data
- Authentication Data

---

## Redis

Used for:

- Caching
- Rate Limiting Counters
- Session Storage
- Distributed Locks

Future Usage:

- Kong Rate Limiting Plugin
- API Response Caching

---

# Kong Configuration

Current configuration uses:

```yaml
_format_version: "3.0"
```

Configured Services:

- user-service
- product-service

Configured Routes:

| Route     | Service         |
| --------- | --------------- |
| /users    | user-service    |
| /products | product-service |

---

# Request Flow

```text
Client
   |
   v
Kong Gateway
   |
   +----> User Service
   |
   +----> Product Service
```

Example:

```http
GET http://localhost:8000/users
```

Kong forwards request to:

```http
http://user-service:3001/users
```

---

# Running the Application

## Build Containers

```bash
docker compose build
```

## Start Services

```bash
docker compose up
```

## Start in Detached Mode

```bash
docker compose up -d
```

---

# Verify Services

## User Service

```bash
curl http://localhost:8000/users
```

Expected Response:

```json
{
  "service": "user-service",
  "users": ["John", "Alice"]
}
```

---

## Product Service

```bash
curl http://localhost:8000/products
```

Expected Response:

```json
{
  "service": "product-service",
  "products": ["Laptop", "Phone"]
}
```

---

# Learning Objectives

This project is intended to teach:

- API Gateway Fundamentals
- Reverse Proxy Concepts
- Service Routing
- Docker Networking
- Service Discovery
- Authentication Architecture
- Distributed Systems Basics

---

# Development Roadmap

## Phase 1 - Routing Through Kong

Status: ✅ In Progress

Goals:

- Setup Kong
- Setup Express Services
- Configure Routes
- Verify Request Routing

Deliverables:

- User Service
- Product Service
- Kong Declarative Configuration

---

## Phase 2 - JWT Authentication

Status: ⏳ Planned

Goals:

- Create Auth Service
- Generate JWT Tokens
- Configure Kong JWT Plugin
- Protect APIs

Architecture:

```text
Client
   |
 JWT Token
   |
 Kong
   |
 Services
```

Topics:

- JWT
- Access Tokens
- Claims
- Authentication Flow

---

## Phase 3 - User Identity Propagation

Status: ⏳ Planned

Goals:

- Extract User Information
- Forward User Context

Headers:

```http
x-user-id
x-user-role
```

Benefits:

- Services remain stateless
- No JWT validation in every service

---

## Phase 4 - Rate Limiting

Status: ⏳ Planned

Goals:

- Protect APIs
- Prevent Abuse
- Redis-backed Counters

Examples:

```text
100 Requests / Minute
1000 Requests / Hour
```

Topics:

- Kong Rate Limiting Plugin
- Redis Integration

---

## Phase 5 - Logging

Status: ⏳ Planned

Goals:

- Request Logging
- Error Logging
- Audit Trails

Tools:

- Kong Logging Plugins
- Loki

---

## Phase 6 - Monitoring & Metrics

Status: ⏳ Planned

Goals:

- Application Monitoring
- Gateway Monitoring

Tools:

- Prometheus
- Grafana

Metrics:

- Request Count
- Error Rate
- Latency
- Throughput

Architecture:

```text
Kong
   |
Prometheus
   |
Grafana
```

---

## Phase 7 - Distributed Tracing

Status: ⏳ Planned

Tools:

- OpenTelemetry
- Jaeger

Benefits:

- End-to-End Request Tracking

Architecture:

```text
Client
   |
 Kong
   |
 User Service
   |
 Product Service
```

Single Trace ID across services.

---

## Phase 8 - Production Hardening

Status: ⏳ Planned

Topics:

- HTTPS
- TLS Certificates
- mTLS
- Secrets Management
- Vault Integration

---

## Phase 9 - Kubernetes Migration

Status: ⏳ Planned

Goals:

- Container Orchestration
- Kong Ingress Controller

Architecture:

```text
Internet
    |
Kong Ingress
    |
Kubernetes Services
    |
Pods
```

---

# Production Architecture Vision

```text
Internet
   |
Cloudflare
   |
Load Balancer
   |
Kong Cluster
   |
Redis Cluster
   |
Node.js Microservices
   |
PostgreSQL Cluster

Observability:
Prometheus
Grafana
Loki
OpenTelemetry

Security:
JWT
OAuth2
mTLS
Vault

Deployment:
Docker
Kubernetes
GitHub Actions
ArgoCD
```

---

# References

API Gateway Concepts

- Reverse Proxy
- Load Balancer
- API Gateway Pattern

Kong Concepts

- Services
- Routes
- Consumers
- Plugins
- Upstreams

---

# Author

Kong API Gateway Learning Project

Purpose:

Understand how enterprise-grade API Gateway architectures are designed, implemented, secured, monitored, and scaled in modern distributed systems.
