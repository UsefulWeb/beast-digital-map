import type { LocationItem } from '@entities/location'
import { MAX_WAIT_SIZE } from '@shared/lib/math'
import type { Path } from '../model/types'
import { getLocationWait, isLocationLast, isNextLocation } from './locationPath'

export const canClickLocation = (
  path: Path,
  item: LocationItem,
  pathLinksLocked = true,
) => {
  if (path.length === 0) {
    return true
  }
  const waitLeftCount = getLocationWait(path, item).length
  if (isLocationLast(path, item) && waitLeftCount < MAX_WAIT_SIZE) {
    return true
  }
  if (!pathLinksLocked) {
    return true
  }
  return isNextLocation(path, item)
}
