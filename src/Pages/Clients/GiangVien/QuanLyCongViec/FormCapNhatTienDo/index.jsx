import Button from '@/Components/Base/Button/Button'
import { Dialog, Slide, Tooltip } from '@mui/material'
import { Formik } from 'formik'
import { forwardRef, memo, useEffect, useMemo, useRef, useState } from 'react'
import { getProgressColor } from './constants'
import { DebounceInput } from 'react-debounce-input'
import moment from 'moment'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import Swal from 'sweetalert2'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import clsx from 'clsx'
import { convertDataFileToBase64 } from '@/Services/Utils/index.js'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FormCapNhatTienDo = memo(function FormCapNhatTienDo({
  title,
  open,
  onClose,
  onHideSafeDialog,
  dataCongViec,
}) {
  const formikRef = useRef(null)
  const fileCapNhatRef = useRef(null)
  const [percent, setPercent] = useState(0)
  const [initialPercent, setInitialPercent] = useState(0)

  useEffect(() => {
    if (dataCongViec) {
      const currentPercent =
        dataCongViec.CV_HT_PhanCongThucHien_XacNhan_PhanTram
      setPercent(currentPercent)
      setInitialPercent(currentPercent)
    }
  }, [dataCongViec])

  const handlePercentChange = (e) => {
    const newPercent = parseInt(e.target.value, 10)
    if (newPercent < initialPercent) {
      toast.warning('Thanh tiến độ không thể nhỏ hơn giá trị hiện tại!')
      return
    }
    setPercent(newPercent)
  }

  const { mutateAsync: mutateUpdateTienDoCVAsync, isLoading } = useMutation({
    mutationFn: async (data) => {
      return await apiQuanLyCongViec.editXacNhanCongViec(data)
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (dataCongViec) {
      setPercent(dataCongViec.CV_HT_PhanCongThucHien_XacNhan_PhanTram)
    }
  }, [dataCongViec])

  const _idPhanCongThucHien = useMemo(() => {
    return dataCongViec?.CV_HT_PhanCongThucHien_ID ?? ''
  }, [dataCongViec])

  const handleSubmitForm = async (values) => {
    Swal.fire({
      icon: 'question',
      title: 'Thầy/Cô chắc chắn xác nhận lưu tiến độ công việc?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateUpdateTienDoCVAsync({
          CV_HT_PhanCongThucHien_ID: _idPhanCongThucHien,
          CV_HT_PhanCongThucHien_XacNhan_PhanTram: String(percent),
          CV_HT_PhanCongThucHien_XacNhan_TenFile:
            values.CV_HT_PhanCongThucHien_XacNhan_TenFile,
          CV_HT_PhanCongThucHien_XacNhan_DataFile:
            values.CV_HT_PhanCongThucHien_XacNhan_DataFile,
          CV_HT_PhanCongThucHien_XacNhan_MoTa:
            values.CV_HT_PhanCongThucHien_XacNhan_MoTa,
        })
          .then((res) => {
            if (res?.data?.code === 200) {
              toast.success('Cập nhật tiến độ công việc thành công!')
            } else {
              toast.error('Cập nhật tiến độ công việc thất bại!')
            }
          })
          .catch((err) => {
            console.log('error: ', err)
            toast.error('Cập nhật tiến độ công việc thất bại!')
          })
          .finally(() => {
            queryClient.invalidateQueries({
              queryKey: [QLCV_QUERY_KEY.GET_CV_ChuaThucHien],
            })
            queryClient.invalidateQueries({
              queryKey: [QLCV_QUERY_KEY.GET_CV_DangThucHien],
            })
            queryClient.invalidateQueries({
              queryKey: [QLCV_QUERY_KEY.GET_CV_DaHoanThanh],
            })
            onClose && onClose()
          })
      }
    })
  }

  return (
    <Dialog
      fullWidth
      maxWidth={'md'}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <div className="w-full flex items-center justify-between bg-sky-800 p-4">
        <h3 className="text-xl font-bold text-white">
          {title ?? 'Cập nhật tiến độ'}
        </h3>
      </div>
      {/* END: Header */}

      <Formik
        innerRef={formikRef}
        initialValues={{
          CV_HT_PhanCongThucHien_XacNhan_MoTa:
            dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_MoTa || '',
          CV_HT_PhanCongThucHien_XacNhan_TenFile: '',
          CV_HT_PhanCongThucHien_XacNhan_DataFile: '',
        }}
        validationSchema={yup.object().shape({
          CV_HT_PhanCongThucHien_XacNhan_MoTa: yup
            .string()
            .trim()
            .required('Vui lòng nhập mô tả tiến độ'),
          CV_HT_PhanCongThucHien_XacNhan_DataFile: yup.string().trim(),
          CV_HT_PhanCongThucHien_XacNhan_TenFile: yup.string().trim(),
        })}
        validateOnBlur={true}
        onSubmit={handleSubmitForm}
      >
        {({ values, errors, touched, handleChange }) => {
          console.log('values: ', values)

          return (
            <div className="p-4">
              <h3 className="font-bold mb-4">Tiến độ công việc (%)</h3>
              <div className="grid grid-cols-2 gap-2 items-center mb-4">
                <div className="col-span-2 md:col-span-1">
                  <input
                    type="range"
                    id="CV_HT_PhanCongThucHien_XacNhan_PhanTram"
                    name="progress"
                    min="0"
                    max="100"
                    step="25"
                    value={percent}
                    onChange={handlePercentChange}
                    className="w-full"
                  />
                </div>
                {/* END: Left Slider */}
                <div className="col-span-2 md:col-span-1">
                  <div className="w-full flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <svg
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#e5e7eb"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke={getProgressColor(percent)}
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray="282.6"
                          strokeDashoffset={282.6 - (282.6 * percent) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute mb-1 inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {percent}%
                        </div>
                        <div className="text-sm mt-1">
                          {percent === 0 && 'Chưa thực hiện'}
                          {percent > 0 && percent < 100 && 'Đang thực hiện'}
                          {percent == 100 && 'Đã hoàn thành'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END: Chart rounded percent */}
              </div>
              {/* END: Update percent  */}
              <div className="w-full mb-4">
                <label htmlFor="" className="font-semibold text-gray-950">
                  Tên công việc:
                </label>
                <p className="w-full bg-gray-100 p-2 rounded-lg border">
                  {dataCongViec?.CV_HT_PhanCongThucHien_TenCongViec}
                </p>
              </div>
              {/* END: Tên công việc */}
              <div className="w-full grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 md:col-span-1 w-full mb-4">
                  <label htmlFor="" className="font-semibold text-gray-950">
                    Ngày bắt đầu:
                  </label>
                  <p className="w-full bg-gray-100 p-2 rounded-lg border">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NgayBatDau
                      ? moment(dataCongViec?.CV_HT_PhanCongThucHien_NgayBatDau)
                          .utc()
                          .utcOffset('+0700')
                          .format('HH:mm, DD/MM/YYYY')
                      : ''}
                  </p>
                </div>
                {/* END: Ngày bắt đầu */}
                <div className="col-span-2 md:col-span-1 w-full mb-4">
                  <label htmlFor="" className="font-semibold text-gray-950">
                    Ngày kết thúc:
                  </label>
                  <p className="w-full bg-gray-100 p-2 rounded-lg border">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NgayKetThuc
                      ? moment(dataCongViec?.CV_HT_PhanCongThucHien_NgayKetThuc)
                          .utc()
                          .utcOffset('+0700')
                          .format('HH:mm, DD/MM/YYYY')
                      : ''}
                  </p>
                </div>
                {/* END: Ngày kết thúc */}
              </div>
              {/* END: Deadline công việc */}
              <div className="w-full grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 md:col-span-1 w-full mb-4">
                  <Tooltip
                    title={errors?.CV_HT_PhanCongThucHien_XacNhan_MoTa}
                    open={
                      !!errors?.CV_HT_PhanCongThucHien_XacNhan_MoTa &&
                      !!touched?.CV_HT_PhanCongThucHien_XacNhan_MoTa
                    }
                    arrow
                    placement="right"
                  >
                    <label htmlFor="" className="font-semibold text-gray-950">
                      Mô tả tiến độ <span className="text-red-500">(*) </span>:
                    </label>
                  </Tooltip>
                  <DebounceInput
                    element={'textarea'}
                    className={clsx(
                      'w-full bg-white p-2 rounded-lg border focus:outline-1 focus:outline-cyan-600',
                      !!errors?.CV_HT_PhanCongThucHien_XacNhan_MoTa &&
                        !!touched?.CV_HT_PhanCongThucHien_XacNhan_MoTa &&
                        'border-red-500',
                    )}
                    value={values?.CV_HT_PhanCongThucHien_XacNhan_MoTa}
                    onChange={handleChange(
                      'CV_HT_PhanCongThucHien_XacNhan_MoTa',
                    )}
                    rows={10}
                    aria-rowspan={6}
                    placeholder={'Nhập mô tả tiến độ thực hiện'}
                  />
                </div>
                {/* END: Ngày bắt đầu */}
                <div className="col-span-2 md:col-span-1 w-full mb-4">
                  <label htmlFor="" className="font-semibold text-gray-950">
                    File đính kèm:
                  </label>
                  <div className="border rounded-lg">
                    <div className="p-4 bg-slate-200 rounded-t-lg">
                      <label
                        htmlFor="file-dinh-kem"
                        className="bg-sky-800 text-white p-2 rounded"
                      >
                        <span>Chọn file</span>
                      </label>
                      <input
                        ref={fileCapNhatRef}
                        type="file"
                        name=""
                        id="file-dinh-kem"
                        hidden
                        onChange={async (e) => {
                          const file = e.target.files[0]
                          const maxSizeInBytes = 5 * 1024 * 1024
                          if (file.size > maxSizeInBytes) {
                            toast.error(
                              'Dung lượng file không được vượt quá 5MB',
                            )
                            await formikRef.current.setFieldValue(
                              'CV_HT_PhanCongThucHien_XacNhan_TenFile',
                              '',
                            )
                            await formikRef.current.setFieldValue(
                              'CV_HT_PhanCongThucHien_XacNhan_DataFile',
                              '',
                            )
                            return
                          }

                          if (file) {
                            let dataFile = await convertDataFileToBase64(file)
                            await formikRef.current.setFieldValue(
                              'CV_HT_PhanCongThucHien_XacNhan_TenFile',
                              file.name,
                            )
                            await formikRef.current.setFieldValue(
                              'CV_HT_PhanCongThucHien_XacNhan_DataFile',
                              dataFile,
                            )
                          }
                        }}
                      />
                    </div>
                    {values.CV_HT_PhanCongThucHien_XacNhan_DataFile &&
                    values.CV_HT_PhanCongThucHien_XacNhan_TenFile ? (
                      <div className={'p-2'}>
                        <p>{values.CV_HT_PhanCongThucHien_XacNhan_TenFile}</p>
                      </div>
                    ) : (
                      <p className="p-2">Chưa có tệp nào được chọn</p>
                    )}
                    <p className="p-2 text-red-600 font-semibold italic">
                      Lưu ý: Kích thước tệp tải lên nhỏ hơn hoặc bằng 5MB!
                    </p>
                  </div>
                </div>
                {/* END: Ngày kết thúc */}
              </div>
              {/* END: Deadline công việc */}
            </div>
          )
        }}
      </Formik>
      {/* END: Formik */}

      <div className="p-4 flex items-center justify-end gap-2 bg-slate-200">
        <Button
          disabled={isLoading}
          color="danger"
          onClick={() => {
            onClose && onClose()
          }}
        >
          Hủy
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => {
            formikRef.current?.handleSubmit()
            setTimeout(() => {
              console.log('Errors:', formikRef.current?.errors)
              if (
                formikRef.current?.errors &&
                Object.keys(formikRef.current.errors).length === 0
              ) {
                onHideSafeDialog && onHideSafeDialog()
              }
            }, 0)
          }}
        >
          Lưu
        </Button>
      </div>
      {/* END: Footer */}
    </Dialog>
  )
})

export default FormCapNhatTienDo
