import { Button } from '../../../shared/ui'
import { MapType } from '../../../shared/util/interfaces'
import S from './MapSelector.module.scss'

export const mapTypes = [
  {
    type: MapType.DRENCHED_LANDS,
    title: (
      <>
        the <br />
        Drenched Lands
      </>
    ),
  },
  {
    type: MapType.NORTHERN_EXPANSE,
    title: (
      <>
        the Northern
        <br />
        Expanse
      </>
    ),
  },
]

export interface MapSelectorProps {
  onSelect?: (type: MapType) => void
}

export const MapSelector = (props: MapSelectorProps) => {
  const { onSelect = (f) => f } = props
  return (
    <div className={S.container}>
      {mapTypes.map((item, key: number) => (
        <Button key={key} type={'fixed'} onClick={() => onSelect(item.type)}>
          {item.title}
        </Button>
      ))}
    </div>
  )
}
