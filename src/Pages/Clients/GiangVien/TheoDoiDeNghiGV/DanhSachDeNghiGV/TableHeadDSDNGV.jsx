import { memo } from 'react'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { DebounceInput } from 'react-debounce-input'
import PropTypes from 'prop-types'

const TableHeadDSDNGV = memo(function TableHeadDSDNGV({ onChangeFilter }) {
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
            width: 100,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Tên yêu cầu
        </TableCell>
        {/* END: R1C2 - Tên yêu cầu */}
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
          Ngày gửi
        </TableCell>
        {/* END: R1C3 - Ngày gửi */}
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
          Trạng thái
        </TableCell>
        {/* END: R1C4 - Trạng thái */}
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
          Tác vụ
        </TableCell>
        {/* END: R1C5 - Tác vụ */}
      </TableRow>
      {/* END: R1 */}
      <TableRow sx={{ backgroundColor: '#336699' }}>
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
            id="TenThuTuc"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C1 - Tên yêu cầu */}
        <TableCell
          rowSpan={1}
          sx={{
            padding: 0,
            margin: 0,
            color: 'white',
            fontWeight: '700',
            width: 100,
            height: 20,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          <DebounceInput
            className="w-full p-3 focus:outline-none border border-gray-200 text-gray-900"
            placeholder={'Tìm ...'}
            id="NgayGui"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C4 - Ngày gửi */}
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
            id="TenTrangThai"
            onChange={onChangeFilter}
          />
        </TableCell>
        {/* END: R2C5 - Trạng thái */}
      </TableRow>
      {/* END: R2 */}
    </TableHead>
  )
})

TableHeadDSDNGV.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
}

export default TableHeadDSDNGV
