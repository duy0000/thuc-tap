import GioiThieuNhanSu from '@/Components/KiemDinhChatLuong/GioiThieuNhanSu'
import DuLieuDamBaoChatLuong from '@/Components/KiemDinhChatLuong/DuLieuDamBaoChatLuong'
import TinhTrangKiemDinhCSGD from '@/Components/KiemDinhChatLuong/TinhTrangKiemDinhCSGD'
import TinhTrangKiemDinhCTDT from '@/Components/KiemDinhChatLuong/TinhTrangKiemDinhCTDT'

export default function GioiThieuChung() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <GioiThieuNhanSu />
      <DuLieuDamBaoChatLuong />
      <TinhTrangKiemDinhCTDT />
      <TinhTrangKiemDinhCSGD />
    </div>
  )
}
