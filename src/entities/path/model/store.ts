import {
  clearHistory,
  pushHistory,
  registerPathApplier,
} from '@entities/history'
import type { LocationItem } from '@entities/location'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EMPTY_PATH } from '../lib/history'
import {
  addLocation,
  type PathItemAction,
  removeLocation,
  startFromLocation,
} from '../lib/locationPath'
import type { Path } from './types'

type PathState = {
  data: Path
  startLocation: LocationItem | null
  setStartLocation: (item: LocationItem) => void
  changePath: (data: Path) => void
  addPathItem: (item: LocationItem) => void
  removePathItem: (item: LocationItem) => void
  removeLastPathItem: () => void
  startFrom: (item: LocationItem) => void
  clearPath: () => void
}

const applyPathItemAction = (action: PathItemAction, item: LocationItem) => {
  const { data } = usePathStore.getState()
  const nextData = action(data, item)
  const lastItem = nextData[nextData.length - 1]

  usePathStore.getState().changePath(nextData)
  pushHistory(nextData)
  if (lastItem) {
    usePathStore.getState().setStartLocation(lastItem)
  }
}

export const usePathStore = create<PathState>()(
  persist(
    (set, get) => ({
      data: EMPTY_PATH,
      startLocation: null,
      setStartLocation: (item) => set({ startLocation: item }),
      changePath: (data) => set({ data: [...data] }),
      addPathItem: (item) => applyPathItemAction(addLocation, item),
      removePathItem: (item) => applyPathItemAction(removeLocation, item),
      removeLastPathItem: () => {
        const item = get().data[get().data.length - 1]
        if (item) {
          get().removePathItem(item)
        }
      },
      startFrom: (item) => {
        set({ startLocation: item })
        get().clearPath()
      },
      clearPath: () => {
        const data = startFromLocation(get().startLocation)
        clearHistory()
        set({ data })
        pushHistory(data)
      },
    }),
    {
      name: 'beast-path',
      partialize: (state) => ({
        data: state.data,
        startLocation: state.startLocation,
      }),
    },
  ),
)

registerPathApplier((path) => {
  usePathStore.getState().changePath(path)
})

export const selectPathData = (state: PathState) => state.data

export const addPathItem = (item: LocationItem) =>
  usePathStore.getState().addPathItem(item)
export const removeLastPathItem = () =>
  usePathStore.getState().removeLastPathItem()
export const clearPath = () => usePathStore.getState().clearPath()
export const startFrom = (item: LocationItem) =>
  usePathStore.getState().startFrom(item)
