import { isPwa } from './isPwa'

export const requestAppFullscreen = async (
  element: HTMLElement = document.documentElement,
) => {
  if (isPwa()) {
    return
  }

  try {
    if (!document.fullscreenElement) {
      await element.requestFullscreen()
    }
  } catch {
    // Browser may require a user gesture or deny fullscreen.
  }
}

export const exitAppFullscreen = async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    }
  } catch {
    // Ignore exit failures.
  }
}
