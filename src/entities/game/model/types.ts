export const GameMode = {
  LOCATIONS: 'locations',
  PATH: 'path',
  MEEPLE: 'meeple',
  HUNTERS: 'hunters',
  MOVEMENT: 'movement',
} as const

export type GameMode = (typeof GameMode)[keyof typeof GameMode]
