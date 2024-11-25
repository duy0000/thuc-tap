import { Fragment } from 'react'

import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils'

import SkeletonItem from './SkeletonItem'
import './Skeleton.scss'

export default function Skeleton({
  loading = true,
  rows = 1,
  count = 1,
  animated = true,
  children,
  template = null,
  variant = 'p',
  className,
}) {
  const ns = useNamespace('skeleton')

  const ListSkeletonItem = []

  for (let i = 0; i < rows; i++) {
    ListSkeletonItem.push(
      <SkeletonItem
        key={i}
        className={transformCls([
          ns.e('paragraph'),
          ns.is('last', i === rows - 1 && rows > 1),
        ])}
        variant={variant}
      />,
    )
  }

  const numsRender = []

  for (let i = 0; i < count; i++) {
    numsRender.push(i)
  }

  if (!loading) {
    return children
  }

  if (template) return template

  return (
    <div
      className={transformCls([className, ns.b(), ns.is('animated', animated)])}
    >
      {numsRender.map((i) => (
        <Fragment key={i}>
          <SkeletonItem className={ns.is('first')} variant={variant} />
          {rows > 1 && ListSkeletonItem.map((e) => e)}
        </Fragment>
      ))}
    </div>
  )
}
