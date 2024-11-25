import { useEffect, useMemo, useState } from 'react'
import DanhSachBoDieuKhienBMSView from './DanhSachBoDieuKhienBMSView'
import {
  getAllRemoteControllBMS,
  postSyncTimeRemoteBMS,
} from '@/Apis/ApiGiangVien/BoDieuKhienBMS/apiBoDieuKhienBMS'
import Swal from 'sweetalert2'
import {
  // useGetAllBMSQuery,
  useTurnOffAllBMSMutation,
  useTurnOnAllBMSMutation,
  useUpdateModeBMSMutation,
  // useUpdateOutputBMSMutation,
} from '../../BoDieuKhienBMSReduxAPI/remoteControllBMS.service'
import { filterData } from '@/Services/Utils'
// import { ID_OUTPUT_BMS, TIME_POLLING_BMS } from '../../constants'

function DanhSachBoDieuKhienBMS() {
  const [visiableFormSetupCommon, setVisibleFormSetupCommon] = useState(false)
  const [visiableFormOperatingMode, setVisiblFormOperatingMode] =
    useState(false)
  const [visiableFormAirTemper, setVisiblFormAirTemper] = useState(false)
  const [isAction, setIsAction] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [isHandling, setIsHandling] = useState(false)
  const [selected, setSelected] = useState([])
  const [listBMSController, setListBMSController] = useState([])
  const initialDataFilter = {
    ten: '',
    trang_thai: '',
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
    DT_QLP_Phong_ToaNha: '',
    DT_QLP_Phong_Tang: '',
    DT_QLP_Phong_TenPhong: '',
    mode: '',
    trang_thai_output1: '',
    trang_thai_output2: '',
    trang_thai_output3: '',
    trang_thai_output4: '',
    temperature: '',
  }
  const [columnFilters, setColumnFilters] = useState(initialDataFilter)

  const [pagination, setPagination] = useState({
    currentPage: 0,
    itemPerPage: 5,
  })

  const _filteredData = filterData(listBMSController, columnFilters)
  const _showDataWithPagination = useMemo(() => {
    return _filteredData?.slice(
      pagination.itemPerPage * pagination.currentPage,
      pagination.itemPerPage * pagination.currentPage + pagination.itemPerPage,
    )
  }, [_filteredData, pagination.itemPerPage, pagination.currentPage])

  // event: Change itemPerPage
  const handleChangeItemPerPage = (event) => {
    setPagination({
      currentPage: 0,
      itemPerPage: parseInt(event.target.value),
    })
  }

  // event: Change Page
  const handleChangePage = (event, newPage) => {
    setPagination({
      ...pagination,
      currentPage: newPage,
    })
  }

  const handleChangeValueFilter = (e) => {
    const { id, value } = e.target
    const ids = id.split(',')

    if (ids.length > 0) {
      setColumnFilters((prevData) => {
        const newFilters = { ...prevData }
        ids.forEach((singleId) => {
          newFilters[singleId.trim()] = value
        })
        return newFilters
      })
    } else {
      setColumnFilters((prevData) => {
        return { ...prevData, [id]: value }
      })
    }
  }

  const handleClearFilter = () => {
    setColumnFilters(initialDataFilter)
  }
  // update SET_MODE RTK
  const [updateModeBMS] = useUpdateModeBMSMutation()
  const [turnOnAllBMS] = useTurnOnAllBMSMutation()
  const [turnOffAllBMS] = useTurnOffAllBMSMutation()

  const getListBMSController = () => {
    getAllRemoteControllBMS({
      DT_QLP_Phong_CoSo: '',
      DT_QLP_Phong_DiaDiem: '',
      DT_QLP_Phong_ToaNha: '',
      DT_QLP_Phong_Tang: '',
      DT_QLP_Phong_TenPhong: '',
      syn_service: '',
    }).then((res) => {
      if (res) {
        setListBMSController(res)
      }
    })
  }
  // event: Hiển thị form Bật/Tắt thiết bị
  const handleShowOnOffDevices = () => {
    setVisibleFormSetupCommon(true)
    setVisiblFormOperatingMode(false)
    setVisiblFormAirTemper(false)
  }

  // event Hiển thị chọn chế độ hoạt động AUTO/MANUAL
  const handleShowOperatingMode = () => {
    setVisiblFormOperatingMode(true)
    setVisibleFormSetupCommon(false)
    setVisiblFormAirTemper(false)
  }

  // event: Hiển thị form setup Nhiệt độ bật điều hòa
  const handleShowAirTemper = () => {
    setVisiblFormAirTemper(true)
    setVisibleFormSetupCommon(false)
    setVisiblFormOperatingMode(false)
  }

  // event: Ẩn form Bật/Tắt thiết bị
  const handleHideOnOffDevices = () => {
    setVisibleFormSetupCommon(false)
    setIsAction('')
  }

  // event: Ẩn form chọn chế độ hoạt động AUTO/MANUAL
  const handleHideOperatingMode = () => {
    setVisiblFormOperatingMode(false)
    setIsAction('')
  }

  // event: Ẩn form setup Nhiệt độ báo điều hòa
  const handleHideAirTemper = () => {
    setVisiblFormAirTemper(false)
    setIsAction('')
  }

  // event: Ẩn tất cả các form
  const handleHideAllForm = () => {
    setIsAction('')
    setVisibleFormSetupCommon(false)
    setVisiblFormOperatingMode(false)
    setVisiblFormAirTemper(false)
  }

  // event selected all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = _showDataWithPagination?.map((n) => n)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  // event selected one row
  const handleClickSelect = (event, bmsItem) => {
    const selectedItem = selected.some((item) => item.ipadd === bmsItem.ipadd)
    let newSelected = []
    if (selectedItem) {
      newSelected = selected.filter((item) => item.ipadd !== bmsItem.ipadd)
      setSelected(newSelected)
    } else {
      newSelected = [...selected, bmsItem]
      setSelected(newSelected)
    }
  }

  // function check row is selected
  const isSelected = (ipadd) => selected.some((item) => item.ipadd === ipadd)

  /**
   * Hàm chung để xử lý bật/tắt các thiết bị/công tắc BMS và chuyển chế độ
   *
   * @param {string} actionType : toggle | mode | syncTime
   * @param {object} actionData : idcmd: string | outputKeys: array | newState: 0||1 | additionalData: object, successMessage: string
   * @param {boolean} isTurningOn
   * @returns
   */
  const handleToggleDevices = async (
    actionType,
    actionData,
    isTurningOn = false,
  ) => {
    // Check Mode BDK
    const checkIsManual = selected.some((item) => {
      return item?.mode?.toLowerCase() === 'manual'
    })

    if (checkIsManual && actionType !== 'mode' && actionType !== 'syncTime') {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Các thiết bị BMS đang ở chế độ MANUAL không thể thực hiện thiết lập!',
        timer: 3000,
      })
      return
    }

    let nameOutput = ''
    if (
      actionData?.outputKeys &&
      actionData?.outputKeys?.length &&
      actionData?.outputKeys[0]
    ) {
      switch (actionData?.outputKeys[0]) {
        case 'out1':
          nameOutput = 'Bàn giảng viên & Ổ cắm'
          break
        case 'out2':
          nameOutput = 'Quạt & Ánh sáng'
          break
        case 'out3':
          nameOutput = 'Điều hòa'
          break
        case 'out4':
          nameOutput = 'Cửa'
          break
        default:
          break
      }
    }

    if (selected?.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: `Vui lòng chọn ít nhất 1 thiết bị BMS để thực hiện!`,
      })
    }

    // check: Trạng thái kết nối của BĐK
    const checkIsDisconnect = selected.some((item) => item?.trang_thai === 0)
    if (checkIsDisconnect) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chỉ chọn những thiết bị BMS không bị mất kết nối!',
      })
    }

    // Điều kiện kiểm tra chế độ nếu cần thiết
    if (actionType === 'mode') {
      const checkIsMode = selected.some(
        (item) => item?.mode?.toLowerCase() === actionData.mode?.toLowerCase(),
      )
      if (checkIsMode) {
        return Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Vui lòng chỉ chọn những thiết bị BMS không ở chế độ ${actionData.mode.toUpperCase()}!`,
        })
      }
    }

    // Điều kiện kiểm tra trạng thái bật/tắt của từng output
    if (actionType === 'toggle' && actionData.outputKeys) {
      const checkIsOutputOff = selected.some((item) =>
        actionData.outputKeys.some(
          (key) => !isTurningOn && item[`${key}`] === 0,
        ),
      )

      const checkIsOutputOn = selected.some((item) =>
        actionData.outputKeys.some(
          (key) => isTurningOn && item[`${key}`] === 1,
        ),
      )

      console.log('> checkIsOutputState: ', {
        nameOutput,
        isTurningOn,
        checkIsOutputOff,
        checkIsOutputOn,
      })

      if (isTurningOn === true && checkIsOutputOn) {
        return Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          // text: `Vui lòng chỉ chọn những thiết bị BMS có ${nameOutput} ${isTurningOn ? 'đang tắt' : 'đang bật'} để thực hiện hành động!`,
          text: `Vui lòng chỉ chọn những thiết bị BMS có ${nameOutput} đang tắt để thực hiện hành động!`,
        })
      }

      if (isTurningOn === false && checkIsOutputOff) {
        return Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          // text: `Vui lòng chỉ chọn những thiết bị BMS có ${nameOutput} ${isTurningOn ? 'đang tắt' : 'đang bật'} để thực hiện hành động!`,
          text: `Vui lòng chỉ chọn những thiết bị BMS có ${nameOutput} đang bật để thực hiện hành động!`,
        })
      }
    }

    // console.log(selected)

    // return

    const newSelected = selected.map((item) => ({
      idcmd: actionData.idcmd,
      ipadd: item.ipadd,
      syn_status: '0',
      syn_service: item.syn_service,
      ...actionData.additionalData,
    }))

    const updateFunction = {
      toggle: isTurningOn ? turnOnAllBMS : turnOffAllBMS,
      mode: updateModeBMS,
      syncTime: postSyncTimeRemoteBMS,
    }[actionType]

    // const timeoutPromise = (timeout) =>
    //   new Promise((_, reject) =>
    //     setTimeout(() => reject(new Error('Request timeout')), timeout),
    //   )

    const timeout = newSelected.length * 3000

    setIsHandling(true)

    updateFunction(newSelected, timeout)
      .then((res) => {
        // let message = ''
        if (res.status === 200 || res.data.status === 200) {
          // if (actionType === 'mode') {
          //   message = res.data.data[0].additionalMessage
          // } else {
          //   message = res.data[0].additionalMessage
          // }
          Swal.fire({
            icon: 'success',
            title: 'Thông báo!',
            text: actionData.successMessage,
          })
          // refetchBMS()
          setSelected([])
          getListBMSController()
        }
        setIsHandling(false)
      })
      .catch((err) => {
        console.error('rejected', err)
        setIsHandling(false)
      })
      .finally(() => {
        setIsHandling(false)
      })
  }

  // START: EVENT HANDLERS FETCH API
  // event active mode AUTO: OKE
  const handleActiveModeAuto = () => {
    handleToggleDevices('mode', {
      idcmd: 'set_mode',
      mode: 'auto',
      additionalData: { mode: 'auto' },
      successMessage: `Thay đổi chế độ hoạt động AUTO của ${selected.length} thiết bị BMS thành công`,
    })
    getListBMSController()
  }
  // event active mode MANUAL: OKE
  const handleActiveModeManual = () => {
    handleToggleDevices('mode', {
      idcmd: 'set_mode',
      mode: 'manual',
      additionalData: { mode: 'manual' },
      successMessage: `Thay đổi chế độ hoạt động MANUAL của ${selected.length} thiết bị BMS thành công`,
    })
    getListBMSController()
  }
  // event async time: OKE
  const handleSyncTimeRemoteBMS = () =>
    handleToggleDevices('syncTime', {
      idcmd: 'set_time',
      successMessage: `Đồng bộ thời gian của ${selected.length} thiết bị BMS thành công`,
    })

  // event: Bật tất cả 8 output của thiết bị được chọn: OKE
  const handleTurnOnAllOutputBMS = () => {
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_on',
        additionalData: { output: 'all' },
        outputKeys: ['output1', 'output2', 'output3', 'output4'],
        newState: 1,
        successMessage: 'Bật tất cả thiết bị thành công',
      },
      true,
    )
    // refetchBMS()
    getListBMSController()
  }
  // event: Tắt tất cả 8 output của thiết bị được chọn: OKE
  const handleTurnOffAllOutputBMS = () => {
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_off',
        additionalData: { output: 'all' },
        outputKeys: ['out1', 'out2', 'out3', 'out4'],
        newState: 0,
        successMessage: 'Tắt tất cả thiết bị thành công',
      },
      false,
    )
    // refetchBMS()
    getListBMSController()
  }

  // START: Bật/Tắt N thiết bị / N phòng

  // event: Bật bàn giảng viên & ổ cắm N thiết bị / N phòng: OKE
  const handleTurnOnMultipleDeskAndSocket = () =>
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_on',
        additionalData: {
          output: 1,
        },
        outputKeys: ['out1'],
        newState: 1,
        successMessage: `Bật bàn giảng viên & ổ cắm cho ${selected?.length} bộ điều khiển BMS thành công!`,
      },
      true,
    )
  // event: Tắt bàn giảng viên & ổ cắm N thiết bị / N phòng: OKE
  const handleTurnOffMultipleDeskAndSocket = () =>
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_off',
        additionalData: {
          output: 1,
        },
        outputKeys: ['out1'],
        newState: 0,
        successMessage: `Tắt bàn giảng viên & ổ cắm cho ${selected?.length} bộ điều khiển BMS thành công!`,
      },
      false,
    )

  // event: Bật quạt & ánh sáng N thiết bị / N phòng: OKE
  const handleTurnOnMultipleFanAndLights = () => {
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_on',
        additionalData: {
          output: 2,
        },
        outputKeys: ['out2'],
        newState: 1,
        successMessage: `Bật quạt & ánh sáng cho ${selected?.length} bộ điều khiển BMS thành công!`,
      },
      true,
    )
    // refetchBMS()
  }
  // event: Tắt quạt & ánh sáng N thiết bị / N phòng: OKE
  const handleTurnOffMultipleFanAndLights = () => {
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_off',
        additionalData: {
          output: 2,
        },
        outputKeys: ['out2'],
        newState: 0,
        successMessage: `Tắt quạt & ánh sáng cho ${selected?.length} bộ điều khiển BMS thành công!`,
      },
      false,
    )
    // refetchBMS()
  }

  // event: Bật Cửa N thiết bị / N phòng: OKE
  const handleTurnOnMultipleDoors = () =>
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_on',
        additionalData: {
          output: 4,
        },
        outputKeys: ['out4'],
        newState: 1,
        successMessage: `Bật cửa cho ${selected?.length} bộ điều khiển BMS thành công!`,
      },
      true,
    )
  // event: Tắt Cửa N thiết bị / N phòng: OKE
  const handleTurnOffMultipleDoors = () => {
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_off',
        additionalData: {
          output: 4,
        },
        outputKeys: ['out4'],
        newState: 0,
        successMessage: `Tắt cửa cho ${selected?.length} bộ điều khiển BMS thành công!`,
      },
      false,
    )
    // refetchBMS()
  }

  // event: Bật điều hòa N thiết bị / N phòng: OKE
  const handleTurnOnMultipleAirConditioners = () =>
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_on',
        additionalData: {
          output: 3,
        },
        outputKeys: ['out3'],
        newState: 1,
        successMessage: `Bật điều hòa cho ${selected?.length} bộ điều khiển BMS thành công!`,
      },
      true,
    )
  // event: Tắt điều hòa N thiết bị / N phòng: OKE
  const handleTurnOffMultipleAirConditioners = () =>
    handleToggleDevices(
      'toggle',
      {
        idcmd: 'set_off',
        additionalData: {
          output: 3,
        },
        outputKeys: ['out3'],
        newState: 0,
        successMessage: `Tắt điều hòa cho ${selected?.length} bộ điều khiển BMS thành công!`,
      },
      false,
    )

  useEffect(() => {
    getListBMSController()
  }, [])

  useEffect(() => {
    const getDataBMSController = setInterval(getListBMSController, 3000)
    // getListBMSController()

    return () => {
      clearInterval(getDataBMSController)
      setSelected([])
    }
  }, [isHandling])

  return (
    <DanhSachBoDieuKhienBMSView
      isLoading={isLoading}
      isHandling={isHandling}
      visiableFormSetupCommon={visiableFormSetupCommon}
      visiableFormOperatingMode={visiableFormOperatingMode}
      visiableFormAirTemper={visiableFormAirTemper}
      isAction={isAction}
      setIsAction={setIsAction}
      onShowOperatingMode={handleShowOperatingMode}
      onHideOperatingMode={handleHideOperatingMode}
      onHideAllForm={handleHideAllForm}
      onShowOnOffDevices={handleShowOnOffDevices}
      onHideOnOffDevices={handleHideOnOffDevices}
      onShowAirTemper={handleShowAirTemper}
      onHideAirTemper={handleHideAirTemper}
      onSelectAllClick={handleSelectAllClick}
      onClickSelect={handleClickSelect}
      onSetSelected={setSelected}
      dataSelected={selected}
      isSelected={isSelected}
      numSelected={selected.length ?? 0}
      listDieuKhienBMS={_showDataWithPagination}
      valueColumnFilters={columnFilters}
      valueItemPerPage={pagination.itemPerPage}
      valueCurrentPage={pagination.currentPage}
      onChangeValueFilter={handleChangeValueFilter}
      onClearFilter={handleClearFilter}
      onChangePage={handleChangePage}
      onChangeItemPerPage={handleChangeItemPerPage}
      onActiveModeAuto={handleActiveModeAuto}
      onActiveModeManual={handleActiveModeManual}
      onSyncTimeRemoteBMS={handleSyncTimeRemoteBMS}
      onTurnOnAllOutputBMS={handleTurnOnAllOutputBMS}
      onTurnOffAllOutputBMS={handleTurnOffAllOutputBMS}
      // event: bật - tắt điều hòa
      onTurnOnMultipleAirConditioners={handleTurnOnMultipleAirConditioners}
      onTurnOffMultipleAirConditioners={handleTurnOffMultipleAirConditioners}
      // event: bật - tắt công tắc bàn GV & ổ cắm
      onTurnOnMultipleDeskAndSocket={handleTurnOnMultipleDeskAndSocket}
      onTurnOffMultipleDeskAndSocket={handleTurnOffMultipleDeskAndSocket}
      // event: bật - tắt quạt & ánh sáng
      onTurnOnMultipleFanAndLights={handleTurnOnMultipleFanAndLights}
      onTurnOffMultipleFanAndLights={handleTurnOffMultipleFanAndLights}
      // event: bật - tắt công tắc cửa
      onTurnOnMultipleDoors={handleTurnOnMultipleDoors}
      onTurnOffMultipleDoors={handleTurnOffMultipleDoors}
      // event: validate ishandling
      onIsHandling={setIsHandling}
    />
  )
}

export default DanhSachBoDieuKhienBMS
