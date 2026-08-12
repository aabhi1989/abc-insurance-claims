# ABC Insurance Claims Platform

A scalable React-based claims processing platform for managing 20,000+ claims, large documents (150MB-1GB), RBAC, and high-performance insurance workflows.

---

## 📋 Quick Navigation

| Section | Purpose | Link |
|---------|---------|------|
| **Solution Overview** | Problem, requirements, challenges, goals | [Read →](docs/solution-overview.md) |
| **Architecture** | System design, API contracts, data flow | [Read →](docs/architecture_document.md) |
| **Grid Performance** | 20,000+ claims handling strategy | [Read →](docs/grid-performance-strategy.md) |
| **Document Workspace** | 150MB-1GB document management | [Read →](docs/large-document-workspace.md) |
| **Security & RBAC** | Auth, SSO, authorization, audit | [Read →](docs/security-and-rbac.md) |
| **State & Reliability** | State management, error handling | [Read →](docs/state-reliability-and-scalability.md) |
| **Trade-offs & Decisions** | Tech stack, POC scope, recommendations | [Read →](docs/trade-offs-and-final-recommendation.md) |

---

## 🚀 POC (Proof of Concept)

**Tech Stack:** React 19 • TypeScript • Vite • Material-UI • TanStack Query • Vitest • Playwright

**Status:** ✅ Functional with routing, pages, and layout

[Start POC →](poc/README.md) | [POC Setup Guide →](poc/WORKING_GUIDE.md)

---

## 🎯 Key Features

- ✅ Server-side pagination & filtering for 20,000+ claims
- ✅ Client-side virtualization for efficient rendering
- ✅ Progressive document loading for large files
- ✅ Role-based access control (RBAC)
- ✅ Async document processing with job tracking
- ✅ Enterprise SSO integration ready
- ✅ Comprehensive testing setup (Vitest + Playwright)

---

## 📁 Project Structure

```
abc-insurance-claims/
├── docs/                        # Architecture documentation (7 docs)
├── diagrams/                    # System diagrams
├── poc/                         # Frontend POC
│   ├── src/
│   │   ├── pages/              # Page components
│   │   ├── features/           # Feature modules (claims, documents)
│   │   ├── router/             # Route configuration
│   │   ├── services/           # API & Auth services
│   │   ├── shared/             # Reusable components & utilities
│   │   └── App.tsx             # Root component
│   └── tests/                  # Unit & E2E tests
└── README.md                   # This file
```

---

## 📚 Documentation Map

| Document | Topics |
|----------|--------|
| **Solution Overview** | Business context, requirements, challenges |
| **Architecture** | Frontend structure, backend services, API design |
| **Grid Performance** | Pagination, virtualization, caching strategies |
| **Large Documents** | Progressive loading, Web Workers, async processing |
| **Security & RBAC** | OAuth 2.0, authorization, audit logging |
| **State & Reliability** | TanStack Query, error recovery, scalability |
| **Trade-offs** | Technology choices, CI/CD, deployment strategy |

---

## 🏗️ Architecture Highlights

- **Server-First Design:** Complex operations (filter, sort, paginate) on backend
- **Feature-Based Organization:** Self-contained claim and document modules
- **State Separation:** TanStack Query for server state, React hooks for UI state
- **Progressive Loading:** Metadata-first approach for large documents
- **Type Safety:** Full TypeScript with path aliases for clean imports
- **Testing Ready:** Unit (Vitest), component (RTL), E2E (Playwright)

---

## 🔗 Resources

- **Documentation:** [View all docs →](docs/)
- **POC Setup:** [Quick start guide →](poc/README.md)
- **Working Guide:** [Development workflow →](poc/WORKING_GUIDE.md)
- **Skills Reference:** [Technical skills →](poc/SKILLS.md)

---

**Swiss Re Case Study** | Senior UI Engineering | 2024