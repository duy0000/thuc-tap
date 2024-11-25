import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { DebounceInput } from 'react-debounce-input'
import Checkbox from '@mui/material/Checkbox'
import PropTypes from 'prop-types'

function TableHeadDSTB({
  onSelectAllClick,
  numSelected,
  rowCount,
  onChangeValueFilter,
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
            width: 40,
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
            width: 40,
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
          Mã thiết bị/tài sản
        </TableCell>
        {/* END: R1C3 - Mã thiết bị/tài sản */}
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
          Tên thiết bị/tài sản
        </TableCell>
        {/* END: R1C4 - Tên thiết bị/tài sản */}
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
          Loại
        </TableCell>
        {/* END: R1C5 - Loại */}
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
          Phòng hiện tại
        </TableCell>
        {/* END: R1C6 - Phòng hiện tại */}
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
          Người quản lý
        </TableCell>
        {/* END: R1C6 - Người quản lý */}
        <TableCell
          rowSpan={2}
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
          Số lượng
        </TableCell>
        {/* END: R1C7 - Số lượng */}
      </TableRow>
      {/* END: R1 */}
      <TableRow sx={{ backgroundColor: '#336699' }}>
        {/* END: R1C1 - STT */}
        <TableCell
          rowSpan={2}
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
          <Checkbox
            color="default"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            sx={{
              borderColor: 'white',
              color: 'white',
            }}
          />
        </TableCell>
        {/* END: R1C2 - Chọn */}
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
            id="DT_QLTS_TS_MaTaiSan"
            onChange={onChangeValueFilter}
          />
        </TableCell>
        {/* END: R1C3 - Mã thiết bị/tài sản */}
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
            id="DT_QLTS_TS_TenTaiSan"
            onChange={onChangeValueFilter}
          />
        </TableCell>
        {/* END: R1C4 - Tên thiết bị/tài sản */}
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
            id="DT_QLTS_TS_LoaiTaiSan"
            onChange={onChangeValueFilter}
          />
        </TableCell>
        {/* END: R1C5 - Loại */}
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
            id="DT_QLP_Phong_TenPhong"
            onChange={onChangeValueFilter}
          />
        </TableCell>
        {/* END: R1C6 - Phòng hiện tại */}
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
            id="DT_QLTS_TS_HTTS_NSQL_HoTen"
            onChange={onChangeValueFilter}
          />
        </TableCell>
        {/* END: R1C6 - Người quản lý */}
      </TableRow>
      {/* END: R2 */}
    </TableHead>
  )
}

TableHeadDSTB.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  onChangeValueFilter: PropTypes.func.isRequired,
}

export default TableHeadDSTB
