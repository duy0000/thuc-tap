import { isEmpty, isNil, isNumber, isString } from 'lodash-unified'
import Swal from 'sweetalert2'

export const required = (val, message = '') => {
  if (typeof val === 'function') {
    val = val()
  }

  if (val === 0 || isNumber(val)) return true
  if (isString(val)) {
    if (val.trim().length > 0) return true
  } else if (!isEmpty(val) && !isNil(val)) return true

  Swal.fire({
    icon: 'warning',
    title: 'Thông báo',
    html: message,
  })
  return false
}
