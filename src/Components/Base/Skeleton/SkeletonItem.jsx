import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils'
import Image from './Image'

import './SkeletonItem.scss'

/**
 * 
 * @param {*} variant [
      'circle',
      'rect',
      'h1',
      'h3',
      'text',
      'caption',
      'p',
      'image',
      'button',
    ] 
 * @returns 
 */
export default function SkeletonItem({
  variant = 'text',
  className,
  ...attrs
}) {
  const ns = useNamespace('skeleton')
  return (
    <div
      {...attrs}
      className={transformCls([className, ns.e('item'), ns.e(variant)])}
    >
      {variant === 'image' && <Image />}
    </div>
  )
}
