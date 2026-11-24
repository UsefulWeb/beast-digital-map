/** True when the app runs as an installed PWA (not a regular browser tab). */
export const isPwa = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const nav = window.navigator as Navigator & { standalone?: boolean }

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    nav.standalone === true
  )
}
