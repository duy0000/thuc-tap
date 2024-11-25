import { Link } from 'react-router-dom'
import HoiDongDamBaoChatLuong from './HoiDongDamBaoChatLuong/HoiDongDamBaoChatLuong'
import PhongKhaoThiVaDBCL from './PhongKhaoThiVaDBCL/PhongKhaoThiVaDBCL'
import KetQuaKiemDinh from './KetQuaKiemDinh/KetQuaKiemDinh'
import DanhSachVanBan from './DanhSachVanBan/DanhSachVanBan'

export default function GioiThieu() {
  return (
    <>
      <div className="bg-white p-4 rounded-xl">
        <div className="flex justify-between items-center pb-2">
          <Link to={`/csdl-don-vi/tong-quan`}>
            <button className="px-2 py-1 border border-uneti-primary text-uneti-primary bg-white rounded hover:text-white hover:bg-uneti-primary-lighter transition-all duration-200">
              Quay lại
            </button>
          </Link>

          <div className="uppercase text-uneti-primary font-semibold">
            Giới thiệu
          </div>
        </div>
        <span className="block h-[1px] w-full bg-uneti-primary-lighter rounded-full"></span>
        <div className="pt-2 flex justify-start items-start flex-col gap-4">
          <HoiDongDamBaoChatLuong />
          <PhongKhaoThiVaDBCL />
          <KetQuaKiemDinh />
          <DanhSachVanBan />
        </div>
      </div>
    </>
  )
}
