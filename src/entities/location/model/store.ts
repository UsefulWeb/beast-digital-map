import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { applyTerrain, resetTerrains } from '../lib'
import type { LocationItem, Terrain } from './types'

type LocationsState = {
  mapId: string | null
  data: LocationItem[]
  setMapId: (mapId: string | null) => void
  setLocations: (data: LocationItem[]) => void
  changeLocationType: (location: LocationItem, type: Terrain) => void
  resetLocationsType: () => void
}

export const useLocationsStore = create<LocationsState>()(
  persist(
    (set, get) => ({
      mapId: null,
      data: [],
      setMapId: (mapId) => set({ mapId }),
      setLocations: (data) => set({ data }),
      changeLocationType: (location, type) => {
        set({ data: applyTerrain(get().data, location, type) })
      },
      resetLocationsType: () => {
        set({ data: resetTerrains(get().data) })
      },
    }),
    {
      name: 'beast-locations',
      partialize: (state) => ({
        mapId: state.mapId,
        data: state.data,
      }),
    },
  ),
)

export const selectLocations = (state: LocationsState) => state.data

export const changeLocationType = (location: LocationItem, type: Terrain) =>
  useLocationsStore.getState().changeLocationType(location, type)

export const resetLocationsType = () =>
  useLocationsStore.getState().resetLocationsType()

export const setLocations = (data: LocationItem[]) =>
  useLocationsStore.getState().setLocations(data)
