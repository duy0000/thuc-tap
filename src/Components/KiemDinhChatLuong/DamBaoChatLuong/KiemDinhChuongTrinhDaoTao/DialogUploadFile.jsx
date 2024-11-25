import { useEffect, useRef, useState } from 'react'
import Resumable from 'resumablejs'
import Swal from 'sweetalert2'
import Dialog from '@/Components/Base/Dialog/Dialog.jsx'
import Button from '@/Components/Base/Button/Button.jsx'
import Icon from '@/Components/Base/Icon/Icon.jsx'
import Export from '@/Components/Base/Icons/Export.jsx'
import { humanFileSize } from '@/Services/Utils/index.js'

const ALLOWED_FILE_TYPE = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']
const MAX_FILE_SIZE = 10 * 1024 * 1024

export default function DialogUploadFile({
  dialogTitle,
  isOpen,
  setIsOpen,
  isUploading,
  onSubmit,
}) {
  const fileAreaRef = useRef()
  const [fileSelected, setFileSelected] = useState()

  const onUpload = () => {
    if (!fileSelected) {
      Swal.fire({
        title: 'Thông báo',
        icon: 'warning',
        text: 'Vui lòng chọn file trước khi tải lên',
      })
      return
    }
    onSubmit(fileSelected)
  }

  useEffect(() => {
    const resumable = new Resumable({
      fileType: ALLOWED_FILE_TYPE,
      maxFiles: 1,
      maxFileSize: MAX_FILE_SIZE,
      fileTypeErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Chỉ chấp nhận các file ${ALLOWED_FILE_TYPE.join(', ')}`,
        })
      },
      maxFilesErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Chỉ được chọn tối đa 1 file!`,
        })
      },
      maxFileSizeErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `File không được vượt quá ${humanFileSize(MAX_FILE_SIZE, true, 0)}!`,
        })
      },
    })
    resumable.assignBrowse(fileAreaRef.current, false)
    resumable.assignDrop(fileAreaRef.current)

    resumable.on('fileAdded', (file) => {
      setFileSelected(file.file)
    })
  }, [])

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      preventClose={isUploading}
      header={<p className="text-uneti-primary font-medium">{dialogTitle}</p>}
      footer={
        <div className="flex justify-end items-center gap-2">
          <Button
            disabled={isUploading}
            onClick={() => setIsOpen(false)}
            color="danger"
          >
            Hủy
          </Button>
          <Button
            disabled={isUploading}
            isLoading={isUploading}
            onClick={onUpload}
          >
            Cập nhật
          </Button>
        </div>
      }
    >
      <div
        ref={fileAreaRef}
        className="text-slate-400 hover:text-uneti-primary flex justify-center items-center gap-2 border border-dashed rounded-lg border-slate-300 py-3 hover:border-uneti-primary cursor-pointer"
      >
        <Icon size={50}>
          <Export />
        </Icon>
      </div>

      {fileSelected && (
        <div className="my-2 flex justify-between items-center gap-2">
          <p className="max-w-[200px] break-words text-vs-text/80">
            {fileSelected.name}
          </p>
          <p className="text-xs text-slate-600/80">
            {humanFileSize(fileSelected.size)}
          </p>
        </div>
      )}
    </Dialog>
  )
}
