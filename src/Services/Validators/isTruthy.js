import { isArray, isFunction } from 'lodash-unified'

export const isTrue = (value) => {
  if (isFunction(value)) {
    return isTrue(value())
  }

  if (isArray(value)) {
    return value.every(isTrue)
  }

  return value === true
}
