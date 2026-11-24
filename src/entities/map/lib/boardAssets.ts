import { BASE_URL } from '@shared/config'
import { MEEPLE_SLUG, TERRAIN_IMAGES } from '../../location'
import type { MapFamily, MapId } from '../model/types'
import { getMapInfo, getMapsByFamily } from './catalog'

const url = (path: string) => `${BASE_URL}${path}`

/** Home shell — light, first paint. */
export const getHomeCriticalAssets = (): string[] => [
  url('images/ui/page-background.avif'),
  url('images/ui/logo.avif'),
  url('images/ui/button-background.avif'),
]

/** Prefetch map art for a family after the user picks it on Home. */
export const getFamilyMapPrefetch = (family: MapFamily): string[] =>
  getMapsByFamily(family).map((item) => item.image)

/**
 * Everything needed before showing the board for a map session
 * (chrome, terrains, meeples, movements, map image + JSON).
 */
export const getBoardSessionAssets = (mapId: MapId) => {
  const info = getMapInfo(mapId)
  if (!info) {
    return [] as Array<string | { url: string; kind: 'image' | 'fetch' }>
  }

  const images = [
    info.image,
    url('images/ui/navigation-background.avif'),
    url('images/ui/border-vertical.avif'),
    url('images/ui/border-horizontal.avif'),
    url('images/ui/hourglass.svg'),
    url('images/ui/visit-marker.svg'),
    url('images/ui/location-next.svg'),
    url('images/path/arrow.svg'),
    url('images/controls/clear-path.svg'),
    url('images/controls/clear-locations.svg'),
    url('images/controls/back.svg'),
    url('images/controls/undo.svg'),
    url('images/controls/redo.svg'),
    url('images/controls/zoom-in.svg'),
    url('images/controls/zoom-out.svg'),
    url('images/controls/mode-path-active.svg'),
    url('images/controls/mode-locations-active.svg'),
    url('images/controls/mode-meeple.svg'),
    url('images/movement/back.avif'),
    url('images/movement/prev.avif'),
    url('images/movement/next.avif'),
    url('images/movement/east.avif'),
    url('images/movement/west.avif'),
    url('images/movement/north.avif'),
    url('images/movement/south.avif'),
    url('images/movement/no-movement.avif'),
    ...Object.values(TERRAIN_IMAGES).map((item) => item.url),
    ...Object.values(MEEPLE_SLUG)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => url(`images/meeples/${slug}.avif`)),
  ]

  return [
    ...images.map((imageUrl) => ({ url: imageUrl, kind: 'image' as const })),
    { url: info.data, kind: 'fetch' as const },
  ]
}
