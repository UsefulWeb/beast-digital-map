import { resetLocationsType } from '@entities/location'
import { clearPath } from '@entities/path'

export const resetGameBoard = () => {
  resetLocationsType()
  clearPath()
}
