import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GameMode } from './types'

type GameState = {
  mode: GameMode
  setGameMode: (mode: GameMode) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      mode: GameMode.PATH,
      setGameMode: (mode) => set({ mode }),
    }),
    {
      name: 'beast-game',
      partialize: (state) => ({ mode: state.mode }),
    },
  ),
)

export const selectMode = (state: GameState) => state.mode

export const setGameMode = (mode: GameMode) =>
  useGameStore.getState().setGameMode(mode)
