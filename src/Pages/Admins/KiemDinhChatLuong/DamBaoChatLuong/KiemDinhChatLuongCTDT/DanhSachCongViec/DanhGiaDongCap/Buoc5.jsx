import GopY from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/GopY'
import Actions from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/DanhGiaDongCap/Buoc5/Actions'

export default function Buoc5() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <GopY />
      <Actions />
      {/* <div className="rounded-lg p-4 bg-white shadow-sm flex-1 h-max flex gap-3 flex-col max-w-[270px]">
        <div className="border border-gray-300 p-2 rounded-md shadow-sm">
          <h4 className="text-uneti-primary">
            <b>Báo cáo đánh giá ngoài</b>
          </h4>

          <div className="p-3 rounded border mt-2">
            <p>1b-Moc-chuan-kem-theo-CV.pdf</p>
            <p className="mt-3 border-t pt-3">ban-dich-tai-lieu-danh-gia.pdf</p>
          </div>
        </div>
      </div> */}
    </div>
  )
}
