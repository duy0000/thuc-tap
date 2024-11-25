import * as Yup from 'yup'
export const initialSetupScheduleBMSFormData = {
  idcmd: 'set_schedule',
  ipadd: '',
  syn_status: '0',
  date_event: '',
  number_schedule: 0,
  output: '',
  on1: '',
  off1: '',
  on2: '',
  off2: '',
  on3: '',
  off3: '',
  on4: '',
  off4: '',
  on5: '',
  off5: '',
  on6: '',
  off6: '',
  on7: '',
  off7: '',
  on8: '',
  off8: '',
  on9: '',
  off9: '',
  on10: '',
  off10: '',
  on11: '',
  off11: '',
  on12: '',
  off12: '',
}

const createScheduleValidationSchema = () => {
  const validationFields = {
    date_event: Yup.date()
      .nullable()
      .min(
        new Date().toISOString().split('T')[0],
        'Ngày lập lịch phải lớn hơn hoặc bằng ngày hiện tại!',
      )
      .required('Vui lòng chọn ngày lập lịch!'),
    number_schedule: Yup.number()
      .min(1, 'Vui lòng chọn số lịch cần thiết lập trong 1 ngày!')
      .required('Vui lòng chọn số lịch cần thiết lập trong 1 ngày!'),
    // output: Yup.string().required('Vui lòng chọn công tắc cần thiết lập'),
  }

  for (let i = 1; i <= 12; i++) {
    validationFields[`on${i}`] = Yup.string()
      .nullable()
      .test(
        `is-greater-than-previous-off`,
        `Thời gian bật ${i} phải lớn hơn thời gian tắt trước đó`,
        function (value) {
          if (!value) return true // Skip validation if current on time is empty

          // Find the previous non-empty off time
          for (let j = i - 1; j > 0; j--) {
            const previousOffTime = this.parent[`off${j}`]
            if (previousOffTime) {
              return value > previousOffTime
            }
          }
          return true // No previous off time found to compare with
        },
      )

    validationFields[`off${i}`] = Yup.string()
      .nullable()
      .test(
        `is-greater-than-current-on`,
        `Thời gian tắt ${i} phải lớn hơn thời gian bật ${i}`,
        function (value) {
          if (!value) return true // Skip validation if current off time is empty

          const currentOnTime = this.parent[`on${i}`]
          if (!currentOnTime) return true // Skip validation if the current on time is not set
          return value > currentOnTime
        },
      )
  }

  return Yup.object().shape(validationFields)
}

export const schemaValidationBMS = createScheduleValidationSchema()

// Hàm kiểm tra thời gian dạng "HH:mm"
const validateTimeFormat = (message = 'Thời gian không hợp lệ') =>
  Yup.string().test({
    name: 'time-format',
    exclusive: true,
    message,
    test: (value) => {
      if (!value) return false // Không cho phép trường rỗng
      return /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/.test(value)
    },
  })

export const SetupScheduleBMSSchema = Yup.object().shape({
  // 1. Ngày lập lịch
  date_event: Yup.date()
    .nullable()
    .min(
      new Date().toISOString().split('T')[0],
      'Ngày lập lịch phải lớn hơn hoặc bằng ngày hiện tại!',
    )
    .required('Vui lòng chọn ngày lập lịch!'),

  // 2. Số lượng lịch
  number_schedule: Yup.number()
    .min(1, 'Vui lòng chọn số lịch cần thiết lập trong 1 ngày!')
    .required('Vui lòng chọn số lịch cần thiết lập trong 1 ngày!'),

  // 3. đầu ra output cần thực hiện áp dụng lịch
  output: Yup.string().required('Vui lòng chọn công tắc cần thiết lập'),

  // 4. thời gian lần 1 bật output
  on1: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 1) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off1: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 1) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on1'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),

  // 6. thời gian lần 1 bật output
  on2: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off1'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off2: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on2'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),

  // on3 - off3
  // 6. thời gian lần 1 bật output
  on3: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on3',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 3 phải lớn hơn thời gian kết thúc lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off2'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off3: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on3'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on4
  // 6. thời gian lần 1 bật output
  on4: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 3',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off3'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off4: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on4'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on5
  // 6. thời gian lần 1 bật output
  on5: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off4'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off5: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on5'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on6
  // 6. thời gian lần 1 bật output
  on6: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off5'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off6: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on5'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on7
  // 6. thời gian lần 1 bật output
  on7: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off6'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off7: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on6'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on8
  // 6. thời gian lần 1 bật output
  on8: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off7'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off8: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on7'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on9
  // 6. thời gian lần 1 bật output
  on9: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off8'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off9: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 9',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on9'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on10
  // 6. thời gian lần 1 bật output
  on10: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off9'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off10: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on9'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on11
  // 6. thời gian lần 1 bật output
  on11: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off10'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off11: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on11'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
  //on12
  // 6. thời gian lần 1 bật output
  on12: Yup.string().when('number_schedule', (numberSchedule, startTime) => {
    if (numberSchedule >= 2) {
      return startTime
        ? startTime
            .required('Thời gian bắt đầu không được bỏ trống')
            .test({
              name: 'on1',
              exclusive: true,
              message:
                'Thời gian bắt đầu lần 2 phải lớn hơn thời gian kết thúc lần 1',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('off11'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
            .concat(validateTimeFormat())
        : startTime
    }
    return startTime
  }),

  // 5. thời gian lần 1 tắt output
  off12: Yup.string().when('number_schedule', (numberSchedule, endTime) => {
    if (numberSchedule >= 2) {
      return endTime
        ? endTime
            .required('Thời gian kết thúc không được bỏ trống')
            .concat(validateTimeFormat())
            .test({
              name: 'endTime',
              exclusive: true,
              message:
                'Thời gian kết thúc lần 2 phải lớn hơn thời gian bắt đầu lần 2',
              test: function (value) {
                const startTime = this.resolve(Yup.ref('on12'))
                if (!startTime || !value) return true
                return value > startTime
              },
            })
        : endTime
    }
    return endTime
  }),
})
