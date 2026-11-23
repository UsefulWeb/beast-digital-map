import type { ReactNode } from 'react'
import { Progress } from '../Progress'

export type LoadingGateProps = {
  ready: boolean
  progress?: number
  children: ReactNode
}

export const LoadingGate = (props: LoadingGateProps) => {
  const { ready, progress = 0, children } = props
  if (!ready) {
    return <Progress value={progress} />
  }
  return <>{children}</>
}
