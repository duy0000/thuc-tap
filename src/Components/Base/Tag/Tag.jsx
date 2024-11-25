import { useNamespace } from '@/Services/Hooks'

import './Tag.scss'
import { transformCls } from '@/Services/Utils/index.js'

export default function Tag({ children, color }) {
  const bem = useNamespace('tag')

  return (
    <div className={transformCls([bem.b(), bem.is(`color-${color}`, color)])}>
      <span className={bem.e('content')}>{children}</span>
    </div>
  )
}
