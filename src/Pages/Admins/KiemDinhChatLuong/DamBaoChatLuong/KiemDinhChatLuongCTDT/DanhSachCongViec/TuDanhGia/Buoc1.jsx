import { useContext } from 'react'
import CauHinhThoiGian from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/CauHinhThoiGian'
import NhomCongTacChuyenTrach from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc1/NhomCongTacChuyenTrach/NhomCongTacChuyenTrach'
import PhanCongThucHien from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc1/PhanCongThucHien/PhanCongThucHien'
import ThanhPhanHoiDong from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc1/ThanhPhanHoiDong/ThanhPhanHoiDong'
import { HoSoKiemDinhCtx, LoaiThanhPhanHoiDongEnum } from '@/Services/Tokens'
import QuyetDinhThanhLapForm from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/QuyetDinhThanhLapForm'

export default function Buoc1() {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  return (
    <div className="flex flex-col gap-3">
      <QuyetDinhThanhLapForm />

      {hoSoKiemDinhCtx.hoiDong && (
        <>
          <ThanhPhanHoiDong
            boxTitle="Danh sách thành phần hội đồng"
            loaiThanhPhan={LoaiThanhPhanHoiDongEnum.TDG_ThanhPhanHoiDong}
          />

          <ThanhPhanHoiDong
            boxTitle="Danh sách ban thư ký"
            loaiThanhPhan={LoaiThanhPhanHoiDongEnum.TDG_BanThuKy}
          />

          <NhomCongTacChuyenTrach />

          <PhanCongThucHien />

          <CauHinhThoiGian />
        </>
      )}
    </div>
  )
}
