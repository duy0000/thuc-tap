import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { MdOutlineSevereCold, MdOutlineDoorSliding } from 'react-icons/md'
import { GiComputerFan, GiElectric } from 'react-icons/gi'
import { FaRegLightbulb } from 'react-icons/fa'

const rows = [1, 2, 3, 4, 5]
const TableBMSMKNBody = () => {
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row} sx={{ borderBottom: '1px solid #ccc' }}>
          <TableCell
            component="th"
            scope="row"
            sx={{
              fontWeight: '700',
              textAlign: 'center',
              borderRight: '1px solid #ccc',
            }}
          >
            {row}
          </TableCell>

          <TableCell
            sx={{
              border: 'none',
              color: 'black',
              textAlign: 'left',
              borderRight: '1px solid #ccc',
              width: 160,
            }}
          >
            <p className="whitespace-nowrap">Hộp điều khiển điện</p>
            <p className="whitespace-nowrap">Serinumber: 0011089678</p>
          </TableCell>
          <TableCell
            sx={{
              border: 'none',
              color: 'black',
              textAlign: 'center',
              borderRight: '1px solid #ccc',
              width: 120,
            }}
          >
            Hà Nội
          </TableCell>
          <TableCell
            sx={{
              border: 'none',
              color: 'black',
              textAlign: 'center',
              borderRight: '1px solid #ccc',
              width: 160,
            }}
          >
            3 - 218 - Lĩnh Nam
          </TableCell>
          <TableCell
            sx={{
              border: 'none',
              color: 'black',
              textAlign: 'center',
              borderRight: '1px solid #ccc',
              width: 100,
            }}
          >
            H.A11
          </TableCell>
          <TableCell
            sx={{
              border: 'none',
              color: 'black',
              textAlign: 'center',
              borderRight: '1px solid #ccc',
              width: 60,
            }}
          >
            3
          </TableCell>
          <TableCell
            sx={{
              border: 'none',
              color: 'black',
              textAlign: 'center',
              width: 160,
              borderRight: '1px solid #ccc',
            }}
          >
            Phòng Đào tạo 311
          </TableCell>
          <TableCell
            sx={{
              textAlign: 'center',
              borderRight: '1px solid #ccc',
            }}
          >
            {row * 10}°C
          </TableCell>
          <TableCell sx={{ width: 180 }}>
            {row % 2 == 0 ? (
              <div className="w-full flex flex-wrap">
                <button className="w-full justify-center flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap">
                  <MdOutlineSevereCold size={24} />
                  Điều hòa
                </button>
                <button className="w-full justify-center flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap">
                  <MdOutlineDoorSliding size={24} />
                  Cửa
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-wrap">
                <button className="w-full justify-center flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap">
                  <MdOutlineSevereCold size={24} />
                  Điều hòa
                </button>
                <button className="w-full justify-center flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap">
                  <MdOutlineDoorSliding size={24} />
                  Cửa
                </button>
                <button className="w-full justify-center flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap">
                  <GiComputerFan size={24} />
                  Quạt/Đèn
                </button>
                {/* <button className="w-full justify-center flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap">
                  <FaRegLightbulb size={24} />
                  Đèn
                </button> */}
                <button className="w-full justify-center flex items-center gap-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap">
                  <GiElectric size={24} />Ổ điện bàn Giảng viên
                </button>
              </div>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableBMSMKNBody
