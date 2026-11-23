import classnames from 'classnames'
import redoIcon from '../../../../public/images/redo.svg'
import undoIcon from '../../../../public/images/undo.svg'
import {
  redo,
  selectHistoryData,
  selectHistoryIndex,
  undo,
  useHistoryStore,
} from '../../../features/history/historySlice'
import { IconButton } from '../../../shared/ui'
import S from './HistoryControls.module.scss'

export interface HistoryControlsProps {
  controlClassName?: string
}

export const HistoryControls = (props: HistoryControlsProps) => {
  const historyIndex = useHistoryStore(selectHistoryIndex)
  const history = useHistoryStore(selectHistoryData)

  const isHistoryEmpty = history.length === 0
  const isUndoDisabled = isHistoryEmpty || historyIndex < 2
  const isRedoDisabled = isHistoryEmpty || historyIndex === history.length - 1

  const controlClassName = classnames(props.controlClassName, S.control)

  return (
    <>
      <div className={controlClassName}>
        <IconButton
          onClick={() => undo()}
          className={S.undo}
          icon={undoIcon}
          name={'Undo'}
          disabled={isUndoDisabled}
        />
      </div>
      <div className={controlClassName}>
        <IconButton
          onClick={() => redo()}
          className={S.redo}
          icon={redoIcon}
          name={'Redo'}
          disabled={isRedoDisabled}
        />
      </div>
    </>
  )
}
