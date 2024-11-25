import { useCallback, useEffect, useMemo, useState } from 'react'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic.js'

import { DataSinhVien } from '@/Services/Utils/dataSinhVien.js'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV.js'
import {
  getKiemTraTrung_BaoHong_MaSinhVien,
  postYeuCauBaoHongTaiSan,
} from '@/Apis/HoTroThietBi/apiTaiSan.js'
import BaoHongTaiSanView from './BaoHongTaiSanView'
import Swal from 'sweetalert2'
import { required } from '@/Services/Validators/required'
import { dayjs } from '@/Services/Utils/dayjs'
import { isEmpty, isNull } from 'lodash-unified'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import { useQueries } from '@tanstack/react-query'
import { HoTroTBPM_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/HoTroTBPM.querykey'
import apiHoTroTBPM from '@/Apis/Common/apiHoTroTBPM'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const FILE_TYPE = ['image/jpeg', 'image/jpg', 'image/png']
const initialDataForm = {
  DT_QLTS_TS_HoTroThietBi_IDTaiSan: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_IDPhong: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa: '',
  DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
  DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
  DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail: 'null',
  DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '',
  DT_QLTS_TS_HoTroThietBi_XacNhan_NgayXacNhan: '',
  DT_QLTS_TS_HoTroThietBi_LoaiBaoHong: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_TenFile: '',
  DT_QLTS_TS_HoTroThietBi_BaoHong_DataFile: '',
}

const BaoHongTaiSan = () => {
  const dataSinhVien = DataSinhVien()
  const dataCBGV = DataCanBoGV()

  const [dataFormSubmit, setDataFormSubmit] = useState(initialDataForm)
  const [selectedTaiSan, setSelectedTaiSan] = useState([])

  const [nhomBaoHong, setNhomBaoHong] = useState({ id: '', value: '' })
  const [hinhThucBaoHong, setHinhThucBaoHong] = useState('')

  const [idPhong, setIdPhong] = useState('')

  const [searchPhong, setSearchPhong] = useState('')
  const [selectedPhong, setSelectedPhong] = useState(null)

  const [linhVucSuCo, setLinhVucSuCo] = useState(null)
  const [tenSuCo, setTenSuCo] = useState([])

  const [dataViTri, setDataViTri] = useState({
    DT_QLP_Phong_CoSo: ' ',
    DT_QLP_Phong_DiaDiem: ' ',
    DT_QLP_Phong_ToaNha: ' ',
    DT_QLP_Phong_Tang: ' ',
    DT_QLP_Phong_Phong: ' ',
  })

  const [attackFile, setAttackFile] = useState({
    name: '',
    link: '',
    dataFileBase64: '',
  })

  const roleViewBaoHong = dataSinhVien.Role ? 'SV' : 'GV'

  // event: resetFullDataState
  const resetFullDataState = () => {
    setSelectedTaiSan([])
    setNhomBaoHong({ id: '', value: '' })
    setHinhThucBaoHong('')
    setIdPhong('')
    setTenSuCo([])
    setDataViTri({
      DT_QLP_Phong_CoSo: '',
      DT_QLP_Phong_DiaDiem: ' ',
      DT_QLP_Phong_ToaNha: ' ',
      DT_QLP_Phong_Tang: ' ',
      DT_QLP_Phong_Phong: ' ',
    })
    setAttackFile({
      name: '',
      link: '',
      dataFileBase64: '',
    })
    setDataFormSubmit(initialDataForm)
    setLinhVucSuCo(null)
  }

  // event: chọn nhóm báo hỏng
  const handleSelectNhomBaoHong = (e) => {
    const { id, value } = e.target

    if (id === '2') {
      setHinhThucBaoHong('2')
    }
    setNhomBaoHong({ ...nhomBaoHong, id, value })
    setLinhVucSuCo(null)
  }

  // event: chọn hình thức báo hỏng
  const handleSelectHinhThucBaoHong = (e) => {
    const { id } = e.target
    setHinhThucBaoHong(id)
  }

  // event: chọn tài sản
  const handleSelectTaiSan = (e, taiSan) => {
    const selectedIndex = selectedTaiSan.findIndex(
      (item) => item.DT_QLTS_TS_ID === taiSan.DT_QLTS_TS_ID,
    )

    if (selectedIndex !== -1) {
      const newTaiSanSelected = [...selectedTaiSan]
      newTaiSanSelected.splice(selectedIndex, 1)
      setSelectedTaiSan(newTaiSanSelected)
    } else {
      setSelectedTaiSan(() => [taiSan])
    }
  }

  // event: Change vị trí
  const handleChangeViTri = (e) => {
    const { id, value } = e.target

    // Nếu giá trị là rỗng, reset tất cả các trường
    if (value === '') {
      setDataViTri({
        DT_QLP_Phong_CoSo: '',
        DT_QLP_Phong_DiaDiem: '',
        DT_QLP_Phong_ToaNha: '',
        DT_QLP_Phong_Tang: '',
        DT_QLP_Phong_Phong: '',
      })
      setIdPhong('')
      setSearchPhong('')
      return
    }

    const resetFields = {
      DT_QLP_Phong_CoSo: [
        'DT_QLP_Phong_DiaDiem',
        'DT_QLP_Phong_ToaNha',
        'DT_QLP_Phong_Tang',
        'DT_QLP_Phong_Phong',
      ],
      DT_QLP_Phong_DiaDiem: [
        'DT_QLP_Phong_ToaNha',
        'DT_QLP_Phong_Tang',
        'DT_QLP_Phong_Phong',
      ],
      DT_QLP_Phong_ToaNha: ['DT_QLP_Phong_Tang', 'DT_QLP_Phong_Phong'],
      DT_QLP_Phong_Tang: ['DT_QLP_Phong_Phong'],
    }

    let updatedDataViTri = { ...dataViTri, [id]: value }

    if (resetFields[id]) {
      resetFields[id].forEach((field) => {
        updatedDataViTri[field] = ''
      })
      setIdPhong('')
      setSearchPhong('')
    } else if (id !== 'DT_QLP_Phong_Phong') {
      updatedDataViTri.DT_QLP_Phong_Phong = ''
      setIdPhong('')
      setSearchPhong('')
    }

    setDataViTri(updatedDataViTri)

    // Cập nhật idPhong nếu thay đổi phòng
    if (id === 'DT_QLP_Phong_Phong') {
      setIdPhong(value)
    }
  }

  console.log('dataViTri: ', dataViTri)

  const validateSubmitData = () => {
    const {
      DT_QLP_Phong_CoSo,
      DT_QLP_Phong_DiaDiem,
      DT_QLP_Phong_ToaNha,
      DT_QLP_Phong_Phong,
    } = dataViTri
    return [
      required(DT_QLP_Phong_CoSo, 'Vui lòng chọn cơ sở!'),
      required(DT_QLP_Phong_DiaDiem, 'Vui lòng chọn địa điểm!'),
      required(DT_QLP_Phong_ToaNha, 'Vui lòng chọn tòa nhà!'),
      required(DT_QLP_Phong_Phong, 'Vui lòng chọn phòng!'),
      required(
        dataFormSubmit.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa.trim(),
        'Vui lòng nhập mô tả sự cố!',
      ),
      required(tenSuCo, 'Vui lòng chọn tên sự cố!'),
      required(hinhThucBaoHong, 'Vui lòng chọn hình thức báo hỏng!'),
    ].every((e) => e === true)
  }

  const validateSubmitDataPhanMem = () => {
    return [
      required(
        dataFormSubmit.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa.trim(),
        'Vui lòng nhập mô tả sự cố!',
      ),
      required(tenSuCo, 'Vui lòng chọn tên sự cố!'),
    ].every((e) => e === true)
  }

  // event: Chọn sự cố
  const handleChooseSuCo = (data) => {
    if (isNull(data)) {
      Swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra!',
        text: 'Vui lòng ấn F5 để load lại trang hoặc liên hệ bộ phận kỹ thuật để khắc phục!',
      })
      return
    }

    setTenSuCo([...data])
  }
  const handleChooseLinhVucSuCo = (data) => {
    setLinhVucSuCo(data)
  }

  // event: gửi báo hỏng + phân công công việc
  const handleSubmit = async () => {
    let currentTime = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    if (nhomBaoHong.id === '1' && !validateSubmitData()) return
    if (nhomBaoHong.id === '2' && !validateSubmitDataPhanMem()) return

    if (tenSuCo.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn tên sự cố!',
      })
    }

    if (isEmpty(dataFormSubmit.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa.trim())) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập mô tả sự cố!',
      })
    }

    if (hinhThucBaoHong === '2' && selectedTaiSan.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn 1 tài sản cần báo hỏng!',
      })
    }

    let dataListTenSuCo = tenSuCo.map((i) => i?.DT_CVNB_TBGD_TL_Ten).join('; ')

    const dataBaoHong = {
      DT_QLTS_TS_HoTroThietBi_IDTaiSan: selectedTaiSan[0]?.DT_QLTS_TS_ID,
      DT_QLTS_TS_HoTroThietBi_BaoHong_IDPhong: idPhong,
      DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu:
        dataCBGV?.MaNhanSu ?? dataSinhVien?.MaSinhVien,
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: dataListTenSuCo,
      DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: currentTime,
      DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa:
        dataFormSubmit.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa,
      DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail: 'null',
      DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '',
      DT_QLTS_TS_HoTroThietBi_XacNhan_NgayXacNhan: '',
      DT_QLTS_TS_HoTroThietBi_NguonTiepNhan: NguonTiepNhan_WEB,
      DT_QLTS_TS_HoTroThietBi_LoaiBaoHong: nhomBaoHong.value || '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenFile: attackFile.name ?? '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_DataFile:
        attackFile.dataFileBase64?.split('base64,')[1] ?? '',
    }

    if (roleViewBaoHong === 'SV') {
      const checkedDuplicate = await getKiemTraTrung_BaoHong_MaSinhVien(
        dataSinhVien?.MaSinhVien,
      )

      if (checkedDuplicate >= 1) {
        Swal.fire({
          icon: 'error',
          title: 'Bạn đã gửi yêu cầu báo hỏng trước đấy!',
          text: 'Bạn đã có 1 yêu cầu báo hỏng đang chờ xử lý. Vui lòng chờ cán bộ xử lý xác nhận hoàn thành yêu cầu trước đấy!',
        })
        return
      }
    }

    try {
      const res = await postYeuCauBaoHongTaiSan(dataBaoHong)
      resetFullDataState()
      if (res === true) {
        Swal.fire({
          icon: 'success',
          title: 'Gửi yêu cầu báo hỏng thành công!',
          text: `Bạn đã báo hỏng thành công!`,
        })
        return
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: 'Vui lòng liên hệ quản trị phần mềm để khắc phục sự cố!',
        })
      }
    } catch (error) {
      console.log(error)
      resetFullDataState()
    }
  }

  // event: Chọn ảnh
  const handleChooseFile = async (event) => {
    const file = event.target.files[0]

    // Validate File Size: Max: 5 MB
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: 'File quá lớn!',
        text: 'Vui lòng chọn file nhỏ hơn 5MB',
      })
      return
    }

    // Validate File Type: image
    if (!FILE_TYPE.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'File không đúng định dạng!',
        text: 'Vui lòng chọn file ảnh có định dạng .jpg, .jpeg, .png',
      })
      return
    }

    const linkBlob = URL.createObjectURL(file)
    const dataFileBase64 = await convertDataFileToBase64(file)

    setAttackFile({
      name: file.name,
      link: linkBlob,
      dataFileBase64,
    })
  }

  // event: Remove ảnh
  const handleRemoveFile = () => {
    setAttackFile({
      name: '',
      link: '',
      dataFileBase64: '',
    })
  }

  const isFetchToaNha = useMemo(() => {
    return (
      !isEmpty(dataViTri?.DT_QLP_Phong_CoSo.trim()) &&
      !isEmpty(dataViTri?.DT_QLP_Phong_DiaDiem.trim())
    )
  }, [dataViTri.DT_QLP_Phong_CoSo, dataViTri.DT_QLP_Phong_DiaDiem])
  const isFetchDataTang = useMemo(() => {
    return (
      !isEmpty(dataViTri?.DT_QLP_Phong_CoSo.trim()) &&
      !isEmpty(dataViTri?.DT_QLP_Phong_DiaDiem.trim()) &&
      !isEmpty(dataViTri?.DT_QLP_Phong_ToaNha.trim())
    )
  }, [
    dataViTri.DT_QLP_Phong_CoSo,
    dataViTri.DT_QLP_Phong_DiaDiem,
    dataViTri.DT_QLP_Phong_ToaNha,
  ])
  const isFetchDataPhong = useMemo(() => {
    return (
      !isEmpty(dataViTri?.DT_QLP_Phong_CoSo.trim()) &&
      !isEmpty(dataViTri?.DT_QLP_Phong_DiaDiem.trim()) &&
      !isEmpty(dataViTri?.DT_QLP_Phong_ToaNha.trim()) &&
      !isEmpty(dataViTri?.DT_QLP_Phong_Tang.trim())
    )
  }, [
    dataViTri.DT_QLP_Phong_CoSo,
    dataViTri.DT_QLP_Phong_DiaDiem,
    dataViTri.DT_QLP_Phong_ToaNha,
    dataViTri.DT_QLP_Phong_Tang,
  ])

  const isFetchingThietBiPhanMem = useMemo(() => {
    return isEmpty(idPhong) && !!nhomBaoHong?.value
  }, [idPhong, nhomBaoHong.value])

  const [
    dataLinhVucSuCoQuery,
    dataToaNhaQuery,
    dataTangQuery,
    dataPhongQuery,
    dataSuCoQuery,
    dataTaiSanQuery,
  ] = useQueries({
    queries: [
      {
        queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_LINHVUC_SUCO, nhomBaoHong.value],
        queryFn: async () => {
          try {
            const res = await apiHoTroTBPM.getDanhSachLinhVucSuCo({
              DT_CVNB_TBGD_TL_Nhom4: nhomBaoHong.value || '',
            })
            return res?.data?.code === 200 ? res?.data?.body : []
          } catch (error) {
            return []
          }
        },
      },
      {
        queryKey: [
          HoTroTBPM_QUERY_KEY.GET_DS_TOA_NHA,
          dataViTri.DT_QLP_Phong_CoSo,
          dataViTri.DT_QLP_Phong_DiaDiem,
        ],
        queryFn: async () => {
          try {
            const res = await apiHoTroTBPM.getDanhSachToaNha({
              DT_QLP_Phong_CoSo: dataViTri.DT_QLP_Phong_CoSo || '',
              DT_QLP_Phong_DiaDiem: dataViTri.DT_QLP_Phong_DiaDiem || '',
            })
            return res?.data?.code === 200 ? res?.data?.body : []
          } catch (error) {
            return []
          }
        },
        enabled: isFetchToaNha,
      },
      {
        queryKey: [
          HoTroTBPM_QUERY_KEY.GET_DS_TANG,
          dataViTri.DT_QLP_Phong_CoSo,
          dataViTri.DT_QLP_Phong_DiaDiem,
          dataViTri.DT_QLP_Phong_ToaNha,
        ],
        queryFn: async () => {
          try {
            const res = await apiHoTroTBPM.getDanhSachTang({
              DT_QLP_Phong_CoSo: dataViTri.DT_QLP_Phong_CoSo || '',
              DT_QLP_Phong_DiaDiem: dataViTri.DT_QLP_Phong_DiaDiem || '',
              DT_QLP_Phong_ToaNha: dataViTri.DT_QLP_Phong_ToaNha || '',
            })
            return res?.data?.code === 200 ? res?.data?.body : []
          } catch (error) {
            return []
          }
        },
        enabled: isFetchDataTang,
      },
      {
        queryKey: [
          HoTroTBPM_QUERY_KEY.GET_DS_PHONG_BAN_KHU_VUC,
          dataViTri.DT_QLP_Phong_CoSo,
          dataViTri.DT_QLP_Phong_DiaDiem,
          dataViTri.DT_QLP_Phong_ToaNha,
          dataViTri.DT_QLP_Phong_Tang,
        ],
        queryFn: async () => {
          try {
            const res = await apiHoTroTBPM.getDanhSachPhong({
              DT_QLP_Phong_CoSo: dataViTri.DT_QLP_Phong_CoSo || '',
              DT_QLP_Phong_DiaDiem: dataViTri.DT_QLP_Phong_DiaDiem || '',
              DT_QLP_Phong_ToaNha: dataViTri.DT_QLP_Phong_ToaNha || '',
              DT_QLP_Phong_Tang: dataViTri.DT_QLP_Phong_Tang || '',
            })
            return res?.data?.code === 200 ? res?.data?.body : []
          } catch (error) {
            return []
          }
        },
        enabled: isFetchDataPhong,
      },
      {
        queryKey: [
          HoTroTBPM_QUERY_KEY.GET_DS_TEN_SU_CO,
          linhVucSuCo,
          nhomBaoHong.value,
        ],
        queryFn: async () => {
          try {
            const res = await apiHoTroTBPM.getDanhSachSuCoByHoTroThietBi({
              DT_CVNB_TBGD_TL_Nhom1: 'HoTroThietBi',
              DT_CVNB_TBGD_TL_Nhom2: 'DanhSachSuCo',
              DT_CVNB_TBGD_TL_Nhom3: linhVucSuCo?.DT_CVNB_TBGD_TL_Nhom3 ?? '',
              DT_CVNB_TBGD_TL_Nhom4: nhomBaoHong.value,
            })
            return res?.data?.code === 200 ? res?.data?.body : []
          } catch (error) {
            return []
          }
        },
        enabled: !isEmpty(linhVucSuCo) && !isEmpty(nhomBaoHong.value),
      },
      {
        queryKey: [
          HoTroTBPM_QUERY_KEY.GET_DS_THIET_BI_PHAN_MEM,
          idPhong,
          nhomBaoHong.value,
        ],
        queryFn: async () => {
          try {
            const res = await apiHoTroTBPM.getDanhSachTaiSan({
              DT_QLTS_TS_PhongHienTai: idPhong.toString() || '',
              DT_QLTS_TS_NhomTaiSan: nhomBaoHong.value || '',
            })
            return res?.data?.code === 200 ? res?.data?.body : []
          } catch (error) {
            return []
          }
        },
        enabled: isFetchingThietBiPhanMem,
      },
    ],
  })

  useEffect(() => {
    setSelectedPhong({})
    setSearchPhong('')
    setIdPhong('')
    setDataViTri({ ...dataViTri, DT_QLP_Phong_Phong: '' })
  }, [dataViTri.DT_QLP_Phong_Tang])

  const handleChangeValueForm = useCallback((e) => {
    const { id, value } = e.target
    setDataFormSubmit({ ...dataFormSubmit, [id]: value })
  })

  return (
    <BaoHongTaiSanView
      isLoadingTaiSan={dataTaiSanQuery.isLoading}
      listToaNha={dataToaNhaQuery.data}
      listTang={dataTangQuery.data}
      listPhong={dataPhongQuery.data}
      listTaiSan={dataTaiSanQuery.data}
      listLinhVucSuCo={dataLinhVucSuCoQuery.data}
      listSuCo={dataSuCoQuery.data}
      searchPhong={searchPhong}
      selectedPhong={selectedPhong}
      onSelectedPhong={setSelectedPhong}
      onSetSearchPhong={setSearchPhong}
      onSetIdPhong={setIdPhong}
      selectedTaiSan={selectedTaiSan}
      onSelectTaiSan={handleSelectTaiSan}
      dataViTri={dataViTri}
      onChangeViTri={handleChangeViTri}
      onSetDataViTri={setDataViTri}
      dataNhomBaoHong={nhomBaoHong}
      onSelectNhomBaoHong={handleSelectNhomBaoHong}
      dataHinhThucBaoHong={hinhThucBaoHong}
      onSelectHinhThucBaoHong={handleSelectHinhThucBaoHong}
      dataLinhVucSuCo={linhVucSuCo}
      onSelectLinhVucSuCo={handleChooseLinhVucSuCo}
      dataTenSuCo={tenSuCo}
      onSelectTenSuCo={handleChooseSuCo}
      dataFormSubmit={dataFormSubmit}
      onChangeValueForm={handleChangeValueForm}
      onSubmit={handleSubmit}
      dataAttackFile={attackFile}
      onChooseFile={handleChooseFile}
      onRemoveFile={handleRemoveFile}
    />
  )
}

export default BaoHongTaiSan
