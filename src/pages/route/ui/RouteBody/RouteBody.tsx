import type { MapId } from '@entities/map'
import { ErrorFallback, LoadingGate } from '@shared/ui'
import { Suspense } from 'react'
import { useBoardSessionLoader } from '../../lib'
import { ErrorCatcher } from '../ErrorCatcher'
import { MapBoard } from '../MapBoard'

export type RouteBodyProps = {
  mapId: MapId
  onHome: () => void
}

export const RouteBody = (props: RouteBodyProps) => {
  const { mapId, onHome } = props
  const { progress, ready, error, setRenderError, retry } =
    useBoardSessionLoader(mapId)

  if (error) {
    return (
      <ErrorFallback
        title="Failed to load map"
        message={error.message}
        onRetry={retry}
        onHome={onHome}
      />
    )
  }

  return (
    <LoadingGate ready={ready} progress={progress}>
      <Suspense
        fallback={
          <LoadingGate ready={false} progress={progress}>
            {null}
          </LoadingGate>
        }
      >
        <ErrorCatcher resetKey={mapId} onError={setRenderError}>
          <MapBoard mapId={mapId} />
        </ErrorCatcher>
      </Suspense>
    </LoadingGate>
  )
}
