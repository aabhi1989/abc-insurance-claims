# Security and RBAC

## 📋 Table of Contents

1. [Authentication & SSO](#1-authentication--sso)
2. [Role-Based Access Control](#2-role-based-access-control)
3. [Permission Enforcement](#3-permission-enforcement)
4. [API Security](#4-api-security)
5. [Frontend Security](#5-frontend-security)
6. [Audit & Security Logging](#6-audit--security-logging)

---

## 1. Authentication & SSO

Use enterprise SSO with **OAuth 2.0 / OpenID Connect** and **Azure Entra ID**.

```
User
  ↓
Azure Entra ID
  ↓
Authentication
  ↓
Access Token
  ↓
React Application
  ↓
Backend APIs
```

**Best Practice:** The frontend should not manage user credentials directly.

---

## 2. Role-Based Access Control

Access should be based on roles and permissions.

### Example RBAC Matrix

| Role | View | Edit | Assign | Delete | Document Operations |
|---|---|---|---|---|---|
| Claim Processor | ✓ | ✓ | ✓ | - | ✓ |
| Claim Reviewer | ✓ | ✓ | - | - | ✓ |
| Claim Manager | ✓ | ✓ | ✓ | ✓ | ✓ |
| Read Only | ✓ | - | - | - | - |

**Additional Considerations:** Permissions may also depend on claim ownership, business rules, or document state.

---

## 3. Permission Enforcement

Authorization must be enforced on the backend.

The frontend uses permissions only to provide the correct UX.

```
User
  ↓
Frontend Permission Check
  ↓
Show / Hide / Disable Action
  ↓
API Request
  ↓
Backend Authorization
  ↓
Allow / Reject
```

**Security Principle:** Hiding a button in the UI is not a security control.

---

## 4. API Security

All API communication should use HTTPS and authenticated requests.

### Key Controls

- OAuth 2.0 / OIDC authentication
- Backend authorization on every protected operation
- Input validation
- Consistent error responses
- Rate limiting where required
- Secure token handling
- API Gateway / WAF protection

**Data Protection:** Sensitive information should not be exposed in client-side logs or API responses unnecessarily.

---

## 5. Frontend Security

The frontend should:

- Avoid storing sensitive data unnecessarily
- Keep authentication tokens secure
- Validate user input for better UX
- Avoid exposing secrets in source code
- Apply an appropriate Content Security Policy (CSP)
- Prevent unauthorized UI actions

**Validation Approach:** Frontend validation improves UX, but backend validation remains authoritative.

---

## 6. Audit & Security Logging

Security-sensitive actions should be auditable.

### Examples

- User login
- Claim access
- Claim assignment
- Document access
- Document download
- Split / merge / delete
- Permission failures

```
User Action
    ↓
API
    ↓
Authorization
    ↓
Business Operation
    ↓
Audit Event
```

**Audit Log Strategy:** Audit logs should contain sufficient context for investigation without storing unnecessary sensitive document content.

---

**Summary:** Use Azure Entra ID for SSO, backend-enforced RBAC, permission-aware frontend controls, secure document access, and centralized audit logging.