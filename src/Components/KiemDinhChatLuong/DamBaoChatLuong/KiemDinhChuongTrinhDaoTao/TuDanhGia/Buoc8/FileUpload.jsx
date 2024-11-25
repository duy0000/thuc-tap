import { useContext, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { useDkDanhGiaDongCapStore } from '@/Services/Store/Module/KiemDinhChatLuong/dangKyDanhGiaDongCap'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'
import {
  convertBufferToBase64,
  convertDataFileToBase64,
  handleDownloadFileBase64,
} from '@/Services/Utils'
import { postDkDanhGiaDongCap, putDkDanhGiaDongCap } from '@/Apis/KDCL'
import Resumable from 'resumablejs'
import Icon from '@/Components/Base/Icon/Icon'
import { LuDownload } from 'react-icons/lu'
import Button from '@/Components/Base/Button/Button'
import { FiUploadCloud } from 'react-icons/fi'
import { Alert } from '@/Components/Base/Alert/Alert'

const FILE_TYPE = ['docx', 'doc', 'pdf', 'xlsx', 'xls']

export default function FileUpload({ hoSoDangKy, refetchHoSoDangKy }) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const { refetch: refetchListDkDanhGiaDongCap } = useDkDanhGiaDongCapStore()

  const resumable = useRef()
  const fileSelectBrowse = useRef()
  const fileSelectRef = useRef()

  const [fileSelected, setFileSelected] = useState(null)
  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({})

  const handleSubmitForm = async (trangThai = stepStatusEnum.DaTrinhGui) => {
    if (isPosting) return

    if (trangThai === stepStatusEnum.DaTrinhGui) {
      if (!fileSelected) {
        Swal.fire({
          icon: 'warning',
          title: 'Thông báo',
          text: 'Vui lòng chọn file báo cáo tự đánh giá đã được thẩm định!',
        })
        return
      }
    }

    try {
      setIsPosting(true)

      if (fileSelected) {
        const fileBase64 = await convertDataFileToBase64(fileSelected.file)
        form.KT_KDCL_CTDT_DK_DanhGiaDongCap_TenFile = fileSelected.file.name
        form.KT_KDCL_CTDT_DK_DanhGiaDongCap_DataFile = fileBase64
          .split(';base64,')
          .pop()
      } else {
        if (hoSoDangKy?.KT_KDCL_CTDT_DK_DanhGiaDongCap_DataFile?.data) {
          form.KT_KDCL_CTDT_DK_DanhGiaDongCap_TenFile =
            hoSoDangKy.KT_KDCL_CTDT_DK_DanhGiaDongCap_TenFile
          form.KT_KDCL_CTDT_DK_DanhGiaDongCap_DataFile =
            hoSoDangKy.KT_KDCL_CTDT_DK_DanhGiaDongCap_DataFile
        }
      }

      let action = postDkDanhGiaDongCap
      if (hoSoDangKy) {
        action = putDkDanhGiaDongCap
      }

      await action({
        ...form,
        KT_KDCL_CTDT_DK_DanhGiaDongCap_IDHoSoKiemDinh:
          hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
        KT_KDCL_CTDT_DK_DanhGiaDongCap_TrangThai: trangThai,
      })
      await refetchListDkDanhGiaDongCap()
      await refetchHoSoDangKy()
    } catch {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  useEffect(() => {
    resumable.current = new Resumable({
      maxFiles: 1,
      maxFileSize: 10 * 1024 * 1024,
      fileType: FILE_TYPE,
      fileTypeErrorCallback: () => {
        Swal.fire({
          icon: 'warning',
          title: 'Thông báo',
          text: `File không đúng định dạng, chỉ chấp nhận các file có định dạng: ${FILE_TYPE.join(', ')}`,
        })
      },
      maxFilesErrorCallback: () => {
        Swal.fire({
          icon: 'warning',
          title: 'Thông báo',
          text: 'Chỉ được chọn 1 file',
        })
      },
      maxFileSizeErrorCallback: () => {
        Swal.fire({
          icon: 'warning',
          title: 'Thông báo',
          text: 'File quá lớn, chỉ chấp nhận file có dung lượng tối đa 10MB',
        })
      },
    })
    resumable.current.assignBrowse(fileSelectBrowse.current)
    resumable.current.assignDrop(fileSelectRef.current)
    resumable.current.on('fileAdded', async (file) => {
      setFileSelected(file)
    })
  }, [])

  useEffect(() => {
    hoSoDangKy && setForm(hoSoDangKy)
  }, [hoSoDangKy])

  return (
    <div className="flex flex-col gap-2 p-3 md:px-5 md:py-6 rounded-lg shadow-sm bg-white">
      {hoSoDangKy?.KT_KDCL_CTDT_DK_DanhGiaDongCap_TrangThai ===
        stepStatusEnum.KhongPheDuyet && (
        <Alert
          type="warn"
          title="Thông báo"
          content="Phiếu đăng ký đánh giá ngoài bị từ chối!"
        />
      )}

      {hoSoDangKy?.KT_KDCL_CTDT_DK_DanhGiaDongCap_TenFile &&
        hoSoDangKy?.KT_KDCL_CTDT_DK_DanhGiaDongCap_DataFile.data && (
          <div className="border border-dashed border-slate-200 rounded-lg p-3 flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <p className="text-uneti-primary font-medium">
                Báo cáo tự đánh giá đã được thẩm định
              </p>
              <div
                className="text-uneti-primary-lighter flex items-end cursor-pointer gap-2"
                onClick={() =>
                  handleDownloadFileBase64(
                    hoSoDangKy.KT_KDCL_CTDT_DK_DanhGiaDongCap_TenFile,
                    convertBufferToBase64(
                      hoSoDangKy.KT_KDCL_CTDT_DK_DanhGiaDongCap_DataFile.data,
                    ),
                  )
                }
              >
                <p>{hoSoDangKy.KT_KDCL_CTDT_DK_DanhGiaDongCap_TenFile}</p>
                <Icon size={20}>
                  <LuDownload />
                </Icon>
              </div>
            </div>

            <div className="mt-3 md:mt-0 w-full md:w-max flex flex-col md:flex-row gap-2">
              <Button
                onClick={() => handleSubmitForm(stepStatusEnum.KhongPheDuyet)}
                disabled={isPosting}
                color="danger"
                className="w-full md:w-auto"
              >
                Không phê duyệt
              </Button>
              <Button
                onClick={() => handleSubmitForm(stepStatusEnum.DaPheDuyet)}
                disabled={isPosting}
                className="w-full md:w-auto"
              >
                Phê duyệt
              </Button>
            </div>
          </div>
        )}

      <div
        ref={fileSelectRef}
        className="border border-dashed border-slate-200 rounded-lg p-3"
        onMouseOver={() =>
          fileSelectRef.current.classList.add('border-uneti-primary')
        }
        onMouseOut={() =>
          fileSelectRef.current.classList.remove('border-uneti-primary')
        }
        onDragOver={() =>
          fileSelectRef.current.classList.add('border-uneti-primary')
        }
      >
        <div ref={fileSelectBrowse} className=" cursor-pointer">
          <p className="text-center text-slate-400">
            <Icon size={40}>
              <FiUploadCloud />
            </Icon>
          </p>

          <h3 className="text-center text-uneti-primary font-semibold text-[15px]">
            Tải lên công văn đề nghị tổ chức đánh giá ngoài
          </h3>
        </div>

        {fileSelected && (
          <div className="mt-2 border-t border-slate-200/70 p-1 md:p-3 flex flex-col md:flex-row justify-between md:items-center">
            <div className="mt-2">
              <h3 className="text-uneti-primary font-semibold text-[14px]">
                Công văn đề nghị tổ chức đánh giá ngoài
              </h3>
              <p className="text-uneti-primary-lighter flex items-end gap-2">
                {fileSelected.file.name}
              </p>
            </div>
            {fileSelected && (
              <Button
                onClick={() => handleSubmitForm(stepStatusEnum.DaTrinhGui)}
                isLoading={isPosting}
                className="w-full md:w-max mt-3 md:mt-0"
              >
                Đăng ký đánh giá ngoài
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
