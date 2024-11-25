import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { DebounceInput } from 'react-debounce-input'
import Checkbox from '@mui/material/Checkbox'
import { PropTypes } from 'prop-types'

const TblHeaderBDKBMS = (props) => {
  const { onSelectAllClick, numSelected, rowCount } = props

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#336699' }}>
        <TableCell
          rowSpan={2}
          sx={{
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
          rowSpan={2}
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 20,
            borderRight: '1px solid #fff',
          }}
        >
          Chọn
        </TableCell>
        {/* END: R1C2 - Chọn */}
        <TableCell
          colSpan={9}
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 100,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 0,
          }}
        >
          Thông tin thiết bị
        </TableCell>
        {/* END: R1C3 - Thông tin thiết bị */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 100,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          Nhiệt độ
        </TableCell>
        {/* END: R1C4 - Nhiệt độ */}
        <TableCell
          rowSpan={2}
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 200,
            textAlign: 'center',
          }}
        >
          Nút điều khiển thiết bị
        </TableCell>
        {/* END: R1C5 - Nút điều khiển thiết bị */}
      </TableRow>
      {/* END: Row title */}
      <TableRow sx={{ backgroundColor: '#336699' }}>
        {/* START: Cell Thông tin thiết bị */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 200,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 1,
          }}
        >
          Tên thiết bị
        </TableCell>
        {/* END: Tên thiết bị */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 200,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 1,
          }}
        >
          Trạng thái kết nôi
        </TableCell>
        {/* END: Trạng thái kết nôi */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 80,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 0,
          }}
        >
          Cơ sở
        </TableCell>
        {/* END: Cơ sở */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 100,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 0,
          }}
        >
          Địa điểm
        </TableCell>
        {/* END: Địa điểm */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 50,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 0,
          }}
        >
          Tòa nhà
        </TableCell>
        {/* END: Tòa nhà */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 50,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 0,
          }}
        >
          Tầng
        </TableCell>
        {/* END: Tầng */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 140,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 0,
          }}
        >
          Phòng
        </TableCell>
        {/* END: Phòng */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 80,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 0,
          }}
        >
          Chế độ hoạt động
        </TableCell>
        {/* END: Chế độ hoạt động */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 230,
            textAlign: 'center',
            borderRight: '1px solid #fff',
            padding: 0,
          }}
        >
          Trạng thái thiết bị
        </TableCell>
        {/* END: Trạng thái thiết bị */}
        {/* END: Cell Thông tin thiết bị */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 180,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          (°C)
        </TableCell>
      </TableRow>
      {/* END: Row title */}
      {/* END: Row title children */}
      <TableRow
        sx={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #ccc' }}
      >
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 20,
            borderRight: '1px solid #ccc',
          }}
        ></TableCell>
        {/* END: R3C1 - STT */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 20,
            borderRight: '1px solid #ccc',
          }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {/* END: R3C2 - Filter Chọn */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #ccc',
            padding: 0.4,
            width: 160,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm tên thiết bị'}
          />
        </TableCell>
        {/* END: R3C3 - Filter Tên thiết bị */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #ccc',
            padding: 0.4,
            width: 160,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm trạng thái biết bị'}
          />
        </TableCell>
        {/* END: R3C4 - Filter trạng thái biết bị */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #ccc',
            padding: 0.4,
            margin: 0,
            width: 80,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm cơ sở'}
          />
        </TableCell>
        {/* END: R3C4 - Filter Tên cơ sở */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #ccc',
            padding: 0.4,
            margin: 0,
            width: 200,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm địa điểm'}
          />
        </TableCell>
        {/* END: R3C5 - Filter Địa điểm */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #ccc',
            padding: 0.4,
            margin: 0,
            width: 140,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm tòa nhà'}
          />
        </TableCell>
        {/* END: R3C6 - Filter Tòa nhà */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #ccc',
            padding: 0.4,
            margin: 0,
            width: 80,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tầng'}
          />
        </TableCell>
        {/* END: R3C7 - Filter Tầng */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            padding: 0.4,
            margin: 0,
            width: 200,
            borderRight: '1px solid #ccc',
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm phòng'}
          />
        </TableCell>
        {/* END: R3C8 - Filter Phòng */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            padding: 0.4,
            margin: 0,
            width: 80,
            borderRight: '1px solid #ccc',
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm'}
          />
        </TableCell>
        {/* END: R3C9 - Filter Chế độ hoạt động */}
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            padding: 0.4,
            margin: 0,
            width: 200,
            borderRight: '1px solid #ccc',
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm'}
          />
        </TableCell>
        {/* END: R3C10 - Filter Trạng thái thiết bị */}
        <TableCell
          sx={{
            color: 'black',
            padding: 0.4,
            width: 100,
            borderRight: '1px solid #ccc',
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none border border-gray-200"
            placeholder={'Tìm °C'}
          />
        </TableCell>
        {/* END: R3C11 - Filter Nhiệt độ */}
        <TableCell
          sx={{
            color: 'black',
            padding: 0.4,
          }}
        ></TableCell>
      </TableRow>
      {/* END: Row 3 - Filter */}
    </TableHead>
  )
}

TblHeaderBDKBMS.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
}

export default TblHeaderBDKBMS
