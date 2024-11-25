import { createContext } from 'react'

export const DatepickerCtx = createContext()

export const daysInWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

export const monthsInYear = [
  {
    label: 'Tháng 1',
    value: 0,
  },
  {
    label: 'Tháng 2',
    value: 1,
  },
  {
    label: 'Tháng 3',
    value: 2,
  },
  {
    label: 'Tháng 4',
    value: 3,
  },
  {
    label: 'Tháng 5',
    value: 4,
  },
  {
    label: 'Tháng 6',
    value: 5,
  },
  {
    label: 'Tháng 7',
    value: 6,
  },
  {
    label: 'Tháng 8',
    value: 7,
  },
  {
    label: 'Tháng 9',
    value: 8,
  },
  {
    label: 'Tháng 10',
    value: 9,
  },
  {
    label: 'Tháng 11',
    value: 10,
  },
  {
    label: 'Tháng 12',
    value: 11,
  },
]

export const DAYJS_TYPE = {
  DATE: 'date',
  MONTH: 'month',
  YEAR: 'year',
}

export const KEY_CODE = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Delete: 'Delete',
  Backspace: 'Backspace',
}
