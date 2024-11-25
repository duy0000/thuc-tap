import { useNamespace } from '@/Services/Hooks'

export default function PickLabel({ value, labelFormat }) {
  const ns = useNamespace('datepicker')

  return (
    <div className={ns.e('panel-input')}>
      {value?.isValid() ? value.format(labelFormat) : labelFormat.toLowerCase()}
    </div>
  )
}
