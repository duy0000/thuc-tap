import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  DatepickerV2,
  Popper,
  PopperContent,
  PopperTrigger,
} from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import { Checkbox } from '@/Components/Base/Checkbox'
import Icon from '@/Components/Base/Icon/Icon'
import { Check } from '@/Components/Base/Icons/Check'
import CloseCircle from '@/Components/Base/Icons/CloseCircle'
import { dayjs, retries } from '@/Services/Utils'
import Resumable from 'resumablejs'
import Swal from 'sweetalert2'
import { isTrue, required } from '@/Services/Validators'
import { HoSoKiemDinhCtx, IDQuyTrinhKiemDinhEnum } from '@/Services/Tokens'
import {
  loadKetQuaKiemDinh,
  postKetQuaKiemDinh,
  putKetQuaKiemDinh,
} from '@/Apis/KDCL'

const FILE_TYPES = ['jpeg', 'png', 'jpg']

export default function KetQua() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const fileSelectRef = useRef()
  const [isPosting, setIsPosting] = useState(false)
  const [ketQuaKiemDinh, setKetQuaKiemDinh] = useState()
  const [fileSelected, setFileSelected] = useState(null)
  const [form, setForm] = useState({
    KT_KDCL_KetQuaKiemDinh_TrangThai: true,
    KT_KDCL_KetQuaKiemDinh_NamKDCL: dayjs().year(),
  })

  const urlFilePreview = useMemo(() => {
    if (fileSelected) return URL.createObjectURL(fileSelected)

    if (hoSoKiemDinh.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_DataFile_Base64) {
      return hoSoKiemDinh.fileQuyTrinh.KT_KDCL_HoSoLuuTru_DataFile
    }

    return null
  }, [fileSelected, hoSoKiemDinh.fileQuyTrinh])

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name == 'KT_KDCL_KetQuaKiemDinh_KetQua' && (value < 0 || value > 5)) {
      return
    }

    setForm({ ...form, [name]: value })
  }

  const resetForm = () => {
    setForm(
      ketQuaKiemDinh ?? {
        KT_KDCL_KetQuaKiemDinh_TrangThai: true,
        KT_KDCL_KetQuaKiemDinh_NamKDCL: dayjs().year(),
      },
    )
    setFileSelected(null)
  }

  const _loadKetQuaKiemDinh = async () => {
    try {
      const res = await loadKetQuaKiemDinh(
        hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      )

      if (!res.data.body[0]) return

      setKetQuaKiemDinh(res.data.body[0])
      setForm(res.data.body[0])
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng tải lại trang hoặc liên hệ quản trị viên!',
      })
    }
  }

  const validate = () =>
    [
      () =>
        required(
          form.KT_KDCL_KetQuaKiemDinh_ToChucKiemDinh,
          'Vui lòng nhập tên tổ chức kiểm định',
        ),
      () =>
        required(
          form.KT_KDCL_KetQuaKiemDinh_KetQua,
          'Vui lòng nhập kết quả kiểm định',
        ),
      () =>
        required(
          form.KT_KDCL_KetQuaKiemDinh_NamKDCL,
          'Vui lòng nhập năm kiểm định',
        ),
      () =>
        required(
          form.KT_KDCL_KetQuaKiemDinh_SoHieuChungChi,
          'Vui lòng nhập số hiệu chứng chỉ kiểm định',
        ),
      () =>
        required(
          form.KT_KDCL_KetQuaKiemDinh_ThoiGianCapChungChi,
          'Vui lòng chọn thời gian cấp chứng chỉ',
        ),
      () =>
        required(
          form.KT_KDCL_KetQuaKiemDinh_ThoiHanChungChi,
          'Vui lòng chọn thời hạn chứng chỉ',
        ),
    ].every(isTrue)

  const handleSubmit = async () => {
    if (isPosting || !validate()) return
    if (
      !fileSelected &&
      !hoSoKiemDinh.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_DataFile_Base64
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Chưa chọn file chứng chỉ',
        text: 'Vui lòng chọn file chứng chỉ kiểm định',
      })
      return
    }
    if (
      form.KT_KDCL_KetQuaKiemDinh_KetQua < 0 ||
      form.KT_KDCL_KetQuaKiemDinh_KetQua > 5
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Kết quả kiểm định không hợp lệ',
        text: 'Kết quả kiểm định phải nằm trong khoảng từ 0 đến 5',
      })
      return
    }

    try {
      setIsPosting(true)

      let action = postKetQuaKiemDinh

      if (form.KT_KDCL_KetQuaKiemDinh_ID) {
        action = putKetQuaKiemDinh
      }

      await Promise.all([
        fileSelected
          ? hoSoKiemDinh.postFileHoSoLuuTru({
              file: fileSelected,
              IDQuyTrinh: IDQuyTrinhKiemDinhEnum.KetQua,
            })
          : null,
        action({
          ...form,
          KT_KDCL_KetQuaKiemDinh_IDHoSoKiemDinh:
            hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
        }),
      ])

      retries(_loadKetQuaKiemDinh)
    } catch (e) {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  useEffect(() => {
    const resumable = new Resumable({
      fileType: FILE_TYPES,
      maxFiles: 1,
      maxFileSize: 15 * 1024 * 1024,
      fileTypeErrorCallback: () => {
        Swal.fire({
          icon: 'warning',
          title: 'File không hợp lệ',
          text: `Chỉ chấp nhận các file ảnh: ${FILE_TYPES.join(', ')}`,
        })
      },
      maxFilesErrorCallback: () => {
        Swal.fire({
          icon: 'warning',
          title: 'Chỉ được chọn 1 file',
        })
      },
      maxFileSizeErrorCallback: () => {
        Swal.fire({
          icon: 'warning',
          title: 'File quá lớn',
          text: 'Chỉ chấp nhận file dưới 15MB',
        })
      },
    })

    resumable.assignBrowse(fileSelectRef.current)
    resumable.on('fileAdded', (file) => {
      setFileSelected(file.file)
    })
  }, [])

  useEffect(() => {
    if (!hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID) return
    retries(_loadKetQuaKiemDinh)
  }, [hoSoKiemDinh.hoSoKiemDinh])

  return (
    <div className="p-5 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <p className="uppercase text-uneti-primary text-base">
          <b>kết quả kiểm định chất lượng CTĐT</b>
        </p>

        <div className="flex gap-2 items-center">
          <Popper trigger="hover">
            <PopperTrigger>
              <button
                onClick={handleSubmit}
                className="icon-btn bg-green-800 hover:bg-green-600"
              >
                <Icon>
                  <Check />
                </Icon>
              </button>
            </PopperTrigger>
            <PopperContent>
              <div className="nowrap whitespace-nowrap text-slate-800">
                <b>Xác nhận kết quả kiểm định</b>
              </div>
            </PopperContent>
          </Popper>
          <Popper trigger="hover">
            <PopperTrigger>
              <button
                onClick={resetForm}
                className="icon-btn text-white bg-red-700 hover:bg-red-500"
              >
                <Icon size={20}>
                  <CloseCircle />
                </Icon>
              </button>
            </PopperTrigger>
            <PopperContent>
              <div className="nowrap whitespace-nowrap text-slate-800">
                <b>Xác nhận kết quả kiểm định</b>
              </div>
            </PopperContent>
          </Popper>
        </div>
      </div>

      <div className="uneti-divider" />

      {/* form */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-center">
            <label className="w-[150px] shrink-0 text-sm text-gray-600">
              Hoàn thành KĐCL
            </label>
            <Checkbox
              checked={form.KT_KDCL_KetQuaKiemDinh_TrangThai}
              onChange={(value) =>
                setForm({ ...form, KT_KDCL_KetQuaKiemDinh_TrangThai: value })
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-[150px] shrink-0 text-sm text-gray-600">
              Tổ chức kiểm định
            </label>
            <input
              type="text"
              className="base-input w-full"
              placeholder="Tổ kiểm định chất lượng"
              value={form.KT_KDCL_KetQuaKiemDinh_ToChucKiemDinh || ''}
              name="KT_KDCL_KetQuaKiemDinh_ToChucKiemDinh"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-[150px] shrink-0 text-sm text-gray-600">
              Kết quả
            </label>
            <input
              type="number"
              className="base-input w-full"
              placeholder="5.0"
              value={form.KT_KDCL_KetQuaKiemDinh_KetQua || ''}
              name="KT_KDCL_KetQuaKiemDinh_KetQua"
              onChange={handleChange}
              min={0}
              max={5}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-[150px] shrink-0 text-sm text-gray-600">
              Năm KĐCL
            </label>
            <input
              type="number"
              className="base-input w-full disabled"
              placeholder={dayjs().year()}
              value={form.KT_KDCL_KetQuaKiemDinh_NamKDCL || ''}
              name="KT_KDCL_KetQuaKiemDinh_NamKDCL"
              onChange={() => {}}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-[150px] shrink-0 text-sm text-gray-600">
              Số hiệu chứng chỉ
            </label>
            <input
              type="text"
              className="base-input w-full"
              placeholder="Mã số chứng chỉ"
              value={form.KT_KDCL_KetQuaKiemDinh_SoHieuChungChi || ''}
              name="KT_KDCL_KetQuaKiemDinh_SoHieuChungChi"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-[150px] shrink-0 text-sm text-gray-600">
              Thời gian cấp chứng chỉ
            </label>
            <DatepickerV2
              triggerClass="w-full"
              modelValue={form.KT_KDCL_KetQuaKiemDinh_ThoiGianCapChungChi}
              onChange={(date) =>
                setForm({
                  ...form,
                  KT_KDCL_KetQuaKiemDinh_ThoiGianCapChungChi: date,
                })
              }
              valueFormat="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-[150px] shrink-0 text-sm text-gray-600">
              Thời hạn chứng chỉ
            </label>
            <DatepickerV2
              triggerClass="w-full"
              modelValue={form.KT_KDCL_KetQuaKiemDinh_ThoiHanChungChi}
              onChange={(date) =>
                setForm({
                  ...form,
                  KT_KDCL_KetQuaKiemDinh_ThoiHanChungChi: date,
                })
              }
              valueFormat="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-[150px] shrink-0 text-sm text-gray-600">
              Chứng chỉ
            </label>

            <Button ref={fileSelectRef} color="primary-lighter">
              Chọn file
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {urlFilePreview ? (
            <img className="w-full h-full" src={urlFilePreview} />
          ) : (
            <p className="h-full text-slate-500 flex items-center justify-center">
              <Icon size={100}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <rect width="16" height="16" fill="none" />
                  <path
                    fill="currentColor"
                    d="M6 1a2 2 0 0 0-2 2v3h1V3a1 1 0 0 1 1-1h3v2.5A1.5 1.5 0 0 0 10.5 6H13v7a1 1 0 0 1-1 1h-1.035c-.05.353-.154.69-.302 1H12a2 2 0 0 0 2-2V5.414a1.5 1.5 0 0 0-.44-1.06l-2.914-2.915A1.5 1.5 0 0 0 9.586 1zm6.793 4H10.5a.5.5 0 0 1-.5-.5V2.207zM1 9.5A2.5 2.5 0 0 1 3.5 7h4A2.5 2.5 0 0 1 10 9.5v4c0 .51-.152.983-.414 1.379L6.56 11.854a1.5 1.5 0 0 0-2.122 0l-3.025 3.025A2.5 2.5 0 0 1 1 13.5zm7 .25a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0m-5.879 5.836c.396.262.87.414 1.379.414h4c.51 0 .983-.152 1.379-.414L5.854 12.56a.5.5 0 0 0-.708 0z"
                  />
                </svg>
              </Icon>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
