import { GameMode } from '@entities/game'
import { getHistoryNavState, type HistoryPath } from '@entities/history'
import type { LocationItem } from '@entities/location'
import { getLocationDirectedLinks, type Path } from '@entities/path'

export type KeyAction =
  | { type: 'zoom-in' }
  | { type: 'zoom-out' }
  | { type: 'toggle-mode' }
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
    ctrlKey,
    metaKey,
    shiftKey,
    mode,
    path,
    locations,
    history,
    historyIndex,
  } = ctx

  if (key === '=') {
    return { type: 'zoom-in' }
  }
  if (key === '-') {
    return { type: 'zoom-out' }
  }
  if (key === 'm' || key === 'M') {
    return { type: 'toggle-mode' }
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
  if ((key === 'z' || key === 'Z') && (ctrlKey || metaKey)) {
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
  if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && links.left) {
    return { type: 'add-location', location: links.left }
  }
  if ((key === 'ArrowUp' || key === 'w' || key === 'W') && links.top) {
    return { type: 'add-location', location: links.top }
  }
  if ((key === 'ArrowRight' || key === 'd' || key === 'D') && links.right) {
    return { type: 'add-location', location: links.right }
  }
  if ((key === 'ArrowDown' || key === 's' || key === 'S') && links.bottom) {
    return { type: 'add-location', location: links.bottom }
  }

  return null
}
