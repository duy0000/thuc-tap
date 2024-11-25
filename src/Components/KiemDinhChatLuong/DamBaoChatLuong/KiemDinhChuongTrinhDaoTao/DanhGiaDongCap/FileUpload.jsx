import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Resumable from 'resumablejs'
import Swal from 'sweetalert2'
import { FiUploadCloud } from 'react-icons/fi'

import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens/index.js'
import {
  convertBase64ToArrayBuffer,
  convertBufferToBase64,
  handleDownloadFileBase64,
} from '@/Services/Utils/index.js'
import Icon from '@/Components/Base/Icon/Icon.jsx'
import Button from '@/Components/Base/Button/Button.jsx'
import * as docx from 'docx-preview'

const FILE_TYPE = ['docx', 'doc', 'pdf', 'xlsx', 'xls']

export default function FileUpload({
  onBeforeUpload,
  fileLabel,
  uploadLabel,
  maxFileSize = 10 * 1024 * 1024,
}) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const resumable = useRef()
  const fileSelectBrowse = useRef()
  const fileSelectRef = useRef()
  const previewDocxArea = useRef()

  const [fileSelected, setFileSelected] = useState(null)
  const [fileUploaded, setFileUploaded] = useState({
    FileName: '',
    DataFile: '',
  })

  const [isPosting, setIsPosting] = useState(false)

  const IDQuyTrinh = useMemo(() => {
    return hoSoKiemDinh.childStepActive
      ? hoSoKiemDinh.childStepActive?.IDQuyTrinhKiemDinh
      : hoSoKiemDinh.stepActive.IDQuyTrinhKiemDinh
  }, [hoSoKiemDinh.childStepActive, hoSoKiemDinh.stepActive])

  const handleSubmitForm = async () => {
    if (isPosting) return

    if (!fileSelected) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng chọn file tải lên',
        icon: 'error',
      })
      return
    }

    if (onBeforeUpload && !onBeforeUpload()) {
      return
    }

    try {
      setIsPosting(true)

      await hoSoKiemDinh.postFileHoSoLuuTru({
        file: fileSelected.file,
        IDQuyTrinh,
      })
      loadFileHoSoLuuTru()
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

  const loadFileHoSoLuuTru = async () => {
    const res = await hoSoKiemDinh.loadFileHoSoLuuTru(IDQuyTrinh)
    if (!res) return
    setFileUploaded({
      FileName: res.KT_KDCL_HoSoLuuTru_TenFile,
      DataFile: res.KT_KDCL_HoSoLuuTru_DataFile,
      DataFileBase64: res.KT_KDCL_HoSoLuuTru_DataFile_Base64,
    })
  }

  useEffect(() => {
    resumable.current = new Resumable({
      maxFiles: 1,
      maxFileSize: maxFileSize,
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
    if (!previewDocxArea.current) return
    if (!fileUploaded.FileName || !fileUploaded.DataFile) return

    docx.renderAsync(
      convertBase64ToArrayBuffer(fileUploaded.DataFileBase64),
      previewDocxArea.current,
    )
  }, [fileUploaded])

  useEffect(() => {
    loadFileHoSoLuuTru()
  }, [IDQuyTrinh])

  return (
    <div className="flex flex-col gap-2 p-3 md:px-5 md:py-6 rounded-lg shadow-sm bg-white">
      {fileUploaded.FileName && fileUploaded.DataFile && (
        <div className="border border-dashed border-slate-200 rounded-lg p-3 flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <p className="text-uneti-primary font-medium">{fileLabel}</p>
            <p className="text-uneti-primary-lighter flex items-end underline gap-2">
              {fileUploaded.FileName}
            </p>
          </div>

          <Button
            onClick={() =>
              handleDownloadFileBase64(
                fileUploaded.FileName,
                convertBufferToBase64(fileUploaded.DataFile),
              )
            }
            disabled={isPosting}
            className="w-full md:w-auto"
          >
            Tải xuống
          </Button>
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
            {uploadLabel}
          </h3>
        </div>

        {fileSelected && (
          <div className="mt-2 border-t border-slate-200/70 p-1 md:p-3 flex flex-col md:flex-row justify-between md:items-center">
            <div className="mt-2">
              <h3 className="text-uneti-primary font-semibold text-[14px]">
                {fileLabel}
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
                Tải lên
              </Button>
            )}
          </div>
        )}
      </div>

      <div ref={previewDocxArea} className="hidden lg:block"></div>
    </div>
  )
}
