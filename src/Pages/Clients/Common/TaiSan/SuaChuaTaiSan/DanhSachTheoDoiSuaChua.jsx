import { dayjs, filterData } from '@/Services/Utils'
import { IconButton, TablePagination, Tooltip } from '@mui/material'
import { useMemo, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { TbFilterOff } from 'react-icons/tb'

const initialDataFilter = {
  DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_Tang: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_Phong: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai: '',
  DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
  DT_QLTS_TS_HoTroThietBi_XuLy_HoTen: '',
  DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan: '',
  DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai: '',
  DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
}

const initialItemPerPageList = [10, 25, 50, 100]

function DanhSachTheoDoiSuaChua({ listBaoHong, loading }) {
  const [dataFilter, setDataFilter] = useState(initialDataFilter)
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  })

  const __filterDataBaoHong = useMemo(() => {
    return filterData(listBaoHong, dataFilter)
  }, [listBaoHong, dataFilter])

  const __dataWithPagination = useMemo(() => {
    return __filterDataBaoHong?.slice(
      pagination.page * pagination.pageSize,
      pagination.page * pagination.pageSize + pagination.pageSize,
    )
  }, [__filterDataBaoHong, pagination.pageSize, pagination.page])

  const handleChangeValueFilter = (e) => {
    const { name, value } = e.target
    setDataFilter((prev) => ({ ...prev, [name]: value }))
  }

  const renderHeadTbale = () => {
    return (
      <thead className="sticky left-0 top-0 z-[1] w-full">
        <tr className="border-b bg-sky-800 text-white">
          <th className="p-2  border-r rounded-tl-lg">STT</th>
          <th colSpan={7} className="p-2 border-r">
            Thông tin tài sản
          </th>
          <th colSpan={3} className="p-2 border-r">
            Nội dung báo hỏng
          </th>
          <th colSpan={4} className="p-2 border-r">
            Thông tin báo hỏng
          </th>
          <th colSpan={6} className="p-2 rounded-tr-lg">
            Thông tin xử lý
          </th>
        </tr>
        {/* END: RH1 */}
        <tr className="border-b bg-sky-800 text-white">
          <th className="p-1 border-r border-slate-100">
            <p className="flex items-center justify-center">
              <Tooltip title="Xóa lọc" arrow placement="top">
                <IconButton onClick={() => setDataFilter(initialDataFilter)}>
                  <TbFilterOff color="white" />
                </IconButton>
              </Tooltip>
            </p>
          </th>
          <th className="p-1 border-r border-slate-400">
            <p>Mã tài sản</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Tên tài sản</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Cơ sở</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Địa điểm</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Tòa nhà</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Tầng</p>
          </th>
          <th className="p-1 border-r border-slate-100 whitespace-nowrap">
            <p>Phòng</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Tên sự cố</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Mô tả sự cố</p>
          </th>
          <th className="p-1 border-r border-slate-100 whitespace-nowrap">
            <p>Ngày báo hỏng</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>
              <span>Mã nhân sự</span>
              <br />
              <hr />
              <span>Mã sinh viên</span>
            </p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Họ và tên</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>
              <span>Phòng ban</span>
              <br />
              <hr />
              <span>Khoa</span>
            </p>
          </th>
          <th className="p-1 border-r border-slate-100 whitespace-nowrap">
            <p>Số điện thoại</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Mã nhân sự</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Họ và tên</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>
              <span>Phòng ban</span>
              <br />
              <hr />
              <span>Khoa</span>
            </p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Số điện thoại</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Ngày xử lý</p>
          </th>
          <th className="p-1 border-r border-slate-400 whitespace-nowrap">
            <p>Nội dung xử lý</p>
          </th>
        </tr>
        {/* END: RH2 */}
        <tr className="border-b shadow-sm bg-white">
          <td className="border-r border-slate-200"></td>
          <td className="border-r border-slate-200 w-24">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm mã tài sản"
            />
          </td>
          <td className="border-r border-slate-200 w-34">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm tên tài sản"
            />
          </td>
          <td className="border-r border-slate-200 w-14">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm cơ sở"
            />
          </td>
          <td className="border-r border-slate-200 w-16">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm địa điểm"
            />
          </td>
          <td className="border-r border-slate-200 w-14">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm tòa nhà"
            />
          </td>
          <td className="border-r border-slate-200 w-14">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_Tang"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_Tang}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm tầng"
            />
          </td>
          <td className="border-r border-slate-200 w-32">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_Phong"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_Phong}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm phòng"
            />
          </td>
          <td className="border-r border-slate-200 w-34">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm tên sự cố"
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder="Tìm mô tả"
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              type="date"
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder={`Tìm mã nhân sự hoặc mã sinh viên`}
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder={`Tìm họ và tên`}
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder={`Tìm phòng ban, khoa`}
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder={`Tìm số điện thoại`}
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder={`Tìm mã nhân sự`}
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_XuLy_HoTen"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_XuLy_HoTen}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder={`Tìm họ và tên`}
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder={`Tìm phòng ban, khoa`}
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai}
              onChange={handleChangeValueFilter}
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
              placeholder={`Tìm số điện thoại`}
            />
          </td>
          <td className="border-r border-slate-200">
            <DebounceInput
              name="DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy"
              value={dataFilter.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy}
              onChange={handleChangeValueFilter}
              type="date"
              debounceTimeout={300}
              className="w-full p-2 text-black focus:outline-1 focus:outline-cyan-500"
            />
          </td>
          <td className="border-r border-slate-200"></td>
        </tr>
        {/* END: RH3 */}
      </thead>
    )
  }

  const renderBodyTable = () => {
    return Array.isArray(__dataWithPagination) &&
      __dataWithPagination.length > 0 ? (
      __dataWithPagination.map((item, index) => {
        return (
          <tr
            key={item?.DT_QLTS_TS_HoTroThietBi_ID || index}
            className="border-b"
          >
            <th className="p-1 border-r border-slate-200">
              {pagination.page * pagination.pageSize + index + 1}
            </th>
            <td className="p-1 border-r border-slate-200 w-32">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan}
            </td>
            <td className="p-1 border-r border-slate-200 w-34">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan}
            </td>
            <td className="p-1 border-r border-slate-200 text-center whitespace-nowrap">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo}
            </td>
            <td className="p-1 border-r border-slate-200 text-center whitespace-nowrap">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem}
            </td>
            <td className="p-1 border-r border-slate-200 text-center">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha}
            </td>
            <td className="p-1 border-r border-slate-200 text-center">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_Tang}
            </td>
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong}
            </td>
            {/* END: Thông tin tài sản */}
            <td className="p-1 border-r border-slate-200 min-w-[200px]">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo}
            </td>
            <td className="p-1 border-r border-slate-200 min-w-[200px]">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa}
            </td>
            <td className="p-1 border-r border-slate-200 text-center">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui
                ? dayjs(item?.DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui)
                    .utc()
                    .format('DD/MM/YYYY HH:mm')
                : ''}
            </td>
            {/* END: Nội dung báo hỏng */}
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu}
            </td>
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen}
            </td>
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan}
            </td>
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai}
            </td>
            {/* END: Thông tin người báo hỏng */}
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu}
            </td>
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_XuLy_HoTen}
            </td>
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan}
            </td>
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai}
            </td>
            <td className="p-1 border-r border-slate-200">
              {item?.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy
                ? dayjs(item?.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy)
                    .utc()
                    .format('DD/MM/YYYY HH:mm')
                : ''}
            </td>
            <td className="p-1 border-r border-slate-200">
              <table className="border">
                <tbody>
                  <tr className="border-b">
                    <td className="whitespace-nowrap p-1 border-r">
                      Nguyên nhân:{' '}
                    </td>
                    <td className="min-w-[200px] p-1">
                      <p className="w-[200px]">
                        {item?.DT_QLTS_TS_HoTroThietBi_XacNhan_NguyenNhan_MoTa}
                      </p>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="whitespace-nowrap p-1 border-r">
                      Kết quả:{' '}
                    </td>
                    <td className="min-w-[200px] p-1">
                      <p className="w-[200px]">
                        {item?.DT_QLTS_TS_HoTroThietBi_XacNhan_KetQua_MoTa}
                      </p>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="whitespace-nowrap p-1 border-r">
                      Hoàn thành:{' '}
                    </td>
                    <td className="min-w-[200px] p-1">
                      <p className="w-[200px]">
                        {item?.DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh_MoTa}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            {/* END: Thông tin người xử lý */}
          </tr>
        )
      })
    ) : (
      <tr>
        {loading ? (
          <td colSpan={23} className="text-center font-semibold text-sky-700">
            Đang tải dữ liệu...
          </td>
        ) : (
          <td colSpan={23} className="text-center font-semibold text-red-700">
            Không có dữ liệu
          </td>
        )}
      </tr>
    )
  }

  return (
    <div className="mt-8 min-w-full">
      <h3 className="mb-4 font-bold text-sky-800 lg:text-lg">
        Danh sách theo dõi sữa chữa báo hỏng:{' '}
      </h3>
      <div className="w-full relative inset-0 z-[1] max-h-[600px] overflow-auto">
        <table className="w-full">
          {renderHeadTbale()}
          {renderBodyTable()}
        </table>
      </div>
      <TablePagination
        component={'div'}
        className="w-full"
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        count={__filterDataBaoHong?.length}
        rowsPerPageOptions={initialItemPerPageList}
        onPageChange={(e, newPage) =>
          setPagination((prev) => ({ ...prev, page: newPage }))
        }
        onRowsPerPageChange={(e) =>
          setPagination((prev) => ({
            ...prev,
            page: 0,
            pageSize: e.target.value,
          }))
        }
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default DanhSachTheoDoiSuaChua
