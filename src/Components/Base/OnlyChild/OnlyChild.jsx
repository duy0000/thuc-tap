import { forwardRef, Children, cloneElement } from 'react'

export const OnlyChild = forwardRef(({ children, ...props }, ref) => {
  let singleChild = children

  if (Array.isArray(children) && children.length > 1) {
    console.warn(
      'More than one child passed to OnlyChild. Only the first child will be rendered.',
    )
    singleChild = Children.toArray(children)[0]
  }

  if (!singleChild) return null

  return cloneElement(singleChild, {
    ...props,
    ref,
  })
})

OnlyChild.displayName = 'OnlyChild'
