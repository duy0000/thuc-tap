import { useCallback, useState } from 'react'
import TableThietBiBMS from '../TableBMS'
import GroupSetupSchedule from './GroupSetupSchedule'
import Swal from 'sweetalert2'
import { assign, map } from 'lodash-unified'
import {
  initialPagination,
  KEY_STORE_BMS,
  SYNC_STATUS_DEFAULT,
} from '../constants'
import { useMutation } from '@tanstack/react-query'
import { apiBMSController } from '@/Apis/ApiGiangVien/BoDieuKhienBMS'
import LoadingProgress from '@/Components/LoadingProgress'

function CauHinhLapLichThietBiBMS() {
  const [bmsSelected, setBmsSelected] = useState([])
  const [isHandling, setIsHandling] = useState(false)
  const [pagination, setPagination] = useState(initialPagination)

  const { mutateAsync: mutateSetupScheduleBMS } = useMutation({
    mutationKey: [KEY_STORE_BMS.SETUP_SCHEDULE_BMS_CONTROLLER],
    mutationFn: async (data) => {
      const res = await apiBMSController.postSetupScheduleBMSController(data)
      return res
    },
  })

  const handleSelectedBMS = useCallback((data) => {
    setBmsSelected(data)
  }, [])

  const validationCommonBMS = () => {
    if (bmsSelected.length === 0) {
      setIsHandling(false)
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng chọn ít nhất 1 thiết bị BMS để thao tác!',
      })
      return true
    }

    if (bmsSelected.find((i) => i?.trang_thai === 0)) {
      setIsHandling(false)
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng không chọn thiết bị BMS mất kết nối!',
      })
      return true
    }

    if (bmsSelected.find((i) => i?.trang_thai_lenh === false)) {
      setIsHandling(false)
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng không chọn thiết bị đang có lệng thực thi!',
      })
      return true
    }
  }

  const handleSetupScheduleBMS = (values) => {
    // if (bmsSelected?.length === 0 || !bmsSelected) {
    //   return Swal.fire({
    //     icon: 'error',
    //     title: 'Lỗi',
    //     text: 'Vui loại chọn ít nhất 1 thiết bị BMS để thay đổi lịch thiết lập!',
    //   })
    // }
    setIsHandling(true)
    if (validationCommonBMS()) {
      setIsHandling(false)
      return
    }

    const checkBMSDisconnect = bmsSelected.some(
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

    const newDataBMSSelected = map(bmsSelected, (item) => {
      return assign({
        ...values,
        ipadd: item?.ipadd,
        syn_service: item?.syn_service.toString(),
        syn_status: SYNC_STATUS_DEFAULT,
        output: '1',
        date_event: values?.date_event,
      })
    })
    setIsHandling(true)
    mutateSetupScheduleBMS(newDataBMSSelected)
      .then((res) => {
        if (res.status === 200 && res?.data?.length === bmsSelected?.length) {
          Swal.fire({
            icon: 'success',
            title: 'Thông báo!',
            text: `Thiết lập lịch cho ${bmsSelected?.length} thiết bị BMS thành công!`,
          })
        }
        return
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: `Thiết lập lịch cho ${bmsSelected?.length} thiết bị BMS thất bại!`,
          footer: 'Vui lòng liên hệ đến bộ phận kỹ thuật để khắc phục sự cố!',
        })
        console.log(':::[ERROR]::: : ', err)
      })
      .finally(() => {
        setIsHandling(false)
      })
  }

  return (
    <>
      <section>
        <h3 className="text-center font-bold uppercase text-lg lg:text-2xl text-cyan-700 mb-6">
          Cấu hình lập lịch
        </h3>
        <div className="bms-data">
          <div className="mb-6">
            <GroupSetupSchedule
              isHandling={isHandling}
              bmsSelected={bmsSelected}
              onSubmitSchedule={handleSetupScheduleBMS}
            />
          </div>
          <div className="">
            <TableThietBiBMS
              isLoading={isHandling}
              dataSelectBMS={bmsSelected}
              onSetBMSSelected={handleSelectedBMS}
              dataPagination={pagination}
              onSetDataPagination={setPagination}
            />
          </div>
        </div>
      </section>
      {isHandling && (
        <LoadingProgress
          loading={isHandling}
          selectedItems={bmsSelected?.length}
        />
      )}
    </>
  )
}

export default CauHinhLapLichThietBiBMS
