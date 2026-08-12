# Grid Performance Strategy

## 📋 Table of Contents

1. [Grid Requirements](#1-grid-requirements)
2. [Data Fetching Strategy](#2-data-fetching-strategy)
3. [Pagination vs Virtualization](#3-pagination-vs-virtualization)
4. [Rendering Strategy](#4-rendering-strategy)
5. [Filtering and Sorting](#5-filtering-and-sorting)
6. [Server State and Caching](#6-server-state-and-caching)
7. [Row Actions](#7-row-actions)
8. [Handling Mutations](#8-handling-mutations)
9. [Loading and Error States](#9-loading-and-error-states)
10. [Performance Considerations](#10-performance-considerations)
11. [Recommended Approach](#11-recommended-approach)

---

## 1. Grid Requirements

The claims dashboard needs to support:

- 20,000+ claim records
- Server-side filtering
- Server-side sorting
- Pagination
- Row-level actions
- Claim assignment
- Permission-based actions
- Fast navigation between claims

The main goal is to keep the browser responsive without loading the complete dataset into memory.

---

## 2. Data Fetching Strategy

The frontend should request only the records required for the current view.

```
User
  |
  | Filter / Sort / Page
  v
Claims Grid
  |
  | Query Parameters
  v
Claims API
  |
  v
Database
  |
  | Filter + Sort + Pagination
  v
Claims API
  |
  v
Claims Grid
```

### Example

`GET /api/v1/claims?page=1&pageSize=50&sortBy=createdAt&sortOrder=desc&status=open`

The backend performs filtering, sorting, and pagination before returning the result.

This avoids transferring thousands of unnecessary records to the browser.

---

## 3. Pagination vs Virtualization

### Pagination

**Pagination** is useful because it limits the amount of data returned by the API.

```
20,000 records
      ↓
50 records per request
      ↓
Only current page loaded
```

**Advantages:**

- Lower network usage
- Lower browser memory usage
- Simple API contract
- Easy navigation
- Predictable performance

### Virtualization

**Virtualization** limits the number of DOM elements rendered at a time.

```
50 loaded rows
      ↓
Only visible rows rendered
      ↓
Rows outside viewport are not mounted
```

**Advantages:**

- Smaller DOM
- Lower rendering cost
- Smooth scrolling
- Better React performance

### Recommended Approach

Use **server-side pagination** + **client-side row virtualization.**

- Pagination controls how much data is fetched
- Virtualization controls how much of the fetched data is rendered
- They solve different problems and can be used together
---

## 4. Rendering Strategy

The grid should avoid rendering the complete result set into the DOM.

### Recommended Approach

```
API Response
     |
     v
Current Page Data
     |
     v
Virtualized Grid
     |
     +-- Visible Rows
     +-- Small Rendering Window
     +-- Reuse Row Components
```

**Guidelines:**

- Row components should remain lightweight
- Avoid placing expensive calculations or large component trees inside every row

### Best Practices

- Memoize stable row components
- Avoid unnecessary callbacks and object creation
- Keep row state local
- Avoid global state updates for individual row interactions
- Render expensive UI such as dialogs outside the row tree

---

## 5. Filtering and Sorting

Filtering and sorting should be performed on the server.

### Filtering

```
User enters filter
       ↓
Debounce input
       ↓
API Request
       ↓
Server-side filtering
       ↓
Updated result set
```

For text search, a short debounce prevents an API request on every keystroke.

#### Example

User types: `"CLAIM123"`

Instead of:
```
C → API
CL → API
CLA → API
```

Use:
```
CLAIM123
   ↓
Debounce
   ↓
API
```

### Sorting

Sorting should be represented as API parameters:

```
sortBy=createdAt
sortOrder=desc
```

The backend applies the sorting before returning the result. This ensures consistent results across pages.

---

## 6. Server State and Caching

TanStack Query can be used to manage server state.

### Example Query Key

```
claims:
  page
  pageSize
  filters
  sort
```

Changing any of these values creates a new query state.

### Recommended Caching Strategy

- Cache recent claim queries
- Keep stale data for a short period
- Refetch when required
- Invalidate affected queries after mutations

### Example

```
Page 1
  ↓
Page 2
  ↓
Page 3
  ↓
Back to Page 2
  ↓
Use cached data where valid
```

The cache should not become a replacement for the backend source of truth.

---

## 7. Row Actions

Row-level actions such as:

- Edit
- Delete
- Assign

should be permission-aware.

### Permission-Aware UI

The frontend can determine whether an action should be:

- Visible
- Disabled
- Hidden

However, the backend must always validate the permission when the action is executed.

```
Frontend
  |
  | User clicks Delete
  v
Claims API
  |
  | Authorization check
  v
Delete / Reject
```

**Security Note:** The UI should never assume that hiding an action provides security.

---

## 8. Handling Mutations

For operations such as assignment or deletion:

```
User Action
    ↓
API Request
    ↓
Backend Validation + Authorization
    ↓
Mutation
    ↓
Success
    ↓
Invalidate / Refresh affected query
```

### Optimistic vs Pessimistic

Optimistic updates can be used for low-risk UI interactions where rollback is straightforward.

For destructive operations such as delete, a **pessimistic** approach is safer:

```
Delete
  ↓
Confirm
  ↓
Backend
  ↓
Success
  ↓
Update Grid
```

This prevents the UI from showing a state that the backend has not actually committed.

---

## 9. Loading and Error States

The grid should distinguish between:

### Initial Loading

Display: "Loading Claims..."

Use a skeleton or appropriate loading state rather than rendering an empty grid.

### Background Refetch

Keep existing data visible while the next request is in progress.

```
Existing Data
     +
Small Loading Indicator
```

This avoids unnecessary screen flickering.

### Error States

**Provide:**

- Clear error message
- Retry action
- Preserve existing data where possible

**Example:**

```
Unable to load claims.

[Retry]
```

---

## 10. Performance Considerations

### Avoid

- Loading all 20,000+ records into the browser
- Client-side sorting of the complete dataset
- Client-side filtering of the complete dataset
- Rendering thousands of DOM rows
- Storing large objects unnecessarily in global state
- Re-rendering the entire grid after a single row change
- Fetching data repeatedly for the same query
- Performing expensive calculations during every render

### Preferred Strategy

```
Server-side
├── Filtering
├── Sorting
└── Pagination

Client-side
├── Virtualized Rendering
├── Lightweight UI State
├── Query Caching
└── Efficient Row Updates
```

---

## 11. Recommended Approach

For the 20,000+ claims requirement, the recommended strategy is:

| Concern | Recommendation |
|---|---|
| Data retrieval | Server-side |
| Filtering | Server-side |
| Sorting | Server-side |
| Pagination | Server-side |
| Rendering | Virtualization |
| Server state | TanStack Query |
| Local UI state | React state / lightweight store |
| Search | Debounced server-side query |
| Row actions | Permission-aware UI + backend authorization |
| Mutations | Backend validation + query invalidation |
| Loading | Skeleton / background loading |
| Errors | Retry + recovery |