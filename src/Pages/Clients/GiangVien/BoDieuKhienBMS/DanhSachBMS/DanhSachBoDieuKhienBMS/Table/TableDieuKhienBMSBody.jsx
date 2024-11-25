/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { MdOutlineSevereCold, MdOutlineDoorSliding } from 'react-icons/md'
import { GiComputerFan, GiElectric } from 'react-icons/gi'

import Checkbox from '@mui/material/Checkbox'
import { isEmpty } from 'lodash-unified'
import clsx from 'clsx'
import {
  useGetAllBMSQuery,
  useTurnOffAllBMSMutation,
  useTurnOnAllBMSMutation,
  useUpdateOutputBMSMutation,
} from '../../../BoDieuKhienBMSReduxAPI/remoteControllBMS.service'
import { toast } from 'react-toastify'
import { ID_OUTPUT_BMS } from '../../../constants'
import Swal from 'sweetalert2'
// import { useTurnOnAllBMSMutation } from '../../../BoDieuKhienBMSReduxAPI/remoteControllBMS.service'

const TableDieuKhienBMSBody = (props) => {
  const {
    listDieuKhienBMS,
    onSelected,
    isSelected,
    itemPerPage,
    currentPage,
    onIsHandling,
  } = props
  const [turnOnAllBMS, { isLoading: isTurnOnAll }] = useTurnOnAllBMSMutation()
  const [turnOffAllBMS, { isLoading: isTurnOffAll }] =
    useTurnOffAllBMSMutation()
  const [updateOutputBMS, { isLoading: isUpdatingOutputBMS }] =
    useUpdateOutputBMSMutation()
  // event: Tắt 1 cổng output của thiết bị BMS
  const handleTurnOffOneOutputBMS = async (
    data = {
      ipadd: '',
      idout: '',
      ten: '',
      output: '',
      syn_service: '',
    },
  ) => {
    onIsHandling(true)
    // .unwrap()
    turnOffAllBMS([
      {
        idcmd: 'set_off',
        ipadd: data.ipadd,
        output: data.output,
        syn_status: '0',
        syn_service: data.syn_service,
      },
    ])
      .then((res) => {
        onIsHandling(false)
        if (res.data.status === 200)
          Swal.fire(
            // `Thiết bị điều khiển ${data.ten} có IP: ${data.ipadd} đã được tắt`,
            {
              icon: 'success',
              title: 'Thông báo',
              text: `Thiết bị điều khiển ${data.ten} có IP: ${data.ipadd} đã được tắt`,
              timer: 3000,
            },
          )
        return
      })
      .catch((error) => {
        console.log(error)
        onIsHandling(false)
        return toast.error(error.data.data[0].additionalMessage)
      })
      .finally(() => {
        onIsHandling(false)
      })
    updateOutputBMS({
      ipadd: data.ipadd,
      idout: data.idout,
      ten: data.ten,
      trang_thai: 0,
    })
  }

  // event: Bật 1 cổng output của thiết bị BMS
  const handleTurnOnOneOutputBMS = async (
    data = { ipadd: '', idout: '', ten: '', output: '', syn_service: '' },
  ) => {
    onIsHandling(true)
    // .unwrap()
    turnOnAllBMS([
      {
        idcmd: 'set_on',
        ipadd: data.ipadd,
        output: data.output,
        syn_status: '0',
        syn_service: data.syn_service,
      },
    ])
      .then(() => {
        onIsHandling(false)
        Swal.fire({
          icon: 'success',
          title: 'Thông báo',
          text: `Thiết bị điều khiển ${data.ten} có IP: ${data.ipadd} đã được bật`,
          timer: 3000,
        })
        return
      })
      .catch((error) => {
        console.log(error)
        onIsHandling(false)
      })
      .finally(() => {
        onIsHandling(false)
      })

    updateOutputBMS({
      ipadd: data.ipadd,
      idout: data.idout,
      ten: data.ten,
      trang_thai: 1,
    })
  }

  return (
    <TableBody>
      {listDieuKhienBMS?.length > 0 &&
        listDieuKhienBMS.map((bmsItem, index) => {
          const isItemSelected = isSelected(bmsItem.ipadd)
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
                  // display: 'none',
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
                  // display: 'none',
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
                  // display: 'none',
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
                  // display: 'none',
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
                  // display: 'none',
                }}
              >
                {bmsItem?.DT_QLP_Phong_TenPhong ?? 'Không xác định'}
              </TableCell>
              {/* END: Row Thống tin thiết bị - Phòng */}
              <TableCell
                sx={{
                  border: 'none',
                  color: `${bmsItem?.mode?.toLowerCase() === 'auto' ? '#10b981' : '#dc2626'}`,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRight: '1px solid #ccc',
                  width: 120,
                }}
              >
                {bmsItem?.mode?.toLowerCase() === 'auto' ? 'Auto' : 'Manual'}
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
                    <tr className="hidden border-b py-1">
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
                    </tr>
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
                  <button
                    className={clsx(
                      'w-full justify-center flex items-center gap-1 text-white focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap',
                      bmsItem?.out1
                        ? 'bg-green-600 border hover:bg-green-500 focus:ring-green-300'
                        : 'bg-red-700 hover:bg-red-500 focus:ring-red-300',
                    )}
                    onClick={() => {
                      if (bmsItem?.out1 === 1) {
                        handleTurnOffOneOutputBMS({
                          ipadd: bmsItem.ipadd,
                          idout: ID_OUTPUT_BMS.output1,
                          ten: bmsItem.ten_output1,
                          output: ID_OUTPUT_BMS.output1,
                          syn_service: bmsItem.syn_service,
                        })
                      } else {
                        handleTurnOnOneOutputBMS({
                          ipadd: bmsItem.ipadd,
                          idout: ID_OUTPUT_BMS.output1,
                          ten: bmsItem.ten_output1,
                          output: ID_OUTPUT_BMS.output1,
                          syn_service: bmsItem.syn_service,
                        })
                      }
                    }}
                  >
                    <GiElectric size={24} />
                    {bmsItem?.ten_output1 ?? 'Bàn giảng viên & Ổ cắm'}
                  </button>
                  <button
                    className={clsx(
                      'w-full justify-center flex items-center gap-1 text-white focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap',
                      bmsItem?.out2
                        ? 'bg-green-600 border hover:bg-green-500 focus:ring-green-300'
                        : 'bg-red-700 hover:bg-red-500 focus:ring-red-300',
                    )}
                    onClick={() => {
                      if (bmsItem?.out2 === 1) {
                        handleTurnOffOneOutputBMS({
                          ipadd: bmsItem.ipadd,
                          idout: ID_OUTPUT_BMS.output2,
                          ten: bmsItem.ten_output2,
                          output: ID_OUTPUT_BMS.output2,
                          syn_service: bmsItem.syn_service,
                        })
                      } else {
                        handleTurnOnOneOutputBMS({
                          ipadd: bmsItem.ipadd,
                          idout: ID_OUTPUT_BMS.output2,
                          ten: bmsItem.ten_output2,
                          output: ID_OUTPUT_BMS.output2,
                          syn_service: bmsItem.syn_service,
                        })
                      }
                    }}
                  >
                    <GiComputerFan size={24} />
                    {bmsItem?.ten_output2 ?? 'Quạt & Ánh sáng'}
                  </button>
                  <button
                    className={clsx(
                      'w-full justify-center flex items-center gap-1 text-white focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap',
                      bmsItem?.out3
                        ? 'bg-green-600 border hover:bg-green-500 focus:ring-green-300'
                        : 'bg-red-700 hover:bg-red-500 focus:ring-red-300',
                    )}
                    onClick={() => {
                      if (bmsItem?.out3 === 1) {
                        handleTurnOffOneOutputBMS({
                          ipadd: bmsItem.ipadd,
                          idout: ID_OUTPUT_BMS.output3,
                          ten: bmsItem.ten_output3,
                          output: ID_OUTPUT_BMS.output3,
                          syn_service: bmsItem.syn_service,
                        })
                      } else {
                        handleTurnOnOneOutputBMS({
                          ipadd: bmsItem.ipadd,
                          idout: ID_OUTPUT_BMS.output3,
                          ten: bmsItem.ten_output3,
                          output: ID_OUTPUT_BMS.output3,
                          syn_service: bmsItem.syn_service,
                        })
                      }
                    }}
                  >
                    <MdOutlineSevereCold size={24} />
                    {bmsItem?.ten_output3 ?? 'Điều hòa'}
                  </button>
                  <button
                    className={clsx(
                      'hidden w-full justify-center items-center gap-1 text-white focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none whitespace-nowrap',
                      bmsItem?.out4
                        ? 'bg-green-600 border hover:bg-green-500 focus:ring-green-300'
                        : 'bg-red-700 hover:bg-red-500 focus:ring-red-300',
                    )}
                    onClick={() => {
                      if (bmsItem?.out4 === 1) {
                        handleTurnOffOneOutputBMS({
                          ipadd: bmsItem.ipadd,
                          idout: ID_OUTPUT_BMS.output4,
                          ten: bmsItem.ten_output4,
                          output: ID_OUTPUT_BMS.output4,
                          syn_service: bmsItem.syn_service,
                        })
                      } else {
                        handleTurnOnOneOutputBMS({
                          ipadd: bmsItem.ipadd,
                          idout: ID_OUTPUT_BMS.output4,
                          ten: bmsItem.ten_output4,
                          output: ID_OUTPUT_BMS.output4,
                          syn_service: bmsItem.syn_service,
                        })
                      }
                    }}
                  >
                    <MdOutlineDoorSliding size={24} />
                    {bmsItem?.ten_output4 ?? 'Cửa'}
                  </button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}
TableDieuKhienBMSBody.propTypes = {
  listDieuKhienBMS: PropTypes.array,
  onSelected: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
}
export default TableDieuKhienBMSBody
