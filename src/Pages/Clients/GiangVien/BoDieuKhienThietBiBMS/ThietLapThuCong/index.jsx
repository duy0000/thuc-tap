import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import {
  BMS_CONTROLLER_CMD,
  BMS_OUTPUT_TYPE,
  generateBMSActionList,
  initialColumnFiltersBMS,
  initialPagination,
  KEY_STORE_BMS,
  MODE_BMS,
  SYNC_STATUS_DEFAULT,
} from '../constants'
import { apiBMSController } from '@/Apis/ApiGiangVien/BoDieuKhienBMS'
import Swal from 'sweetalert2'
import GroupAction from './GroupAction'
import TableThietBiBMS from '../TableBMS'
import ButtonScrollToTop from '@/Components/BackToTop/ButtonScrollToTop'

function ThietLapThuCong() {
  const [bmsSelected, setBmsSelected] = useState([])
  const [isLoadingPageWithAction, setIsLoadingPageWithAction] = useState(false)
  const [dataColumnFiltersBMS, setDataColumnFiltersBMS] = useState(
    initialColumnFiltersBMS,
  )
  const [pagination, setPagination] = useState(initialPagination)

  const bmQueryClient = useQueryClient()
  // Mutation 1: CHuyển đổi chế độ hoạt động BMS
  const { mutateAsync: mutateChangeModeBMSAsync } = useMutation({
    mutationKey: [KEY_STORE_BMS.CHANGE_MODE_BMS_CONTROLLER],
    mutationFn: async (data = []) => {
      const res = await apiBMSController.postChangeModeBMSController(data)
      return res
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    gcTime: 0,
    onSuccess: () => {
      bmQueryClient.invalidateQueries(
        KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong,
      ),
        setBmsSelected([])
    },
  })
  // Mutation 2: Bật/Tắt tất cả output của BMS
  const { mutateAsync: mutateTurnAllOutputBMSAsync } = useMutation({
    mutationKey: [KEY_STORE_BMS.CHANGE_MODE_BMS_CONTROLLER],
    mutationFn: async (data = []) => {
      const res = await apiBMSController.postTurnAllOutputBMSController(data)
      return res
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    gcTime: 0,
    onSuccess: () => {
      bmQueryClient.invalidateQueries(
        KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong,
      ),
        setBmsSelected([])
    },
  })

  // Mutation 3: Đồng bộ thời gian của BMS
  const { mutateAsync: mutateSyncTimeBMSAsync } = useMutation({
    mutationKey: [KEY_STORE_BMS.CHANGE_MODE_BMS_CONTROLLER],
    mutationFn: async (data = []) => {
      const res = await apiBMSController.postSyncTimeBMSController(data)
      return res
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    gcTime: 0,
    onSuccess: () => {
      bmQueryClient.invalidateQueries(
        KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong,
      ),
        setBmsSelected([])
    },
  })

  // Mutation 4: Bật/Tắt 1 output của nhiều BMS
  const { mutateAsync: mutateTurnSingleOutputBMSAsync } = useMutation({
    mutationKey: [KEY_STORE_BMS.CHANGE_MODE_BMS_CONTROLLER],
    mutationFn: async (data = []) => {
      const res = await apiBMSController.postTurnSingleOutputBMSController(data)
      return res
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    gcTime: 0,
    onSuccess: () => {
      bmQueryClient.invalidateQueries(
        KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong,
      ),
        setBmsSelected([])
    },
  })

  // Mutation 5: Thiết lập nhiệt độ điều hòa BMS
  const { mutateAsync: mutateSetupTemperatureBMSAsync } = useMutation({
    mutationKey: [KEY_STORE_BMS.CHANGE_MODE_BMS_CONTROLLER],
    mutationFn: async (data = []) => {
      const res = await apiBMSController.postSetupTemperatureBMSController(data)
      return res
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    gcTime: 0,
    onSuccess: () => {
      bmQueryClient.invalidateQueries(
        KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong,
      ),
        setBmsSelected([])
    },
  })

  // END: Query - Mutation

  const handleSelectedBMS = useCallback((data) => {
    setBmsSelected(data)
  }, [])

  // action with BMS
  const validationCommonBMS = () => {
    if (bmsSelected.length === 0) {
      setIsLoadingPageWithAction(false)
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng chọn ít nhất 1 thiết bị BMS để thao tác!',
      })
      return true
    }

    if (bmsSelected.find((i) => i?.trang_thai === 0)) {
      setIsLoadingPageWithAction(false)
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng không chọn thiết bị BMS mất kết nối!',
      })
      return true
    }

    if (bmsSelected.find((i) => i?.trang_thai_lenh === false)) {
      setIsLoadingPageWithAction(false)
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng không chọn thiết bị đang có lệng thực thi!',
      })
      return true
    }
  }

  // 1. Change Mode
  const handleChangeModeBMS = useCallback(
    (modeBMS) => {
      setIsLoadingPageWithAction(true)
      if (validationCommonBMS()) {
        setIsLoadingPageWithAction(false)
        return
      }

      let _listBMSChangeMode = bmsSelected.map((bms) => {
        if (bms.mode === modeBMS) {
          return
        } else {
          return {
            idcmd: BMS_CONTROLLER_CMD.SET_MODE,
            ipadd: bms.ipadd,
            syn_status: SYNC_STATUS_DEFAULT,
            syn_service: Number(bms.syn_service),
            mode: modeBMS,
          }
        }
      })

      if (!_listBMSChangeMode?.[0] || !_listBMSChangeMode) {
        setIsLoadingPageWithAction(false)
        Swal.fire({
          icon: 'error',
          title:
            'Vui lòng không chọn các thiết bị BMS có cùng chế độ hoạt động!',
        })
        return
      }

      mutateChangeModeBMSAsync(_listBMSChangeMode)
        .then((res) => {
          let _listDataResponse = res?.data || [] // Dữ liệu trả về
          console.log(
            'mutateChangeModeBMSAsync - _listDataResponse: ',
            _listDataResponse,
          )

          // Tách thành công và thất bại dựa trên status
          const successList = _listDataResponse.filter(
            (item) => item.status === '1',
          )
          const failedList = _listDataResponse.filter(
            (item) => item.status === '0',
          )

          // Tạo nội dung HTML để hiển thị trong Swal
          let successHTML =
            successList.length > 0
              ? `<p>Thiết bị thành công: <ul>${successList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
              : '<p>Không có thiết bị nào thành công.</p>'

          let failedHTML =
            failedList.length > 0
              ? `<p>Thiết bị thất bại: <ul>${failedList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
              : '<p>Không có thiết bị nào thất bại.</p>'

          // if (_listDataResponse.length === _listBMSChangeMode?.length) {
          Swal.fire({
            icon: successList.length > 0 ? 'success' : 'error',
            title: 'Thông báo!',
            html: `
          <p>Đã thay đổi trạng thái <span style="font-weight: bold; color: ${modeBMS === MODE_BMS.AUTO ? 'green' : 'red'}; font-size: 18px; text-transform: uppercase">${modeBMS}</span> cho thiết bị BMS!</p>
          ${successHTML}
          ${failedHTML}
        `,
          })
          // Nếu cần làm gì khác sau thao tác thành công hoặc thất bại
          setBmsSelected([])
          // } else {
          //   console.log(':::[ERROR]::: handleChangeModeBMS: ', res)
          // }
        })
        .catch((error) => {
          console.error(':::[ERROR]::: handleChangeModeBMS: ', error)
          Swal.fire({
            icon: 'error',
            title: 'Đã xảy ra lỗi!',
            text: 'Không thể thực hiện thay đổi trạng thái!',
          })
        })
        .finally(() => {
          setIsLoadingPageWithAction(false)
          setBmsSelected([])
          bmQueryClient.invalidateQueries({
            queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
          })
        })
    },
    [bmsSelected],
  )

  // 2. Turn on/off all output
  const handleTurnOnAllOutputBMS = useCallback(() => {
    setIsLoadingPageWithAction(true)
    if (validationCommonBMS()) {
      return
    }

    let _listBMSAction = bmsSelected.map((bms) => {
      if (bms.out1 === 1 || bms.out2 === 1 || bms.out3 === 1) {
        return
      } else {
        return {
          idcmd: BMS_CONTROLLER_CMD.SET_ON,
          ipadd: bms.ipadd,
          syn_status: SYNC_STATUS_DEFAULT,
          syn_service: Number(bms.syn_service),
          output: BMS_OUTPUT_TYPE.OUTPUT_ALL,
        }
      }
    })

    if (_listBMSAction.includes(null || undefined) || !_listBMSAction) {
      setIsLoadingPageWithAction(false)
      Swal.fire({
        icon: 'error',
        title:
          'Thao tác này không áp dụng cho các thiết bị BMS có công tắc đang bật!',
      })
      return
    }

    mutateTurnAllOutputBMSAsync(_listBMSAction)
      .then((res) => {
        let _listDataResponse = res?.data || [] // Dữ liệu trả về

        // Tách thiết bị thành công và thất bại
        const successList = _listDataResponse.filter(
          (item) => item.status === '1',
        )
        const failedList = _listDataResponse.filter(
          (item) => item.status === '0',
        )

        // Tạo nội dung HTML cho thông báo
        let successHTML =
          successList.length > 0
            ? `<p>Thiết bị bật thành công: <ul>${successList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
            : '<p>Không có thiết bị nào bật thành công.</p>'

        let failedHTML =
          failedList.length > 0
            ? `<p>Thiết bị bật thất bại: <ul>${failedList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
            : '<p>Không có thiết bị nào bật thất bại.</p>'
        Swal.fire({
          icon: successList.length > 0 ? 'success' : 'error',
          title: 'Thông báo',
          html: `
          <p>Đã thao tác bật tất cả công tắc cho <span style="font-weight: bold; color: green; font-size: 18px">${_listBMSAction?.length}</span> thiết bị BMS!</p>
          ${successHTML}
          ${failedHTML}
        `,
        })

        bmQueryClient
          .invalidateQueries({
            queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
            exact: true,
          })
          .then(() => {
            bmQueryClient.refetchQueries({
              queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
              exact: true,
            })
          })

        setBmsSelected([])
      })
      .catch((error) => {
        console.error('Error:', error)
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể bật tất cả công tắc cho thiết bị BMS!',
        })
      })
      .finally(() => {
        bmQueryClient.invalidateQueries({
          queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
        })
        setIsLoadingPageWithAction(false)
        setBmsSelected([])
      })
  }, [bmsSelected])
  const handleTurnOffAllOutputBMS = useCallback(() => {
    setIsLoadingPageWithAction(true)
    if (validationCommonBMS()) {
      setIsLoadingPageWithAction(false)
      return
    }

    let _listBMSAction = bmsSelected.map((bms) => {
      if (bms.out1 === 0 || bms.out2 === 0 || bms.out3 === 0) {
        return
      } else {
        return {
          idcmd: BMS_CONTROLLER_CMD.SET_OFF,
          ipadd: bms.ipadd,
          syn_status: SYNC_STATUS_DEFAULT,
          syn_service: Number(bms.syn_service),
          output: BMS_OUTPUT_TYPE.OUTPUT_ALL,
        }
      }
    })
    if (_listBMSAction.includes(null || undefined) || !_listBMSAction) {
      setIsLoadingPageWithAction(false)
      Swal.fire({
        icon: 'error',
        title:
          'Thao tác này không áp dụng cho các thiết bị BMS có công tắc đang tắt!',
      })
      return
    }

    mutateTurnAllOutputBMSAsync(_listBMSAction)
      .then((res) => {
        let _listDataResponse = res?.data || [] // Dữ liệu trả về

        // Tách thiết bị thành công và thất bại
        const successList = _listDataResponse.filter(
          (item) => item.status === '1',
        )
        const failedList = _listDataResponse.filter(
          (item) => item.status === '0',
        )

        // Tạo nội dung HTML cho thông báo
        let successHTML =
          successList.length > 0
            ? `<p>Thiết bị tắt thành công: <ul>${successList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
            : '<p>Không có thiết bị nào tắt thành công.</p>'

        let failedHTML =
          failedList.length > 0
            ? `<p>Thiết bị tắt thất bại: <ul>${failedList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
            : '<p>Không có thiết bị nào tắt thất bại.</p>'

        Swal.fire({
          icon: successList.length > 0 ? 'success' : 'error',
          title: 'Thông báo',
          html: `
          <p>Đã thao tác tắt tất cả công tắc của <span style="font-weight: bold; color: red; font-size: 18px">${_listBMSAction?.length}</span> thiết bị BMS!</p>
          ${successHTML}
          ${failedHTML}
        `,
        })
        setBmsSelected([])
      })
      .catch((error) => {
        console.error(':::[ERROR]::: handleTurnOffAllOutputBMS: ', error)
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tắt tất cả công tắc cho thiết bị BMS!',
        })
      })
      .finally(() => {
        bmQueryClient.invalidateQueries({
          queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
        })
        setIsLoadingPageWithAction(false)
        setBmsSelected([])
      })
  }, [bmsSelected])

  // 3. Sync time
  const handleSyncTimeBMS = useCallback(() => {
    setIsLoadingPageWithAction(true)
    if (validationCommonBMS()) {
      setIsLoadingPageWithAction(false)
      return
    }

    let _listBMSAction = bmsSelected.map((bms) => {
      return {
        idcmd: BMS_CONTROLLER_CMD.SET_TIME,
        ipadd: bms.ipadd,
        syn_status: SYNC_STATUS_DEFAULT,
        syn_service: Number(bms.syn_service),
      }
    })

    mutateSyncTimeBMSAsync(_listBMSAction)
      .then((res) => {
        let _listDataResponse = res?.data || [] // Dữ liệu trả về

        // Tách thiết bị đồng bộ thành công và thất bại
        const successList = _listDataResponse.filter(
          (item) => item.status === '1',
        )
        const failedList = _listDataResponse.filter(
          (item) => item.status === '0',
        )

        // Tạo nội dung HTML cho thông báo
        let successHTML =
          successList.length > 0
            ? `<p>Thiết bị đồng bộ thành công: <ul>${successList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
            : '<p>Không có thiết bị nào đồng bộ thành công.</p>'

        let failedHTML =
          failedList.length > 0
            ? `<p>Thiết bị đồng bộ thất bại: <ul>${failedList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
            : '<p>Không có thiết bị nào đồng bộ thất bại.</p>'

        Swal.fire({
          icon: successList.length > 0 ? 'success' : 'error',
          title: 'Thông báo',
          html: `
          <p>Đã  thao tác đồng bộ thời gian cho <span style="font-weight: bold; color: green; font-size: 18px">${_listBMSAction?.length}</span> thiết bị BMS!</p>
          ${successHTML}
          ${failedHTML}
        `,
        })

        bmQueryClient
          .invalidateQueries({
            queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
            exact: true,
          })
          .then(() => {
            bmQueryClient.refetchQueries({
              queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
              exact: true,
            })
          })

        setBmsSelected([])
      })
      .catch((error) => {
        console.error(':::[ERROR]::: handleSyncTimeBMS: ', error)
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể đồng bộ thời gian cho thiết bị BMS!',
        })
      })
      .finally(() => {
        bmQueryClient.invalidateQueries({
          queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
        })
        setIsLoadingPageWithAction(false)
        setBmsSelected([])
      })
  }, [bmsSelected])

  // 4. Turn on/off single output for multi devices
  // turnMode = 'set_on' || 'set_off'
  const handleTurnSingleOutputMultiDevicesBMS = useCallback(
    (turnMode, outputSystem) => {
      setIsLoadingPageWithAction(true)
      if (validationCommonBMS()) {
        setIsLoadingPageWithAction(false)
        return
      }

      const _listBMSAction = bmsSelected
        .map((bms) => generateBMSActionList(bms, turnMode, outputSystem))
        .filter((action) => action !== null)

      if (!_listBMSAction?.[0] || !_listBMSAction) {
        setIsLoadingPageWithAction(false)
        Swal.fire({
          icon: 'error',
          title: `Thao tác này không áp dụng cho các thiết bị BMS có công tắc ${outputSystem.label} đang ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'}!`,
        })
        return
      }

      mutateTurnSingleOutputBMSAsync(_listBMSAction)
        .then((res) => {
          let _listDataResponse = res?.data || []

          // Tách thiết bị bật/tắt thành công và thất bại
          const successList = _listDataResponse.filter(
            (item) => item.status === '1',
          )
          const failedList = _listDataResponse.filter(
            (item) => item.status === '0',
          )

          // Tạo nội dung HTML cho thông báo
          let successHTML =
            successList.length > 0
              ? `<p>Các thiết bị ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'} thành công: <ul>${successList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
              : `<p>Không có thiết bị nào được ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'} thành công.</p>`

          let failedHTML =
            failedList.length > 0
              ? `<p>Các thiết bị ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'} thất bại: <ul>${failedList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
              : `<p>Không có thiết bị nào thất bại khi ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'}.</p>`

          Swal.fire({
            icon: successList.length > 0 ? 'success' : 'error',
            title: 'Thông báo',
            html: `
              <p>Đã ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'} công tắc ${outputSystem.label} của <span style="font-weight: bold; color: red; font-size: 18px">${_listBMSAction?.length}</span> thiết bị BMS!</p>
              ${successHTML}
              ${failedHTML}
            `,
          })
          setBmsSelected([])
        })
        .catch((error) => {
          console.error(
            ':::[ERROR]::: handleTurnSingleOutputMultiDevicesBMS: ',
            error,
          )
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: `Không thể ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'} công tắc ${outputSystem.label} cho các thiết bị BMS!`,
          })
        })
        .finally(() => {
          bmQueryClient.invalidateQueries({
            queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
          })
          setIsLoadingPageWithAction(false)
          setBmsSelected([])
        })
    },
    [bmsSelected],
  )

  const handleTurnSingleOutputDevicesBMS = useCallback(
    (turnMode, dataBMS, outputSystem) => {
      setIsLoadingPageWithAction(true)

      if (dataBMS && dataBMS.trang_thai === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Vui lòng không thao tác với thiết bị BMS đang mất kết nối!',
        })
        setIsLoadingPageWithAction(false)
        return
      }
      if (dataBMS && dataBMS.trang_thai_lenh === false) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Thiết bị đang có lệnh thực thi. Vui lòng không thao tác!',
        })
        setIsLoadingPageWithAction(false)
        return
      }
      let _itemSingleOn = [
        {
          idcmd: turnMode,
          ipadd: dataBMS?.ipadd,
          syn_service: dataBMS?.syn_service,
          output: outputSystem.value,
          syn_status: SYNC_STATUS_DEFAULT,
        },
      ]

      mutateTurnSingleOutputBMSAsync(_itemSingleOn)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Thao tác thành công!',
              html: `<p>Đã ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'} công tắc ${outputSystem.label} của <span style="font-weight: bold; color: red; font-size: 18px">${dataBMS?.DT_QLP_Phong_TenPhong}</span>!</p>`,
            })
            bmQueryClient
              .invalidateQueries({
                queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
                exact: true,
              })
              .then(() => {
                bmQueryClient.refetchQueries({
                  queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
                  exact: true,
                })
              })
            setBmsSelected([])
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Thao tác thất bại!',
              html: `<p>Thao tác ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'} công tắc ${outputSystem.label} của <span style="font-weight: bold; color: red; font-size: 18px">${dataBMS?.DT_QLP_Phong_TenPhong}</span> không thành công!</p>`,
            })
            console.error(':::[ERROR]::: handleTurnOffAllOutputBMS: ', res)
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Thao tác thất bại!',
            html: `<p>Thao tác ${turnMode === BMS_CONTROLLER_CMD.SET_ON ? 'bật' : 'tắt'} công tắc ${outputSystem.label} của <span style="font-weight: bold; color: red; font-size: 18px">${dataBMS?.DT_QLP_Phong_TenPhong}</span> không thành công!</p>`,
          })
          console.error(':::[ERROR]::: handleTurnOffAllOutputBMS: ', error)
        })
        .finally(() => {
          setIsLoadingPageWithAction(false)
          setBmsSelected([])
        })
    },
    [bmsSelected],
  )

  // 5. Setup temperature
  const handleSetupTemperatureBMS = useCallback(
    (min_temp, max_temp) => {
      setIsLoadingPageWithAction(true)
      if (validationCommonBMS()) {
        return
      }

      let _listBMSAction = bmsSelected.map((bms) => {
        return {
          idcmd: BMS_CONTROLLER_CMD.SET_TEMPERATURE,
          ipadd: bms.ipadd,
          syn_status: SYNC_STATUS_DEFAULT,
          syn_service: Number(bms.syn_service),
          min_temp: min_temp,
          max_temp: max_temp,
          output: BMS_OUTPUT_TYPE.OUTPUT_ALL,
        }
      })

      mutateSetupTemperatureBMSAsync(_listBMSAction)
        .then((res) => {
          // console.log('res: ', res)
          let _listDataResponse = res?.data || []
          // Tách thiết bị thành công và thất bại
          const successList = _listDataResponse.filter(
            (item) => item.status === '1',
          )
          const failedList = _listDataResponse.filter(
            (item) => item.status === '0',
          )

          // Tạo nội dung HTML cho thông báo
          let successHTML =
            successList.length > 0
              ? `<p>Thiết bị thao tác thành công: <ul>${successList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
              : '<p>Không có thiết bị nào thao tác thành công.</p>'

          let failedHTML =
            failedList.length > 0
              ? `<p>Thiết bị thao tác thất bại: <ul>${failedList.map((item) => `<li>Service ${item.service}: ${item.message}</li>`).join('')}</ul></p>`
              : '<p>Không có thiết bị nào thao tác thất bại.</p>'

          Swal.fire({
            icon: 'success',
            title: 'Thông báo',
            html: `<p>Đã thao tác thiết lập nhiệt độ điều hòa cho tất cả <span style="font-weight: bold; color: green; font-size: 18px">${_listBMSAction?.length}</span> thiết bị BMS!</p>
            ${successHTML}
            ${failedHTML}
            `,
          })

          setBmsSelected([])
        })
        .catch((error) => {
          console.log(':::[ERROR]::: handleSetupTemperatureBMS: ', error)
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể thiết lập nhiệt độ điều hòa cho thiết bị BMS!',
          })
        })
        .finally(() => {
          bmQueryClient.invalidateQueries({
            queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong],
            exact: true,
          })
          setIsLoadingPageWithAction(false)
          setBmsSelected([])
        })
    },
    [bmsSelected],
  )

  return (
    <>
      <section className="w-full">
        <h3 className="text-center font-bold uppercase text-lg lg:text-2xl text-cyan-700 mb-6">
          Thiết lập thủ công
        </h3>
        <div className="bms-data">
          <GroupAction
            isLoading={isLoadingPageWithAction}
            onChangeMode={handleChangeModeBMS}
            onTurnOnAllOutputBMS={handleTurnOnAllOutputBMS}
            onTurnOffAllOutputBMS={handleTurnOffAllOutputBMS}
            onSyncTimeBMS={handleSyncTimeBMS}
            onTurnOnMultiDevices={handleTurnSingleOutputMultiDevicesBMS}
            onTurnOffMultiDevices={handleTurnSingleOutputMultiDevicesBMS}
            onSetupTemperatureBMS={handleSetupTemperatureBMS}
          />
          <div className="w-full">
            <TableThietBiBMS
              isLoading={isLoadingPageWithAction}
              dataSelectBMS={bmsSelected}
              onSetBMSSelected={handleSelectedBMS}
              onTurnSingleOutputDevicesBMS={handleTurnSingleOutputDevicesBMS}
              dataColumnFiltersBMS={dataColumnFiltersBMS}
              onSetDataColumnFiltersBMS={setDataColumnFiltersBMS}
              dataPagination={pagination}
              onSetDataPagination={setPagination}
            />
          </div>
        </div>
      </section>
      <ButtonScrollToTop />
    </>
  )
}

export default ThietLapThuCong
