# ABC Insurance Claims Platform - Frontend POC

Proof of Concept for a modern, scalable claims management system with document processing capabilities.

## 🎯 Quick Start - 30 seconds

```bash
npm install
npm run dev
# Opens at http://localhost:5173 with version info
```

## 📦 Tech Stack

- **React 19** - Modern UI framework with concurrent rendering
- **TypeScript** - Type-safe development
- **Vite 5** - Lightning-fast build tool & dev server
- **Material-UI 6** - Enterprise component library
- **TanStack Query 5** - Server state management & caching
- **Axios** - HTTP client
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

## Project Structure

```
src/
├── features/                    # Feature-based modules
│   ├── claims/                  # Claims management
│   │   ├── components/          # UI components
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # API calls
│   │   └── types/               # TypeScript types
│   └── document-workspace/      # Document management
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       └── types/
├── shared/                      # Shared utilities
│   ├── components/              # Reusable components
│   ├── hooks/                   # Shared hooks
│   ├── types/                   # Shared types
│   └── utils/                   # Utility functions
├── services/                    # Core services
│   ├── api/                     # HTTP client (Axios)
│   └── auth/                    # OAuth 2.0/OIDC
├── styles/                      # Global styles
├── App.tsx                      # Root component
└── main.tsx                     # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server (opens at http://localhost:5173)
npm run dev
```

The landing page displays version information for all key libraries:
- React version
- Vite version
- TypeScript version
- Material-UI version
- TanStack Query version
- Vitest version

### Commands

```bash
# Development
npm run dev           # Start dev server with HMR

# Production
npm run build         # Build for production
npm run preview       # Preview production build

# Testing
npm run test          # Run unit tests (Vitest)
npm run test:ui       # Run tests with UI
npm run test:coverage # Generate coverage report
npm run test:e2e      # Run E2E tests (Playwright)
npm run test:e2e:ui   # Run E2E tests with UI

# Quality
npm run type-check    # TypeScript validation
npm run lint          # ESLint validation
```

## Features - POC Scope (10 Deliverables)

### Claims Management
1. **Claims Grid** - Display 20,000+ claims with pagination, filtering, sorting
2. **Claim Details** - Individual claim information view
3. **Claim Actions** - Update, delete, status changes

### Document Workspace
4. **Document Viewer** - Progressive loading for 150MB-1GB documents
5. **Document Upload** - Upload documents to claims
6. **Document Operations** - Split, merge, delete actions

### System
7. **Authentication** - OAuth 2.0/OIDC with Azure Entra ID
8. **Authorization** - Role-based access control (RBAC)
9. **Error Handling** - User-friendly error messages
10. **Performance** - Server-side operations, client virtualization

## 🏗️ Architecture Principles

### Feature-Based Organization
- Each feature is self-contained (components, hooks, services, types)
- Minimal cross-feature dependencies
- Easier to test, develop, and maintain independently

### Separation of Concerns
- **Services Layer**: API calls and external integrations
- **Features Layer**: Business logic and UI
- **Shared Layer**: Reusable utilities and components

### Server-First Design
- Complex operations (filtering, sorting, pagination) run on backend
- Frontend handles UI state and caching via TanStack Query
- Progressive loading strategy for large documents

## 🔐 Security & RBAC

- **Authentication**: OAuth 2.0/OIDC with Azure Entra ID
- **Authorization**: Backend-enforced RBAC (source of truth)
- **Frontend RBAC**: Show/hide UI elements based on user permissions
- **Audit Logging**: All operations logged for compliance
- **Token Management**: JWT with refresh token flow

## 📊 Performance Strategy

### Claims Grid (20,000+ records)
- Server-side pagination (load only current page)
- Client-side virtualization (render only visible rows)
- Debounced filtering and search
- TanStack Query caching for frequently accessed data
- Result: Smooth, responsive grid even with massive datasets

### Large Documents (150MB-1GB)
- Progressive/lazy loading (metadata first, content on demand)
- Web Workers for CPU-intensive operations
- Async backend processing with job tracking
- Client-side caching with IndexedDB
- Result: Documents load and become interactive instantly

## 🧪 Testing Strategy

### Unit Tests (Vitest + React Testing Library)
- Component rendering and user interactions
- Custom hooks behavior
- Utility function logic
- Service method calls

### E2E Tests (Playwright)
- Critical user workflows
- Cross-browser compatibility
- Responsive design validation
- Integration scenarios

## 📝 Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```env
# API Base URL (required)
VITE_API_BASE_URL=http://localhost:8080/api

# Azure Entra ID Configuration
VITE_AUTH_AUTHORITY=https://login.microsoftonline.com/{tenant-id}
VITE_AUTH_CLIENT_ID=your-app-id
VITE_AUTH_REDIRECT_URI=http://localhost:5173/auth/callback

# Application Settings
VITE_APP_ENV=development
VITE_LOG_LEVEL=debug
```

## 🎯 Development Workflow

1. **Start dev server**: `npm run dev` (HMR enabled)
2. **Make changes** in feature modules
3. **Tests run automatically** (watch mode)
4. **Type checking**: `npm run type-check` for full validation
5. **Build**: `npm run build` when ready for deployment

## 🚀 Common Patterns

### Using TanStack Query

```typescript
// In a hook
export function useClaimsQuery(filters: ClaimFilter) {
  return useQuery({
    queryKey: ['claims', filters],
    queryFn: () => claimsService.fetchClaims(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// In a component
function ClaimsPage() {
  const { data, isLoading, error } = useClaimsQuery(filters)
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  return <ClaimsGrid data={data} />
}
```

### Component Structure

```typescript
// Container (data fetching)
function ClaimsGrid() {
  const { data } = useClaimsQuery(filters)
  return <ClaimsGridPresentation data={data} />
}

// Presenter (UI only)
function ClaimsGridPresentation({ data }: Props) {
  return <Table data={data} />
}
```

### Error Handling

```typescript
try {
  await claimsService.updateClaim(id, data)
} catch (error) {
  const message = getErrorMessage(error)
  showErrorNotification(message)
}
```

## 📚 Next Steps

1. **Implement Claims Grid** - Start with pagination and filtering
2. **Add Document Viewer** - Progressive loading implementation
3. **Connect Backend** - Update API endpoints
4. **Add Authentication** - Azure Entra ID integration
5. **Write Tests** - Unit and E2E test coverage
6. **Performance Tuning** - Profile and optimize

## 🔗 Documentation

See the `docs/` folder for detailed architecture and design decisions:
- Architecture Overview
- Data Flow Patterns
- Grid Performance Strategy
- Large Document Workspace
- Security & RBAC
- Solution Overview
- State & Reliability
- Trade-offs & Recommendations

## 📄 License

International - ABC Insurance Limited
