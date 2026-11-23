import { last } from 'lodash'
import { create } from 'zustand'
import {
  addLocation,
  type IPathItemAction,
  removeLocation,
  startFromLocation,
} from '../../entities/path'
import type {
  ILocationPath,
  IMapLocationItem,
} from '../../shared/util/interfaces'

export const EMPTY_LOCATION_PATH: ILocationPath = []

export interface IPathState {
  data: ILocationPath
  startLocation: IMapLocationItem | null
  setStartLocation: (item: IMapLocationItem) => void
  changePath: (data: ILocationPath) => void
  addPathItem: (item: IMapLocationItem) => void
  removePathItem: (item: IMapLocationItem) => void
  removeLastPathItem: () => void
  startFrom: (item: IMapLocationItem) => void
  clearPath: () => void
}

export interface IHistoryState {
  data: ILocationPath[]
  index: number
  clear: () => void
  pushState: (path: ILocationPath) => void
  go: (offset: number) => void
  goWithHistory: (value: number) => void
  undo: (value?: number) => void
  redo: (value?: number) => void
}

export const useHistoryStore = create<IHistoryState>((set, get) => ({
  data: [EMPTY_LOCATION_PATH],
  index: 0,
  clear: () =>
    set({
      data: [EMPTY_LOCATION_PATH],
      index: 0,
    }),
  pushState: (path) => {
    const { data, index } = get()
    const nextData = [...data.slice(0, index + 1), path]
    set({
      data: nextData,
      index: nextData.length - 1,
    })
  },
  go: (offset) => set({ index: get().index + offset }),
  goWithHistory: (value) => {
    const { data, index } = get()
    const nextIndex = index + value
    const path = data[nextIndex]
    set({ index: nextIndex })
    usePathStore.getState().changePath(path)
  },
  undo: (value = 1) => get().goWithHistory(-value),
  redo: (value = 1) => get().goWithHistory(value),
}))

const applyPathItemAction = (
  pathItemAction: IPathItemAction,
  item: IMapLocationItem,
) => {
  const { data } = usePathStore.getState()
  const nextData = pathItemAction(data, item)
  const lastItem = last(nextData)

  usePathStore.getState().changePath(nextData)
  useHistoryStore.getState().pushState(nextData)
  if (lastItem) {
    usePathStore.getState().setStartLocation(lastItem)
  }
}

export const usePathStore = create<IPathState>((set, get) => ({
  data: EMPTY_LOCATION_PATH,
  startLocation: null,
  setStartLocation: (item) => set({ startLocation: item }),
  changePath: (data) => set({ data: [...data] }),
  addPathItem: (item) => applyPathItemAction(addLocation, item),
  removePathItem: (item) => applyPathItemAction(removeLocation, item),
  removeLastPathItem: () => {
    const item = get().data[get().data.length - 1]
    get().removePathItem(item)
  },
  startFrom: (item) => {
    set({ startLocation: item })
    get().clearPath()
  },
  clearPath: () => {
    const { startLocation } = get()
    const data = startFromLocation(startLocation)
    useHistoryStore.getState().clear()
    set({ data })
    useHistoryStore.getState().pushState(data)
  },
}))

export const selectPathData = (state: IPathState) => state.data
export const selectHistoryIndex = (state: IHistoryState) => state.index
export const selectHistoryData = (state: IHistoryState) => state.data

export const addPathItem = (item: IMapLocationItem) =>
  usePathStore.getState().addPathItem(item)
export const removePathItem = (item: IMapLocationItem) =>
  usePathStore.getState().removePathItem(item)
export const removeLastPathItem = () =>
  usePathStore.getState().removeLastPathItem()
export const clearPath = () => usePathStore.getState().clearPath()
export const startFrom = (item: IMapLocationItem) =>
  usePathStore.getState().startFrom(item)
export const undo = (value = 1) => useHistoryStore.getState().undo(value)
export const redo = (value = 1) => useHistoryStore.getState().redo(value)
