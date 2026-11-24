import {
  type LocationItem,
  type MapMeeple,
  MapMeepleType,
  toMeeple,
} from '../model'

/** Types cycled in MEEPLE mode (back to location default last). */
export const USER_MEEPLE_TYPES = [
  MapMeepleType.SHEEP,
  MapMeepleType.NOBLE,
  MapMeepleType.FARMER,
  MapMeepleType.BEAR,
  MapMeepleType.BOAR,
  MapMeepleType.SABRETOOTH,
  MapMeepleType.NO_MEEPLE,
] as const

export const getNextMeepleType = (location: LocationItem): MapMeepleType => {
  const types = USER_MEEPLE_TYPES.filter(
    (type) => type !== location.defaultMeepleType,
  ).concat([location.defaultMeepleType])
  const currentIndex = types.indexOf(location.meeple.type)
  const nextIndex = currentIndex === types.length - 1 ? 0 : currentIndex + 1
  return types[nextIndex]
}

export const applyMeeple = (
  locations: LocationItem[],
  location: LocationItem,
  meeple: MapMeeple,
): LocationItem[] =>
  locations.map((item) =>
    item.index === location.index ? { ...item, meeple } : item,
  )

export const injureMeeple = (
  locations: LocationItem[],
  location: LocationItem,
  wounds = 1,
): LocationItem[] =>
  locations.map((item) =>
    item.index === location.index
      ? {
          ...item,
          meeple: {
            ...item.meeple,
            wounds: item.meeple.wounds + wounds,
          },
        }
      : item,
  )

/** Injure if HP remains; otherwise clear meeple from the location. */
export const injureOrRemoveMeeple = (
  locations: LocationItem[],
  location: LocationItem,
): LocationItem[] => {
  const { health, wounds } = location.meeple
  if (health - wounds > 1) {
    return injureMeeple(locations, location)
  }
  return applyMeeple(locations, location, toMeeple(MapMeepleType.NO_MEEPLE))
}

export const resetMeeples = (locations: LocationItem[]): LocationItem[] =>
  locations.map((item) => ({
    ...item,
    meeple: toMeeple(item.defaultMeepleType),
  }))
