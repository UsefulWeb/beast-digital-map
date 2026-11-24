import { usePwa } from '@dotmind/react-use-pwa'
import * as C from './OfflineBadge.components'

export const OfflineBadge = () => {
  const { isOffline } = usePwa()

  if (!isOffline) {
    return null
  }

  return <C.Badge>Offline</C.Badge>
}
