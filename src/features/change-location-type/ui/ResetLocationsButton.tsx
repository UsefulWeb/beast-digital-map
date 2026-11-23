import {
  countModifiedLocations,
  resetLocationsType,
  selectLocations,
  useLocationsStore,
} from '@entities/location'
import { BASE_URL } from '@shared/config'
import { IconButton } from '@shared/ui'

export const ResetLocationsButton = () => {
  const locations = useLocationsStore(selectLocations)
  const modifiedCount = countModifiedLocations(locations)

  return (
    <IconButton
      onClick={() => resetLocationsType()}
      disabled={modifiedCount === 0}
      icon={`${BASE_URL}images/controls/clear-locations.svg`}
      name="Clear Locations"
      size="clear"
    />
  )
}
