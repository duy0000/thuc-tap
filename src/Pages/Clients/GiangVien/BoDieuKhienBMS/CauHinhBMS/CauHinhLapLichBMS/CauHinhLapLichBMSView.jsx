/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NUMBER_SCHEDULE } from '../../constants'
import clsx from 'clsx'
import DanhSachBDKBMSDungChung from '../../DanhSachBDKBMSDungChung'
import { Formik } from 'formik'
import {
  SetupScheduleBMSSchema,
  schemaValidationBMS,
} from './ruleSetupScheduleBMS'
import { useSetupScheduleBMSMutation } from '../../BoDieuKhienBMSReduxAPI/remoteControllBMS.service'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import { assign, map, pick } from 'lodash-unified'
import Loading from '@/Components/Loading/Loading'

const CauHinhLapLichBMSView = (props) => {
  const {
    listRemoteControllBMS,
    numSchedule,
    onChangeNumSchedule,
    numSelected,
    rowCount,
    onSelectAllClick,
    onSelected,
    isSelected,
    formData,
    dataSelected,
    setSelected,
    setFormData,
    initialFormData,
  } = props

  const [setupScheduleBMS] = useSetupScheduleBMSMutation()
  const [isHandling, setIsHandling] = useState(false)
  return (
    <section className="bg-white rounded-lg p-2 h-full shadow-sm">
      <h3 className="font-bold text-center text-2xl uppercase text-cyan-600 mb-4">
        Cấu hình lập lịch
      </h3>
      {/* END: Header */}
      <Formik
        initialValues={formData}
        validationSchema={schemaValidationBMS}
        onReset={() => setFormData(initialFormData)}
        onSubmit={async (values) => {
          if (dataSelected?.length === 0 || !dataSelected) {
            return Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: 'Vui loại chọn ít nhất 1 thiết bị BMS để thay đổi lịch thiết lập!',
            })
          }

          const checkBMSDisconnect = dataSelected.some(
            (item) => item?.trang_thai === 0,
          )

          if (checkBMSDisconnect) {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: 'Vui lòng chỉ chọn thiết bị BMS không mất kết nối!',
            })
            return
          }

          const newDataBMSSelected = map(dataSelected, (item) => {
            return assign({
              ...values,
              ipadd: item?.ipadd,
              syn_service: item?.syn_service.toString(),
              syn_status: '0',
              output: '1',
              date_event: values?.date_event,
            })
          })
          // .unwrap()
          let timeout = dataSelected.length
          setIsHandling(true)

          setupScheduleBMS(newDataBMSSelected, timeout)
            .unwrap()
            .then((res) => {
              if (
                res.status === 200 &&
                res?.data?.length === dataSelected?.length
              ) {
                setIsHandling(false)
                Swal.fire({
                  icon: 'success',
                  title: 'Thông báo!',
                  text: `Thiết lập lịch cho ${dataSelected?.length} thiết bị BMS thành công`,
                })
              }
              return
            })
            .catch((err) => {
              setIsHandling(false)
              Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: `Thiết lập lịch cho ${dataSelected?.length} thiết bị BMS thất bại!`,
                footer:
                  'Vui lòng liên hệ đến bộ phận kỹ thuật để khắc phục sự cố!',
              })
              console.log(err)
            })
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
        }) => {
          return (
            <>
              {isHandling && (
                <div className="fixed top-0 left-0 bottom-0 w-full h-full bg-gray-400/50 z-50">
                  <Loading />
                </div>
              )}
              <form
                className="border border-gray-200 rounded-lg p-2 mb-10"
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
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
                      value={values.number_schedule}
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
                          values.number_schedule > 0 && '',
                        )}
                      >
                        (Tối đa 12 lịch trong 1 ngày. Một lịch được hiểu là 1
                        giá trị bắt đầu và 1 giá trị kết thúc.)
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
                      value={values.date_event}
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
                      // readOnly
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
                          <div
                            key={index}
                            className="grid md:grid-cols-2 gap-4"
                          >
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
                    disabled={isHandling}
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
              </form>
            </>
          )
        }}
      </Formik>
      {/* END: Form cấu hình */}

      <DanhSachBDKBMSDungChung
        listDieuKhienBMS={listRemoteControllBMS}
        numSelected={numSelected}
        rowCount={listRemoteControllBMS?.length ?? 0}
        onSelectAllClick={onSelectAllClick}
        onSelected={onSelected}
        isSelected={isSelected}
      />
      {/* END: Danh sách thiết bị */}
    </section>
  )
}

CauHinhLapLichBMSView.propTypes = {
  listRemoteControllBMS: PropTypes.array.isRequired,
  numSchedule: PropTypes.number,
  onChangeNumSchedule: PropTypes.func,
}

export default CauHinhLapLichBMSView
