import Swal from 'sweetalert2'
import ActionUploadFile from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/ActionUploadFile'

export default function KeHoachActionUploadFile({ keHoach }) {
  const validate = () => {
    if (!keHoach) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Vui lòng cập nhật kế hoạch tự đánh giá trước khi tải lên phiếu đã phân tích',
      })
      return false
    }

    return true
  }

  return (
    <ActionUploadFile
      dialogTitle="Tải lên Phiếu kế hoạch đã phân tích"
      validate={validate}
    />
  )
}
