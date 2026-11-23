import { create } from 'zustand'
import { GameMode } from '../../shared/util/common'

export interface IGameModeState {
  mode: GameMode
  setGameMode: (mode: GameMode) => void
}

export const useGameModeStore = create<IGameModeState>((set) => ({
  mode: GameMode.PATH,
  setGameMode: (mode) => set({ mode }),
}))

export const selectMode = (state: IGameModeState) => state.mode

export const useGameMode = () => useGameModeStore(selectMode)
