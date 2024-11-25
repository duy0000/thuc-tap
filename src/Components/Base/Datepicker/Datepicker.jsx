import { dayjs } from '@/Services/Utils/dayjs'
import { useNamespace } from '@/Services/Hooks'

import './Datepicker.scss'

export default function Datepicker({ modelValue, onUpdateModelValue }) {
  const ns = useNamespace('datepicker')

  const handleChangeSelectedDay = (e) => {
    onUpdateModelValue(dayjs(e.target.value))
  }

  return (
    <>
      {/* Date header */}
      <div>
        <input
          className={ns.e('input')}
          type="date"
          data-date={dayjs(modelValue).format('DD-MM-YYYY')}
          value={dayjs(modelValue).format('YYYY-MM-DD')}
          onChange={handleChangeSelectedDay}
        />
      </div>
    </>
  )
}
