/**
 * Claims Feature Routes
 * 
 * Defines all routes related to the Claims feature
 * Follows feature-based architecture pattern
 */

import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// Lazy load feature-specific components
const ClaimsPage = lazy(() => import('./pages'))
const ClaimDetailsPage = lazy(() => import('./pages/ClaimDetails'))

/**
 * Claims feature route path constants
 * Use these for type-safe navigation within the claims feature
 */
export const CLAIMS_ROUTES = {
  BASE: '/claims',
  DETAILS: '/claims/:claimId',
} as const

/**
 * Claims feature routes configuration
 * These are nested routes that will be composed into the main router
 */
export const claimsRoutes: RouteObject[] = [
  {
    path: 'claims',
    children: [
      {
        index: true,
        element: <ClaimsPage />,
        // loader: async () => {
        //   // TODO: Add data loader for claims list
        // },
        // errorElement: <ClaimsError />,
      },
      {
        path: ':claimId',
        element: <ClaimDetailsPage />,
        // loader: async ({ params }) => {
        //   // TODO: Add data loader for claim details
        // },
      },
    ],
  },
]

/**
 * Navigation helpers for claims feature
 * Use these for type-safe navigation within claims
 */
export const claimsNavigationHelpers = {
  getClaimDetailsPath: (claimId: string) => `/claims/${claimId}`,
  getClaimsListPath: () => '/claims',
}

export default claimsRoutes
