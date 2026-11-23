import { useEffect } from 'react'
import { useControls } from 'react-zoom-pan-pinch'
import { getLocationDirectedLinks } from '../../../entities/path'
import {
  selectMode,
  useGameModeStore,
} from '../../../features/gameMode/gameModeSlice'
import {
  redo,
  selectHistoryData,
  selectHistoryIndex,
  undo,
  useHistoryStore,
} from '../../../features/history/historySlice'
import {
  selectLocations,
  useLocationsStore,
} from '../../../features/locations/locationsSlice'
import {
  addPathItem,
  clearPath,
  removeLastPathItem,
  selectPathData,
  usePathStore,
} from '../../../features/path/pathSlice'
import { GameMode } from '../../../shared/util/common'

export const KeyboardControls = () => {
  const path = usePathStore(selectPathData)
  const locations = useLocationsStore(selectLocations)
  const resetLocationsType = useLocationsStore((s) => s.resetLocationsType)
  const setGameMode = useGameModeStore((s) => s.setGameMode)

  const { zoomIn, zoomOut } = useControls()

  const gameMode = useGameModeStore(selectMode)
  const historyIndex = useHistoryStore(selectHistoryIndex)
  const history = useHistoryStore(selectHistoryData)

  const isHistoryEmpty = history.length === 0
  const isUndoDisabled = isHistoryEmpty || historyIndex < 2
  const isRedoDisabled = isHistoryEmpty || historyIndex === history.length - 1

  const runPathAction = (e: KeyboardEvent) => {
    if (gameMode !== GameMode.PATH) {
      return false
    }
    const { key, ctrlKey, metaKey, shiftKey } = e
    if (key === 'Backspace') {
      removeLastPathItem()
      return true
    }
    if (key === 'Delete') {
      clearPath()
      return true
    }
    if (['z', 'Z'].includes(key) && (ctrlKey || metaKey)) {
      if (shiftKey && !isRedoDisabled) {
        redo()
        return true
      }
      if (!shiftKey && !isUndoDisabled) {
        undo()
        return true
      }
    }
    const last = path[path.length - 1]
    if (!last) {
      return false
    }
    if (['n', 'N'].includes(key)) {
      addPathItem(last)
      return true
    }
    const links = getLocationDirectedLinks(locations, last)
    if (['ArrowLeft', 'a', 'A'].includes(key) && links.left) {
      addPathItem(links.left)
      return true
    }
    if (['ArrowUp', 'w', 'W'].includes(key) && links.top) {
      addPathItem(links.top)
      return true
    }
    if (['ArrowRight', 'd', 'D'].includes(key) && links.right) {
      addPathItem(links.right)
      return true
    }
    if (['ArrowDown', 's', 'S'].includes(key) && links.bottom) {
      addPathItem(links.bottom)
      return true
    }
    return false
  }

  const handleCommonMode = (key: string) => {
    if (key === '=') {
      zoomIn()
      return true
    }
    if (key === '-') {
      zoomOut()
      return true
    }
    if (['m', 'M'].includes(key)) {
      const mode =
        gameMode === GameMode.PATH ? GameMode.LOCATIONS : GameMode.PATH
      setGameMode(mode)
      return true
    }
    return false
  }

  const runLocationsAction = (e: KeyboardEvent) => {
    if (gameMode !== GameMode.LOCATIONS) {
      return false
    }
    const { key } = e
    if (key === 'Delete') {
      resetLocationsType()
      return true
    }
    return false
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const { key } = e
      if (handleCommonMode(key)) {
        return
      }
      if (runLocationsAction(e)) {
        return
      }
      runPathAction(e)
    }
    window.addEventListener('keyup', handler)
    return () => window.removeEventListener('keyup', handler)
  }, [path, gameMode, historyIndex, history, locations])

  return <></>
}
