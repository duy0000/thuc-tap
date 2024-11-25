import { useNamespace } from '@/Services/Hooks'
import { DAYJS_TYPE, DatepickerCtx, daysInWeek } from './constants'
import { transformCls } from '@/Services/Utils/reactUtils'
import { useContext } from 'react'

function DateItem({ date }) {
  const datepickerCtx = useContext(DatepickerCtx)
  const ns = useNamespace('datepicker')

  return (
    <td
      className={transformCls([
        ns.e('date'),
        ns.is('today', date.isToday),
        ns.is('next-month', date.isNextMonth),
        ns.is('prev-month', date.isPrevMonth),
        ns.is(
          'selected',
          datepickerCtx.value?.isSame(date.day, DAYJS_TYPE.DATE),
        ),
      ])}
      onClick={() => datepickerCtx.selectDate(date.day)}
    >
      {date.day.get(DAYJS_TYPE.DATE)}
    </td>
  )
}

function RowInCalendar({ week }) {
  return (
    <tr>
      {week.map((date, key) => (
        <DateItem key={key} date={date} />
      ))}
    </tr>
  )
}

function GenerateRowsInCalendar(days) {
  const rows = []

  for (let i = 0; i < days.length; i += 7) {
    const week = []
    for (let j = 0; j < 7; j++) {
      week.push(days[i + j] || '')
    }
    rows.push(<RowInCalendar key={i} week={week} />)
  }

  return rows
}

export default function PanelDatePick({ days }) {
  const ns = useNamespace('datepicker')

  return (
    <table className={ns.b('table')} role="grid">
      <thead>
        <tr>
          {daysInWeek.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>{GenerateRowsInCalendar(days)}</tbody>
    </table>
  )
}
