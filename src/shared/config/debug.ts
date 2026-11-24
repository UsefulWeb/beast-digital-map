/** Set true to force map node/link overlays without a URL flag. */
export const MAP_DEBUG_FORCE = false

const hasDebugQuery =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('debug')

export const MAP_DEBUG = MAP_DEBUG_FORCE || hasDebugQuery
