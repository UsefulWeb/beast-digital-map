import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  applyMeeple,
  applyTerrain,
  getNextMeepleType,
  injureOrRemoveMeeple,
  resetMeeples,
  resetTerrains,
} from '../lib'
import { type MapMeeple, toMeeple } from './meeple'
import type { LocationItem, Terrain } from './types'

type LocationsState = {
  mapId: string | null
  data: LocationItem[]
  setMapId: (mapId: string | null) => void
  setLocations: (data: LocationItem[]) => void
  changeLocationType: (location: LocationItem, type: Terrain) => void
  changeLocationMeeple: (location: LocationItem, meeple: MapMeeple) => void
  injureLocationMeeple: (location: LocationItem) => void
  cycleLocationMeeple: (location: LocationItem) => void
  resetLocationsType: () => void
  resetLocationsMeeple: () => void
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
      changeLocationMeeple: (location, meeple) => {
        set({ data: applyMeeple(get().data, location, meeple) })
      },
      injureLocationMeeple: (location) => {
        set({ data: injureOrRemoveMeeple(get().data, location) })
      },
      cycleLocationMeeple: (location) => {
        const next = toMeeple(getNextMeepleType(location))
        set({ data: applyMeeple(get().data, location, next) })
      },
      resetLocationsType: () => {
        set({ data: resetTerrains(get().data) })
      },
      resetLocationsMeeple: () => {
        set({ data: resetMeeples(get().data) })
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

export const changeLocationMeeple = (
  location: LocationItem,
  meeple: MapMeeple,
) => useLocationsStore.getState().changeLocationMeeple(location, meeple)

export const injureLocationMeeple = (location: LocationItem) =>
  useLocationsStore.getState().injureLocationMeeple(location)

export const cycleLocationMeeple = (location: LocationItem) =>
  useLocationsStore.getState().cycleLocationMeeple(location)

export const resetLocationsType = () =>
  useLocationsStore.getState().resetLocationsType()

export const resetLocationsMeeple = () =>
  useLocationsStore.getState().resetLocationsMeeple()

export const setLocations = (data: LocationItem[]) =>
  useLocationsStore.getState().setLocations(data)
