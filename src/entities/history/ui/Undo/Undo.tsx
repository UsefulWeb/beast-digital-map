import { BASE_URL } from '@shared/config'
import { IconButton } from '@shared/ui'
import { getHistoryNavState } from '../../lib'
import {
  selectHistoryData,
  selectHistoryIndex,
  undo,
  useHistoryStore,
} from '../../model'

export const Undo = () => {
  const history = useHistoryStore(selectHistoryData)
  const index = useHistoryStore(selectHistoryIndex)
  const { isUndoDisabled } = getHistoryNavState(history, index)

  return (
    <IconButton
      onClick={() => undo()}
      icon={`${BASE_URL}images/controls/undo.svg`}
      disabled={isUndoDisabled}
      name="Undo"
      size="history"
    />
  )
}
