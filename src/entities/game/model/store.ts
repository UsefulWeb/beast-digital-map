import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GameMode } from './types'

type GameState = {
  mode: GameMode
  helpActive: boolean
  setGameMode: (mode: GameMode) => void
  toggleHelp: () => void
  setHelpActive: (helpActive: boolean) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      mode: GameMode.PATH,
      helpActive: false,
      setGameMode: (mode) => set({ mode }),
      toggleHelp: () => set((state) => ({ helpActive: !state.helpActive })),
      setHelpActive: (helpActive) => set({ helpActive }),
    }),
    {
      name: 'beast-game',
      partialize: (state) => ({
        mode: state.mode,
      }),
    },
  ),
)

export const selectMode = (state: GameState) => state.mode

export const selectHelpActive = (state: GameState) => state.helpActive

export const setGameMode = (mode: GameMode) =>
  useGameStore.getState().setGameMode(mode)

export const toggleHelp = () => useGameStore.getState().toggleHelp()

export const setHelpActive = (helpActive: boolean) =>
  useGameStore.getState().setHelpActive(helpActive)
