import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ZoomState = {
  scale: number
  setZoom: (scale: number) => void
}

export const useZoomStore = create<ZoomState>()(
  persist(
    (set) => ({
      scale: 1,
      setZoom: (scale) => set({ scale }),
    }),
    {
      name: 'beast-zoom',
      partialize: (state) => ({ scale: state.scale }),
    },
  ),
)

export const selectZoomScale = (state: ZoomState) => state.scale

export const setZoom = (scale: number) => useZoomStore.getState().setZoom(scale)
