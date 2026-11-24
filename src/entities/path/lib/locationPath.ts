import type { LocationItem } from '@entities/location'
import type { Path } from '../model/types'

export const getLocationItem = (path: Path, locationItem: LocationItem) =>
  path.find((item) => eq(item, locationItem))

export const isLocationExists = (path: Path, locationItem: LocationItem) =>
  getLocationItem(path, locationItem) !== undefined

export const findLocationIndex = (path: Path, locationItem: LocationItem) =>
  path.findIndex((item) => eq(item, locationItem))

export const findLastLocationIndex = (
  path: Path,
  locationItem: LocationItem,
) => {
  for (let i = path.length; i--; ) {
    if (eq(path[i], locationItem)) {
      return i
    }
  }
}

export const isLocationFirst = (path: Path, item: LocationItem) =>
  path.length > 0 && findLocationIndex(path, item) === 0

export const isLocationLast = (path: Path, item: LocationItem) =>
  path.length > 0 && findLastLocationIndex(path, item) === path.length - 1

export type PathItemAction = (path: Path, item: LocationItem) => Path

export const addLocation = (path: Path, item: LocationItem) => [...path, item]

export const clearLocationPath = () => []

export const removeLocation = (path: Path, item: LocationItem) => {
  const index = findLastLocationIndex(path, item)
  if (index === undefined) {
    return path
  }
  return [...path.slice(0, index), ...path.slice(index + 1)]
}

export const eq = (item1?: LocationItem, item2?: LocationItem) =>
  item1 && item2 && item1?.index === item2?.index

export const getLocationVisitsCount = (
  path: Path,
  locationItem: LocationItem,
) =>
  path.reduce((total, item, index, self) => {
    if (!eq(item, locationItem)) {
      return total
    }
    if (eq(item, self[index - 1])) {
      return total
    }
    return total + 1
  }, 0)

export const getWaitVisits = (path: Path) => {
  const data = path.reduce((total, item, index, self) => {
    if (eq(item, self[index - 1])) {
      total.push(index)
    }
    return total
  }, [] as number[])

  return groupWaitVisits(data)
}

export const groupWaitVisits = (waitList: number[]) => {
  let groupId = 0
  return waitList.map((value, index, self) => {
    if (index === 0) {
      return groupId
    }
    if (self[index - 1] !== value - 1) {
      return ++groupId
    }
    return groupId
  })
}

export const getWaitVisitsCount = (path: Path) => getWaitVisits(path).length

export const getLocationWait = (path: Path, locationItem: LocationItem) => {
  const data = path.reduce((total, item, index, self) => {
    if (eq(item, locationItem) && eq(item, self[index - 1])) {
      total.push(index)
    }
    return total
  }, [] as number[])
  return groupWaitVisits(data)
}

export const getLocationWaitCount = (path: Path, locationItem: LocationItem) =>
  getLocationWait(path, locationItem).length

export const getLocationVisits = (path: Path, locationItem: LocationItem) =>
  path.reduce((target, _item, index, self) => {
    if (eq(self[index], locationItem)) {
      target.push(index)
    }
    return target
  }, [] as number[])

export const getLocationVisitIndex = (
  path: Path,
  item: LocationItem,
  start = 0,
) => getLocationVisits(path, item).findIndex((index) => index >= start) || 0

export const getMutualLocationsVisits = (
  path: Path,
  from: LocationItem,
  to: LocationItem,
) =>
  path.reduce((target, item, index, self) => {
    if (index === 0) {
      return target
    }
    if (eq(item, self[index - 1])) {
      return target
    }
    if (eq(item, from) && eq(self[index - 1], to)) {
      target.push(index)
    }
    if (eq(item, to) && eq(self[index - 1], from)) {
      target.push(index)
    }
    return target
  }, [] as number[])

export const getMutualLocationsVisitIndex = (
  path: Path,
  from: LocationItem,
  to: LocationItem,
  start = 0,
) =>
  getMutualLocationsVisits(path, from, to).findIndex(
    (index) => index >= start,
  ) || 0

export const isNextLocation = (path: Path, item: LocationItem) => {
  const last = path[path.length - 1]
  if (!last) {
    return false
  }
  const { links = [] } = last
  return links.includes(item.index)
}

export const startFromLocation = (location: LocationItem | null): Path =>
  location ? [location] : []

export type DirectedLinks = {
  top?: LocationItem
  left?: LocationItem
  right?: LocationItem
  bottom?: LocationItem
}

type Cardinal = keyof DirectedLinks

/** Screen coords: +left = right, +top = down. Angle 0 = up, +90° = right. */
const cardinalFromDelta = (dx: number, dy: number): Cardinal => {
  const deg = (Math.atan2(dx, -dy) * 180) / Math.PI
  if (deg >= -45 && deg < 45) {
    return 'top'
  }
  if (deg >= 45 && deg < 135) {
    return 'right'
  }
  if (deg >= -135 && deg < -45) {
    return 'left'
  }
  return 'bottom'
}

/**
 * Map each linked neighbor to the nearest cardinal by angle; if several share
 * a cardinal, keep the nearest by distance (fixes SI long-bridge links).
 */
export const getLocationDirectedLinks = (
  locations: LocationItem[],
  item: LocationItem,
): DirectedLinks => {
  const { links = [] } = item
  const best: Partial<
    Record<Cardinal, { location: LocationItem; dist: number }>
  > = {}

  for (const index of links) {
    const location = locations[index]
    if (!location) {
      continue
    }
    const dx = location.left - item.left
    const dy = location.top - item.top
    const dist = Math.hypot(dx, dy)
    if (dist === 0) {
      continue
    }
    const cardinal = cardinalFromDelta(dx, dy)
    const current = best[cardinal]
    if (!current || dist < current.dist) {
      best[cardinal] = { location, dist }
    }
  }

  const result: DirectedLinks = {}
  if (best.top) {
    result.top = best.top.location
  }
  if (best.left) {
    result.left = best.left.location
  }
  if (best.right) {
    result.right = best.right.location
  }
  if (best.bottom) {
    result.bottom = best.bottom.location
  }
  return result
}
