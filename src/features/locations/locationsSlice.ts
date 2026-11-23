import { create } from 'zustand'
import type {
  IMapLocationItem,
  MapLocationType,
} from '../../shared/util/interfaces'

export interface ILocationsState {
  data: IMapLocationItem[]
  setLocations: (data: IMapLocationItem[]) => void
  changeLocationType: (
    locationItem: IMapLocationItem,
    type: MapLocationType,
  ) => void
  resetLocationsType: () => void
}

export const useLocationsStore = create<ILocationsState>((set, get) => ({
  data: [],
  setLocations: (data) => set({ data }),
  changeLocationType: (locationItem, type) => {
    const data = get().data.map((item) =>
      locationItem === item
        ? {
            ...item,
            type,
          }
        : item,
    )
    set({ data })
  },
  resetLocationsType: () => {
    const data = get().data.map((item) => ({
      ...item,
      type: item.defaultType,
    }))
    set({ data })
  },
}))

export const selectLocations = (state: ILocationsState) => state.data

export const useLocations = () => useLocationsStore(selectLocations)
