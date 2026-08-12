/**
 * Document Workspace Feature Routes
 * 
 * Defines all routes related to the Document Workspace feature
 * Supports document viewing, management, and claim-specific document operations
 */

import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// Lazy load feature-specific components
const DocumentWorkspacePage = lazy(() => import('./pages'))

/**
 * Document Workspace feature route path constants
 * Use these for type-safe navigation within the document workspace feature
 */
export const DOCUMENT_ROUTES = {
  BASE: '/documents',
  BY_CLAIM: '/claim/:claimId/documents',
} as const

/**
 * Document Workspace feature routes configuration
 * These are nested routes that will be composed into the main router
 */
export const documentRoutes: RouteObject[] = [
  {
    path: 'documents',
    element: <DocumentWorkspacePage />,
    // loader: async () => {
    //   // TODO: Add data loader for documents list
    // },
  },
  {
    path: 'claim/:claimId/documents',
    element: <DocumentWorkspacePage />,
    // loader: async ({ params }) => {
    //   // TODO: Add data loader for claim-specific documents
    // },
  },
]

/**
 * Navigation helpers for document workspace feature
 * Use these for type-safe navigation within document workspace
 */
export const documentNavigationHelpers = {
  getClaimDocumentsPath: (claimId: string) => `/claim/${claimId}/documents`,
  getDocumentsPath: () => '/documents',
}

/**
 * Document Feature Actions
 * TODO: Implement these action types for Redux/Context if needed
 * 
 * - Upload document
 * - Delete document
 * - View document content (with progressive loading)
 * - Split document
 * - Merge documents
 * - Update document metadata
 */

export default documentRoutes
