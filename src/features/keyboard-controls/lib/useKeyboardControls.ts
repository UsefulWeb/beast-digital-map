import {
  cycleBoardMode,
  selectMode,
  setGameMode,
  useGameStore,
} from '@entities/game'
import {
  redo,
  selectHistoryData,
  selectHistoryIndex,
  undo,
  useHistoryStore,
} from '@entities/history'
import {
  resetLocationsType,
  selectLocations,
  useLocationsStore,
} from '@entities/location'
import {
  addPathItem,
  clearPath,
  removeLastPathItem,
  selectPathData,
  usePathStore,
} from '@entities/path'
import { useKeydown } from '@shared/lib'
import { useCallback } from 'react'
import { useControls } from 'react-zoom-pan-pinch'
import { resolveKeyAction } from './resolveKeyAction'

export const useKeyboardControls = () => {
  const path = usePathStore(selectPathData)
  const locations = useLocationsStore(selectLocations)
  const mode = useGameStore(selectMode)
  const history = useHistoryStore(selectHistoryData)
  const historyIndex = useHistoryStore(selectHistoryIndex)
  const { zoomIn, zoomOut } = useControls()

  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      const action = resolveKeyAction({
        key: event.key,
        code: event.code,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        mode,
        path,
        locations,
        history,
        historyIndex,
      })

      if (!action) {
        return
      }

      event.preventDefault()

      switch (action.type) {
        case 'zoom-in':
          zoomIn()
          break
        case 'zoom-out':
          zoomOut()
          break
        case 'toggle-mode':
          setGameMode(cycleBoardMode(mode))
          break
        case 'set-mode':
          setGameMode(action.mode)
          break
        case 'reset-locations':
          resetLocationsType()
          break
        case 'remove-last':
          removeLastPathItem()
          break
        case 'clear-path':
          clearPath()
          break
        case 'undo':
          undo()
          break
        case 'redo':
          redo()
          break
        case 'add-wait':
          addPathItem(path[path.length - 1])
          break
        case 'add-location':
          addPathItem(action.location)
          break
      }
    },
    [history, historyIndex, locations, mode, path, zoomIn, zoomOut],
  )

  useKeydown(handler)
}
