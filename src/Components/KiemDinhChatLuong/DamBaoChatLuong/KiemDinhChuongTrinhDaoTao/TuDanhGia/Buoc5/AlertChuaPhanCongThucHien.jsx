import ThongTinTieuChuanTieuChi from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc5/ThongTinTieuChuanTieuChi.jsx'

export default function AlertChuaPhanCongThucHien({
  isLoadingListTieuChi,
  listPhanCongThucHienLoading,
  tieuChuan,
  tieuChi,
}) {
  return (
    <div className="relative z-0 mt-3">
      <div className="absolute-full border-l-2 pl-4 border-orange-400 bg-orange-300/10 rounded-lg z-[100]" />
      <div className="flex flex-col gap-1 p-3">
        <ThongTinTieuChuanTieuChi
          listPhanCongThucHienLoading={listPhanCongThucHienLoading}
          isLoadingListTieuChi={isLoadingListTieuChi}
          tieuChuan={tieuChuan}
          tieuChi={tieuChi}
        />
        <p className="text-orange-700 text-[15px]">
          Tiêu chí này chưa được phân công cho thành viên nào thực hiện!
        </p>
      </div>
    </div>
  )
}
