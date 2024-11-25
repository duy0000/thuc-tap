import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  BMS_CONTROLLER_CMD,
  BMS_OUTPUT_SYSTEM,
  GROUP_ACTION_NAME,
  MODE_BMS,
} from '../constants'
import { MdOutlineMotionPhotosAuto } from 'react-icons/md'
import { AiFillMediumCircle } from 'react-icons/ai'
import { IoClose, IoSettingsOutline } from 'react-icons/io5'
import { Formik } from 'formik'
import validationTemperatureSchema from '../validations'
import { memo, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { FaPowerOff } from 'react-icons/fa6'
import { RxUpdate } from 'react-icons/rx'

const GroupOperatingMode = ({
  isShow,
  onHideGroup,
  onChangeMode,
  isLoading,
}) => {
  return (
    <div
      className={clsx(
        'w-full lg:w-3/6 flex items-center justify-start flex-wrap gap-4 border rounded-lg p-6 relative top-0 left-0',
        !isShow && 'hidden',
      )}
    >
      <div className="flex items-center flex-wrap gap-2">
        <button
          disabled={isLoading}
          onClick={() => {
            onChangeMode(MODE_BMS.AUTO)
          }}
          className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-teal-500 border border-teal-500 hover:opacity-80 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
        >
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <MdOutlineMotionPhotosAuto size={24} />
          )}
          Auto
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onChangeMode(MODE_BMS.MANUAL)
          }}
          className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-sky-500 border border-sky-500 hover:opacity-80 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
        >
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <AiFillMediumCircle size={24} />
          )}
          Manual
        </button>
      </div>

      <label
        htmlFor=""
        onClick={onHideGroup}
        className="absolute top-0 lg:top-2 right-0 lg:right-2 w-8 h-8 shadow-md rounded-full bg-slate-50 hover:bg-red-200 flex items-center justify-around cursor-pointer hover:text-red-600"
      >
        <IoClose />
      </label>
    </div>
  )
}

const GroupActionMultiDevices = ({
  isShow,
  onHideGroup,
  onTurnOnMultiDevices,
  onTurnOffMultiDevices,
  isLoading,
}) => {
  return (
    <div
      className={clsx(
        'w-full lg:w-3/6 flex items-center justify-start flex-wrap gap-4 border rounded-lg p-6 relative top-0 left-0',
        !isShow && 'hidden',
      )}
    >
      <div className="flex items-center flex-wrap gap-2">
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onTurnOnMultiDevices(
              BMS_CONTROLLER_CMD.SET_ON,
              BMS_OUTPUT_SYSTEM.OUTPUT_1,
            )
          }}
          className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-cyan-700 border border-cyan-700 hover:opacity-80 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
        >
          {isLoading && <CircularProgress size={20} />}
          Bật Bàn giảng viên & Ổ cắm
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onTurnOnMultiDevices(
              BMS_CONTROLLER_CMD.SET_ON,
              BMS_OUTPUT_SYSTEM.OUTPUT_2,
            )
          }}
          className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-cyan-700 border border-cyan-700 hover:opacity-80 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
        >
          {isLoading && <CircularProgress size={20} />}
          Bật Quạt & Ánh sáng
        </button>

        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onTurnOnMultiDevices(
              BMS_CONTROLLER_CMD.SET_ON,
              BMS_OUTPUT_SYSTEM.OUTPUT_3,
            )
          }}
          className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-cyan-700 border border-cyan-700 hover:opacity-80 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
        >
          {isLoading && <CircularProgress size={20} />}
          Bật điều hòa
        </button>
      </div>
      <div className="flex items-center flex-wrap gap-2">
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onTurnOffMultiDevices(
              BMS_CONTROLLER_CMD.SET_OFF,
              BMS_OUTPUT_SYSTEM.OUTPUT_1,
            )
          }}
          className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-red-700 border border-red-700 hover:opacity-80 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
        >
          {isLoading && <CircularProgress size={20} />}
          Tắt Bàn giảng viên & Ổ cắm
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onTurnOffMultiDevices(
              BMS_CONTROLLER_CMD.SET_OFF,
              BMS_OUTPUT_SYSTEM.OUTPUT_2,
            )
          }}
          className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-red-700 border border-red-700 hover:opacity-80 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
        >
          {isLoading && <CircularProgress size={20} />}
          Tắt Quạt & Ánh sáng
        </button>

        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onTurnOffMultiDevices(
              BMS_CONTROLLER_CMD.SET_OFF,
              BMS_OUTPUT_SYSTEM.OUTPUT_3,
            )
          }}
          className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-red-700 border border-red-700 hover:opacity-80 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
        >
          {isLoading && <CircularProgress size={20} />}
          Tắt điều hòa
        </button>
      </div>

      <label
        htmlFor=""
        onClick={onHideGroup}
        className="absolute top-0 lg:top-2 right-0 lg:right-2 w-8 h-8 shadow-md rounded-full bg-slate-50 hover:bg-red-200 flex items-center justify-around cursor-pointer hover:text-red-600"
      >
        <IoClose />
      </label>
    </div>
  )
}

const GroupSetupTemperature = ({
  isLoading,
  isShow,
  onHideGroup,
  onSetupTemperatureBMS,
}) => {
  const initialTemperatureData = {
    min_temp: '',
    max_temp: '',
  }

  return (
    <div
      className={clsx(
        'w-full flex items-center justify-start flex-wrap gap-4 border rounded-lg p-6 relative top-0 left-0',
        !isShow && 'hidden',
      )}
    >
      <Formik
        initialValues={initialTemperatureData}
        validationSchema={validationTemperatureSchema}
        onSubmit={(values) => {
          onSetupTemperatureBMS(values.min_temp, values.max_temp)
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                  disabled={isLoading}
                  className="w-full md:w-max flex items-center justify-center gap-1 text-white bg-green-700 border border-green-700 hover:opacity-80 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none whitespace-nowrap text-center"
                >
                  {isLoading ? 'Đang lưu...' : 'Lưu'}
                </button>
              </div>
            </form>
          )
        }}
      </Formik>

      <label
        htmlFor=""
        onClick={onHideGroup}
        className="absolute top-0 lg:top-2 right-0 lg:right-2 w-8 h-8 shadow-md rounded-full bg-slate-50 hover:bg-red-200 flex items-center justify-around cursor-pointer hover:text-red-600"
      >
        <IoClose />
      </label>
    </div>
  )
}

const GroupAction = memo(function GroupAction({
  isLoading,
  onChangeMode,
  onTurnOnAllOutputBMS,
  onTurnOffAllOutputBMS,
  onSyncTimeBMS,
  onTurnOnMultiDevices,
  onTurnOffMultiDevices,
  onSetupTemperatureBMS,
}) {
  const [isAction, setIsAction] = useState(null)

  const onHideAllGroup = () => {
    setIsAction(null)
  }

  return (
    <>
      <div className="bms-action grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 mb-6">
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            setIsAction(GROUP_ACTION_NAME.groupOperatingMode)
          }}
          className={clsx(
            'col-span-1 w-full font-medium flex items-center justify-center gap-1 cursor-pointer text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white p-2 rounded-lg hover:opacity-70',
            isAction === GROUP_ACTION_NAME.groupOperatingMode &&
              'bg-blue-600 text-white',
          )}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <IoSettingsOutline />
          )}
          Chọn chế độ hoạt động
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onTurnOnAllOutputBMS && onTurnOnAllOutputBMS()
            onHideAllGroup()
          }}
          className="col-span-1 w-full flex items-center justify-center gap-1 cursor-pointer text-center border border-green-600 text-green-600 hover:bg-green-600 hover:text-white p-2 rounded-lg hover:opacity-70"
        >
          {isLoading ? <CircularProgress size={20} /> : <FaPowerOff />}
          Bật tất cả thiết bị được chọn
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onTurnOffAllOutputBMS && onTurnOffAllOutputBMS()
            onHideAllGroup()
          }}
          className="col-span-1 w-full flex items-center justify-center gap-1 cursor-pointer text-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg hover:opacity-70"
        >
          {isLoading ? <CircularProgress size={20} /> : <FaPowerOff />}
          Tắt tất cả thiết bị được chọn
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            onSyncTimeBMS && onSyncTimeBMS()
            onHideAllGroup()
          }}
          className="col-span-1 w-full flex items-center justify-center gap-1 cursor-pointer text-center border border-teal-400 text-teal-600 hover:bg-teal-600 hover:text-white p-2 rounded-lg hover:opacity-70"
        >
          {isLoading ? <CircularProgress size={20} /> : <RxUpdate />}
          Đồng bộ thời gian
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            setIsAction(GROUP_ACTION_NAME.groupActionMultiDevices)
          }}
          className={clsx(
            'col-span-1 w-full flex items-center justify-center gap-1 cursor-pointer text-center border border-cyan-600  hover:bg-cyan-600 text-cyan-600 hover:text-white p-2 rounded-lg hover:opacity-70',
            isAction === GROUP_ACTION_NAME.groupActionMultiDevices &&
              'bg-cyan-600 text-white',
          )}
        >
          {isLoading ? <CircularProgress size={20} /> : <FaPowerOff />}
          Bật/Tắt: N thiết bị/ N phòng
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => {
            setIsAction(GROUP_ACTION_NAME.groupSetupTemperature)
          }}
          className={clsx(
            'col-span-1 w-full flex items-center justify-center gap-1 cursor-pointer text-center border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white p-2 rounded-lg hover:opacity-70',
            isAction === GROUP_ACTION_NAME.groupSetupTemperature &&
              'bg-orange-600 text-white',
          )}
        >
          {isLoading ? <CircularProgress size={20} /> : <IoSettingsOutline />}
          Thiết lập nhiệt độ bật điều hòa
        </button>
      </div>

      <div className="mb-6">
        <GroupOperatingMode
          isLoading={isLoading}
          isShow={isAction === GROUP_ACTION_NAME.groupOperatingMode}
          onChangeMode={onChangeMode}
          onHideGroup={onHideAllGroup}
        />
        <GroupActionMultiDevices
          isLoading={isLoading}
          isShow={isAction === GROUP_ACTION_NAME.groupActionMultiDevices}
          onTurnOnMultiDevices={onTurnOnMultiDevices}
          onTurnOffMultiDevices={onTurnOffMultiDevices}
          onHideGroup={onHideAllGroup}
        />
        <GroupSetupTemperature
          isLoading={isLoading}
          isShow={isAction === GROUP_ACTION_NAME.groupSetupTemperature}
          onHideGroup={onHideAllGroup}
          onSetupTemperatureBMS={onSetupTemperatureBMS}
        />
      </div>
    </>
  )
})

GroupAction.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onChangeMode: PropTypes.func.isRequired,
  onTurnOnAllOutputBMS: PropTypes.func.isRequired,
  onTurnOffAllOutputBMS: PropTypes.func.isRequired,
  onSyncTimeBMS: PropTypes.func.isRequired,
  onTurnOnMultiDevices: PropTypes.func.isRequired,
  onTurnOffMultiDevices: PropTypes.func.isRequired,
  onSetupTemperatureBMS: PropTypes.func.isRequired,
}

export default GroupAction
