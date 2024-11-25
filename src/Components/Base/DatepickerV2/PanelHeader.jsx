import { useEffect, useState } from 'react'
import { useNamespace } from '@/Services/Hooks'
import { Select } from '../Select'
import { DAYJS_TYPE, monthsInYear } from './constants'

export default function PanelHeader({ selectMonth, selectYear, selfState }) {
  const ns = useNamespace('datepicker')

  const [years, setYears] = useState([])

  const generateYears = () => {
    const _years = []
    for (let i = 1970; i < 2100; i++) {
      _years.push(i)
    }
    setYears(_years)
  }

  useEffect(() => {
    generateYears()
  }, [])

  return (
    <div className={ns.e('panel-header')}>
      <Select
        data={monthsInYear}
        modelValue={selfState.get(DAYJS_TYPE.MONTH)}
        onChange={selectMonth}
        labelKey="label"
        valueKey="value"
        filterable={false}
        clearable={false}
        triggerClass={ns.e('month-select')}
      />

      <Select
        data={years}
        modelValue={selfState.get(DAYJS_TYPE.YEAR)}
        onChange={selectYear}
        filterable={false}
        clearable={false}
        customLabel={(year) => `Năm ${year}`}
        triggerClass={ns.e('year-select')}
      />
    </div>
  )
}
