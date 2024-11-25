import GopY from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/GopY'
import Actions from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc7/Actions'

export default function Buoc7() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <GopY />

      <Actions />
      {/* <div className="rounded-lg p-4 bg-white shadow-sm flex-1 h-max flex gap-3 flex-col max-w-[300px]">
        <div className="border border-gray-300 p-2 rounded-md shadow-sm">
          <h4 className="text-uneti-primary">
            <b>Báo cáo TĐG chờ thẩm định</b>
          </h4>
          <p>Baocaotudanhgia.pdf</p>
        </div>
        <button className="base-button bg-uneti-primary-light hover:bg-uneti-primary">
          <b>Chỉnh sửa báo cáo TĐG</b>
        </button>
      </div> */}
    </div>
  )
}
