import classnames from 'classnames'
import clearLocationsIcon from '../../../../public/images/clear_locations.svg'
import {
  selectLocations,
  useLocationsStore,
} from '../../../features/locations/locationsSlice'
import { IconButton } from '../../../shared/ui'
import S from './ResetLocationsTypeButton.module.scss'

export interface ResetLocationsTypeButtonProps {
  className?: string
}

export const ResetLocationsTypeButton = (
  props: ResetLocationsTypeButtonProps,
) => {
  const { className } = props

  const locations = useLocationsStore(selectLocations)
  const resetLocationsType = useLocationsStore((s) => s.resetLocationsType)
  const modifiedLocationsCount = locations.filter(
    (item) => item.type !== item.defaultType,
  ).length

  return (
    <IconButton
      onClick={() => resetLocationsType()}
      className={classnames(S.container, className)}
      disabled={modifiedLocationsCount === 0}
      icon={clearLocationsIcon}
      name={'Clear Locations'}
    />
  )
}
