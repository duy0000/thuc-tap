import { lazy, Suspense, useContext, useState } from 'react'
import Swal from 'sweetalert2'

import Icon from '@/Components/Base/Icon/Icon'
import Export from '@/Components/Base/Icons/Export'
import Loading from '@/Components/Loading/Loading.jsx'
import { HoSoKiemDinhCtx } from '@/Services/Tokens/index.js'

const DialogUploadFile = lazy(() => import('./DialogUploadFile.jsx'))

export default function ActionUploadFile({
  validate,
  dialogTitle,
  buttonText = 'Upload phiếu đã phân tích',
}) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const [isOpenUploadFileDialog, setIsOpenUploadFileDialog] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadFile = async (file) => {
    if (validate && !validate(file)) {
      return
    }

    setIsUploading(true)
    try {
      await hoSoKiemDinh.postFileHoSoLuuTru({
        file,
        IDQuyTrinh: hoSoKiemDinh.childStepActive
          ? hoSoKiemDinh.childStepActive?.IDQuyTrinhKiemDinh
          : hoSoKiemDinh.stepActive.IDQuyTrinhKiemDinh,
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <>
      <button
        onClick={() => setIsOpenUploadFileDialog(true)}
        className="hover:border-uneti-primary border border-gray-300 p-1 rounded-lg flex items-center gap-2"
      >
        <span className="text-white shrink-0 h-8 w-8 flex items-center justify-center bg-uneti-primary rounded-md">
          <Icon size={20}>
            <Export />
          </Icon>
        </span>
        <p className="text-left font-medium">{buttonText}</p>
      </button>

      <Suspense fallback={<Loading />}>
        {isOpenUploadFileDialog && (
          <DialogUploadFile
            isOpen={isOpenUploadFileDialog}
            setIsOpen={setIsOpenUploadFileDialog}
            isUploading={isUploading}
            onSubmit={handleUploadFile}
            dialogTitle={dialogTitle}
          />
        )}
      </Suspense>
    </>
  )
}
