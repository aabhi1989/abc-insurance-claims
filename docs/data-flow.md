# Data Flow & Responsibilities

## 📋 Table of Contents

1. [Claims Data Flow](#1-claims-data-flow)
2. [Document Data Flow](#2-document-data-flow)
3. [Async Processing Flow](#3-async-processing-flow)
4. [Frontend vs Backend Responsibilities](#4-frontend-vs-backend-responsibilities)

---

## 1. Claims Data Flow

The browser should never request all 20,000+ claims at once.

```
User
  |
  | Search / Filter / Sort
  v
Claims Grid
  |
  | GET /api/v1/claims
  v
Claims API
  |
  | Server-side filtering / sorting / pagination
  v
Claims DB
  |
  v
API Response
  |
  v
Claims Grid
```

**Key Point:** Only the records required for the current view are returned to the browser.

The frontend is responsible for displaying the data efficiently, while the backend is responsible for retrieving the correct dataset.

---

## 2. Document Data Flow

When a user selects a claim, the application should first load document metadata.

### Initial Load - Metadata First

```
Claims Grid
    |
    | Select Claim
    v
Claim Workspace
    |
    | GET /claims/{claimId}/documents
    v
Document API
    |
    v
Document Metadata DB
    |
    v
Document Metadata
    |
    v
Document Workspace
```

### Progressive Content Loading

**The actual document content is loaded only when required.**

```
Document Workspace
        |
        | Request required content
        v
   Document API
        |
        v
   Object Storage
        |
        | Partial / Progressive Access
        v
   Document Viewer
```

**Design Goal:** Avoid downloading the complete 1 GB document during initial workspace loading.

---

## 3. Async Processing Flow

Operations such as split and merge can be expensive and should not block the API request or browser UI.

```
User
  |
  | Split / Merge
  v
Document Workspace
  |
  | POST operation
  v
Document API
  |
  | Create Job
  v
Job Queue
  |
  v
Document Worker
  |
  | Process document
  v
Object Storage
  |
  | Store new version
  v
Document Metadata
  |
  v
Job Status = Completed
  |
  v
Document Workspace
```

**UI Feedback:** The UI shows the processing state and allows the user to understand whether the operation is queued, running, completed, or failed.

---

## 4. Frontend vs Backend Responsibilities

| Responsibility | Frontend | Backend |
|---|---|---|
| Authentication | Consume authenticated session | Authenticate user |
| Authorization | Show / hide / disable actions | Enforce authorization |
| Claim filtering | Send filter criteria | Execute filtering |
| Claim sorting | Send sort criteria | Execute sorting |
| Pagination | Manage current view | Return requested records |
| Grid rendering | Efficient rendering | Provide data |
| Document metadata | Display / cache | Source of truth |
| Document content | Render required content | Control access |
| Split / Merge | Initiate operation | Process operation |
| Validation | Basic UX validation | Authoritative validation |
| Business rules | No | Yes |
| Progress | Display status | Track job state |
| Audit / logging | Provide context if required | Persist authoritative events |
