import type { Path } from '../model/types'

export const EMPTY_PATH: Path = []

export const canClearPath = (path: Path) => path.length > 1
