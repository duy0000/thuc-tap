import { dayjs } from '@/Services/Utils/dayjs'
import { transformCls } from '@/Services/Utils/reactUtils'
import { isEmpty, isEqual } from 'lodash-unified'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePrevious } from 'react-use'

export const useDatePick = ({
  clearable = true,
  modelValue = null,
  valueOnClear,
  triggerClass,
  onChange,
  disabled,
  valueFormat = 'YYYY/MM/DD',
}) => {
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false)
  const [selfState, setSelfState] = useState(dayjs())
  const [days, setDays] = useState([])
  const value = useMemo(
    () =>
      modelValue && dayjs(modelValue).isValid() ? dayjs(modelValue) : undefined,
    [modelValue],
  )
  const prevSelfState = usePrevious(selfState)
  const isFirstRender = useRef(true)

  const onMouseEnteredTrigger = () => {
    setIsHoveringTrigger(true)
  }

  const onMouseLeavedTrigger = () => {
    setIsHoveringTrigger(false)
  }

  const handleClearData = () => {
    onChange(valueOnClear)
  }

  const shouldShowClearableIcon = useMemo(() => {
    return (
      !disabled &&
      clearable &&
      (!isEmpty(modelValue) || isEqual(modelValue, valueOnClear)) &&
      isHoveringTrigger
    )
  }, [clearable, modelValue, isHoveringTrigger])

  const selectTriggerKls = useMemo(() => {
    return transformCls([
      'flex items-center justify-between px-2 py-1 outline-none rounded-lg w-[200px]',
      'select-none cursor-pointer base-input',
      triggerClass,
    ])
  }, [triggerClass])

  const generateDaysInCalendar = useCallback(() => {
    if (selfState.isSame(prevSelfState, 'month')) {
      if (!isFirstRender.current) return

      isFirstRender.current = false
    }

    const date = selfState
    const startOfMonth = date.startOf('month')
    const endOfMonth = date.endOf('month')
    const startOfWeek = startOfMonth.startOf('isoWeek')
    const endOfWeek = endOfMonth.endOf('isoWeek').add(1, 'day')

    const _days = []
    let currentDay = startOfWeek

    while (currentDay.isBefore(endOfWeek, 'day')) {
      _days.push({
        day: currentDay,
        isToday: currentDay.isSame(dayjs(), 'day'),
        isNextMonth: currentDay.isAfter(endOfMonth, 'month'),
        isPrevMonth: currentDay.isBefore(startOfMonth, 'month'),
      })
      currentDay = currentDay.add(1, 'day')
    }

    setDays(_days)
  }, [selfState, value, prevSelfState])

  const goToNextMonth = () => {
    setSelfState(selfState.add(1, 'month'))
  }

  const goToPrevMonth = () => {
    setSelfState(selfState.subtract(1, 'month'))
  }

  const selectMonth = (month) => {
    setSelfState(selfState.month(month))
  }

  const selectYear = (year) => {
    setSelfState(selfState.year(year))
  }

  const selectDate = (date) => {
    if (disabled) return
    setSelfState(date)
    onChange(date.format(valueFormat))
  }

  useEffect(() => {
    generateDaysInCalendar()
  }, [selfState])

  return {
    shouldShowClearableIcon,
    selectTriggerKls,
    onMouseEnteredTrigger,
    onMouseLeavedTrigger,
    handleClearData,
    isDisabled: disabled,
    selfState,
    setSelfState,
    generateDaysInCalendar,
    days,
    value,
    goToNextMonth,
    goToPrevMonth,
    selectMonth,
    selectYear,
    selectDate,
  }
}
