import PropTypes from 'prop-types'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

// eslint-disable-next-line no-unused-vars
import { MdOutlineSevereCold, MdOutlineDoorSliding } from 'react-icons/md'
import { GiComputerFan, GiElectric } from 'react-icons/gi'

import Checkbox from '@mui/material/Checkbox'
import { isEmpty } from 'lodash-unified'
import clsx from 'clsx'

const TblBodyBDKBMS = (props) => {
  const { listDieuKhienBMS, onSelected, isSelected, itemPerPage, currentPage } =
    props

  return (
    <TableBody>
      {listDieuKhienBMS?.length > 0 &&
        listDieuKhienBMS.map((bmsItem, index) => {
          const isItemSelected = isSelected(bmsItem)
          return (
            <TableRow
              key={index}
              role="checkbox"
              hover
              sx={{ borderBottom: '1px solid #ccc', cursor: 'pointer' }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                }}
              >
                {itemPerPage * currentPage + index + 1}
              </TableCell>
              {/* END: Row STT */}
              <TableCell
                component="th"
                scope="row"
                sx={{
                  textAlign: 'center',
                  width: 20,
                  borderRight: '1px solid #ccc',
                }}
              >
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onClick={(event) => onSelected(event, bmsItem)}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              {/* END: Row Checkbox */}
              <TableCell
                sx={{
                  border: 'none',
                  color: 'black',
                  textAlign: 'left',
                  borderRight: '1px solid #ccc',
                  width: 200,
                }}
              >
                <p className="whitespace-nowrap">{bmsItem.ten}</p>
                <p className="whitespace-nowrap">IPAddress: {bmsItem.ipadd}</p>
                <p className="whitespace-nowrap">PORT: {bmsItem.port}</p>
                <p className="whitespace-nowrap">
                  Serinumber:{' '}
                  {!isEmpty(bmsItem.serial.toString())
                    ? bmsItem.serial
                    : 'Không xác định'}
                </p>
              </TableCell>
              {/* END: Row Thông tin thiết bị - Tên */}
              <TableCell
                sx={{
                  border: 'none',
                  color: 'black',
                  textAlign: 'left',
                  borderRight: '1px solid #ccc',
                  width: 200,
                }}
              >
                <p
                  className={clsx(
                    'whitespace-nowrap font-bold',
                    parseInt(bmsItem.trang_thai) === 1
                      ? ' text-green-500'
                      : 'text-red-500',
                  )}
                >
                  {parseInt(bmsItem.trang_thai) === 1
                    ? 'Đang kết nối'
                    : 'Mất kết nối'}
                </p>
              </TableCell>
              {/* END: Row Thống tin thiết bị - Trạng thái kết nối */}
              <TableCell
                sx={{
                  border: 'none',
                  color: 'black',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  width: 120,
                }}
              >
                {bmsItem?.DT_QLP_Phong_CoSo ?? 'Không xác định'}
              </TableCell>
              {/* END: Row Thống tin thiết bị - Cơ sở */}
              <TableCell
                sx={{
                  border: 'none',
                  color: 'black',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  width: 160,
                }}
              >
                {bmsItem?.DT_QLP_Phong_DiaDiem ?? 'Không xác định'}
              </TableCell>
              {/* END: Row Thông tin thiết bị - Địa điểm */}
              <TableCell
                sx={{
                  border: 'none',
                  color: 'black',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  width: 80,
                }}
              >
                {bmsItem?.DT_QLP_Phong_ToaNha ?? 'Không xác định'}
              </TableCell>
              {/* END: Row Thống tin thiết bị - Tòa nhà */}
              <TableCell
                sx={{
                  border: 'none',
                  color: 'black',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  width: 80,
                }}
              >
                {bmsItem?.DT_QLP_Phong_Tang ?? 'Không xác định'}
              </TableCell>
              {/* END: Row Thống tin thiết bị - Tầng */}
              <TableCell
                sx={{
                  border: 'none',
                  color: 'black',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  width: 160,
                }}
              >
                {bmsItem?.DT_QLP_Phong_TenPhong ?? 'Không xác định'}
              </TableCell>
              {/* END: Row Thống tin thiết bị - Phòng */}
              <TableCell
                sx={{
                  border: 'none',
                  color: `${bmsItem?.json_data?.mode === 'auto' ? '#10b981' : '#dc2626'}`,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  width: 120,
                }}
              >
                {bmsItem?.json_data?.mode === 'auto' ? 'Auto' : 'Manual'}
              </TableCell>
              {/* END: Row Thống tin thiết bị - Chế độ hoạt động */}
              <TableCell
                sx={{
                  border: 'none',
                  color: 'black',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  width: 300,
                  padding: 0.6,
                }}
              >
                <table
                  className="border border-slate-100 p-1"
                  cellPadding="4px"
                >
                  <tbody>
                    <tr className="border-b py-1">
                      <td align="left" className="border-r border-slate-100">
                        {bmsItem?.ten_output1 ?? 'Bàn giảng viên & Ổ cắm'}:{' '}
                      </td>
                      <td>
                        <span
                          className={clsx(
                            'font-semibold px-2 whitespace-nowrap',
                            bmsItem?.out1 ? 'text-green-600' : 'text-red-600',
                          )}
                        >
                          {bmsItem?.out1 ? 'Đang bật' : 'Đang tắt'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b py-1">
                      <td align="left" className="border-r border-slate-100">
                        {bmsItem?.ten_output2 ?? 'Quạt & Ánh sáng'}:{' '}
                      </td>
                      <td>
                        <span
                          className={clsx(
                            'font-semibold px-2 whitespace-nowrap',
                            bmsItem?.out2 ? 'text-green-600' : 'text-red-600',
                          )}
                        >
                          {bmsItem?.out2 ? 'Đang bật' : 'Đang tắt'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b py-1">
                      <td align="left" className="border-r border-slate-100">
                        {bmsItem?.ten_output3 ?? 'Điều hòa'}:{' '}
                      </td>
                      <td>
                        <span
                          className={clsx(
                            'font-semibold px-2 whitespace-nowrap',
                            bmsItem?.out3 ? 'text-green-600' : 'text-red-600',
                          )}
                        >
                          {bmsItem?.out3 ? 'Đang bật' : 'Đang tắt'}
                        </span>
                      </td>
                    </tr>
                    {/* <tr className="border-b py-1">
                      <td align="left" className="border-r border-slate-100">
                        {bmsItem?.ten_output4 ?? 'Cửa'}:{' '}
                      </td>
                      <td>
                        <span
                          className={clsx(
                            'font-semibold px-2 whitespace-nowrap',
                            bmsItem?.out4 ? 'text-green-600' : 'text-red-600',
                          )}
                        >
                          {bmsItem?.out4 ? 'Đang bật' : 'Đang tắt'}
                        </span>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </TableCell>
              {/* END: Row Thống tin thiết bị - Trạng thái thiết bị/công tắc */}
              <TableCell
                sx={{
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                }}
              >
                {bmsItem?.temperature
                  ? bmsItem?.temperature + '°C'
                  : 'Không xác định'}
              </TableCell>
              {/* END: Row Thống tin thiết bị - Nhiệt độ */}
              <TableCell sx={{ width: 300 }}>
                <div className="w-full flex flex-wrap">
                  <p
                    className={clsx(
                      'w-full justify-center flex items-center gap-1 text-white focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap',
                      bmsItem?.out1
                        ? 'bg-green-600 border hover:bg-green-500 focus:ring-green-300'
                        : 'bg-red-700 hover:bg-red-500 focus:ring-red-300',
                    )}
                  >
                    <GiElectric size={24} />
                    {bmsItem?.ten_output1 ?? 'Bàn giảng viên & Ổ cắm'}
                  </p>
                  <p
                    className={clsx(
                      'w-full justify-center flex items-center gap-1 text-white focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap',
                      bmsItem?.out2
                        ? 'bg-green-600 border hover:bg-green-500 focus:ring-green-300'
                        : 'bg-red-700 hover:bg-red-500 focus:ring-red-300',
                    )}
                  >
                    <GiComputerFan size={24} />
                    {bmsItem?.ten_output2 ?? 'Quạt & Ánh sáng'}
                  </p>
                  <p
                    className={clsx(
                      'w-full justify-center flex items-center gap-1 text-white focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap',
                      bmsItem?.out3
                        ? 'bg-green-600 border hover:bg-green-500 focus:ring-green-300'
                        : 'bg-red-700 hover:bg-red-500 focus:ring-red-300',
                    )}
                  >
                    <MdOutlineSevereCold size={24} />
                    {bmsItem?.ten_output3 ?? 'Điều hòa'}
                  </p>
                  {/* <p
                    className={clsx(
                      'w-full justify-center flex items-center gap-1 text-white focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap',
                      bmsItem?.out4
                        ? 'bg-green-600 border hover:bg-green-500 focus:ring-green-300'
                        : 'bg-red-700 hover:bg-red-500 focus:ring-red-300',
                    )}
                  >
                    <MdOutlineDoorSliding size={24} />
                    {bmsItem?.ten_output4 ?? 'Cửa'}
                  </p> */}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}
TblBodyBDKBMS.propTypes = {
  listDieuKhienBMS: PropTypes.array,
  onSelected: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
}
export default TblBodyBDKBMS
