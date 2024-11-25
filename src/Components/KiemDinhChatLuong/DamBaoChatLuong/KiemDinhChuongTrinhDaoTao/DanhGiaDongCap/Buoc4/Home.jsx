import KetQuaDanhGia from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/DanhGiaDongCap/Buoc4/KetQuaDanhGia'
import Actions from './Actions'

export default function Home() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <div className="flex-1">
        <KetQuaDanhGia />
      </div>

      <Actions />
      {/* <div className="mt-10 rounded-lg p-4 bg-white shadow-sm h-max flex flex-1 gap-3 flex-col max-w-[270px]">
        <button className="border border-gray-300 p-2 rounded-md shadow-sm flex items-center gap-2">
          <span className="text-white h-8 w-8 flex items-center justify-center bg-uneti-primary rounded-md">
            <Icon size={20}>
              <BiExport />
            </Icon>
          </span>
          <b className="text-left">Kết xuất file</b>
        </button>
        <button className="border border-gray-300 p-2 rounded-md shadow-sm flex items-center gap-2">
          <span className="text-white h-8 w-8 flex items-center justify-center bg-uneti-primary rounded-md">
            <Icon size={20}>
              <FiUploadCloud />
            </Icon>
          </span>
          <b className="text-left">Upload báo cáo</b>
        </button>

        <div className="border border-gray-300 p-2 rounded-md shadow-sm">
          <h4 className="text-uneti-primary">
            <b>Báo cáo đã ký</b>
          </h4>
          <p className="underline cursor-pointer text-uneti-primary-lighter mt-1">
            Ban-dich-tai-lieu-huong-dan.pdf
          </p>
        </div>
      </div> */}
    </div>
  )
}
