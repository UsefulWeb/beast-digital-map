import { GameMode, setGameMode } from '@entities/game'
import { setLocations, useLocationsStore } from '@entities/location'
import {
  clearMapResource,
  getMapInfo,
  isMapId,
  type MapId,
  preloadMapAssets,
  readMapData,
} from '@entities/map'
import { startFrom } from '@entities/path'
import { exitAppFullscreen, requestAppFullscreen } from '@shared/lib'
import { ErrorFallback, Progress } from '@shared/ui'
import { Board } from '@widgets/board'
import { Component, type ReactNode, Suspense, useEffect, useState } from 'react'
import { useLocation, useParams } from 'wouter'

const MapBoard = (props: { mapId: MapId }) => {
  const data = readMapData(props.mapId)
  const info = getMapInfo(props.mapId)
  const setMapId = useLocationsStore((s) => s.setMapId)

  useEffect(() => {
    const startLocation = data.items[data.settings.startLocation]
    setGameMode(GameMode.PATH)
    setLocations(data.items)
    setMapId(props.mapId)
    startFrom(startLocation)
  }, [data, props.mapId, setMapId])

  useEffect(() => {
    void requestAppFullscreen()
    return () => {
      void exitAppFullscreen()
    }
  }, [])

  if (!info) {
    throw new Error(`Unknown map: ${props.mapId}`)
  }

  return <Board mapUrl={info.image} data={data} />
}

type ErrorCatcherProps = {
  children: ReactNode
  onError: (error: Error) => void
  resetKey: string
}

class ErrorCatcher extends Component<
  ErrorCatcherProps,
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    this.props.onError(error)
  }

  componentDidUpdate(prevProps: ErrorCatcherProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return null
    }
    return this.props.children
  }
}

const RouteBody = (props: { mapId: MapId; onHome: () => void }) => {
  const { mapId, onHome } = props
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    return (
      <ErrorFallback
        title="Failed to load map"
        message={error.message}
        onRetry={() => {
          clearMapResource(mapId)
          setError(null)
        }}
        onHome={onHome}
      />
    )
  }

  return (
    <Suspense fallback={<Progress value={30} />}>
      <ErrorCatcher resetKey={mapId} onError={setError}>
        <MapBoard mapId={mapId} />
      </ErrorCatcher>
    </Suspense>
  )
}

export const Route = () => {
  const params = useParams<{ type: string }>()
  const [, setLocation] = useLocation()
  const rawType = params.type ?? ''
  const mapId = isMapId(rawType) ? rawType : null

  useEffect(() => {
    if (mapId) {
      preloadMapAssets(mapId)
    }
  }, [mapId])

  if (!mapId) {
    return (
      <ErrorFallback
        title="Unknown map"
        message={`Map "${rawType}" was not found.`}
        onHome={() => setLocation('/')}
      />
    )
  }

  return <RouteBody mapId={mapId} onHome={() => setLocation('/')} />
}
