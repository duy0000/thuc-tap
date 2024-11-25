import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import { Dialog, Slide } from '@mui/material'
import ThongTinKiemTraCongViec from './ThongTinKiemTraCongViec'
import LichSuXacNhanTienDo from './LichSuXacNhanTienDo'
import { forwardRef, memo, useRef } from 'react'
import Button from '@/Components/Base/Button/Button'
import { Select } from '@/Components/Base'
import { DebounceInput } from 'react-debounce-input'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import Swal from 'sweetalert2'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { isEmpty } from 'lodash-unified'
import { toast } from 'react-toastify'
import { convertDataFileToBase64 } from '@/Services/Utils/index.js'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FormKiemTraCongViec = memo(function FormKiemTraCongViec({
  open,
  onClose,
  dataCongViec,
  onSetDataCongViec,
}) {
  const formikRef = useRef(null)

  const queryClient = useQueryClient()
  const { mutateAsync: mutateUpdateCVAsync } = useMutation({
    mutationFn: async (
      data = {
        CV_HT_PhanCongThucHien_ID: '',
        CV_HT_PhanCongThucHien_KiemTra_XacNhan: '',
        CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
        CV_HT_PhanCongThucHien_KiemTra_TenFile: '',
        CV_HT_PhanCongThucHien_KiemTra_DataFile: '',
        CV_HT_PhanCongThucHien_KiemTra_MoTa: '',
      },
    ) => {
      return await apiQuanLyCongViec.editKiemTraCongViec(data)
    },
  })

  const handleSubmit = (values) => {
    // console.log('check values: ', values)
    Swal.fire({
      icon: 'question',
      title: 'Thầy/Cô chắc chắn muốn cập nhật thông tin này?',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      showConfirmButton: true,
      confirmButtonText: 'Đồng ý',
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        let _newSubmit = {
          CV_HT_PhanCongThucHien_ID: dataCongViec.CV_HT_PhanCongThucHien_ID,
          CV_HT_PhanCongThucHien_KiemTra_XacNhan: Number(
            values.CV_HT_PhanCongThucHien_KiemTra_XacNhan,
          ),
          CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: isEmpty(
            values.CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc,
          )
            ? new Date().toISOString()
            : values.CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc,
          CV_HT_PhanCongThucHien_KiemTra_TenFile:
            values.CV_HT_PhanCongThucHien_KiemTra_TenFile,
          CV_HT_PhanCongThucHien_KiemTra_DataFile:
            values.CV_HT_PhanCongThucHien_KiemTra_DataFile,
          CV_HT_PhanCongThucHien_KiemTra_MoTa:
            values.CV_HT_PhanCongThucHien_KiemTra_MoTa,
        }

        // console.log('_newSubmit: ', _newSubmit)
        // return
        const res = await mutateUpdateCVAsync(_newSubmit)
        if (res.data?.code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật công việc thành công',
          })
          queryClient.invalidateQueries({
            queryKey: [QLCV_QUERY_KEY.GET_CV_ChuaThucHien],
          })
          queryClient.invalidateQueries({
            queryKey: [QLCV_QUERY_KEY.GET_CV_DangThucHien],
          })
          queryClient.invalidateQueries({
            queryKey: [QLCV_QUERY_KEY.GET_CV_DaHoanThanh],
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cập nhật công việc thất bại',
          })
        }
      }
    })
  }

  return (
    <Dialog
      fullWidth
      maxWidth={'lg'}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <div className="w-full flex items-center justify-between bg-sky-800 p-4">
        <h3 className="text-xl font-bold text-white">Kiểm tra xác nhận</h3>
      </div>
      {/* END: Header */}
      <div className="my-6 px-6">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-4 md:col-span-3 border-r-2 border-gray-300 pr-2">
            <div className="w-full">
              <Tabs defaultIndex={0}>
                <TabList>
                  <Tab>Thông tin công việc</Tab>
                  <Tab>Lịch sử xác nhận tiến độ</Tab>
                </TabList>
                <TabPanel>
                  <ThongTinKiemTraCongViec dataCongViec={dataCongViec} />
                </TabPanel>
                <TabPanel>
                  <LichSuXacNhanTienDo
                    idPhanCongCongViec={dataCongViec?.CV_HT_PhanCongThucHien_ID}
                  />
                </TabPanel>
              </Tabs>
            </div>
          </div>
          {/* END: Thông tin */}

          <Formik
            innerRef={formikRef}
            initialValues={{
              CV_HT_PhanCongThucHien_KiemTra_XacNhan: '',
              CV_HT_PhanCongThucHien_KiemTra_TenFile: '',
              CV_HT_PhanCongThucHien_KiemTra_DataFile: '',
              CV_HT_PhanCongThucHien_KiemTra_MoTa: '',
              CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
            }}
            validationSchema={yup.object().shape({
              CV_HT_PhanCongThucHien_KiemTra_XacNhan: yup
                .string()
                .required('Vui lòng chọn hình thức xác nhận'),
              CV_HT_PhanCongThucHien_KiemTra_MoTa: yup
                .string()
                .required('Nội dung phản hồi không được để trống'),
              CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: yup
                .string()
                .when(
                  'CV_HT_PhanCongThucHien_KiemTra_XacNhan',
                  (CV_HT_PhanCongThucHien_KiemTra_XacNhan, schema) => {
                    if (CV_HT_PhanCongThucHien_KiemTra_XacNhan[0] === '0') {
                      return schema.required('Vui lòng chọn hạn kết thúc')
                    }
                    return schema.notRequired()
                  },
                ),
            })}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => {
              // console.log('formik val: ', values)
              // console.log('formik err: ', errors)

              return (
                <div className="col-span-4 md:col-span-1">
                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full">
                      <h3 className="font-semibold text-black mb-2">
                        Xác nhận kiểm tra công việc{' '}
                        <span className="text-red-600">(*)</span>
                      </h3>
                      <Select
                        label="Chọn hình thức xác nhận"
                        modelValue={
                          values.CV_HT_PhanCongThucHien_KiemTra_XacNhan
                        }
                        data={[
                          {
                            label: 'Hoàn thành',
                            value: '1',
                          },
                          {
                            label: 'Chưa hoàn thành',
                            value: '0',
                          },
                        ]}
                        labelKey="label"
                        valueKey="value"
                        onChange={(e) => {
                          setFieldValue(
                            'CV_HT_PhanCongThucHien_KiemTra_XacNhan',
                            e,
                          )
                        }}
                        triggerClass="w-full"
                      />
                      {errors.CV_HT_PhanCongThucHien_KiemTra_XacNhan &&
                        touched.CV_HT_PhanCongThucHien_KiemTra_XacNhan && (
                          <p className="text-red-600">
                            {errors.CV_HT_PhanCongThucHien_KiemTra_XacNhan}
                          </p>
                        )}
                    </div>
                    {/* END: Hình thức xác nhận */}
                    {values.CV_HT_PhanCongThucHien_KiemTra_XacNhan === '0' && (
                      <div className="w-full">
                        <h3 className="font-semibold text-black mb-2">
                          Hạn kết thúc mới:
                          <span className="text-red-600">(*)</span>
                        </h3>
                        <input
                          id="CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc"
                          type="date"
                          className="base-input w-full"
                          onChange={(event) => {
                            setFieldValue(
                              'CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc',
                              event.target.value,
                            )
                          }}
                        />
                      </div>
                    )}
                    <div className="w-full">
                      <h3 className="font-semibold text-black mb-2">
                        Tải tệp lên
                      </h3>
                      <input
                        type="file"
                        name=""
                        id=""
                        className="border p-2 rounded-lg"
                        onChange={async (e) => {
                          const file = e.target.files[0]
                          const maxSizeInBytes = 5 * 1024 * 1024
                          if (file.size > maxSizeInBytes) {
                            toast.error(
                              'Dung lượng file không được vượt quá 5MB',
                            )
                            setFieldValue(
                              'CV_HT_PhanCongThucHien_KiemTra_TenFile',
                              '',
                            )
                            setFieldValue(
                              'CV_HT_PhanCongThucHien_KiemTra_DataFile',
                              '',
                            )
                            return
                          }
                          if (file) {
                            let dataFile = await convertDataFileToBase64(file)
                            await setFieldValue(
                              'CV_HT_PhanCongThucHien_KiemTra_TenFile',
                              file.name,
                            )
                            await setFieldValue(
                              'CV_HT_PhanCongThucHien_KiemTra_DataFile',
                              dataFile,
                            )
                          }
                        }}
                      />
                    </div>
                    {/* END: Tải tệp đính kèm */}
                    <div className="w-full">
                      <h3 className="font-semibold text-black mb-2">
                        Nội dung phản hồi kiểm tra{' '}
                        <span className="text-red-600">(*)</span>
                      </h3>
                      <DebounceInput
                        debounceTimeout={500}
                        name="CV_HT_PhanCongThucHien_KiemTra_MoTa"
                        element="textarea"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-cyan-400"
                        placeholder="Nhập nội dung phản hồi kiểm tra"
                        rows={10}
                        value={values.CV_HT_PhanCongThucHien_KiemTra_MoTa}
                        onChange={(e) => {
                          setFieldValue(
                            'CV_HT_PhanCongThucHien_KiemTra_MoTa',
                            e.target.value,
                          )
                        }}
                      />
                      {errors.CV_HT_PhanCongThucHien_KiemTra_MoTa &&
                        touched.CV_HT_PhanCongThucHien_KiemTra_MoTa && (
                          <p className="text-red-600">
                            {errors.CV_HT_PhanCongThucHien_KiemTra_MoTa}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              )
            }}
          </Formik>
          {/* END: Form Xác nhận */}
        </div>
      </div>
      <div className="p-4 flex items-center justify-end gap-2 bg-slate-200">
        <Button
          // disabled={isLoading}
          color="danger"
          onClick={() => {
            onClose && onClose()
            onSetDataCongViec && onSetDataCongViec(null)
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={() => {
            formikRef.current?.handleSubmit()
            setTimeout(() => {
              if (
                formikRef.current?.errors &&
                Object.keys(formikRef.current.errors).length === 0
              ) {
                onClose && onClose()
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

export default FormKiemTraCongViec
