import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { schemaValidationSetupScheduleBMS } from './validation'
import { initialFormDataSetupSchedule, NUMBER_SCHEDULE } from './constants'
import clsx from 'clsx'
import { dayjs } from '@/Services/Utils'

function GroupSetupSchedule({ isHandling, onSubmitSchedule }) {
  return (
    <div className="border rounded-lg p-2">
      <Formik
        initialValues={initialFormDataSetupSchedule}
        validationSchema={schemaValidationSetupScheduleBMS}
        onSubmit={(values) => {
          onSubmitSchedule && onSubmitSchedule(values)
        }}
      >
        {({ values, errors, isSubmitting, handleChange, handleBlur }) => {
          return (
            <Form>
              <div className="form__fields w-full grid md:grid-cols-3 gap-4 items-center mb-6">
                <div className="number-schedule__box relative inset-0 w-full h-full mt-3">
                  <label
                    htmlFor="number_schedule"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Chọn số lượng lịch cần thiết lập{' '}
                    <span className="text-red-600">*</span>
                  </label>

                  <select
                    name="number_schedule"
                    id="number_schedule"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.number_schedule}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="0">Chọn số lịch cần thiết lập</option>
                    {NUMBER_SCHEDULE.map((item) => {
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      )
                    })}
                  </select>
                  {errors.number_schedule ? (
                    <p className="text-red-500 text-xs italic">
                      {errors.number_schedule}
                    </p>
                  ) : (
                    <p
                      className={clsx(
                        'absolute text-red-500 text-xs italic',
                        values?.number_schedule > 0 && '',
                      )}
                    >
                      (Tối đa 12 lịch trong 1 ngày. Một lịch được hiểu là 1 giá
                      trị bắt đầu và 1 giá trị kết thúc.)
                    </p>
                  )}
                </div>
                {/* END: .number-schedule__box */}
                <div className="date-schedule__box">
                  <label
                    htmlFor="date_schedule"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ngày thực hiện
                    <span className="text-red-600"> *</span>
                  </label>
                  <input
                    type="date"
                    id="date_event"
                    name="date_event"
                    min={dayjs().format('YYYY/MM/DD')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleChange}
                    value={values?.date_event}
                    onKeyDown={(e) => {
                      e.preventDefault()
                    }}
                    onPaste={(e) => {
                      // Ngăn người dùng thay đổi giá trị bằng cách paste
                      e.preventDefault()
                    }}
                    onDrag={(e) => {
                      // Ngăn người dùng thay đổi giá trị bằng cách kéo thả dữ liệu
                      e.preventDefault()
                    }}
                  />
                  {errors.date_event && (
                    <p className="text-red-500 text-xs italic inline-block min-h-[8px]">
                      {errors.date_event}
                    </p>
                  )}
                </div>
                {/* END: .date-schedule__box */}
              </div>
              {/* END: Tạo .form__fields */}
              <div
                className={clsx(
                  'list__number--schedule my-10',
                  parseInt(values?.number_schedule) > 0 ? 'block' : 'hidden',
                )}
              >
                {values?.number_schedule &&
                  Array(parseInt(values?.number_schedule))
                    .fill(1)
                    .map((item, index) => {
                      return (
                        <div key={index} className="grid md:grid-cols-2 gap-4">
                          <div className="mb-4">
                            <label
                              htmlFor={`time_start_${index + 1}`}
                              className="block text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Thời gian bắt đầu lần {index + 1}:
                            </label>
                            <input
                              type="time"
                              name={`on${index + 1}`}
                              id={`on${index + 1}`}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={handleChange}
                              value={values[`on${index + 1}`]}
                              onKeyDown={(e) => {
                                e.preventDefault()
                              }}
                              onPaste={(e) => {
                                e.preventDefault()
                              }}
                              onDrag={(e) => {
                                e.preventDefault()
                              }}
                            />
                            {errors[`on${index + 1}`] && (
                              <p className="text-red-500 text-xs italic">
                                {errors[`on${index + 1}`]}
                              </p>
                            )}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`time_end_${index + 1}`}
                              className="block text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Thời gian kết thúc lần {index + 1}:
                            </label>
                            <input
                              type="time"
                              name={`off${index + 1}`}
                              id={`off${index + 1}`}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={handleChange}
                              value={values[`off${index + 1}`]}
                              onKeyDown={(e) => {
                                e.preventDefault()
                              }}
                              onPaste={(e) => {
                                e.preventDefault()
                              }}
                              onDrag={(e) => {
                                e.preventDefault()
                              }}
                            />
                            {errors[`off${index + 1}`] && (
                              <p className="text-red-500 text-xs italic">
                                {errors[`off${index + 1}`]}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
              </div>
              {/* END: .list__number--schedule */}
              <div className="form__actions mt-10 flex justify-end">
                <button
                  type="submit"
                  disabled={isHandling || isSubmitting}
                  // onClick={handleSubmit}
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  {isHandling ? 'Đang xử lý...' : 'Lưu'}
                </button>
                <button
                  type="reset"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Hủy
                </button>
              </div>
              {/* END: Tác vụ: .form__actions */}
            </Form>
          )
        }}
      </Formik>
      {/* END: Form cấu hình */}
    </div>
  )
}

GroupSetupSchedule.propTypes = {
  isHandling: PropTypes.bool,
  onSubmitSchedule: PropTypes.func,
}

export default GroupSetupSchedule
