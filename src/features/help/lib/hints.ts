import { GameMode } from '@entities/game'

export type HelpHint = {
  label: string
  text: string
}

export type HelpSection = {
  title: string
  items: HelpHint[]
}

const MODE_TITLES: Partial<Record<GameMode, string>> = {
  [GameMode.PATH]: 'Path mode',
  [GameMode.LOCATIONS]: 'Locations mode',
  [GameMode.MEEPLE]: 'Meeples mode',
  [GameMode.MOVEMENT]: 'Movements mode',
}

const MODES_OVERVIEW: HelpHint[] = [
  {
    label: 'Path',
    text: 'Build the beast path: tap locations, waits, undo/redo.',
  },
  {
    label: 'Locations',
    text: 'Change terrain types by tapping locations on the map.',
  },
  {
    label: 'Meeples',
    text: 'Place and cycle meeples on locations; tap a token to wound it.',
  },
]

const MODE_BUTTONS: Partial<Record<GameMode, HelpHint[]>> = {
  [GameMode.PATH]: [
    {
      label: 'Clear path',
      text: 'Reset the path back to the starting location.',
    },
    {
      label: 'Undo / Redo',
      text: 'Step back or forward through path history.',
    },
    {
      label: 'Movements',
      text: 'Open movement cards for the current path (appears when the path has 2+ stops).',
    },
    {
      label: 'Map',
      text: 'Tap a highlighted neighbor to extend the path. Tap the current stop to add a wait.',
    },
  ],
  [GameMode.LOCATIONS]: [
    {
      label: 'Map',
      text: 'Tap a location to cycle its terrain type.',
    },
  ],
  [GameMode.MEEPLE]: [
    {
      label: 'Map',
      text: 'Tap a location to cycle meeples on it.',
    },
    {
      label: 'Meeple',
      text: 'Tap a meeple token to mark a wound / remove it.',
    },
  ],
  [GameMode.MOVEMENT]: [
    {
      label: 'Movements',
      text: 'Browse direction cards for each path step. Tap again to leave this mode.',
    },
  ],
}

const COMMON_BUTTONS: HelpHint[] = [
  {
    label: 'Modes',
    text: 'Switch Path, Locations, and Meeples from the top bar.',
  },
  {
    label: 'Zoom + / -',
    text: 'Zoom the map in or out.',
  },
  {
    label: 'Back',
    text: 'Return to the map selection screen.',
  },
  {
    label: 'Help (?)',
    text: 'Toggle these tips. Press again to hide.',
  },
]

const KEYBOARD_COMMON: HelpHint[] = [
  { label: '= / -', text: 'Zoom in / out. Also Shift+= / Shift+-.' },
  { label: 'M', text: 'Cycle Path → Locations → Meeples.' },
  { label: '1 / 2 / 3', text: 'Switch to Path / Locations / Meeples.' },
]

const KEYBOARD_BY_MODE: Partial<Record<GameMode, HelpHint[]>> = {
  [GameMode.PATH]: [
    { label: 'Backspace', text: 'Remove the last path step.' },
    { label: 'Delete', text: 'Clear the whole path.' },
    { label: 'Ctrl/⌘ Z', text: 'Undo. Shift+Z — redo.' },
    { label: 'N', text: 'Add a wait on the current location.' },
    {
      label: 'WASD / Arrows / Numpad',
      text: 'Move to a linked location (numpad 8/4/6/2).',
    },
  ],
  [GameMode.LOCATIONS]: [
    { label: 'Delete', text: 'Reset all changed terrains to default.' },
  ],
  [GameMode.MOVEMENT]: [
    { label: '← / →', text: 'Previous / next movement card.' },
  ],
}

export const getHelpSections = (mode: GameMode): HelpSection[] => {
  const modeTitle = MODE_TITLES[mode] ?? 'Current mode'
  const modeItems = MODE_BUTTONS[mode] ?? []
  const keyboardItems = [...KEYBOARD_COMMON, ...(KEYBOARD_BY_MODE[mode] ?? [])]

  const sections: HelpSection[] = [{ title: 'Modes', items: MODES_OVERVIEW }]

  if (modeItems.length > 0) {
    sections.push({ title: modeTitle, items: modeItems })
  }

  if (mode !== GameMode.MOVEMENT) {
    sections.push({ title: 'Common controls', items: COMMON_BUTTONS })
  } else {
    sections.push({
      title: 'Common controls',
      items: COMMON_BUTTONS.filter((item) => item.label === 'Help (?)'),
    })
  }

  sections.push({ title: 'Keyboard', items: keyboardItems })

  return sections
}
