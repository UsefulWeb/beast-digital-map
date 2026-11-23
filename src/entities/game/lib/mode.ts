import { GameMode } from '../model/types'

export const togglePathLocationsMode = (mode: GameMode): GameMode =>
  mode === GameMode.PATH ? GameMode.LOCATIONS : GameMode.PATH
