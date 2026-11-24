import { useAppViewportHeight } from '@shared/lib'
import { GlobalStyles } from '@shared/styles'
import { ErrorBoundaryProvider } from './ErrorBoundaryProvider'
import { RouterProvider } from './RouterProvider'

export const AppProvider = () => {
  useAppViewportHeight()

  return (
    <ErrorBoundaryProvider>
      <GlobalStyles />
      <RouterProvider />
    </ErrorBoundaryProvider>
  )
}
