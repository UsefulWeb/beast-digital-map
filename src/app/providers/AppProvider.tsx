import { GlobalStyles } from '@shared/styles'
import { ErrorBoundaryProvider } from './ErrorBoundaryProvider'
import { RouterProvider } from './RouterProvider'

export const AppProvider = () => (
  <ErrorBoundaryProvider>
    <GlobalStyles />
    <RouterProvider />
  </ErrorBoundaryProvider>
)
