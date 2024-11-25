import { useNavigate } from 'react-router-dom'
import Button from '@/Components/Base/Button/Button.jsx'
import TableThanhPhanHoiDong from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc2/TableThanhPhanHoiDong.jsx'
import {
  HoSoKiemDinhCtx,
  LoaiThanhPhanHoiDongEnum,
} from '@/Services/Tokens/index.js'
import { useContext } from 'react'

export default function BanThuKy() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const navigate = useNavigate()

  const handleBackRoute = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate(
        `dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2`,
      )
    }
  }

  return (
    <div className="p-5 rounded-lg bg-white flex-1">
      <div className="flex items-center justify-between">
        <Button type="border" onClick={handleBackRoute}>
          Quay lại
        </Button>
        <p className="uppercase text-uneti-primary text-xs">
          <b>Danh sách ban thư ký</b>
        </p>
      </div>
      <div className="uneti-divider" />

      <TableThanhPhanHoiDong
        loaiThanhPhan={LoaiThanhPhanHoiDongEnum.TDG_BanThuKy}
      />
    </div>
  )
}
