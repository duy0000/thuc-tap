import { useNamespace } from '@/Services/Hooks'

import './Icon.scss'
import { transformCls } from '@/Services/Utils'

export default function Icon(props) {
  const { size = 18, children, className } = props

  const ns = useNamespace('icon')

  return (
    <i
      {...props}
      className={transformCls([ns.b(), 'shrink-0', className])}
      style={{ fontSize: size, width: size, height: size }}
    >
      {children}
    </i>
  )
}
