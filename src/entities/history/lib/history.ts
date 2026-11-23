import type { LocationItem } from '@entities/location'

export type HistoryPath = LocationItem[]

export const pushHistoryState = (
  history: HistoryPath[],
  index: number,
  path: HistoryPath,
) => {
  const data = [...history.slice(0, index + 1), path]
  return {
    data,
    index: data.length - 1,
  }
}

export const getHistoryNavState = (history: HistoryPath[], index: number) => {
  const isEmpty = history.length === 0
  return {
    isUndoDisabled: isEmpty || index < 2,
    isRedoDisabled: isEmpty || index === history.length - 1,
  }
}
