// /* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import CauHinhLapLichBMSView from './CauHinhLapLichBMSView'
import { useFormik } from 'formik'
import { getAllRemoteControllBMS } from '@/Apis/ApiGiangVien/BoDieuKhienBMS/apiBoDieuKhienBMS'
import dayjs from 'dayjs'

export default function CauHinhLapLichBMS() {
  const initialFormData = {
    idcmd: 'set_schedule',
    date_event: dayjs().format('YYYY-MM-DD'),
    number_schedule: 0,
    output: '1',
    on1: '',
    off1: '',
    on2: '',
    off2: '',
    on3: '',
    off3: '',
    on4: '',
    off4: '',
    on5: '',
    off5: '',
    on6: '',
    off6: '',
    on7: '',
    off7: '',
    on8: '',
    off8: '',
    on9: '',
    off9: '',
    on10: '',
    off10: '',
    on11: '',
    off11: '',
    on12: '',
    off12: '',
  }
  const [formData, setFormData] = useState(initialFormData)
  const [listBMSController, setListBMSController] = useState([])
  const formikSetupScheduleBMS = useFormik({
    initialValues: initialFormData,
  })

  const [numSchedule, setNumSchedule] = useState(0)
  const [selected, setSelected] = useState([])

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

  // event selected all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listBMSController?.map((n) => n)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  // event selected one row
  const handleClickSelect = (event, bmsItem) => {
    const selectedItem = selected?.some((item) => item?.iden === bmsItem?.iden)
    let newSelected = []
    if (selectedItem) {
      newSelected = selected?.filter((item) => item?.iden !== bmsItem?.iden)
      setSelected(newSelected)
    } else {
      newSelected = [...selected, bmsItem]
      setSelected(newSelected)
    }
  }

  // function check row is selected
  const isSelected = (bmsItem) =>
    selected.some((item) => item?.iden === bmsItem?.iden)

  useEffect(() => {
    const intervalGetBMSController = setInterval(getListBMSController, 500)

    return () => {
      clearInterval(intervalGetBMSController)
      setListBMSController([])
    }
  }, [])

  return (
    <CauHinhLapLichBMSView
      onSubmitForm={formikSetupScheduleBMS.handleSubmit}
      listRemoteControllBMS={listBMSController}
      numSchedule={numSchedule}
      onChangeNumSchedule={setNumSchedule}
      numSelected={selected.length ?? 0}
      onSelectAllClick={handleSelectAllClick}
      onSelected={handleClickSelect}
      isSelected={isSelected}
      formData={formData}
      dataSelected={selected}
      setSelected={setSelected}
      setFormData={setFormData}
      initialFormData={initialFormData}
    />
  )
}
