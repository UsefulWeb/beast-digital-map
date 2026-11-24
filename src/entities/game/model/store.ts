import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GameMode } from './types'

type GameState = {
  mode: GameMode
  pathLinksLocked: boolean
  helpActive: boolean
  setGameMode: (mode: GameMode) => void
  togglePathLinksLocked: () => void
  toggleHelp: () => void
  setHelpActive: (helpActive: boolean) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      mode: GameMode.PATH,
      pathLinksLocked: true,
      helpActive: false,
      setGameMode: (mode) => set({ mode }),
      togglePathLinksLocked: () =>
        set((state) => ({ pathLinksLocked: !state.pathLinksLocked })),
      toggleHelp: () => set((state) => ({ helpActive: !state.helpActive })),
      setHelpActive: (helpActive) => set({ helpActive }),
    }),
    {
      name: 'beast-game',
      partialize: (state) => ({
        mode: state.mode,
        pathLinksLocked: state.pathLinksLocked,
      }),
    },
  ),
)

export const selectMode = (state: GameState) => state.mode

export const selectPathLinksLocked = (state: GameState) => state.pathLinksLocked

export const selectHelpActive = (state: GameState) => state.helpActive

export const setGameMode = (mode: GameMode) =>
  useGameStore.getState().setGameMode(mode)

export const togglePathLinksLocked = () =>
  useGameStore.getState().togglePathLinksLocked()

export const toggleHelp = () => useGameStore.getState().toggleHelp()

export const setHelpActive = (helpActive: boolean) =>
  useGameStore.getState().setHelpActive(helpActive)
