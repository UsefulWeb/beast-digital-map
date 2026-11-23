import { BASE_URL } from '@shared/config'
import { IconButton } from '@shared/ui'
import { togglePathLocationsMode } from '../../lib'
import { GameMode, selectMode, setGameMode, useGameStore } from '../../model'

const icons = {
  [GameMode.PATH]: `${BASE_URL}images/controls/mode-locations.svg`,
  [GameMode.LOCATIONS]: `${BASE_URL}images/controls/mode-path.svg`,
  [GameMode.MOVEMENT]: null,
}

export const ModeSwitch = () => {
  const gameMode = useGameStore(selectMode)
  const icon = icons[gameMode]

  const toggleMode = () => {
    setGameMode(togglePathLocationsMode(gameMode))
  }

  if (!icon) {
    return null
  }

  return <IconButton onClick={toggleMode} icon={icon} name="" size="mode" />
}
