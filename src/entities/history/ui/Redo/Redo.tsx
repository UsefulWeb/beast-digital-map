import { BASE_URL } from '@shared/config'
import { IconButton } from '@shared/ui'
import { getHistoryNavState } from '../../lib'
import {
  redo,
  selectHistoryData,
  selectHistoryIndex,
  useHistoryStore,
} from '../../model'

export const Redo = () => {
  const history = useHistoryStore(selectHistoryData)
  const index = useHistoryStore(selectHistoryIndex)
  const { isRedoDisabled } = getHistoryNavState(history, index)

  return (
    <IconButton
      onClick={() => redo()}
      icon={`${BASE_URL}images/controls/redo.svg`}
      disabled={isRedoDisabled}
      name="Redo"
      size="history"
    />
  )
}
