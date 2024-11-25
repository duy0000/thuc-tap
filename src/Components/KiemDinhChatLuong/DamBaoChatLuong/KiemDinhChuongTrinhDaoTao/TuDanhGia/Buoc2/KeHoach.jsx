import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens/index.js'
import KeHoachActions from './KeHoachActions'

export default function KeHoach({ keHoach }) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <div className="rounded-lg p-4 bg-white flex-1 h-max gap-3">
        <div className="flex items-center justify-between border rounded-md p-1 px-3">
          <Link
            to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinhCtx.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=ke-hoach`}
            className="text-uneti-primary-light text-sm font-medium hover:underline cursor-pointer"
          >
            <h3 className="text-uneti-primary-lighter font-medium">
              Kế hoạch tự đánh giá
            </h3>
          </Link>
          <p className="text-xs">Đang thực hiện</p>
        </div>
        <div className="flex items-center justify-between border rounded-md p-1 px-3 mt-2 ml-3">
          <Link
            to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinhCtx.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=nhom-cong-tac`}
            className="text-uneti-primary-light text-sm font-medium hover:underline cursor-pointer"
          >
            Nhóm công tác
          </Link>
        </div>
        <div className="flex items-center justify-between border rounded-md p-1 px-3 mt-2 ml-3">
          <Link
            to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinhCtx.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=dk-nguon-luc`}
            className="text-uneti-primary-light text-sm font-medium hover:underline cursor-pointer"
          >
            Dự kiến các nguồn lực
          </Link>
        </div>
        <div className="flex items-center justify-between border rounded-md p-1 px-3 mt-2 ml-3">
          <Link
            to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinhCtx.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=thoi-gian-hoat-dong`}
            className="text-uneti-primary-light text-sm font-medium hover:underline cursor-pointer"
          >
            Thời gian và nội dung hoạt động
          </Link>
        </div>
      </div>

      <KeHoachActions keHoach={keHoach} />
    </div>
  )
}
