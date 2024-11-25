import { Checkbox, FormGroup, TextField } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { MdOutlineFileUpload } from 'react-icons/md'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiTinTuc from '@/Apis/Admin/apiTinTuc'
import { useFormik } from 'formik'
import {
  convertBufferToBase64,
  convertDataFileToBase64,
} from '@/Services/Utils'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import QUAN_TRI_TIN_TUC_QUERY_KEY from '@/Services/QueryStores/QueryKeyStores/QuanTriTinTuc.querykey'
import { omit } from 'lodash-unified'

const enumNewsType = {
  Notification: 'Notification',
  Event: 'Event',
  Focus: 'Focus',
}

const enumNewsFor = {
  Teacher: 'Teacher',
  Student: 'Student',
}

const initialDataForm = {
  HT_TinTuc_TieuDe: '',
  HT_TinTuc_Link: '',
  HT_TinTuc_TenAnh: '',
  HT_TinTuc_Anh: '',
  HT_TinTuc_SV_STT: 0,
  HT_TinTuc_GV_STT: 0,
  HT_TinTuc_GV_IsThongBao: false,
  HT_TinTuc_GV_IsSuKien: false,
  HT_TinTuc_GV_IsTinTieuDiem: false,
  NewsFor: enumNewsFor.Teacher,
}

export default function DialogFormTinTuc({ dataDetail, open, onClose }) {
  const [urlBlobImageFile, setUrlBlobImageFile] = useState(null)
  const inputFileRef = useRef(null)
  const queryClient = useQueryClient()
  const createNewsMutation = useMutation({
    mutationFn: apiTinTuc.create,
  })
  const editNewsMutation = useMutation({
    mutationFn: apiTinTuc.edit,
  })

  const convertNewsFor = (newsFor) => {
    switch (newsFor) {
      case enumNewsFor.Teacher:
        return {
          HT_TinTuc_GV_STT: 1,
          HT_TinTuc_SV_STT: null,
        }
      case enumNewsFor.Student:
        return {
          HT_TinTuc_GV_STT: null,
          HT_TinTuc_SV_STT: 1,
        }
      default:
        return {
          HT_TinTuc_GV_STT: null,
          HT_TinTuc_SV_STT: null,
        }
    }
  }

  const formik = useFormik({
    initialValues: initialDataForm,
    validationSchema: yup.object().shape({
      HT_TinTuc_TieuDe: yup.string().required('Tiêu đề không được để trống'),
      HT_TinTuc_Link: yup
        .string()
        .required('Link không được để trống')
        .test('is-url', 'Link không hợp lệ', (value) => {
          return value && value.startsWith('http')
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (createNewsMutation.isPending || editNewsMutation.isPending) return
      if (dataDetail) {
        try {
          let body = omit(values, ['NewsFor'])

          const dataNewsFor = convertNewsFor(values.NewsFor)
          body = {
            ...body,
            ...dataNewsFor,
          }

          const res = await editNewsMutation.mutateAsync(body)
          if (res?.data?.code === 200) {
            toast.success('Cập nhật tin tức thành công!')
            onClose && onClose()
          } else {
            toast.error('Có lỗi xảy ra')
          }
          resetForm()
          if (inputFileRef.current) {
            inputFileRef.current.value = ''
          }
          setUrlBlobImageFile(null)
          queryClient.invalidateQueries({
            queryKey: [QUAN_TRI_TIN_TUC_QUERY_KEY.GET_LIST],
          })
        } catch (error) {
          toast.error('Có lỗi xảy ra')
        }
      } else {
        try {
          let body = omit(values, ['NewsFor'])

          const dataNewsFor = convertNewsFor(values.NewsFor)
          body = {
            ...body,
            ...dataNewsFor,
          }

          const res = await createNewsMutation.mutateAsync(body)
          if (res?.data?.code === 200) {
            toast.success('Thêm mới tin tức thành công!')
            resetForm()
            if (inputFileRef.current) {
              inputFileRef.current.value = ''
            }
            setUrlBlobImageFile(null)
            onClose && onClose()
          } else {
            toast.error('Có lỗi xảy ra')
          }
          resetForm()
          queryClient.invalidateQueries({
            queryKey: [QUAN_TRI_TIN_TUC_QUERY_KEY.GET_LIST],
          })
        } catch (error) {
          toast.error('Có lỗi xảy ra')
        }
      }
    },
  })

  const [file, setFile] = useState(null)

  const resetForm = () => {
    setFile(null)
    inputFileRef.current.value = undefined
    formik.resetForm()
    formik.setValues({
      ...formik.values,
      ...initialDataForm,
    })
  }

  const imagePreview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  )

  useEffect(() => {
    if (dataDetail) {
      formik.setValues({
        ...initialDataForm,
        ...dataDetail,
        NewsFor: dataDetail.HT_TinTuc_GV_STT
          ? enumNewsFor.Teacher
          : enumNewsFor.Student,
        NewsType: dataDetail.HT_TinTuc_GV_IsThongBao
          ? enumNewsType.Notification
          : dataDetail.HT_TinTuc_GV_IsSuKien
            ? enumNewsType.Event
            : enumNewsType.Focus,
      })
      const fileBase64 =
        dataDetail?.HT_TinTuc_Anh &&
        convertBufferToBase64(dataDetail?.HT_TinTuc_Anh?.data)
      const srcImagePreview = dataDetail?.HT_TinTuc_Anh
        ? `data:${dataDetail.HT_TinTuc_TenAnh?.split('.').pop()};base64,${fileBase64}`
        : '/images/no-image.jpg'
      setUrlBlobImageFile(srcImagePreview)
    }
  }, [dataDetail])

  console.log('watch values form: ', formik.values)

  if (open === false) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-6">
      <div className="w-full md:w-1/2 bg-white rounded-md">
        <div className="relative w-full flex justify-between mb-6 bg-sky-800 rounded-t-md">
          <h2 className="font-bold text-white text-xl p-2">
            {dataDetail ? 'Cập nhật' : 'Thêm'} tin tức
          </h2>
          <button
            type="button"
            onClick={() => {
              onClose && onClose()
              resetForm()
            }}
            className="absolute right-4 top-2 w-6 h-6 border flex items-center justify-center rounded-lg text-white hover:border-red-600 hover:text-red-600 hover:bg-red-100"
          >
            <IoClose />
          </button>
        </div>
        <form onReset={resetForm} onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-y-4 p-4">
            <TextField
              label="Tiêu đề *"
              value={formik.values.HT_TinTuc_TieuDe}
              onChange={(e) => {
                formik.setFieldValue('HT_TinTuc_TieuDe', e.target.value)
              }}
              color={
                formik.errors.HT_TinTuc_TieuDe &&
                formik.touched.HT_TinTuc_TieuDe
                  ? 'error'
                  : 'primary'
              }
              focused={
                formik.errors.HT_TinTuc_TieuDe &&
                formik.touched.HT_TinTuc_TieuDe
              }
            />
            {formik.errors.HT_TinTuc_TieuDe &&
              formik.touched.HT_TinTuc_TieuDe && (
                <span className="text-red-600 mb-4 -mt-4 italic">
                  {formik.errors.HT_TinTuc_TieuDe}
                </span>
              )}
            <TextField
              label="Link bài viết *"
              value={formik.values.HT_TinTuc_Link}
              onChange={(e) => {
                formik.setFieldValue('HT_TinTuc_Link', e.target.value)
              }}
              color={
                formik.errors.HT_TinTuc_Link && formik.touched.HT_TinTuc_Link
                  ? 'error'
                  : 'primary'
              }
              focused={
                formik.errors.HT_TinTuc_Link && formik.touched.HT_TinTuc_Link
              }
            />
            {formik.errors.HT_TinTuc_Link && formik.touched.HT_TinTuc_Link && (
              <p className="text-red-600 mb-4 -mt-4 italic">
                {formik.errors.HT_TinTuc_Link}
              </p>
            )}
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Tin tức dành cho:
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Teacher"
                value={formik.values.NewsFor}
                name="rbgNewsFor"
              >
                <FormControlLabel
                  value="Teacher"
                  control={<Radio />}
                  label="Giảng viên"
                  onChange={(e) => {
                    formik.setFieldValue('NewsFor', e.target.value)
                  }}
                />
                <FormControlLabel
                  value="Student"
                  control={<Radio />}
                  label="Sinh viên"
                  onChange={(e) => {
                    formik.setFieldValue('NewsFor', e.target.value)
                  }}
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Loại tin tức:
              </FormLabel>
              <FormGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue={enumNewsType.Notification}
                // value={formik.values.NewsType}
                name="rbgNewsType"
              >
                <FormControlLabel
                  value={enumNewsType.Notification}
                  control={
                    <Checkbox
                      onChange={(e) => {
                        formik.setFieldValue(
                          'HT_TinTuc_GV_IsThongBao',
                          e.target.checked,
                        )
                      }}
                    />
                  }
                  label="Thông báo"
                />
                <FormControlLabel
                  value={enumNewsType.Event}
                  control={
                    <Checkbox
                      onChange={(e) => {
                        formik.setFieldValue(
                          'HT_TinTuc_GV_IsSuKien',
                          e.target.checked,
                        )
                      }}
                    />
                  }
                  label="Sự kiện"
                />
                <FormControlLabel
                  value={enumNewsType.Focus}
                  control={
                    <Checkbox
                      onChange={(e) => {
                        formik.setFieldValue(
                          'HT_TinTuc_GV_IsTinTieuDiem',
                          e.target.checked,
                        )
                      }}
                    />
                  }
                  label="Tiêu điểm"
                />
              </FormGroup>
            </FormControl>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 border rounded-md flex items-center justify-center">
                <img
                  src={imagePreview || urlBlobImageFile}
                  width={128}
                  height={128}
                  className="object-cover w-32 h-32 rounded-md"
                />
              </div>
              <label
                htmlFor="news-image"
                className="w-32 h-32 border rounded-md flex flex-col items-center justify-center cursor-pointer"
              >
                <MdOutlineFileUpload size={32} />
                <span>Upload</span>
              </label>
              <input
                id="news-image"
                type="file"
                onChange={async (e) => {
                  const file = e.target.files[0]
                  if (file) {
                    setFile(file)
                    const dataBase64 = await convertDataFileToBase64(file)
                    const dataBase64WithPrefix = dataBase64.split(',')[1]
                    formik.setFieldValue('HT_TinTuc_Anh', dataBase64WithPrefix)
                    formik.setFieldValue('HT_TinTuc_TenAnh', file.name)
                  }
                }}
                placeholder="Ảnh"
                hidden
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                disabled={
                  createNewsMutation.isPending || editNewsMutation.isPending
                }
                type="submit"
                className="px-6 py-2 bg-sky-800 text-white hover:opacity-80 rounded-md"
              >
                {dataDetail ? 'Cập nhật' : 'Thêm'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
