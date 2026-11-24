/** True on touch-first devices (phones / tablets), not desktop. */
export const isMobile = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(hover: none) and (pointer: coarse)').matches
}
