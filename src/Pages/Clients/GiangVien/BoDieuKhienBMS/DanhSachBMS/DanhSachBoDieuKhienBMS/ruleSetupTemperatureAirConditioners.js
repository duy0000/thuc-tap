/* eslint-disable no-unused-vars */
import * as Yup from 'yup'

const initialSetupTemperatureAirConditioners = {
  idcmd: 'set_temperature',
  min_temp: '',
  max_temp: '',
  ipadd: '',
}

const createTemperatureValidationSchema = () => {
  const validationFields = {
    min_temp: Yup.number()
      .typeError('Vui lòng nhập số')
      .required('Vui lòng nhập giá trị')
      .min(16, 'Giá trị phải lớn hơn hoặc bằng 16')
      .max(40, 'Giá trị phải nhỏ hơn hoặc bằng 40')
      .test(
        `is-greater-than-previous-off`,
        `Nhiệt độ tối thiểu phải nhỏ hơn nhiệt độ tối đa!`,
        function (value) {
          if (!value) return true // Skip validation if current min_temp is empty

          // Find the previous non-empty max_temp
          const maxTemperature = this.parent[`max_temp`]
          if (maxTemperature) {
            return value < maxTemperature
          }
          return true // No previous max_temp found to compare with
        },
      ),
    max_temp: Yup.number()
      .typeError('Vui lòng nhập số')
      .required('Vui lòng nhập giá trị')
      .min(16, 'Giá trị phải lớn hơn hoặc bằng 16')
      .max(40, 'Giá trị phải nhỏ hơn hoặc bằng 40')
      .test(
        `is-greater-than-current-on`,
        `Nhiệt độ tối đa phải lớn hơn nhiệt độ tối thiểu!`,
        function (value) {
          if (!value) return true // Skip validation if current off time is empty

          const minTemperature = this.parent[`min_temp`]
          if (!minTemperature) return true // Skip validation if the current on time is not set
          return value > minTemperature
        },
      ),
  }

  return Yup.object().shape(validationFields)
}

const tempValidationBMS = createTemperatureValidationSchema()
export default tempValidationBMS
