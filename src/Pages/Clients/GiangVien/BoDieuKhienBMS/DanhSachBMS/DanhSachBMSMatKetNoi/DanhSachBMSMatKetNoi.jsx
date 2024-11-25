import TableBMSMKN from './Table'

const DanhSachBMSMatKetNoi = () => {
  return (
    <div className="my-10">
      <span className="border-b-2 border-gray-700 pb-1 text-lg lg:text-xl font-semibold">
        Danh sách thiết bị điều khiển điện mất kết nối:
      </span>

      <div className="my-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <TableBMSMKN />
        </div>
      </div>
    </div>
  )
}

export default DanhSachBMSMatKetNoi
