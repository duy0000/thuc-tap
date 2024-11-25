import { AirConditionerOn } from '@/Components/Base/Icons/AirConditionerOn'
import { AirConditionerOff } from '@/Components/Base/Icons/AirConditionerOff'
import { ChairTableOfff } from '@/Components/Base/Icons/ChairTableOfff'
import { EnergyWindTurbineOff } from '@/Components/Base/Icons/EnergyWindTurbineOff'
import { Checkbox, IconButton, Tooltip } from '@mui/material'
import { memo } from 'react'
import clsx from 'clsx'
import { EnergyWindTurbineOn } from '@/Components/Base/Icons/EnergyWindTurbineOn'
import { ChairTableOn } from '@/Components/Base/Icons/ChairTableOn'
import CircularProgress from '@mui/material/CircularProgress'
import { dayjs } from '@/Services/Utils'
import { BMS_CONTROLLER_CMD, BMS_OUTPUT_SYSTEM } from '../constants'
import { DataWeather } from '@/Services/Redux/Slice/weatherSlice'
import { enumDiaDiemUNETI } from '@/Configs/constants'

export const TableBody = memo(function TableBody({
  isLoading,
  listBMSController,
  currentPage,
  itemPerPage,
  isSelected,
  onSelect,
  onTurnSingleOutputDevicesBMS,
}) {
  const { currentWeather } = DataWeather()

  return (
    <tbody>
      {listBMSController && listBMSController?.length > 0 ? (
        listBMSController.map((bms, index) => {
          const isItemSelected = isSelected(bms.ipadd)
          const is218LinhNam =
            bms?.DT_QLP_Phong_DiaDiem === enumDiaDiemUNETI.CS_218LinhNam
          const is353TranHungDao =
            bms?.DT_QLP_Phong_DiaDiem === enumDiaDiemUNETI.CS_353TranHungDao
          const is454MinhKhai =
            bms?.DT_QLP_Phong_DiaDiem === enumDiaDiemUNETI.CS_454MinhKhai

          // START: Lịch học
          const _lichHocTiet =
            bms?.lich_hoc && bms?.lich_hoc?.length > 0
              ? bms.lich_hoc.map((lh) => lh.TuTietDenTiet).join('; ')
              : '---'
          const _lichHocGiangVien =
            bms?.lich_hoc && bms?.lich_hoc?.length > 0
              ? bms.lich_hoc.map((lh) => lh.HoTen)
              : []
          const _lichHocSiSo =
            bms?.lich_hoc && bms?.lich_hoc?.length > 0
              ? bms.lich_hoc.map((lh) => lh.SiSo).join('; ')
              : '---'
          // END: Lịch học

          // START: Lịch thi
          const _lichThiTiet =
            bms?.lich_thi && bms?.lich_thi?.length > 0
              ? bms.lich_thi.map((lt) => lt.TuTietDenTiet).join('; ')
              : '---'
          const _lichThiGiangVien =
            bms?.lich_thi && bms?.lich_thi?.length > 0
              ? bms.lich_thi.map((lt) => lt.HoTen).join('; ')
              : '---'
          const _lichThiSiSo =
            bms?.lich_thi && bms?.lich_thi?.length > 0
              ? bms.lich_thi.map((lt) => lt.SiSo).join('; ')
              : '---'
          // END: Lịch thi

          return (
            <tr
              className={clsx(
                'border',
                index % 2 === 0 ? 'bg-slate-100' : 'bg-white',
              )}
              key={index}
            >
              <th className="border-r p-1 text-center">
                {currentPage * itemPerPage + index + 1}
              </th>
              <td className="border-r p-1 text-center">
                <Checkbox
                  checked={isItemSelected}
                  onClick={(event) => onSelect(event, bms)}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </td>
              <td className="border-r p-1">
                <table className="w-full">
                  <tbody>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        Phòng học
                      </td>
                      <td className="px-2 py-1 border-r font-bold whitespace-nowrap">
                        {bms?.DT_QLP_Phong_TenPhong}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        Cơ sở
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        {bms?.DT_QLP_Phong_CoSo}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        Địa điểm
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        {bms?.DT_QLP_Phong_DiaDiem}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        Tòa nhà
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        {bms?.DT_QLP_Phong_ToaNha}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        Tầng
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        {bms?.DT_QLP_Phong_Tang}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="border-r p-1">
                <table className="w-full">
                  <tbody>
                    <tr className="border">
                      <td
                        colSpan={2}
                        className="px-2 py-1 border-r whitespace-nowrap text-center font-bold"
                      >
                        Lịch chi tiết
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap w-[100px]">
                        Lịch học
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap w-[100px]">
                        Lịch thi
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r">
                        <span>Tiết: </span>
                        <span className="text-[12px]">{_lichHocTiet}</span>
                      </td>
                      <td className="px-2 py-1 border-r">
                        <span>Tiết: </span>
                        <span className="text-[12px]">{_lichThiTiet}</span>
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r w-40">
                        {_lichHocGiangVien?.length > 0
                          ? _lichHocGiangVien.map((gv, index) => {
                              return (
                                <p key={index} className="text-[12px]">
                                  - {gv}
                                </p>
                              )
                            })
                          : '---'}
                      </td>
                      <td className="px-2 py-1 border-r w-40">
                        {_lichThiGiangVien}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        <span>Sĩ số: </span>
                        {_lichHocSiSo}
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        <span>Sĩ số: </span>
                        {_lichThiSiSo}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              {/* Lịch sử dụng phòng */}
              <td className="border-r p-2">
                <p className="text-center">
                  <span
                    className={clsx(
                      'py-1 px-2 rounded-xl text-white',
                      bms?.trang_thai === 1 ? 'bg-green-600' : 'bg-red-600',
                    )}
                  >
                    {bms?.trang_thai === 1 ? 'Đang kết nối' : 'Mất kết nối'}
                  </span>
                </p>
                {!bms?.trang_thai_lenh && (
                  <table className="border my-2">
                    <tbody>
                      <tr className="border-b">
                        <td colSpan={2} className="border p-1">
                          <p className="bg-red-600 text-white p-2 font-semibold text-center whitespace-nowrap">
                            <span>Đang có lệnh thực thi.</span>
                            <br />
                            <span>
                              Vui lòng chờ để thao tác lệnh tiếp theo!
                            </span>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-1">Người thực thi: </td>
                        <td className="border p-1 text-cyan-600 font-semibold">
                          {bms?.nguoi_thuc_hien}
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-1">Lệnh thực thi: </td>
                        <td className="border p-1">{bms?.loai_lenh}</td>
                      </tr>
                      <tr>
                        <td className="border p-1">Công tắc thao tác: </td>
                        <td className="border p-1">
                          {/* {generateOutputLabel(bms?.du_lieu_lenh?.output)} */}
                          Điều hòa
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-1">Ngày thực thi: </td>
                        <td className="border p-1">
                          {bms?.ngay_thuc_hien &&
                            dayjs(bms?.ngay_thuc_hien).format(
                              'DD/MM/YYYY HH:mm',
                            )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </td>
              <td className="border-r p-1 text-center">
                <p
                  className={clsx(
                    'py-1 px-2 rounded-xl font-semibold',
                    bms?.in8 === 1 ? 'text-green-600' : 'text-red-600',
                  )}
                >
                  {bms?.in8 === 1 ? 'Đang có nguồn điện' : 'Mất nguồn điện'}
                </p>
              </td>
              <td className="border-r p-1 text-center">
                <p
                  className={clsx(
                    'py-1 px-2 rounded-xl font-semibold capitalize',
                    bms?.mode === 'auto' ? 'text-green-600' : 'text-red-600',
                  )}
                >
                  {bms?.mode}
                </p>
              </td>
              {/* Chế độ hoạt động BMS */}
              <td className="border-r p-1 text-center">
                <p className="py-1 px-2 rounded-xl text-gray-900 font-semibold">
                  <span>
                    {bms?.date_bms &&
                      dayjs(bms?.date_bms).utc().format('HH:mm')}
                  </span>
                  <br />
                  <span>
                    {bms?.date_bms &&
                      dayjs(bms?.date_bms).utc().format('DD/MM/YYYY')}
                  </span>
                </p>
              </td>
              {/*  */}
              <td className="border-r p-1 text-center">
                <p className="py-1 px-2 rounded-xl text-cyan-700 font-semibold whitespace-nowrap">
                  {bms?.temperature}°C /{' '}
                  {`${is218LinhNam ? currentWeather.Linh_Nam.currentTemperature : is353TranHungDao ? currentWeather.Tran_Hung_Dao.currentTemperature : is454MinhKhai ? currentWeather.Minh_Khai.currentTemperature : '---'}`}
                  °C
                </p>
                <p className=" whitespace-nowrap">
                  <span>MIN: {bms?.min_temp ?? '---'}°C</span>
                  <br />
                  <span>MAX: {bms?.max_temp ?? '---'}°C</span>
                </p>
              </td>
              {/* END: Nhiệt độ */}
              <td className="border-r p-1">
                <table className="w-full">
                  <tbody>
                    <tr className="border">
                      <td
                        colSpan={2}
                        className="px-2 py-1 border-r whitespace-nowrap text-center font-bold"
                      >
                        Bảng điều khiển BMS
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        Service
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        {bms?.syn_service}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        IPAddress
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        {bms?.ipadd}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        PORT
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        {bms?.port}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        Serinumber
                      </td>
                      <td className="px-2 py-1 border-r whitespace-nowrap">
                        {bms?.serial}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              {/* Tên thiết bị */}
              <td className="border-r h-full p-1 text-center whitespace-nowrap">
                <Tooltip
                  disableTouchListener={isLoading}
                  disableFocusListener={isLoading}
                  title={`${bms?.ten_output1 ? '(1) - ' + bms?.ten_output1 : '(1) - Bàn GV & Ổ cắm'} đang ${bms?.out1 === 1 ? 'bật' : 'tắt'}`}
                  style={{
                    border:
                      bms?.out1 === 1 ? '1px solid green' : '1px solid red',
                    marginRight: '4px',
                    backgroundColor: bms?.out1 === 1 ? '#4ade80' : '#ef4444',
                    borderRadius: 99,
                    width: 42,
                    height: 42,
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <IconButton
                      disabled={isLoading}
                      disableFocusRipple={isLoading}
                      disableRipple={isLoading}
                      disableTouchRipple={isLoading}
                      onClick={() => {
                        let _turnMode =
                          bms?.out1 === 1
                            ? BMS_CONTROLLER_CMD.SET_OFF
                            : BMS_CONTROLLER_CMD.SET_ON
                        onTurnSingleOutputDevicesBMS &&
                          onTurnSingleOutputDevicesBMS(
                            _turnMode,
                            bms,
                            BMS_OUTPUT_SYSTEM.OUTPUT_1,
                          )
                      }}
                    >
                      {bms?.out1 === 1 ? <ChairTableOn /> : <ChairTableOfff />}
                    </IconButton>
                  )}
                </Tooltip>
                <Tooltip
                  disableTouchListener={isLoading}
                  disableFocusListener={isLoading}
                  title={`${bms?.ten_output2 ? '(2) - ' + bms?.ten_output2 : '(2) - Quạt & Ánh sáng'} đang ${bms?.out2 === 1 ? 'bật' : 'tắt'}`}
                  style={{
                    border:
                      bms?.out2 === 1 ? '1px solid green' : '1px solid red',
                    marginRight: '4px',
                    backgroundColor: bms?.out2 === 1 ? '#4ade80' : '#ef4444',
                    borderRadius: 99,
                    width: 42,
                    height: 42,
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <IconButton
                      onClick={() => {
                        let _turnMode =
                          bms?.out2 === 1
                            ? BMS_CONTROLLER_CMD.SET_OFF
                            : BMS_CONTROLLER_CMD.SET_ON
                        onTurnSingleOutputDevicesBMS &&
                          onTurnSingleOutputDevicesBMS(
                            _turnMode,
                            bms,
                            BMS_OUTPUT_SYSTEM.OUTPUT_2,
                          )
                      }}
                    >
                      {bms?.out2 === 1 ? (
                        <EnergyWindTurbineOn />
                      ) : (
                        <EnergyWindTurbineOff />
                      )}
                    </IconButton>
                  )}
                </Tooltip>
                <Tooltip
                  disableTouchListener={isLoading}
                  disableFocusListener={isLoading}
                  title={`${bms?.ten_output3 ? '(3) - ' + bms?.ten_output3 : '(3) - Điều hòa'} đang ${bms?.out3 === 1 ? 'bật' : 'tắt'}`}
                  style={{
                    border:
                      bms?.out3 === 1 ? '1px solid green' : '1px solid red',
                    marginRight: '4px',
                    backgroundColor: bms?.out3 === 1 ? '#4ade80' : '#ef4444',
                    borderRadius: 99,
                    width: 42,
                    height: 42,
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <IconButton
                      onClick={() => {
                        let _turnMode =
                          bms?.out3 === 1
                            ? BMS_CONTROLLER_CMD.SET_OFF
                            : BMS_CONTROLLER_CMD.SET_ON
                        onTurnSingleOutputDevicesBMS &&
                          onTurnSingleOutputDevicesBMS(
                            _turnMode,
                            bms,
                            BMS_OUTPUT_SYSTEM.OUTPUT_3,
                          )
                      }}
                    >
                      {bms?.out3 === 1 ? (
                        <AirConditionerOn />
                      ) : (
                        <AirConditionerOff />
                      )}
                    </IconButton>
                  )}
                </Tooltip>
              </td>
            </tr>
          )
        })
      ) : (
        <tr>
          <td
            colSpan={10}
            className="text-center lg:text-lg px-2 py-6 text-red-600 font-semibold"
          >
            Không có dữ liệu BMS!
          </td>
        </tr>
      )}
    </tbody>
  )
})
