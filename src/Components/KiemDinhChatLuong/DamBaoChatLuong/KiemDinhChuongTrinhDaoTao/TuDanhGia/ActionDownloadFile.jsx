import Icon from '@/Components/Base/Icon/Icon'
import Import from '@/Components/Base/Icons/Import'
import {
  convertBufferToBase64,
  handleDownloadFileBase64,
} from '@/Services/Utils'
import { isEmpty } from 'lodash-unified'
import Swal from 'sweetalert2'

export default function ActionDownloadFile({
  DataFile,
  TenFile,
  IsCanDownload,
}) {
  const handleDownloadFile = () => {
    try {
      const dataFileBase64 = convertBufferToBase64(DataFile)
      handleDownloadFileBase64(TenFile, dataFileBase64)
    } catch {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau.',
      })
    }
  }

  if (!IsCanDownload || isEmpty(DataFile) || isEmpty(TenFile)) return

  return (
    <button
      onClick={handleDownloadFile}
      className="hover:border-uneti-primary border border-gray-300 p-1 rounded-lg  flex items-center gap-2"
    >
      <span className="text-white h-8 w-8 flex items-center justify-center bg-uneti-primary rounded-md">
        <Icon size={20}>
          <Import />
        </Icon>
      </span>
      <p className="text-left font-medium">Kết xuất file</p>
    </button>
  )
}
