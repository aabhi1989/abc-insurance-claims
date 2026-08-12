/**
 * Application Routes Configuration
 * 
 * Centralized route definitions for the ABC Insurance Claims Platform
 * Supports lazy loading, nested routes, and protected routes
 */

import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import LoadingSpinner from '@/shared/components/LoadingSpinner'

// Lazy load page components for code splitting
const HomePage = lazy(() => import('@/pages/Home'))
const ClaimsPage = lazy(() => import('@/pages/Claims'))
const ClaimDetailsPage = lazy(() => import('@/pages/ClaimDetails'))
const DocumentWorkspacePage = lazy(() => import('@/pages/DocumentWorkspace'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))

/**
 * Route path constants - Use these throughout the app for type-safe navigation
 */
export const ROUTES = {
  HOME: '/',
  CLAIMS: '/claims',
  CLAIM_DETAILS: '/claims/:claimId',
  DOCUMENTS: '/documents',
  CLAIM_DOCUMENTS: '/claim/:claimId/documents',
  NOT_FOUND: '*',
} as const

/**
 * Suspense wrapper for lazy-loaded routes
 */
const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
)

/**
 * Route configuration objects
 * Following React Router v6 conventions
 */
export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense>,
  },
  {
    path: ROUTES.CLAIMS,
    element: <Suspense fallback={<LoadingSpinner />}><ClaimsPage /></Suspense>,
  },
  {
    path: ROUTES.CLAIM_DETAILS,
    element: <Suspense fallback={<LoadingSpinner />}><ClaimDetailsPage /></Suspense>,
  },
  {
    path: ROUTES.DOCUMENTS,
    element: <Suspense fallback={<LoadingSpinner />}><DocumentWorkspacePage /></Suspense>,
  },
  {
    path: ROUTES.CLAIM_DOCUMENTS,
    element: <Suspense fallback={<LoadingSpinner />}><DocumentWorkspacePage /></Suspense>,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <Suspense fallback={<LoadingSpinner />}><NotFoundPage /></Suspense>,
  },
]

/**
 * Navigation helper functions
 * Use these for type-safe navigation
 */
export const navigationHelpers = {
  /**
   * Generate claim details route
   * @param claimId - The claim ID
   */
  getClaimDetailsPath: (claimId: string) => `/claims/${claimId}`,

  /**
   * Generate claim documents route
   * @param claimId - The claim ID
   */
  getClaimDocumentsPath: (claimId: string) => `/claim/${claimId}/documents`,

  /**
   * Get the route label for breadcrumbs
   */
  getRouteLabel: (path: string): string => {
    switch (path) {
      case ROUTES.HOME:
        return 'Home'
      case ROUTES.CLAIMS:
        return 'Claims'
      case ROUTES.DOCUMENTS:
        return 'Documents'
      default:
        return 'Home'
    }
  },
}

export default routes
