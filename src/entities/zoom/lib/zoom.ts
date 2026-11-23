import { MAX_ZOOM, MIN_ZOOM } from '../../../shared/lib/math'

export const canZoomIn = (scale: number) => scale < MAX_ZOOM
export const canZoomOut = (scale: number) => scale > MIN_ZOOM
