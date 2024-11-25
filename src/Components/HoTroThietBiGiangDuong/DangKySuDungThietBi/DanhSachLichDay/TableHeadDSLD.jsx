import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { DebounceInput } from 'react-debounce-input'
import Checkbox from '@mui/material/Checkbox'
import PropTypes from 'prop-types'
import { memo } from 'react'

const TableHeadDSLD = memo(function TableHeadDSLD({
  onSelectAllClick,
  numSelected,
  rowCount,
  onChangeFilter,
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
            width: 100,
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
            width: 180,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Tên phòng học
        </TableCell>
        {/* END: R1C4 - Tên phòng học */}
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
          Mã lớp học phần
        </TableCell>
        {/* END: R1C5 - Mã lớp học phần */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 120,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Tên môn học
        </TableCell>
        {/* END: R1C6 - Tên môn học */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 60,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Từ tiết
        </TableCell>
        {/* END: R1C6 - Từ tiết */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: '4px',
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 60,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Đến tiết
        </TableCell>
        {/* END: R1C7 - Đến tiết */}
      </TableRow>
      {/* END: R1 */}
      <TableRow sx={{ backgroundColor: '#336699' }}>
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
            width: 100,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_LichHoc_NgayBatDau"
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
            width: 180,
            height: 20,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_LichHoc_TenPhong"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C4 - Tên phòng học */}
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
            id="DT_CVNB_TBGD_LichHoc_MaLopHocPhan"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C5 - Mã lớp học phần */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 180,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="DT_CVNB_TBGD_LichHoc_TenHocPhan"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R1C6 - Tên môn học */}
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
            width: 60,
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

TableHeadDSLD.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

export default TableHeadDSLD
