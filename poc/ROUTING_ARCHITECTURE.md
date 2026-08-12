# Routing Architecture Diagram

## Complete Routing Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    App.tsx (Root Component)                      │
│              ├─ QueryClientProvider (TanStack Query)             │
│              ├─ ThemeProvider (Material-UI)                      │
│              └─ BrowserRouter (React Router)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  src/router/routes.ts                            │
│           (Centralized Main Router Configuration)                │
│                                                                   │
│  export const routes: RouteObject[] = [                         │
│    { path: '/', element: <HomePage /> }                         │
│    { path: '/claims', element: <ClaimsPage /> }                │
│    { path: '/claims/:claimId', element: <ClaimDetailsPage /> }  │
│    { path: '/documents', element: <DocumentPage /> }            │
│    { path: '*', element: <NotFoundPage /> }                     │
│  ]                                                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
         ┌──────────┐  ┌──────────┐  ┌──────────┐
         │  Claims  │  │Documents │  │Shared    │
         │ Feature  │  │ Feature  │  │Utilities │
         └────┬─────┘  └────┬─────┘  └──────────┘
              │             │
              ▼             ▼
    ┌──────────────────┐  ┌──────────────────┐
    │ Claims Router    │  │Document Router   │
    │ (Feature Routes) │  │(Feature Routes)  │
    └────────┬─────────┘  └────────┬─────────┘
             │                     │
    ┌────────┴─────────┐  ┌────────┴─────────┐
    ▼                  ▼  ▼                  ▼
┌─────────┐      ┌──────────┐  ┌───────┐  ┌──────────┐
│ /claims │      │/claims/  │  │/documents  │/claim/
│ (List)  │      │:claimId  │  │(Workspace) │:id/docs
│         │      │(Details) │  │            │(Claim Docs)
└────┬────┘      └────┬─────┘  └───────┬─────┘  └──────────┘
     │                │               │              │
     ▼                ▼               ▼              ▼
  ┌─────────────────────────────────────────────────────┐
  │              Layout Component                        │
  │  ├─ AppBar (Header with Navigation)                │
  │  ├─ Drawer (Mobile Menu)                           │
  │  ├─ Main Content (Route Content)                   │
  │  └─ Footer                                          │
  └────────────────────┬────────────────────────────────┘
                       │
                       ▼
          ┌────────────────────────┐
          │   Page Components      │
          │  (Render Feature UIs)  │
          └────────────────────────┘
```

---

## Feature-Based Routing Structure

### Claims Feature Routing

```
src/features/claims/
│
├── router/
│   └── index.ts (DEFINES ROUTES)
│       │
│       ├─ CLAIMS_ROUTES (Path constants)
│       │  ├─ BASE: '/claims'
│       │  └─ DETAILS: '/claims/:claimId'
│       │
│       ├─ claimsRoutes (RouteObject[])
│       │  ├─ index: true → <ClaimsPage />
│       │  └─ :claimId → <ClaimDetailsPage />
│       │
│       └─ claimsNavigationHelpers
│          ├─ getClaimDetailsPath(claimId)
│          └─ getClaimsListPath()
│
├── pages/
│   ├─ index.tsx (Claims List Page)
│   │  ├─ useClaimsQuery (Fetch data)
│   │  ├─ useMutation (CRUD)
│   │  └─ ClaimsGrid (Component)
│   │
│   └─ ClaimDetails.tsx (Detail Page)
│      ├─ useParams (Get claimId from route)
│      ├─ useSingleClaimQuery (Fetch claim)
│      └─ ClaimForm (Component)
│
├── components/
│   └─ UI components specific to claims
│
├── hooks/
│   └─ useClaimsQuery, useUpdateClaim, etc.
│
└── services/
    └─ claimsService (API calls)
```

### Document Workspace Feature Routing

```
src/features/document-workspace/
│
├── router/
│   └── index.ts (DEFINES ROUTES)
│       │
│       ├─ DOCUMENT_ROUTES (Path constants)
│       │  ├─ BASE: '/documents'
│       │  └─ BY_CLAIM: '/claim/:claimId/documents'
│       │
│       ├─ documentRoutes (RouteObject[])
│       │  ├─ /documents → <DocumentWorkspacePage />
│       │  └─ /claim/:claimId/documents → <DocumentWorkspacePage />
│       │
│       └─ documentNavigationHelpers
│          ├─ getClaimDocumentsPath(claimId)
│          └─ getDocumentsPath()
│
├── pages/
│   └─ index.tsx (Document Workspace Page)
│      ├─ useParams (Get optional claimId)
│      ├─ useDocumentsQuery (Fetch documents)
│      ├─ useMutation (Upload, Delete)
│      └─ DocumentViewer (Component)
│
├── components/
│   └─ DocumentUpload, DocumentList, etc.
│
├── hooks/
│   └─ useDocumentsQuery, useDocument, etc.
│
└── services/
    └─ documentService (API calls)
```

---

## Navigation Flow Example

### Example 1: User Navigates to Claim Details

```
User clicks "View Claim" button
    ↓
Component uses navigationHelper
    ↓
navigate(navigationHelpers.getClaimDetailsPath('CLM-000123'))
    ↓
URL changes to /claims/CLM-000123
    ↓
Router matches route: /claims/:claimId
    ↓
<ClaimDetailsPage /> renders
    ↓
useParams hook extracts claimId
    ↓
useSingleClaimQuery('CLM-000123') fetches claim data
    ↓
Page displays claim information
```

### Example 2: Navigation from Claim to Documents

```
User opens claim details page
    ↓
User clicks "View Documents" button
    ↓
navigate(navigationHelpers.getClaimDocumentsPath('CLM-000123'))
    ↓
URL changes to /claim/CLM-000123/documents
    ↓
Router matches route: /claim/:claimId/documents
    ↓
<DocumentWorkspacePage /> renders with claimId
    ↓
useParams extracts claimId
    ↓
useDocumentsQuery(claimId) fetches claim-specific documents
    ↓
Page displays documents for this claim
```

---

## Import Pattern - Using Feature Routers

### Option 1: Direct Route Usage in Components

```typescript
// ✅ GOOD: Using centralized navigation helpers
import { navigationHelpers } from '@/router/routes'
import { useNavigate } from 'react-router-dom'

function ClaimCard({ claim }) {
  const navigate = useNavigate()
  
  return (
    <Button 
      onClick={() => navigate(navigationHelpers.getClaimDetailsPath(claim.id))}
    >
      View Details
    </Button>
  )
}
```

### Option 2: Feature-Specific Helpers

```typescript
// ✅ ALSO GOOD: Using feature-specific helpers for added clarity
import { claimsNavigationHelpers } from '@/features/claims/router'
import { documentNavigationHelpers } from '@/features/document-workspace/router'

function ClaimActions({ claim }) {
  const navigate = useNavigate()
  
  return (
    <>
      <Button onClick={() => 
        navigate(claimsNavigationHelpers.getClaimDetailsPath(claim.id))
      }>
        Edit Claim
      </Button>
      <Button onClick={() => 
        navigate(documentNavigationHelpers.getClaimDocumentsPath(claim.id))
      }>
        View Documents
      </Button>
    </>
  )
}
```

---

## Route Composition (Advanced)

### Dynamic Route Composition from Features

```typescript
// src/router/routes.ts

import { routes as homeRoutes } from '@/pages'
import { claimsRoutes } from '@/features/claims/router'
import { documentRoutes } from '@/features/document-workspace/router'

// Compose all routes
export const routes: RouteObject[] = [
  ...homeRoutes,
  ...claimsRoutes,
  ...documentRoutes,
  { path: '*', element: <NotFoundPage /> },
]
```

**Advantages:**
- ✅ Scalable: Add new features without touching main router
- ✅ Modular: Each feature owns its routes
- ✅ Maintainable: Change routes in one place

---

## Route Guards & Lazy Loading

### Lazy Loading with Suspense

```typescript
import { lazy, Suspense } from 'react'
import LoadingSpinner from '@/shared/components/LoadingSpinner'

const ClaimsPage = lazy(() => import('@/pages/Claims'))
const DocumentWorkspacePage = lazy(() => import('@/pages/DocumentWorkspace'))

// Wrap with suspense
export const routes: RouteObject[] = [
  {
    path: '/claims',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ClaimsPage />
      </Suspense>
    ),
  },
]
```

**Result:** Each route's code is code-split and only downloaded when needed!

### Protected Routes (Future)

```typescript
function ProtectedRoute({ element, requiredRole }: Props) {
  const { user, isLoading } = useAuth()
  
  if (isLoading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" />
  if (!hasRole(user, requiredRole)) return <Navigate to="/unauthorized" />
  
  return element
}

// Usage
{
  path: '/claims',
  element: <ProtectedRoute element={<ClaimsPage />} requiredRole="claims_admin" />
}
```

---

## Debugging Routes

### React Router DevTools

```typescript
// In App.tsx
import { useResetRecoilState } from 'recoil' // optional
import { useLocation } from 'react-router-dom'

export function RouteDebugger() {
  const location = useLocation()
  
  return (
    <div style={{ padding: '10px', bgcolor: '#f5f5f5' }}>
      <small>Current Route: {location.pathname}</small>
      <small>Search: {location.search}</small>
    </div>
  )
}

// Add to Layout in development
{process.env.NODE_ENV === 'development' && <RouteDebugger />}
```

### Inspect Routes in Browser

```typescript
// In browser console
window.__REACT_ROUTER_MATCHES__
window.__REACT_ROUTER_LOCATION__
```

---

## Summary: Feature Router Pattern

| Aspect | Details |
|--------|---------|
| **Central Router** | `src/router/routes.ts` - Manages all routes |
| **Feature Routers** | `src/features/*/router/` - Feature-specific routes |
| **Route Constants** | Type-safe path strings (ROUTES, CLAIMS_ROUTES, etc.) |
| **Navigation Helpers** | Functions to generate routes with parameters |
| **Code Splitting** | Lazy-loaded components per route |
| **Protected Routes** | Wrap with auth/permission checks |
| **Composition** | Combine feature routes into main router |

---

**Benefits of This Architecture:**
- ✅ Scalable: New features don't require main router changes
- ✅ Type-Safe: All route paths are constants
- ✅ Maintainable: Routes are co-located with features
- ✅ Performant: Code splitting per route
- ✅ Clear: Navigation is explicit and trackable
