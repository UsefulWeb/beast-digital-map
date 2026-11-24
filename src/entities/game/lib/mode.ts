import { GameMode } from '../model/types'

/** Modes shown in the floating map switch (excludes movement and hunters). */
export const BOARD_MODES = [
  GameMode.PATH,
  GameMode.LOCATIONS,
  GameMode.MEEPLE,
] as const

export type BoardMode = (typeof BOARD_MODES)[number]

export const isBoardMode = (mode: GameMode): mode is BoardMode =>
  (BOARD_MODES as readonly GameMode[]).includes(mode)

export const cycleBoardMode = (mode: GameMode): GameMode => {
  const index = BOARD_MODES.indexOf(mode as BoardMode)
  if (index < 0) {
    return GameMode.PATH
  }
  return BOARD_MODES[(index + 1) % BOARD_MODES.length]
}

/** @deprecated use cycleBoardMode */
export const togglePathLocationsMode = (mode: GameMode): GameMode =>
  cycleBoardMode(mode)
