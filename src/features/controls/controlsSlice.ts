import { useLocationsStore } from '../locations/locationsSlice'
import { usePathStore } from '../path/pathSlice'

export const reset = () => {
  useLocationsStore.getState().resetLocationsType()
  usePathStore.getState().clearPath()
}
