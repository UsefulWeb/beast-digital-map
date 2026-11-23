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

export const getLocationDirectedLinks = (
  locations: LocationItem[],
  item: LocationItem,
) => {
  const { links = [] } = item

  const data = links.map((index) => locations[index])

  const leftOrder = [...data].sort((a, b) =>
    a.left > b.left ? 1 : a.left === b.left ? 0 : -1,
  )
  const topOrder = [...data].sort((a, b) =>
    a.top > b.top ? 1 : a.top === b.top ? 0 : -1,
  )
  const ACCURACY = 50

  const left = leftOrder.filter(
    (location) => item.left - location.left > ACCURACY,
  )[0]
  const right = leftOrder
    .filter((location) => location.left - item.left > ACCURACY)
    .reverse()[0]
  const top = topOrder.filter(
    (location) => item.top - location.top > ACCURACY,
  )[0]
  const bottom = topOrder
    .filter((location) => location.top - item.top > ACCURACY)
    .reverse()[0]
  return {
    top,
    left,
    right,
    bottom,
  }
}
