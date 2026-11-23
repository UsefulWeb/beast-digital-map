import type { LocationItem } from '@entities/location'

export type Path = LocationItem[]

export type PathVisit = {
  item: LocationItem
  visitsCount: number
}

export type PathNode = {
  location: LocationItem
  visitIndex: number
}

export type PathSegment = {
  index: number
  source: PathNode
  target: PathNode
  mutualVisitIndex: number
}

export type PathSegments = PathSegment[]
