import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type HistoryPath, pushHistoryState } from '../lib'

type PathApplier = (path: HistoryPath) => void

let applyPath: PathApplier = () => undefined

export const registerPathApplier = (fn: PathApplier) => {
  applyPath = fn
}

type HistoryState = {
  data: HistoryPath[]
  index: number
  clear: () => void
  pushState: (path: HistoryPath) => void
  goWithHistory: (value: number) => void
  undo: (value?: number) => void
  redo: (value?: number) => void
}

const EMPTY: HistoryPath = []

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      data: [EMPTY],
      index: 0,
      clear: () => set({ data: [EMPTY], index: 0 }),
      pushState: (path) => {
        const next = pushHistoryState(get().data, get().index, path)
        set(next)
      },
      goWithHistory: (value) => {
        const { data, index } = get()
        const nextIndex = index + value
        const path = data[nextIndex]
        set({ index: nextIndex })
        if (path) {
          applyPath(path)
        }
      },
      undo: (value = 1) => get().goWithHistory(-value),
      redo: (value = 1) => get().goWithHistory(value),
    }),
    {
      name: 'beast-path-history',
      partialize: (state) => ({ data: state.data, index: state.index }),
    },
  ),
)

export const selectHistoryIndex = (state: HistoryState) => state.index
export const selectHistoryData = (state: HistoryState) => state.data

export const undo = (value = 1) => useHistoryStore.getState().undo(value)
export const redo = (value = 1) => useHistoryStore.getState().redo(value)
export const clearHistory = () => useHistoryStore.getState().clear()
export const pushHistory = (path: HistoryPath) =>
  useHistoryStore.getState().pushState(path)
