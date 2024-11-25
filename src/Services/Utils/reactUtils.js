import { isFunction } from 'lodash-unified'

export const unrefElement = (target) => {
  if (target && 'current' in target) {
    return target.current
  }
  return target
}

export const transformCls = (cls) => cls.filter((e) => e).join(' ')

export const handleBackRoute = (navigate, fallback = '') => {
  if (!isFunction(navigate))
    throw new Error('(handleBackRoute) [navigate] must be a function')

  if (window.history.length > 2) {
    return navigate(-1)
  }

  if (fallback) {
    return navigate(fallback)
  }
}
