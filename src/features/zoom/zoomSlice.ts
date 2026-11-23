import { create } from 'zustand'

export interface IZoomState {
  scale: number
  setZoom: (scale: number) => void
}

export const useZoomStore = create<IZoomState>((set) => ({
  scale: 1,
  setZoom: (scale) => set({ scale }),
}))

export const selectZoomScale = (state: IZoomState) => state.scale
