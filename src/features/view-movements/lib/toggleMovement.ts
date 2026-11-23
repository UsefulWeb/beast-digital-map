import { GameMode } from '@entities/game'

export const getNextMovementMode = (
  current: GameMode,
  lastNonMovement: GameMode,
) =>
  current === GameMode.MOVEMENT
    ? lastNonMovement === GameMode.MOVEMENT
      ? GameMode.PATH
      : lastNonMovement
    : GameMode.MOVEMENT
