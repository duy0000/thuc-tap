import { TextField } from '@mui/material'
import { IoClose } from 'react-icons/io5'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useFormik } from 'formik'
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
  HT_TinTuc_SV_STT: '',
  HT_TinTuc_GV_STT: '',
  HT_TinTuc_GV_IsThongBao: '',
  HT_TinTuc_GV_IsSuKien: '',
  HT_TinTuc_GV_IsTinTieuDiem: '',
  NewsType: 'All',
  NewsFor: 'All',
  SoTrang: 1,
  SoBanGhiTrenTrang: 10,
}

export default function DialogFilterTinTuc({
  open,
  onClose,
  dataFilter,
  onFilter,
}) {
  const convertTheLoaiTinTuc = (newsType) => {
    switch (newsType) {
      case enumNewsType.Notification:
        return {
          HT_TinTuc_GV_IsThongBao: true,
          HT_TinTuc_GV_IsSuKien: false,
          HT_TinTuc_GV_IsTinTieuDiem: false,
        }
      case enumNewsType.Event:
        return {
          HT_TinTuc_GV_IsThongBao: false,
          HT_TinTuc_GV_IsSuKien: true,
          HT_TinTuc_GV_IsTinTieuDiem: false,
        }
      case enumNewsType.Focus:
        return {
          HT_TinTuc_GV_IsThongBao: false,
          HT_TinTuc_GV_IsSuKien: false,
          HT_TinTuc_GV_IsTinTieuDiem: true,
        }
      default:
        return {
          HT_TinTuc_GV_IsThongBao: '',
          HT_TinTuc_GV_IsSuKien: '',
          HT_TinTuc_GV_IsTinTieuDiem: '',
        }
    }
  }

  const convertNewsFor = (newsFor) => {
    switch (newsFor) {
      case enumNewsFor.Teacher:
        return {
          HT_TinTuc_GV_STT: 1,
          HT_TinTuc_SV_STT: '',
        }
      case enumNewsFor.Student:
        return {
          HT_TinTuc_GV_STT: '',
          HT_TinTuc_SV_STT: 1,
        }
      default:
        return {
          HT_TinTuc_GV_STT: '',
          HT_TinTuc_SV_STT: '',
        }
    }
  }

  const formik = useFormik({
    initialValues: {
      ...initialDataForm,
      ...dataFilter,
    },
    onSubmit: async (values) => {
      let body = omit(values, ['NewsType', 'NewsFor', 'HT_TinTuc_TenAnh'])
      body = {
        ...body,
        ...convertTheLoaiTinTuc(values.NewsType),
        ...convertNewsFor(values.NewsFor),
      }
      onFilter && onFilter(body)
      onClose && onClose()
    },
  })

  const resetForm = () => {
    formik.resetForm()
    formik.setValues({
      ...formik.values,
      ...initialDataForm,
    })
  }
  if (open === false) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-6">
      <div className="w-full md:w-1/2 bg-white rounded-md">
        <div className="relative w-full flex justify-between mb-6 bg-sky-800 rounded-t-md">
          <h2 className="font-bold text-white text-xl p-2">Tìm kiếm tin tức</h2>
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
              label="Tiêu đề"
              value={formik.values.HT_TinTuc_TieuDe}
              onChange={(e) => {
                formik.setFieldValue('HT_TinTuc_TieuDe', e.target.value)
              }}
            />
            <TextField
              label="Link bài viết"
              value={formik.values.HT_TinTuc_Link}
              onChange={(e) => {
                formik.setFieldValue('HT_TinTuc_Link', e.target.value)
              }}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Tin tức dành cho:
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="All"
                value={formik.values.NewsFor}
                name="rbgNewsFor"
              >
                <FormControlLabel
                  value="All"
                  control={<Radio />}
                  label="Tất cả"
                  onChange={(e) => {
                    formik.setFieldValue('NewsFor', e.target.value)
                  }}
                />
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
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={'All'}
                value={formik.values.NewsType}
                name="rbgNewsType"
              >
                <FormControlLabel
                  value="All"
                  control={<Radio />}
                  label="Tất cả"
                  onChange={(e) => {
                    formik.setFieldValue('NewsType', e.target.value)
                  }}
                />
                <FormControlLabel
                  value={enumNewsType.Notification}
                  control={<Radio />}
                  label="Thông báo"
                  onChange={(e) => {
                    formik.setFieldValue('NewsType', e.target.value)
                  }}
                />
                <FormControlLabel
                  value={enumNewsType.Event}
                  control={<Radio />}
                  label="Sự kiện"
                  onChange={(e) => {
                    formik.setFieldValue('NewsType', e.target.value)
                  }}
                />
                <FormControlLabel
                  value={enumNewsType.Focus}
                  control={<Radio />}
                  label="Tiêu điểm"
                  onChange={(e) => {
                    formik.setFieldValue('NewsType', e.target.value)
                  }}
                />
              </RadioGroup>
            </FormControl>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-sky-800 text-white hover:opacity-80 rounded-md"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
