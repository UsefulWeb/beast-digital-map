import { GameMode } from '@entities/game'
import { getHistoryNavState, type HistoryPath } from '@entities/history'
import type { LocationItem } from '@entities/location'
import { getLocationDirectedLinks, type Path } from '@entities/path'

export type KeyAction =
  | { type: 'zoom-in' }
  | { type: 'zoom-out' }
  | { type: 'toggle-mode' }
  | { type: 'set-mode'; mode: GameMode }
  | { type: 'reset-locations' }
  | { type: 'remove-last' }
  | { type: 'clear-path' }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'add-wait' }
  | { type: 'add-location'; location: LocationItem }
  | null

export type ResolveKeyContext = {
  key: string
  code?: string
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  mode: GameMode
  path: Path
  locations: LocationItem[]
  history: HistoryPath[]
  historyIndex: number
}

export const resolveKeyAction = (ctx: ResolveKeyContext): KeyAction => {
  const {
    key,
    code,
    ctrlKey,
    metaKey,
    shiftKey,
    mode,
    path,
    locations,
    history,
    historyIndex,
  } = ctx

  if (
    key === '=' ||
    key === '+' ||
    code === 'NumpadAdd' ||
    (code === 'Equal' && shiftKey)
  ) {
    return { type: 'zoom-in' }
  }
  if (
    key === '-' ||
    key === '_' ||
    code === 'NumpadSubtract' ||
    (code === 'Minus' && shiftKey)
  ) {
    return { type: 'zoom-out' }
  }
  if (key === 'm' || key === 'M') {
    return { type: 'toggle-mode' }
  }
  // Top-row digits only — numpad 1–3 stay free for navigation
  if (code === 'Digit1' || (key === '1' && code !== 'Numpad1')) {
    return { type: 'set-mode', mode: GameMode.PATH }
  }
  if (code === 'Digit2' || (key === '2' && code !== 'Numpad2')) {
    return { type: 'set-mode', mode: GameMode.LOCATIONS }
  }
  if (code === 'Digit3' || (key === '3' && code !== 'Numpad3')) {
    return { type: 'set-mode', mode: GameMode.MEEPLE }
  }

  if (mode === GameMode.LOCATIONS && key === 'Delete') {
    return { type: 'reset-locations' }
  }

  if (mode !== GameMode.PATH) {
    return null
  }

  if (key === 'Backspace') {
    return { type: 'remove-last' }
  }
  if (key === 'Delete') {
    return { type: 'clear-path' }
  }

  const { isUndoDisabled, isRedoDisabled } = getHistoryNavState(
    history,
    historyIndex,
  )
  const isZ = key === 'z' || key === 'Z' || code === 'KeyZ'
  if (isZ && (ctrlKey || metaKey)) {
    if (shiftKey && !isRedoDisabled) {
      return { type: 'redo' }
    }
    if (!shiftKey && !isUndoDisabled) {
      return { type: 'undo' }
    }
  }

  const last = path[path.length - 1]
  if (!last) {
    return null
  }
  if (key === 'n' || key === 'N') {
    return { type: 'add-wait' }
  }

  const links = getLocationDirectedLinks(locations, last)
  const goLeft =
    key === 'ArrowLeft' || key === 'a' || key === 'A' || code === 'Numpad4'
  const goUp =
    key === 'ArrowUp' || key === 'w' || key === 'W' || code === 'Numpad8'
  const goRight =
    key === 'ArrowRight' || key === 'd' || key === 'D' || code === 'Numpad6'
  const goDown =
    key === 'ArrowDown' || key === 's' || key === 'S' || code === 'Numpad2'

  if (goLeft && links.left) {
    return { type: 'add-location', location: links.left }
  }
  if (goUp && links.top) {
    return { type: 'add-location', location: links.top }
  }
  if (goRight && links.right) {
    return { type: 'add-location', location: links.right }
  }
  if (goDown && links.bottom) {
    return { type: 'add-location', location: links.bottom }
  }

  return null
}
