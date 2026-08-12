# State, Reliability and Scalability

## 📋 Table of Contents

1. [State Management](#1-state-management)
2. [Data Consistency](#2-data-consistency)
3. [Error Handling](#3-error-handling)
4. [Long-Running Operations](#4-long-running-operations)
5. [Retry & Recovery](#5-retry--recovery)
6. [Observability](#6-observability)
7. [Scalability](#7-scalability)

---

## 1. State Management

Separate **server state** from **UI state**.

### Server State

**TanStack Query** → claims, documents, permissions and API state

### UI State

**React state / lightweight store** → filters, selected rows, dialogs and UI state

### Best Practice

Avoid storing large document binaries in global React state.

```
Server State → TanStack Query
UI State     → React State / Lightweight Store
```

---

## 2. Data Consistency

Document operations such as split, merge, and delete must maintain a consistent document state.

### Mechanisms

- Document versions
- Backend validation
- Optimistic concurrency / version checks
- Query invalidation after successful mutations 

```
Document v1
   ↓
Operation
   ↓
Backend Validation
   ↓
Document v2
   ↓
Refresh / Update UI
```

---

## 3. Error Handling

Errors should be handled at both API and UI levels.

### UI Requirements

- Clear error messages
- Retry actions
- Loading / progress states
- Safe recovery
- Preservation of existing data where possible

### General Principle

Long-running operations should not leave the user uncertain about the current state.

---

## 4. Long-Running Operations

Split, merge and other heavy document operations should run asynchronously.

```
Request
  ↓
Job Created
  ↓
Queued
  ↓
Processing
  ↓
Completed / Failed
```

**Status Tracking:** The UI can track job status through polling, SSE, WebSocket, or an equivalent mechanism.

---

## 5. Retry & Recovery

Retries should be applied only where the operation is safe to repeat.

### Mechanisms

- Idempotency keys for retryable operations
- Job status tracking
- Controlled retry limits
- Clear failure states
- Cancellation where supported

### Principle

For destructive operations, the backend remains responsible for final state.

---

## 6. Observability

The platform should provide centralized:

- Application logging
- Error tracking
- Metrics
- Distributed tracing
- Audit logging

### Important Metrics

- API response time
- Failed requests
- Document processing time
- Queue / job failures
- Active users and workloads

### Reference Solution

Azure Application Insights can be used as the reference monitoring solution.

---

## 7. Scalability

The architecture should scale independently across major workloads.

```
Users
  ↓
Load Balancer / Gateway
  ↓
Stateless APIs
  ├── Claims Service
  └── Document Service
          ↓
      Job Queue
          ↓
   Scalable Workers
```

### Key Strategies

- Stateless APIs for horizontal scaling
- Object storage for large documents
- Database indexing and efficient queries
- Queue-based document processing
- Independent worker scaling
- Caching where appropriate

---

**Summary:** Keep UI state lightweight, maintain backend-controlled consistency, process heavy operations asynchronously, and use stateless services + scalable storage + background workers to support growth in users, claims, documents and processing workloads.