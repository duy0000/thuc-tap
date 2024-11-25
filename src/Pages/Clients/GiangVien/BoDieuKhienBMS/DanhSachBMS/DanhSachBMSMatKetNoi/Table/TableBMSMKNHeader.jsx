import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { DebounceInput } from 'react-debounce-input'

const TableBMSMKNHeader = () => {
  return (
    <TableHead sx={{ backgroundColor: '#336699' }}>
      <TableRow>
        <TableCell
          rowSpan={3}
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 40,
            borderRight: '1px solid #fff',
          }}
        >
          STT
        </TableCell>
        <TableCell
          colSpan={6}
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
        <TableCell
          rowSpan={3}
          sx={{
            color: 'white',
            fontWeight: '700',
            minWidth: 180,
            textAlign: 'center',
          }}
        >
          Thiết bị mất kết nối
          <p>(Các thiết bị màu đỏ là mất kết nối)</p>
        </TableCell>
      </TableRow>
      {/* END: Row title */}
      <TableRow sx={{ borderBottom: '1px solid #fff' }}>
        <TableCell
          sx={{
            border: 'none',
            color: 'white',
            fontWeight: '700',
            textAlign: 'center',
            borderRight: '1px solid #fff',
            width: 160,
          }}
        >
          Tên thiết bị
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'white',
            fontWeight: '700',
            textAlign: 'center',
            borderRight: '1px solid #fff',
            width: 80,
          }}
        >
          Cơ sở
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'white',
            fontWeight: '700',
            textAlign: 'center',
            borderRight: '1px solid #fff',
            width: 160,
          }}
        >
          Địa điểm
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'white',
            fontWeight: '700',
            textAlign: 'center',
            borderRight: '1px solid #fff',
            width: 120,
          }}
        >
          Tòa nhà
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'white',
            fontWeight: '700',
            textAlign: 'center',
            borderRight: '1px solid #fff',
            width: 60,
          }}
        >
          Tầng
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'white',
            fontWeight: '700',
            textAlign: 'center',
            borderRight: '1px solid #fff',
            width: 160,
          }}
        >
          Phòng
        </TableCell>
        {/* END: Cell Thông tin thiết bị */}
        <TableCell
          sx={{
            color: 'white',
            fontWeight: '700',
            width: 100,
            borderRight: '1px solid #fff',
            textAlign: 'center',
          }}
        >
          (°C)
        </TableCell>
      </TableRow>
      {/* END: Row children title */}
      <TableRow sx={{ borderBottom: '1px solid #fff' }}>
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #fff',
            padding: 0.4,
            width: 160,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none"
            placeholder={'Tìm tên thiết bị'}
          />
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #fff',
            padding: 0.4,
            margin: 0,
            width: 80,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none"
            placeholder={'Tìm cơ sở'}
          />
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #fff',
            padding: 0.4,
            margin: 0,
            width: 160,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none"
            placeholder={'Tìm địa điểm'}
          />
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #fff',
            padding: 0.4,
            margin: 0,
            width: 120,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none"
            placeholder={'Tìm tòa nhà'}
          />
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            borderRight: '1px solid #fff',
            padding: 0.4,
            margin: 0,
            width: 60,
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none"
            placeholder={'Tầng'}
          />
        </TableCell>
        <TableCell
          sx={{
            border: 'none',
            color: 'black',
            padding: 0.4,
            margin: 0,
            width: 160,
            borderRight: '1px solid #fff',
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none"
            placeholder={'Tìm phòng'}
          />
        </TableCell>
        <TableCell
          sx={{
            color: 'black',
            width: 100,
            padding: 0.4,
            margin: 0,
            borderRight: '1px solid #fff',
          }}
        >
          <DebounceInput
            className="w-full p-2 focus:outline-none"
            placeholder={'Tìm nhiệt độ'}
          />
        </TableCell>
      </TableRow>
      {/* END: Row Filter */}
    </TableHead>
  )
}

export default TableBMSMKNHeader
