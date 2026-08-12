# Architecture Document

## Overview

This document covers the complete system architecture for the ABC Insurance Claims Platform.

## 📋 Table of Contents

1. [Architecture Principles](#1-architecture-principles)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Technology Stack](#4-technology-stack)
5. [Backend Service Boundaries](#5-backend-service-boundaries)
6. [API Contract](#6-api-contract)
7. [Data & Storage Architecture](#7-data--storage-architecture)

---

## 1. Architecture Principles  

The architecture is designed around a few simple principles:

- Keep the UI responsive even when working with large datasets and documents.
- Keep filtering, sorting, authorization, and business rules on the backend.
- Do not load the complete 20,000+ claims or 1 GB document into the browser.
- Keep document binaries separate from transactional claim data.
- Move heavy document operations such as split and merge to asynchronous backend processing.
- Keep frontend components focused on presentation and user interaction.
- Make backend services independently scalable based on their workload.

---

## 2. High-Level Architecture

### System Flow

```
                     Enterprise User
                           |
                           v
                +-----------------------+
                |      React Web App    |
                | Claims + Documents    |
                +-----------+-----------+
                            |
                            | HTTPS / API
                            v
                +-----------------------+
                |   API Gateway / BFF   |
                +-----------+-----------+
                            |
          +-----------------+-----------------+
          |                 |                 |
          v                 v                 v
   +-------------+   +-------------+   +-------------+
   | Claims API  |   | Document API|   | Identity /  |
   |             |   |             |   | RBAC        |
   +------+------+   +------+------+   +-------------+
          |                 |
          v                 v
   +-------------+   +-------------+
   | Claims DB   |   | Document    |
   |             |   | Metadata DB |
   +-------------+   +------+------+
                            |
                            v
                     +-------------+
                     |   Object    |
                     |   Storage   |
                     +------+------+
                            |
                            v
                     +-------------+
                     | Job Queue   |
                     +------+------+
                            |
                            v
                  +--------------------+
                  | Document Workers   |
                  | Split / Merge etc. |
                  +--------------------+
```

### Key Principles

The browser communicates only through application APIs. It does not directly access databases, internal services, or document-processing workers.

---

## 3. Frontend Architecture

### Recommended Structure

I would choose **feature/module-based** architecture over a purely technical layer-based architecture.

```
src/
├── features/
│   ├── auth/
│   ├── claims/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── pages/
│   ├── documents/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── pages/
│   └── users/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
│
└── app/
    ├── routes/
    ├── providers/
    └── config/
```

### Claims Feature

**Responsible for:**

- Claims grid
- Search, filtering, and sorting
- Pagination
- Row actions
- Claim assignment
- Navigation to the document workspace

### Document Feature

**Responsible for:**

- Document viewer
- Page navigation
- Comments and annotations
- Document actions
- Processing status
- Error and recovery states

### Feature Separation

The claims feature should not contain document-processing logic. Similarly, document-specific logic should remain within the document feature.

---

## 4. Technology Stack

### Frontend

- **Framework:** React 19, TypeScript, Vite
- **UI Components:** Material UI (MUI)
- **State & Data:** TanStack Query + lightweight local UI state
- **Micro-Frontend:** Module Federation (where independent deployment is required)
- **Testing:** Vitest, React Testing Library, Playwright

### Backend

- **APIs:** REST APIs, Node.js / Python services
- **Data:** PostgreSQL + Object Storage (Azure Blob)
- **Async Processing:** Queue + background workers
- **Authentication:** OAuth 2.0 / OpenID Connect + Azure Entra ID

### Infrastructure

- **Cloud:** Azure / AWS 
- **Deployment:** Docker + Kubernetes / Azure managed services 
- **CI/CD:** GitHub Actions
- **Observability:** Application Insights / centralized logging and monitoring

---

## 5. Backend Service Boundaries

Backend services are separated by business responsibility rather than UI screens.

### Claims Service

- Claim search and retrieval
- Filtering, sorting, and pagination
- Claim updates
- Assignment

### Document Service

- Document metadata and access
- Document versions
- Document operations
- Document state

### Identity / Permission Service

- User identity
- Authentication / SSO
- Roles and permissions
- Access decisions

### Document Processing Service

Handles resource-intensive operations:

- Split
- Merge
- Document Format Transformation
- Document generation

These operations run asynchronously through background workers.

---

## 6. API Contract

Frontend and backend communicate through versioned APIs with consistent request, response, validation, and error contracts.

### Coverage

The API contract covers:

- Request and response models
- Filtering, sorting, and pagination
- Authentication and authorization
- Validation and error handling
- Document metadata
- Long-running job status
- Correlation / request IDs

### Claims API

**Endpoint:** `GET /api/v1/claims`

**Query Parameters:**
```
?page=1
&pageSize=50
&sortBy=createdAt
&sortOrder=desc
&status=open
&search=CL-1001
```

**Response:**
```json
{
  "items": [],
  "page": 1,
  "pageSize": 50,
  "totalCount": 20000
}
```

### Document API

**Endpoint:** `GET /api/v1/claims/{claimId}/documents`

Returns document metadata first instead of downloading the complete document.

### Document Operation API

**Endpoint:** `POST /api/v1/documents/{documentId}/operations`

**Response for long-running operations:**
```json
{
  "jobId": "JOB-12345",
  "status": "QUEUED"
}
```

### Track Operation Status

**Endpoint:** `GET /api/v1/jobs/{jobId}`

---

## 7. Data & Storage Architecture

Claim data, document metadata, and document binaries have different storage requirements.

### Claims Database

```
Claims DB
   ├── Claims
   ├── Assignment
   └── Claim Status
```

### Document Metadata Database

```
Document Metadata DB
   ├── Document ID
   ├── Claim ID
   ├── Version
   ├── Page Count
   ├── Size
   ├── Status
   └── Storage Reference
```

### Object Storage

```
Object Storage
   ├── Original Documents
   ├── Document Versions
   └── Processed Documents
```

### Design Principle

Large document binaries should be stored in object storage rather than the transactional database.