import type { ReactNode } from 'react'
import { useSyncZoomScale } from '../../lib'

export type ZoomProviderProps = {
  children: ReactNode
}

/** Must sit under TransformWrapper — keeps zoom store in sync with the transform. */
export const ZoomProvider = (props: ZoomProviderProps) => {
  const { children } = props
  useSyncZoomScale()
  return <>{children}</>
}
