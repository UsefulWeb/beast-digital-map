import { type LocationItem, MapMeepleType, toMeeple } from '@entities/location'
import { MapId, type MapJson, parseMapData } from '@entities/map'
import { describe, expect, it } from 'vitest'
import lowerSi from '../../../../public/data/map/lower-shattered-isles.json'
import upperSi from '../../../../public/data/map/upper-shattered-isles.json'
import { getLocationDirectedLinks } from './locationPath'

const loc = (
  index: number,
  top: number,
  left: number,
  links: number[],
): LocationItem => ({
  index,
  top,
  left,
  links,
  size: 10,
  type: 1,
  defaultType: 1,
  defaultMeepleType: MapMeepleType.NO_MEEPLE,
  meeple: toMeeple(MapMeepleType.NO_MEEPLE),
})

const dirs = (locations: LocationItem[], index: number) => {
  const item = locations[index]
  const d = getLocationDirectedLinks(locations, item)
  return {
    top: d.top?.index,
    right: d.right?.index,
    bottom: d.bottom?.index,
    left: d.left?.index,
  }
}

describe('getLocationDirectedLinks', () => {
  it('maps orthogonal neighbors to cardinals', () => {
    const locations = [
      loc(0, 100, 100, [1, 2, 3, 4]),
      loc(1, 40, 100, []), // up
      loc(2, 100, 160, []), // right
      loc(3, 160, 100, []), // down
      loc(4, 100, 40, []), // left
    ]
    expect(dirs(locations, 0)).toEqual({
      top: 1,
      right: 2,
      bottom: 3,
      left: 4,
    })
  })

  it('prefers nearest neighbor when two share a cardinal', () => {
    // Near-up vs far-up (Lower SI 28 → 45, not 30)
    const locations = [
      loc(0, 1079, 1618, [1, 2]),
      loc(1, 974, 1619, []), // ~105px almost straight up
      loc(2, 408, 1453, []), // far up-left bridge
    ]
    expect(dirs(locations, 0).top).toBe(1)
  })

  it('assigns diagonal to the nearer cardinal axis', () => {
    const locations = [
      loc(0, 100, 100, [1]),
      loc(1, 40, 160, []), // up-right, closer to right (dx>dy)
    ]
    expect(dirs(locations, 0)).toEqual({
      top: undefined,
      right: 1,
      bottom: undefined,
      left: undefined,
    })
  })
})

describe('getLocationDirectedLinks — Lower Shattered Isles', () => {
  const { items } = parseMapData(
    MapId.LOWER_SHATTERED_ISLES,
    lowerSi as MapJson,
  )

  it('loc 28: up is near 45, not far bridge 30', () => {
    expect(dirs(items, 28)).toMatchObject({
      top: 45,
      left: 15,
      right: 23,
    })
  })

  it('loc 30: down prefers near 10 over far bridge 28', () => {
    expect(dirs(items, 30).bottom).toBe(10)
  })

  it('loc 0 / 4: long vertical bridge does not steal near links', () => {
    expect(dirs(items, 0).bottom).toBe(30)
    expect(dirs(items, 4).top).toBe(0)
  })

  it('loc 53 / 51: long bridge maps to left/right, near neighbors kept', () => {
    expect(dirs(items, 53)).toMatchObject({
      right: 0,
      left: 6,
      bottom: 14,
    })
    expect(dirs(items, 51).right).toBe(21)
  })

  it('loc 40 / 41: long bridge is right/left, near verticals kept', () => {
    expect(dirs(items, 40)).toMatchObject({
      top: 11,
      right: 44,
      bottom: 37,
    })
    expect(dirs(items, 41)).toMatchObject({
      top: 36,
      left: 3,
      right: 39,
    })
  })
})

describe('getLocationDirectedLinks — Upper Shattered Isles', () => {
  const { items } = parseMapData(
    MapId.UPPER_SHATTERED_ISLES,
    upperSi as MapJson,
  )

  it('loc 20 / 23: bridge does not override near links', () => {
    expect(dirs(items, 20)).toMatchObject({
      left: 4,
      bottom: 7,
      right: 23,
    })
    expect(dirs(items, 23)).toMatchObject({
      top: 30,
      left: 17,
      bottom: 0,
    })
  })

  it('loc 15 / 14: long bridge is left/right among nearer options', () => {
    expect(dirs(items, 15).top).toBe(0)
    expect(dirs(items, 15).left).toBe(9)
    expect(dirs(items, 14).right).toBe(19)
    expect(dirs(items, 14).top).toBe(22)
  })

  it('loc 34 / 31: vertical bridge prefers near neighbors', () => {
    expect(dirs(items, 34)).toMatchObject({
      top: 31,
      right: 35,
      bottom: 2,
    })
    expect(dirs(items, 31)).toMatchObject({
      top: 28,
      right: 26,
      bottom: 8,
    })
  })
})
