import { isMapId } from '@entities/map'
import { ErrorFallback } from '@shared/ui'
import { useLocation, useParams } from 'wouter'
import { RouteBody } from '../RouteBody'

export const Route = () => {
  const params = useParams<{ type: string }>()
  const [, setLocation] = useLocation()
  const rawType = params.type ?? ''
  const mapId = isMapId(rawType) ? rawType : null

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
