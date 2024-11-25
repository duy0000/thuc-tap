/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { FaPowerOff } from 'react-icons/fa6'
import { MdOutlineMotionPhotosAuto } from 'react-icons/md'
import { RxUpdate } from 'react-icons/rx'
import { IoSettingsOutline, IoClose } from 'react-icons/io5'
import { AiFillMediumCircle } from 'react-icons/ai'
import { Formik } from 'formik'
import clsx from 'clsx'
import TableDieuKhienBMS from './Table'
import Swal from 'sweetalert2'
import tempValidationBMS from './ruleSetupTemperatureAirConditioners'
import { useEffect, useState } from 'react'
import { useSetupTemperatureBMSMutation } from '../../BoDieuKhienBMSReduxAPI/remoteControllBMS.service'
import Loading from '@/Components/Loading/Loading'

const initialTemperatureData = {
  idcmd: 'set_temperature',
  min_temp: '',
  max_temp: '',
}

const DanhSachBoDieuKhienBMSView = (props) => {
  const {
    isLoading,
    isHandling,
    visiableFormSetupCommon,
    visiableFormOperatingMode,
    visiableFormAirTemper,
    isAction,
    setIsAction,
    onShowOperatingMode,
    onHideOperatingMode,
    onHideAllForm,
    onShowOnOffDevices,
    onHideOnOffDevices,
    onShowAirTemper,
    onHideAirTemper,
    onSelectAllClick,
    onClickSelect,
    onSetSelected,
    dataSelected,
    isSelected,
    onActiveModeAuto,
    onActiveModeManual,
    onSyncTimeRemoteBMS,
    onTurnOnAllOutputBMS,
    onTurnOffAllOutputBMS,
    // event: bật - tắt điều hòa
    onTurnOnMultipleAirConditioners,
    onTurnOffMultipleAirConditioners,
    // event: bật - tắt công tắc bàn GV & ổ cắm
    onTurnOnMultipleDeskAndSocket,
    onTurnOffMultipleDeskAndSocket,
    // event: bật - tắt quạt & ánh sáng
    onTurnOnMultipleFanAndLights,
    onTurnOffMultipleFanAndLights,
    // event: bật - tắt công tắc cửa
    onTurnOnMultipleDoors,
    onTurnOffMultipleDoors,
    numSelected,
    // isFetchingBMS,
    // isError,
    // error,
    listDieuKhienBMS,
    valueColumnFilters,
    valueItemPerPage,
    valueCurrentPage,
    onChangeValueFilter,
    onClearFilter,
    onChangePage,
    onChangeItemPerPage,
    onIsHandling,
  } = props

  const [formSetupTemperature, setFormSetupTemperature] = useState(
    initialTemperatureData,
  )

  const [setupTemperatureBMS, result] = useSetupTemperatureBMSMutation()

  return (
    <section id="list__bo-dieu-khien-BMS" className="my-10">
      <span className="border-b-2 border-gray-700 pb-1 text-lg lg:text-xl font-semibold">
        Danh sách thiết bị điều khiển thủ công:
      </span>
      {isHandling && (
        <div className="fixed top-0 left-0 bottom-0 w-full h-full bg-gray-400/50 z-50">
          <Loading />
        </div>
      )}
      {/* END: heading */}
      <div className="flex items-center flex-wrap gap-2 my-6">
        <button
          type="button"
          onClick={() => {
            onShowOperatingMode()
            setIsAction('operating-mode')
          }}
          className={clsx(
            'w-full md:w-fit font-medium flex items-center justify-center gap-1 cursor-pointer text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white p-2 rounded-lg hover:opacity-70',
            isAction === 'operating-mode' && 'bg-blue-600 text-white',
          )}
        >
          <IoSettingsOutline />
          Chọn chế độ hoạt động
        </button>
        <button
          type="button"
          onClick={() => {
            onTurnOnAllOutputBMS()
            onHideAllForm()
          }}
          className="w-full md:w-fit flex items-center justify-center gap-1 cursor-pointer text-center border border-green-600 text-green-600 hover:bg-green-600 hover:text-white p-2 rounded-lg hover:opacity-70"
        >
          <FaPowerOff />
          Bật tất cả thiết bị được chọn
        </button>
        <button
          type="button"
          onClick={() => {
            onTurnOffAllOutputBMS()
            onHideAllForm()
          }}
          className="w-full md:w-fit flex items-center justify-center gap-1 cursor-pointer text-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg hover:opacity-70"
        >
          <FaPowerOff />
          Tắt tất cả thiết bị được chọn
        </button>
        <button
          type="button"
          onClick={() => {
            onSyncTimeRemoteBMS()
            onHideAllForm()
          }}
          className="w-full md:w-fit flex items-center justify-center gap-1 cursor-pointer text-center border border-teal-400 text-teal-600 hover:bg-teal-600 hover:text-white p-2 rounded-lg hover:opacity-70"
        >
          <RxUpdate />
          Đồng bộ thời gian
        </button>
        <button
          type="button"
          onClick={() => {
            onShowOnOffDevices()
            setIsAction('turn-multiple-devices')
          }}
          className={clsx(
            'w-full md:w-fit flex items-center justify-center gap-1 cursor-pointer text-center border border-cyan-600  hover:bg-cyan-600 hover:text-white p-2 rounded-lg hover:opacity-70',
            isAction === 'turn-multiple-devices'
              ? 'bg-cyan-600 text-white'
              : 'text-cyan-600',
          )}
        >
          <FaPowerOff />
          Bật/Tắt: N thiết bị/ N phòng
        </button>
        <button
          type="button"
          onClick={() => {
            onShowAirTemper()
            setIsAction('air-conditioning-temperature')
          }}
          className={clsx(
            'w-full md:w-fit flex items-center justify-center gap-1 cursor-pointer text-center border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white p-2 rounded-lg hover:opacity-70',
            isAction === 'air-conditioning-temperature' &&
              'bg-orange-600 text-white',
          )}
        >
          <IoSettingsOutline />
          Thiết lập nhiệt độ bật điều hòa
        </button>
      </div>
      {/* END: Tác vụ điều khiển chung */}
      <div
        className={clsx(
          'w-full lg:w-3/6 flex items-center justify-start flex-wrap gap-4 border rounded-lg p-6 relative top-0 left-0',
          !visiableFormOperatingMode && 'hidden',
        )}
      >
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={onActiveModeAuto}
            className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-teal-500 border border-teal-500 hover:opacity-80 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            <MdOutlineMotionPhotosAuto size={24} />
            Auto
          </button>
          <button
            type="button"
            onClick={onActiveModeManual}
            className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-sky-500 border border-sky-500 hover:opacity-80 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            <AiFillMediumCircle size={24} />
            Manual
          </button>
        </div>

        <label
          htmlFor=""
          onClick={onHideOperatingMode}
          className="absolute top-0 lg:top-2 right-0 lg:right-2 w-8 h-8 shadow-md rounded-full bg-slate-50 hover:bg-red-200 flex items-center justify-around cursor-pointer hover:text-red-600"
        >
          <IoClose />
        </label>
      </div>
      {/* END: Chọn chế độ hoạt động */}
      <div
        className={clsx(
          'w-full lg:w-3/6 flex items-center justify-start flex-wrap gap-4 border rounded-lg p-6 relative top-0 left-0',
          !visiableFormSetupCommon && 'hidden',
        )}
      >
        <div className="flex items-center flex-wrap gap-2">
          <button
            type="button"
            onClick={onTurnOnMultipleDeskAndSocket}
            className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-cyan-700 border border-cyan-700 hover:opacity-80 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            Bật Bàn giảng viên & Ổ cắm
          </button>
          <button
            type="button"
            onClick={onTurnOnMultipleDoors}
            className="w-full md:w-max hidden items-center justify-center gap-1 text-white bg-cyan-700 border border-cyan-700 hover:opacity-80 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            Bật cửa
          </button>
          <button
            type="button"
            onClick={onTurnOnMultipleFanAndLights}
            className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-cyan-700 border border-cyan-700 hover:opacity-80 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            Bật Quạt & Ánh sáng
          </button>

          <button
            type="button"
            onClick={onTurnOnMultipleAirConditioners}
            className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-cyan-700 border border-cyan-700 hover:opacity-80 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            Bật điều hòa
          </button>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <button
            type="button"
            onClick={onTurnOffMultipleDeskAndSocket}
            className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-red-700 border border-red-700 hover:opacity-80 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            Tắt Bàn giảng viên & Ổ cắm
          </button>
          <button
            type="button"
            onClick={onTurnOffMultipleDoors}
            className="w-full md:w-max hidden items-center justify-center gap-1 text-white bg-red-700 border border-red-700 hover:opacity-80 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            Tắt cửa
          </button>
          <button
            type="button"
            onClick={onTurnOffMultipleFanAndLights}
            className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-red-700 border border-red-700 hover:opacity-80 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            Tắt Quạt & Ánh sáng
          </button>

          <button
            type="button"
            onClick={onTurnOffMultipleAirConditioners}
            className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-red-700 border border-red-700 hover:opacity-80 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
          >
            Tắt điều hòa
          </button>
        </div>

        <label
          htmlFor=""
          onClick={onHideOnOffDevices}
          className="absolute top-0 lg:top-2 right-0 lg:right-2 w-8 h-8 shadow-md rounded-full bg-slate-50 hover:bg-red-200 flex items-center justify-around cursor-pointer hover:text-red-600"
        >
          <IoClose />
        </label>
      </div>
      {/* END: Bật/Tắt: N Thiết bị/N Phòng */}
      <div
        className={clsx(
          'w-full flex items-center justify-start flex-wrap gap-4 border rounded-lg p-6 relative top-0 left-0',
          !visiableFormAirTemper && 'hidden',
        )}
      >
        <Formik
          initialValues={formSetupTemperature}
          validationSchema={tempValidationBMS}
          onReset={() => setFormSetupTemperature(initialTemperatureData)}
          onSubmit={async (values) => {
            if (dataSelected.length === 0) {
              return Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng chọn ít nhất 1 thiết bị BMS để thiết lập nhiệt độ!',
              })
            }

            const checkBMSDisconnect = dataSelected.some(
              (item) => item?.trang_thai === 0,
            )

            if (checkBMSDisconnect) {
              Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng chỉ chọn thiết bị BMS không mất kết nối!',
              })
              return
            }

            // console.log(checkBMSDisconnect)
            // return

            onIsHandling(true)
            const newDataSelected = dataSelected.map((item) => ({
              ipadd: item.ipadd,
              syn_status: '0',
              syn_service: item.syn_service.toString(),
              ...values,
            }))

            // .unwrap()
            setupTemperatureBMS(newDataSelected)
              .then((payload) => {
                if (payload.data.status === 200) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Thông báo!',
                    // text: `Đã thiết lập nhiệt độ của ${dataSelected.length} thiết bị BMS thành công`,
                    text:
                      payload.data.data[0].additionalMessage ??
                      `Đã thiết lập nhiệt độ của ${dataSelected.length} thiết bị BMS thành công`,
                  })
                  return
                }
              })
              .catch((error) => {
                console.error('rejected', error)
                onIsHandling(false)
              })
              .finally(() => {
                onIsHandling(false)
              })
            onSetSelected([])
            onHideAllForm(true)
            setFormSetupTemperature({
              ...initialTemperatureData,
              max_temp: '',
              min_temp: '',
            })
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isSubmitting,
          }) => {
            return (
              <form
                className="w-full flex flex-col gap-2 lg:pr-6"
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                <div className="w-full flex gap-2">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="min_temp">
                      Nhiệt độ tối thiểu để bật điều hòa:{' '}
                    </label>
                    <input
                      type="number"
                      name="min_temp"
                      id="min_temp"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.min_temp}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.min_temp && (
                      <p className="text-red-500 text-xs italic">
                        {errors.min_temp}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2">
                    <label htmlFor="max_temp">
                      Nhiệt độ tối đa để bật điều hòa:{' '}
                    </label>
                    <input
                      type="number"
                      name="max_temp"
                      id="max_temp"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.max_temp}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.max_temp && (
                      <p className="text-red-500 text-xs italic">
                        {errors.max_temp}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full flex items-center gap-2">
                  <button
                    type="reset"
                    className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-red-600 border border-red-600 hover:opacity-80 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-green-700 border border-green-700 hover:opacity-80 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
                  >
                    {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </div>
              </form>
            )
          }}
        </Formik>

        <label
          htmlFor=""
          onClick={onHideAirTemper}
          className="absolute top-0 lg:top-2 right-0 lg:right-2 w-8 h-8 shadow-md rounded-full bg-slate-50 hover:bg-red-200 flex items-center justify-around cursor-pointer hover:text-red-600"
        >
          <IoClose />
        </label>
      </div>
      {/* END: Thiết lập nhiệt độ điều hòa */}

      {/* START: Danh sách điểu khiển BMS */}
      <div className="my-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <TableDieuKhienBMS
            listDieuKhienBMS={listDieuKhienBMS}
            numSelected={numSelected}
            rowCount={listDieuKhienBMS?.length ?? 0}
            onSelectAllClick={onSelectAllClick}
            onSelected={onClickSelect}
            isSelected={isSelected}
            onIsHandling={onIsHandling}
            valueColumnFilters={valueColumnFilters}
            valueItemPerPage={valueItemPerPage}
            valueCurrentPage={valueCurrentPage}
            onChangeValueFilter={onChangeValueFilter}
            onClearFilter={onClearFilter}
            onChangePage={onChangePage}
            onChangeItemPerPage={onChangeItemPerPage}
          />
        </div>
      </div>
      {/* END: Danh sách điểu khiển BMS */}
    </section>
  )
}

DanhSachBoDieuKhienBMSView.propTypes = {
  isLoading: PropTypes.bool,
  visiableFormSetupCommon: PropTypes.bool,
  isAction: PropTypes.string,
  setIsAction: PropTypes.func,
  // event: Hiện form chọn chế độ hoạt động
  onShowOperatingMode: PropTypes.func,
  // event: Ẩn form chọn chế độ hoạt động
  onHideOperatingMode: PropTypes.func,
  // event: Ẩn tất cả form
  onHideAllForm: PropTypes.func,
  // event: Hiện form bật/tắt N thiết bị / N phòng
  onShowOnOffDevices: PropTypes.func,
  // event: Ẩn form bật/tắt N thiết bị / N phòng
  onHideOnOffDevices: PropTypes.func,
  // event: Hiện form đặt nhiệt độ
  onShowAirTemper: PropTypes.func,
  // event: Ẩn form đặt nhiệt độ
  onHideAirTemper: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  onClickSelect: PropTypes.func,
  onSetSelected: PropTypes.func,
  isSelected: PropTypes.func,
  // event: chọn chế độ hoạt động AUTO
  onActiveModeAuto: PropTypes.func,
  // event: chọn chế độ hoạt động MANUAL
  onActiveModeManual: PropTypes.func,
  // event: đồng bộ thời gian
  onSyncTimeRemoteBMS: PropTypes.func,
  // event: bật tất cả công tắc trên thiết bị BMS
  onTurnOnAllOutputBMS: PropTypes.func,
  // event: tắt tất cả công tắc trên thiết bị BMS
  onTurnOffAllOutputBMS: PropTypes.func,
  // event: bật - tắt điều hòa
  onTurnOnMultipleAirConditioners: PropTypes.func,
  onTurnOffMultipleAirConditioners: PropTypes.func,
  // event: bật - tắt công tắc bàn GV & ổ cắm
  onTurnOnMultipleDeskAndSocket: PropTypes.func,
  onTurnOffMultipleDeskAndSocket: PropTypes.func,
  // event: bật - tắt quạt & ánh sáng
  onTurnOnMultipleFanAndLights: PropTypes.func,
  onTurnOffMultipleFanAndLights: PropTypes.func,
  // event: bật - tắt công tắc cửa
  onTurnOnMultipleDoors: PropTypes.func,
  onTurnOffMultipleDoors: PropTypes.func,
  numSelected: PropTypes.number,
  dataSelected: PropTypes.array,
  // isPending: PropTypes.bool,
  // isError: PropTypes.bool,
  // error: PropTypes.any,
  listDieuKhienBMS: PropTypes.array,
  onIsHandling: PropTypes.func,
}

export default DanhSachBoDieuKhienBMSView
