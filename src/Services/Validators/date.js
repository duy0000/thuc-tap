import Swal from 'sweetalert2'
import { dayjs } from '../Utils'

export const date = (date) => {
  const dayjsDateInstance = dayjs(date)

  const callback = (method, message, ...params) => {
    const isValid = dayjsDateInstance[method](...params)

    if (!isValid && message) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        html: message,
      })
    }
    return isValid
  }

  return {
    isValid: (message) => callback('isValid', message),
    isAfter: (date, message) => callback('isAfter', message, date),
    isBefore: (date, message) => callback('isBefore', message, date),
    isBetween: (start, end, message) =>
      callback('isBetween', message, start, end),
    isSameOrAfter: (date, message) => callback('isSameOrAfter', message, date),
    isSameOrBefore: (date, message) =>
      callback('isSameOrBefore', message, date),
  }
}
