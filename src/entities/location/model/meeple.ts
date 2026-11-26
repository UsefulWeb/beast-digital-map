export const MapMeepleType = {
  NO_MEEPLE: -1,
  BEAR: 0,
  BOAR: 1,
  FARMER: 2,
  NOBLE: 3,
  SHEEP: 4,
  SABRETOOTH: 5,
} as const

export type MapMeepleType = (typeof MapMeepleType)[keyof typeof MapMeepleType]

export type MapMeeple = {
  type: MapMeepleType
  health: number
  wounds: number
}

export const MEEPLE_SLUG: Record<MapMeepleType, string | null> = {
  [MapMeepleType.SHEEP]: 'sheep',
  [MapMeepleType.NOBLE]: 'noble',
  [MapMeepleType.BOAR]: 'boar',
  [MapMeepleType.FARMER]: 'farmer',
  [MapMeepleType.BEAR]: 'bear',
  [MapMeepleType.SABRETOOTH]: 'sabretooth',
  [MapMeepleType.NO_MEEPLE]: null,
}

export const MEEPLE_HEALTH: Record<MapMeepleType, number> = {
  [MapMeepleType.SHEEP]: 1,
  [MapMeepleType.NOBLE]: 3,
  [MapMeepleType.BOAR]: 2,
  [MapMeepleType.FARMER]: 2,
  [MapMeepleType.BEAR]: 2,
  [MapMeepleType.SABRETOOTH]: 2,
  [MapMeepleType.NO_MEEPLE]: 0,
}

/** Multiplier vs base meeple image size (80%). */
export const MEEPLE_IMAGE_SCALE: Record<MapMeepleType, number> = {
  [MapMeepleType.SHEEP]: 1.2,
  [MapMeepleType.NOBLE]: 1.2,
  [MapMeepleType.BOAR]: 1.1,
  [MapMeepleType.FARMER]: 0.8,
  [MapMeepleType.BEAR]: 1.2,
  [MapMeepleType.SABRETOOTH]: 1,
  [MapMeepleType.NO_MEEPLE]: 1,
}

/** Outline color matched to each meeple's dominant tone. */
export const MEEPLE_OUTLINE: Record<MapMeepleType, string> = {
  [MapMeepleType.SHEEP]: '#f0a020',
  [MapMeepleType.NOBLE]: '#1a6078',
  [MapMeepleType.BOAR]: '#354840',
  [MapMeepleType.FARMER]: '#f0a32b',
  [MapMeepleType.BEAR]: '#3a2410',
  [MapMeepleType.SABRETOOTH]: '#d05058',
  [MapMeepleType.NO_MEEPLE]: '#888888',
}

export const toMeeple = (type: MapMeepleType): MapMeeple => ({
  type,
  health: MEEPLE_HEALTH[type],
  wounds: 0,
})
