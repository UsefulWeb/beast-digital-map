export enum Terrain {
  CAVES = 0,
  FOREST = 1,
  MIXED = 2,
  SETTLEMENT = 3,
  SWAMP = 4,
}

export type LocationItem = {
  index: number
  type: Terrain
  defaultType: Terrain
  top: number
  left: number
  size: number
  links?: number[]
}
