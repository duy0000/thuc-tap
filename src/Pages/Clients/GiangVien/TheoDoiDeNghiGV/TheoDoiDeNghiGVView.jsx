import { memo } from 'react'
import DanhSachDeNghiGV from './DanhSachDeNghiGV'

const TheoDoiDeNghiGVView = memo(function TheoDoiDeNghiGVView() {
  return (
    <div className="w-full min-h-full">
      <div className="bg-white p-4 shadow-md rounded-lg w-full min-h-[500px]">
        <h3 className="uppercase font-semibold text-3xl text-center text-[#336699] mb-4">
          Danh sách yêu cầu đã gửi
        </h3>
        <DanhSachDeNghiGV />
      </div>
    </div>
  )
})

export default TheoDoiDeNghiGVView
