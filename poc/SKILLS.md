# ABC Insurance Claims Platform - Project Skills & Architecture Guide

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Patterns](#architecture-patterns)
4. [Routing Architecture](#routing-architecture)
5. [Feature Structure](#feature-structure)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Development Workflow](#development-workflow)
9. [Testing Strategy](#testing-strategy)
10. [Performance Optimization](#performance-optimization)
11. [Security Implementation](#security-implementation)
12. [Deployment & DevOps](#deployment--devops)

---

## Project Overview

### Purpose
ABC Insurance Claims Platform is a Proof of Concept (POC) for a modern, scalable claims management system designed to handle:
- **20,000+ insurance claims** with pagination and filtering
- **150MB-1GB documents** with progressive loading
- **Role-based access control** with OAuth 2.0/OIDC
- **Real-time document processing** with async job tracking

### Key Statistics
- **React Version**: 19.0.0 (Latest)
- **Build Tool**: Vite 5.0.0
- **UI Framework**: Material-UI 6.0.0
- **State Management**: TanStack Query 5.0.0 + React Local State
- **Testing**: Vitest + React Testing Library + Playwright
- **Languages**: TypeScript 5.3.0

---

## Technology Stack

### Frontend Framework
```
React 19.0.0
├── Functional Components with Hooks
├── Suspense for code splitting
├── Concurrent Features
└── Server Components ready
```

### Build & Development
```
Vite 5.0.0
├── Lightning-fast dev server (HMR)
├── Optimized production builds
├── Environment variables support
└── Plugin ecosystem
```

### UI & Styling
```
Material-UI 6.0.0
├── Pre-built enterprise components
├── Theme customization
├── Responsive design built-in
└── Accessibility (WCAG 2.1)

Emotion (CSS-in-JS)
├── Dynamic styling
├── Component scoping
└── Performance optimized
```

### State Management
```
TanStack Query 5.0.0
├── Server state caching
├── Automatic refetching
├── Pagination support
├── Error handling
└── Devtools integration

React Local State
├── UI state (modals, filters, selection)
├── Form state
└── Temporary UI data
```

### API Communication
```
Axios
├── HTTP client
├── Request/response interceptors
├── Timeout handling
└── Retry logic
```

### Testing
```
Vitest 1.0.0
├── Unit tests (Jest-compatible)
├── Lightning-fast execution
└── Module mocking

React Testing Library 14.0.0
├── Component testing
├── User-centric approach
└── Accessibility testing

Playwright 1.40.0
├── E2E testing
├── Cross-browser testing
└── Visual regression
```

---

## Architecture Patterns

### 1. Feature-Based Architecture

The application is organized by **feature domains**, not technical layers:

```
src/
├── features/                          # Feature modules
│   ├── claims/                        # Claims domain
│   │   ├── components/                # UI components specific to claims
│   │   ├── pages/                     # Page-level components
│   │   ├── hooks/                     # Custom hooks for claims logic
│   │   ├── services/                  # Claims API calls
│   │   ├── types/                     # TypeScript interfaces
│   │   ├── router/                    # Claims-specific routes
│   │   └── __tests__/                 # Claims feature tests
│   │
│   └── document-workspace/            # Document management domain
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       ├── router/
│       └── __tests__/
│
├── shared/                            # Shared across features
│   ├── components/                    # Reusable UI components
│   ├── hooks/                         # Shared custom hooks
│   ├── types/                         # Global types
│   └── utils/                         # Utility functions
│
├── router/                            # Main router configuration
│   └── routes.ts                      # Central route definitions
│
├── services/                          # Application-wide services
│   ├── api/                           # HTTP client setup
│   └── auth/                          # Authentication service
│
├── styles/                            # Global styles
│   └── index.css
│
├── pages/                             # Top-level pages (Home, 404)
│   ├── Home.tsx
│   ├── NotFound.tsx
│   └── ...
│
├── App.tsx                            # Root component
└── main.tsx                           # Entry point
```

**Benefits:**
- ✅ Scalability: Easy to add new features
- ✅ Maintainability: Clear domain boundaries
- ✅ Testability: Feature isolation
- ✅ Discoverability: Find related code quickly
- ✅ Team collaboration: Different teams own different features

### 2. Separation of Concerns

```
┌─────────────────────────────────────────────┐
│ Pages Layer (src/pages/, features/*/pages/)  │
│ - Route handlers                             │
│ - Data fetching setup                        │
│ - Layout composition                         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Components Layer (src/*/components/)         │
│ - UI rendering                               │
│ - User interactions                          │
│ - State lifting                              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Hooks Layer (src/*/hooks/)                   │
│ - Business logic                             │
│ - Data fetching (TanStack Query)            │
│ - State management                           │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Services Layer (src/*/services/)             │
│ - API calls                                  │
│ - External integrations                      │
│ - Business rules                             │
└─────────────────────────────────────────────┘
```

---

## Routing Architecture

### 1. Centralized Router (`src/router/routes.ts`)

The main router configuration that composes all feature routes:

```typescript
// Main router configuration
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/claims',
    element: <ClaimsPage />,
  },
  {
    path: '/claims/:claimId',
    element: <ClaimDetailsPage />,
  },
  // ... more routes
]

// Type-safe route constants
export const ROUTES = {
  HOME: '/',
  CLAIMS: '/claims',
  CLAIM_DETAILS: '/claims/:claimId',
  DOCUMENTS: '/documents',
  // ...
}

// Navigation helpers
export const navigationHelpers = {
  getClaimDetailsPath: (claimId: string) => `/claims/${claimId}`,
  getClaimDocumentsPath: (claimId: string) => `/claim/${claimId}/documents`,
}
```

**Usage in components:**
```typescript
import { useNavigate } from 'react-router-dom'
import { navigationHelpers } from '@/router/routes'

function ClaimCard({ claim }) {
  const navigate = useNavigate()
  
  return (
    <Button onClick={() => 
      navigate(navigationHelpers.getClaimDetailsPath(claim.id))
    }>
      View Details
    </Button>
  )
}
```

### 2. Feature-Specific Routers

Each feature module has its own router configuration:

#### Claims Router (`src/features/claims/router/index.ts`)

```typescript
export const CLAIMS_ROUTES = {
  BASE: '/claims',
  DETAILS: '/claims/:claimId',
}

export const claimsRoutes: RouteObject[] = [
  {
    path: 'claims',
    children: [
      {
        index: true,
        element: <ClaimsPage />,
      },
      {
        path: ':claimId',
        element: <ClaimDetailsPage />,
      },
    ],
  },
]

export const claimsNavigationHelpers = {
  getClaimDetailsPath: (claimId: string) => `/claims/${claimId}`,
  getClaimsListPath: () => '/claims',
}
```

#### Document Router (`src/features/document-workspace/router/index.ts`)

```typescript
export const DOCUMENT_ROUTES = {
  BASE: '/documents',
  BY_CLAIM: '/claim/:claimId/documents',
}

export const documentRoutes: RouteObject[] = [
  {
    path: 'documents',
    element: <DocumentWorkspacePage />,
  },
  {
    path: 'claim/:claimId/documents',
    element: <DocumentWorkspacePage />,
  },
]

export const documentNavigationHelpers = {
  getClaimDocumentsPath: (claimId: string) => `/claim/${claimId}/documents`,
  getDocumentsPath: () => '/documents',
}
```

### 3. Route Composition Pattern

Routes can be dynamically composed from features:

```typescript
// Future: Compose routes from features
import { claimsRoutes } from '@/features/claims/router'
import { documentRoutes } from '@/features/document-workspace/router'

export const composedRoutes = [
  homeRoute,
  ...claimsRoutes,
  ...documentRoutes,
  notFoundRoute,
]
```

### 4. Code Splitting with Lazy Loading

Routes automatically benefit from code splitting:

```typescript
// src/router/routes.ts
const HomePage = lazy(() => import('@/pages/Home'))
const ClaimsPage = lazy(() => import('@/pages/Claims'))

// Routes with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
)

export const routes: RouteObject[] = [
  {
    path: '/',
    element: withSuspense(HomePage),
  },
]
```

**Result:** Each route's code is only downloaded when navigated to!

### 5. Route Structure Overview

```
HOME (/)
├── LANDING PAGE
│   ├── Version Info
│   └── Feature Navigation
│
CLAIMS (/claims)
├── CLAIMS LIST
│   ├── Grid with Pagination
│   ├── Server-side Filtering
│   └── Sorting
│
CLAIM DETAILS (/claims/:claimId)
├── Claim Information
├── Status Timeline
├── Actions (Edit, Delete)
└── Link to Documents
│
DOCUMENTS (/documents)
├── Document Workspace
├── Upload Area
└── Document List
│
CLAIM DOCUMENTS (/claim/:claimId/documents)
├── Claim-specific Documents
└── Document Operations
│
404 (*)
└── NOT FOUND PAGE
```

---

## Feature Structure

### Claims Feature

**Location:** `src/features/claims/`

**Structure:**
```
claims/
├── router/
│   └── index.ts                    # Claims-specific routes
├── components/
│   └── index.ts                    # Claims UI components
├── pages/
│   ├── index.tsx                   # Claims list page
│   └── ClaimDetails.tsx            # Claim details page
├── hooks/
│   └── index.ts                    # useClaimsQuery, useUpdateClaim, etc.
├── services/
│   └── index.ts                    # claimsService (API calls)
├── types/
│   └── index.ts                    # Claim, ClaimFilter interfaces
└── __tests__/
    ├── components.test.tsx
    ├── hooks.test.ts
    └── services.test.ts
```

**Key Responsibilities:**
- Display claims grid (20,000+ records)
- Server-side pagination, filtering, sorting
- Claim details view
- CRUD operations on claims
- Document linking

**Example Hook:**
```typescript
// src/features/claims/hooks/index.ts
export function useClaimsQuery(filters: ClaimFilter) {
  return useQuery({
    queryKey: ['claims', filters],
    queryFn: () => claimsService.fetchClaims(filters),
    staleTime: 5 * 60 * 1000,
  })
}

export function useUpdateClaimMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data) => claimsService.updateClaim(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] })
    },
  })
}
```

### Document Workspace Feature

**Location:** `src/features/document-workspace/`

**Structure:**
```
document-workspace/
├── router/
│   └── index.ts                    # Document routes
├── components/
│   └── index.ts                    # Document UI components
├── pages/
│   └── index.tsx                   # Document workspace page
├── hooks/
│   └── index.ts                    # useDocuments, useDocument, etc.
├── services/
│   └── index.ts                    # documentService (API calls)
├── types/
│   └── index.ts                    # Document, DocumentContent interfaces
└── __tests__/
    ├── components.test.tsx
    ├── hooks.test.ts
    └── services.test.ts
```

**Key Responsibilities:**
- Display documents with progressive loading
- Document upload/download
- Document operations (split, merge, delete)
- Metadata management
- Large file handling (150MB-1GB)

**Example Hook:**
```typescript
// src/features/document-workspace/hooks/index.ts
export function useDocumentsQuery(claimId?: string) {
  return useQuery({
    queryKey: ['documents', claimId],
    queryFn: () => documentService.fetchDocuments(claimId),
  })
}

export function useDocumentContent(documentId: string) {
  return useQuery({
    queryKey: ['document', documentId, 'content'],
    queryFn: () => documentService.getDocumentContent(documentId),
    staleTime: Infinity, // Content doesn't change
  })
}
```

---

## State Management

### Server State (TanStack Query)

Manages API data and server synchronization:

```typescript
// Queries (read data)
const { data: claims, isLoading, error } = useClaimsQuery(filters)
const { data: document } = useDocumentContent(docId)

// Mutations (write data)
const updateMutation = useUpdateClaimMutation()
updateMutation.mutate({ id: '123', status: 'Approved' })

// Cache management
queryClient.invalidateQueries({ queryKey: ['claims'] })
queryClient.prefetchQuery({
  queryKey: ['claims', nextPageFilters],
  queryFn: () => claimsService.fetchClaims(nextPageFilters),
})
```

**Benefits:**
- ✅ Automatic caching
- ✅ Deduplication
- ✅ Background refetching
- ✅ Built-in pagination support
- ✅ Error handling

### UI State (React Hooks)

Manages local UI state:

```typescript
// Component state
const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
const [sortBy, setSortBy] = useState('date')
const [filterOpen, setFilterOpen] = useState(false)

// Form state
const [formData, setFormData] = useState({ name: '', email: '' })
```

### Separation Strategy

```
┌─────────────────────────────────┐
│ TanStack Query (Server State)    │
│ - API responses                  │
│ - Cached data                    │
│ - Loading states                 │
│ - Error states                   │
└─────────────────────────────────┘
              ↑
       ┌──────┴──────┐
       │             │
    Pages    Components
       │             │
       └──────┬──────┘
              ↓
┌─────────────────────────────────┐
│ React Hooks (UI State)           │
│ - Modal open/close               │
│ - Sort/filter selection          │
│ - Form input values              │
│ - Temporary UI data              │
└─────────────────────────────────┘
```

---

## API Integration

### HTTP Client Setup

**Location:** `src/services/api/index.ts`

```typescript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 30000,
})

// Request interceptor (e.g., add auth token)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor (e.g., handle 401 errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

### Service Layer Pattern

```typescript
// src/features/claims/services/index.ts
import apiClient from '@/services/api'

export const claimsService = {
  async fetchClaims(filters: ClaimFilter): Promise<PagedResponse<Claim>> {
    const response = await apiClient.get('/claims', { params: filters })
    return response.data
  },

  async getClaim(claimId: string): Promise<Claim> {
    const response = await apiClient.get(`/claims/${claimId}`)
    return response.data
  },

  async updateClaim(id: string, data: Partial<Claim>): Promise<Claim> {
    const response = await apiClient.put(`/claims/${id}`, data)
    return response.data
  },

  async deleteClaim(id: string): Promise<void> {
    await apiClient.delete(`/claims/${id}`)
  },
}
```

### Error Handling

```typescript
// Centralized error handler
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}

// Usage in components
try {
  await claimsService.updateClaim(id, data)
  showSuccessNotification('Claim updated')
} catch (error) {
  showErrorNotification(getErrorMessage(error))
}
```

---

## Development Workflow

### 1. Starting Development

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your config

# Start dev server
npm run dev
# Opens http://localhost:5173 with HMR enabled
```

### 2. Adding a New Feature

```bash
# 1. Create feature directory
src/features/new-feature/
├── router/
│   └── index.ts           # Feature routes
├── components/
│   └── index.ts           # UI components
├── pages/
│   └── index.tsx          # Page components
├── hooks/
│   └── index.ts           # Custom hooks
├── services/
│   └── index.ts           # API service
├── types/
│   └── index.ts           # TypeScript types
└── __tests__/
    └── ...                # Feature tests

# 2. Create router configuration
# Define routes in src/features/new-feature/router/index.ts

# 3. Create pages
# Implement feature pages using components and hooks

# 4. Create hooks
# Implement useNewFeatureQuery, useMutations, etc.

# 5. Create services
# Implement API calls in service

# 6. Compose routes
# Add feature routes to main router
```

### 3. Code Organization Rules

**✅ DO:**
- Keep related code together in features
- Co-locate components, hooks, and services
- Use path aliases (@/) for imports
- Follow naming conventions
- Write type-safe code

**❌ DON'T:**
- Mix business logic with UI
- Import from distant features directly
- Create deep nesting (max 3 levels)
- Use any types in TypeScript
- Mix server state and UI state

### 4. Import Path Aliases

```typescript
// ✅ Good: Using path aliases
import { useClaimsQuery } from '@/features/claims/hooks'
import { Layout } from '@/shared/components'
import { navigationHelpers } from '@/router/routes'

// ❌ Bad: Using relative paths
import { useClaimsQuery } from '../../../features/claims/hooks'
import { Layout } from '../../../../shared/components'
```

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

**Location:** `src/**/__tests__/`

```typescript
// Component test
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClaimsGrid } from '@/features/claims/components'

describe('ClaimsGrid', () => {
  it('renders claims list', () => {
    const claims = [
      { id: '1', claimant: 'John', amount: '$100' }
    ]
    render(<ClaimsGrid claims={claims} />)
    expect(screen.getByText('John')).toBeInTheDocument()
  })

  it('calls onEdit when edit button clicked', async () => {
    const onEdit = vi.fn()
    render(<ClaimsGrid claims={[...]} onEdit={onEdit} />)
    await userEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(onEdit).toHaveBeenCalled()
  })
})

// Hook test
import { renderHook, waitFor } from '@testing-library/react'
import { useClaimsQuery } from '@/features/claims/hooks'

describe('useClaimsQuery', () => {
  it('fetches claims data', async () => {
    const { result } = renderHook(() => useClaimsQuery({}), {
      wrapper: QueryClientProvider,
    })
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
  })
})
```

**Run tests:**
```bash
npm run test              # Run all tests
npm run test:ui          # Interactive test UI
npm run test:coverage    # Coverage report
```

### E2E Tests (Playwright)

**Location:** `tests/e2e/`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Claims Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/claims')
  })

  test('can view and filter claims', async ({ page }) => {
    // Load page
    await page.waitForLoadState('networkidle')
    
    // Check grid is visible
    const grid = page.getByRole('table')
    await expect(grid).toBeVisible()
    
    // Click a claim
    await page.getByText(/CLM-000001/).click()
    
    // Check details page loaded
    await expect(page).toHaveURL(/\/claims\/CLM-000001/)
  })
})
```

**Run E2E tests:**
```bash
npm run test:e2e        # Run all E2E tests
npm run test:e2e:ui     # Interactive E2E testing
```

---

## Performance Optimization

### 1. Code Splitting

- Lazy load routes (automatic via `React.lazy()`)
- Result: ~50KB per page download on demand

```typescript
const ClaimsPage = lazy(() => import('./pages/Claims'))
const DocumentWorkspacePage = lazy(() => import('./pages/DocumentWorkspace'))
```

### 2. Image & Asset Optimization

- Use modern formats (WebP, AVIF)
- Lazy load images with IntersectionObserver
- Compress assets in build

### 3. Query Optimization

**Claims Grid (20,000+ records):**
```typescript
// Server-side pagination
const { data } = useClaimsQuery({
  page: currentPage,
  limit: 10,
  sortBy: 'date',
  filters: { status: 'open' }
})

// Client-side virtualization
import { FixedSizeList } from 'react-window'
<FixedSizeList
  height={600}
  itemCount={claims.length}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => <ClaimRow style={style} claim={claims[index]} />}
</FixedSizeList>
```

**Large Documents (150MB-1GB):**
```typescript
// Progressive loading
const { data: metadata } = useDocumentMetadata(docId) // ~1KB
const { data: content } = useDocumentContent(docId, {
  pageStart: 0,
  pageEnd: 10,
}) // Load 10 pages at a time

// Web Worker for heavy processing
const worker = new Worker('/pdf-processor.js')
worker.postMessage({ documentData })
worker.onmessage = (e) => setProcessedData(e.data)
```

### 4. Caching Strategy

```typescript
// Aggressively cache stable data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 minutes
      gcTime: 1000 * 60 * 10,          // Keep in memory 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,      // Don't refetch on tab focus
    },
  },
})
```

### 5. Build Optimization

```bash
npm run build

# Outputs:
# dist/index.html       (~1.2KB gzipped)
# dist/assets/app.js    (~250KB gzipped with all features)
# dist/assets/claims.js (~50KB lazy loaded)
# dist/assets/docs.js   (~40KB lazy loaded)
```

---

## Security Implementation

### 1. Authentication (OAuth 2.0/OIDC)

```typescript
// src/services/auth/index.ts
export const authService = {
  async initializeAuth(): Promise<void> {
    // Azure Entra ID configuration
    const config = {
      clientId: process.env.VITE_AUTH_CLIENT_ID,
      authority: process.env.VITE_AUTH_AUTHORITY,
      redirectUri: process.env.VITE_AUTH_REDIRECT_URI,
    }
    // TODO: Initialize MSAL or similar library
  },

  async getAccessToken(): Promise<string> {
    // Retrieve cached token or refresh if expired
  },

  async login(): Promise<void> {
    // Redirect to OAuth provider
  },

  async logout(): Promise<void> {
    // Clear tokens and redirect
  },
}
```

### 2. Authorization (RBAC)

```typescript
// Backend enforces permissions
// Frontend shows/hides UI based on permissions

function ClaimActions({ claim, permissions }) {
  return (
    <>
      {permissions.includes('claim:edit') && (
        <Button onClick={() => editClaim(claim.id)}>Edit</Button>
      )}
      {permissions.includes('claim:delete') && (
        <Button onClick={() => deleteClaim(claim.id)}>Delete</Button>
      )}
    </>
  )
}
```

### 3. Secure API Communication

```typescript
// HTTPS enforced
// CORS configured properly
// CSP headers set
// XSS prevention via React escaping
// CSRF tokens for mutations
```

### 4. Sensitive Data Protection

```typescript
// Never log sensitive data
console.log(claim) // ❌ Don't do this

// Sanitize inputs
function sanitizeHtml(html: string): string {
  const parser = new DOMParser()
  return parser.parseFromString(html, 'text/html').body.textContent || ''
}

// Secure local storage
localStorage.setItem('token', accessToken) // ✅ Only for non-sensitive data
// Use memory for sensitive tokens
```

---

## Deployment & DevOps

### Build & Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Test production build locally
npm run preview

# Deployment (update with your CI/CD)
# GitHub Actions / Azure Pipelines / Jenkins
```

### Environment Configuration

**.env.example:**
```env
# API
VITE_API_BASE_URL=https://api.example.com/api

# Auth
VITE_AUTH_AUTHORITY=https://login.microsoftonline.com/{tenant-id}
VITE_AUTH_CLIENT_ID=your-client-id
VITE_AUTH_REDIRECT_URI=https://app.example.com/auth/callback

# App
VITE_APP_ENV=production
VITE_LOG_LEVEL=info
```

### Performance Monitoring

```typescript
// Track Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Unit tests
npm run test:ui          # Test UI
npm run test:coverage    # Coverage report
npm run test:e2e         # E2E tests
npm run test:e2e:ui      # E2E test UI

# Code Quality
npm run type-check       # TypeScript check
npm run lint             # ESLint

# File Structure
# Feature: src/features/{feature-name}/
# Pages: src/pages/
# Router: src/router/
# Services: src/services/
# Shared: src/shared/
# Types: */types/
```

### Useful Path Aliases

```typescript
@/                   // src/
@features/           // src/features/
@shared/             // src/shared/
@services/           // src/services/
@types/              // src/types/
@styles/             // src/styles/
```

### TanStack Query Patterns

```typescript
// Queries
const { data, isLoading, error } = useQuery({ ... })

// Mutations
const { mutate, isPending } = useMutation({ ... })

// Invalidation
queryClient.invalidateQueries({ queryKey: ['claims'] })

// Prefetching
queryClient.prefetchQuery({ queryKey: ['claims'], queryFn: ... })
```

### React Router Patterns

```typescript
// Navigation
const navigate = useNavigate()
navigate('/path')

// Parameters
const { claimId } = useParams<{ claimId: string }>()

// Search params
const [searchParams, setSearchParams] = useSearchParams()
const page = searchParams.get('page')
```

---

## Next Steps

1. **Implement Claims Grid**
   - API integration
   - Server-side pagination
   - Filtering and sorting
   - Selection and actions

2. **Implement Document Viewer**
   - Progressive loading
   - Page navigation
   - Annotations
   - Upload/Download

3. **Add Authentication**
   - Azure Entra ID integration
   - Token refresh
   - Protected routes

4. **Expand Testing**
   - 80%+ code coverage
   - Critical path E2E tests
   - Performance tests

5. **Performance Tuning**
   - Profile bundle size
   - Analyze Lighthouse scores
   - Optimize queries

---

## Resources & Documentation

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)
- [Vite Guide](https://vitejs.dev)
- [Material-UI](https://mui.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev)

---

**Last Updated:** August 12, 2024
**POC Version:** 0.1.0
**Status:** 🟢 Ready for Development
