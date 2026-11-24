export const GameMode = {
  LOCATIONS: 'locations',
  PATH: 'path',
  MOVEMENT: 'movement',
} as const

export type GameMode = (typeof GameMode)[keyof typeof GameMode]
