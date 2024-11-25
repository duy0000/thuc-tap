import { HoSoKiemDinhCtx, IDQuyTrinhKiemDinhEnum } from '@/Services/Tokens'
import Swal from 'sweetalert2'
import ActionPheDuyet from '../../ActionPheDuyet'
import { useContext } from 'react'

export default function KeHoachActionPheDuyet({ keHoach }) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const validate = () => {
    if (!keHoach) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Vui lòng cập nhật hồ sơ kế hoạch tự đánh giá trước khi gửi yêu cầu phê duyệt!',
      })
      return false
    }

    if (!hoSoKiemDinh.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_TenFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        html: `<div class="text-center">
            <p>Vui lòng tải lên phiếu phân tích kế hoạch tự đánh giá!</p>
            <p>Chọn <b class="text-uneti-primary">Upload phiếu đã phân tích</b> để cập nhật file</p>
          </div>
        `,
      })
      return false
    }

    return true
  }

  return (
    <ActionPheDuyet
      IDQuyTrinhKiemDinhTiepTheo={IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc3}
      validate={validate}
    />
  )
}
