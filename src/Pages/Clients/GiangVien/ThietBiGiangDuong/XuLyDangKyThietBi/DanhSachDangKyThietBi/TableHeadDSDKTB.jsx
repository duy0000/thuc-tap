import { memo } from 'react'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { DebounceInput } from 'react-debounce-input'
import Checkbox from '@mui/material/Checkbox'
import PropTypes from 'prop-types'

const TableHeadDSDKTB = memo(function TableHeadDSDKTB({
  onSelectAllClick,
  numSelected,
  rowCount,
  onChangeFilter,
  searchFieldsGroupTaiSan,
  searchFieldsGroupViTri,
}) {
  return (
    <TableHead style={{ border: '1px solid #ccc' }}>
      <TableRow sx={{ backgroundColor: '#336699' }}>
        <TableCell
          rowSpan={2}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 20,
            textAlign: 'center',
            borderRight: '1px solid #fff',
          }}
        >
          STT
        </TableCell>
        {/* END: R1C1 - STT */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 20,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Chọn
        </TableCell>
        {/* END: R1C2 - Chọn */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 80,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Ngày dạy
        </TableCell>
        {/* END: R1C3 - Ngày dạy */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 30,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Mã nhân sự
        </TableCell>
        {/* END: R1C4 - Mã nhân sự */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 80,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Tên giảng viên
        </TableCell>
        {/* END: R1C5 - Tên giảng viên */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 100,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Khoa chủ quản
        </TableCell>
        {/* END: R1C6 - Khoa chủ quản */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 80,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Mã - Tên thiết bị đăng ký
        </TableCell>
        {/* END: R1C7 - Mã - Tên thiết bị đăng ký */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 40,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          SL <br /> đăng ký
        </TableCell>
        {/* END: R1C8 - Số lượng đăng ký */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 160,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Vị trí sử dụng
        </TableCell>
        {/* END: R1C9 - Vị trí sử dụng */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 40,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Từ tiết
        </TableCell>
        {/* END: R1C10 - Từ tiết */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 40,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Đến tiết
        </TableCell>
        {/* END: R1C11 - Đến tiết */}
      </TableRow>
      {/* END: R1 */}
      <TableRow
        sx={{
          backgroundColor: '#336699',
          // display: 'none'
        }}
      >
        {/* END: R1C1 - STT */}
        <TableCell
          rowSpan={2}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 20,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <Checkbox
            color="default"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && rowCount > 0 && numSelected === rowCount}
            onChange={() => {
              onSelectAllClick('all')
            }}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            sx={{
              borderColor: 'white',
              color: 'white',
            }}
          />
        </TableCell>
        {/* END: R2C2 - Chọn */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 20,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_GuiYeuCau_NgayDay"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C3 - Ngày dạy */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 20,
            height: 20,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C4 - Mã nhân sự */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 120,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_HoTen"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C5 - Tên giảng viên */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 100,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_GuiYeuCau_TenPhongBan"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C6 - Khoa chủ quản */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 80,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            // id="searchTerm"
            id={searchFieldsGroupTaiSan.join(',')}
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C7 - Mã - Tên thiết bị đăng ký */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 60,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C8 - Số lượng đăng ký */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 200,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            // id="searchTerm"
            id={searchFieldsGroupViTri.join(',')}
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C8 - Vị trí sử dụng */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 40,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_LichHoc_TuTiet"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C7 - Từ tiết */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 40,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_LichHoc_DenTiet"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C8 - Đến tiết */}
      </TableRow>
      {/* END: R2 */}
    </TableHead>
  )
})

TableHeadDSDKTB.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

export default TableHeadDSDKTB
