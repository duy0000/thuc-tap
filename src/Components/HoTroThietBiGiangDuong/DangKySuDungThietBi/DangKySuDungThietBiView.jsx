import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { breadcrumbs, home } from './constants'
import DanhSachLichDay from './DanhSachLichDay'
import DanhSachThietBi from './DanhSachThietBi'
import HuongDanSuDung from './HuongDanSuDung'
import { useMutation, useQueries } from '@tanstack/react-query'
import { HoTroTBGD_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/HoTroTBGD.querykey'
import {
  getTBGDLichDachByMaNhanSu,
  getTBGDMuonThietBi_KiemTraTrung,
  getTBGDTaiSanThietBi,
  postTBGDDangKySuDungThietBi,
  putTBGDMuonPara,
} from '@/Apis/HoTroThietBiGiangDuong/apiDangKySuDungThietBi'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { isEmpty } from 'lodash-unified'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import Swal from 'sweetalert2'
import { dayjs } from '@/Services/Utils/dayjs'
import { asyncPool } from '@/Services/Utils/poolData'

const DangKySuDungThietBiView = memo(function DangKySuDungThietBiView() {
  const DataCBGV = DataCanBoGV()
  const inititalDataSubmit = {
    DT_CVNB_TBGD_GuiYeuCau_IDLichHoc: '',
    DT_CVNB_TBGD_GuiYeuCau_IDTaiSan: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Loai: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Loai1: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Loai2: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Loai3: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Loai4: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Ten: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_DonVi: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_MoTa: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_LyDo: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_GhiChu: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu: DataCBGV.MaNhanSu ?? '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_HoTen:
      DataCBGV.HoDem + ' ' + DataCBGV.Ten,
    DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_SoDienThoai: DataCBGV.SoDienThoai,
    DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_Email: DataCBGV.EmailUneti,
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_MaNhanSu: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_HoTen: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_Email: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_SoDienThoai: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_Ngay: '',
  }
  const initialMuonPara = {
    DT_CVNB_TBGD_ID: '',
    DT_CVNB_TBGD_Giao_DanhSachThietBi: '',
    DT_CVNB_TBGD_Giao_MaNhanSu: DataCBGV.MaNhanSu ?? '',
    DT_CVNB_TBGD_Giao_HoTen: DataCBGV.HoDem + ' ' + DataCBGV.Ten,
    DT_CVNB_TBGD_Giao_Ngay: dayjs(new Date()).format('YYYY/MM/DD'),
    DT_CVNB_TBGD_Giao_GhiChu: '',
    DT_CVNB_TBGD_GhiChu: '',
  }
  const [lichDaySelected, setLichDaySelected] = useState([])
  const [thietBiSelected, setThietBiSelected] = useState([])
  const [dataSubmit, setDataSubmit] = useState(inititalDataSubmit)

  // QUERY DATA
  const [dataLichDayGiangVien, dataTBGDTaiSanChoMuon] = useQueries({
    queries: [
      {
        queryKey: [
          HoTroTBGD_QUERY_KEY.SP_DT_CVNB_TBGD_GuiYeuCau_Load_LichDay_ByMaNhanSu,
          DataCBGV.MaNhanSu,
        ],
        queryFn: async () => {
          const response = await getTBGDLichDachByMaNhanSu({
            DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu: DataCBGV.MaNhanSu,
          })
          return response
        },
      },
      {
        queryKey: [
          HoTroTBGD_QUERY_KEY.SP_DT_CVNB_TBGD_GuiYeuCau_Load_TS_ChoMuon,
        ],
        queryFn: async () => {
          const response = await getTBGDTaiSanThietBi()
          return response
        },
      },
    ],
  })

  // MUTATION
  const { mutateAsync: mutateDangKyYeuCau } = useMutation({
    mutationFn: async (data = {}) => {
      const response = await postTBGDDangKySuDungThietBi(data)
      return response
    },
  })
  const { mutate: mutateMuonThietBiPara } = useMutation({
    mutationFn: async (data = {}) => {
      const response = await putTBGDMuonPara(data)
      return response
    },
  })
  const { mutateAsync: mutateKiemTraTrung } = useMutation({
    mutationFn: async (
      params = {
        DT_CVNB_TBGD_GuiYeuCau_IDLichHoc: '',
        DT_CVNB_TBGD_GuiYeuCau_IDTaiSan: '',
      },
    ) => {
      const response = await getTBGDMuonThietBi_KiemTraTrung(params)
      return response
    },
  })

  const _isEmptyData = useMemo(() => {
    return (
      isEmpty(lichDaySelected) ||
      lichDaySelected.length === 0 ||
      isEmpty(thietBiSelected) ||
      thietBiSelected.length === 0
    )
  }, [lichDaySelected, thietBiSelected])
  const handleChangeValue = (e) => {
    const { name, value } = e.target
    setDataSubmit({ ...dataSubmit, [name]: value })
  }

  const handleSelectedLichDay = (type = 'single' | 'all', dataLichDay) => {
    if (type === 'single') {
      setLichDaySelected((prevDSLichDay) =>
        prevDSLichDay.some((item) => item?.Id === dataLichDay?.Id)
          ? prevDSLichDay.filter((item) => item.Id !== dataLichDay?.Id)
          : [...prevDSLichDay, dataLichDay],
      )
    } else {
      setLichDaySelected((prevDSLichDay) => {
        const allLichDayIds =
          dataLichDayGiangVien.data?.data?.body?.map((item) => item) || []

        return prevDSLichDay.length === allLichDayIds.length
          ? []
          : allLichDayIds
      })
    }
  }

  const handleSelectedTaiSan = async (type = 'single' | 'all', dataTaiSan) => {
    if (lichDaySelected.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn lịch dạy trước khi chọn thiết bị muốn đăng ký sử dụng!',
      })
      return
    }

    let _arrayDuplicate = []
    for (const ld of lichDaySelected) {
      try {
        const _responseMuonTB = await mutateKiemTraTrung({
          DT_CVNB_TBGD_GuiYeuCau_IDLichHoc: ld?.Id,
          DT_CVNB_TBGD_GuiYeuCau_IDTaiSan: dataTaiSan.DT_QLTS_TS_ID,
        })

        if (
          _responseMuonTB?.data?.code === 200 &&
          _responseMuonTB?.data?.body?.length > 0
        ) {
          _arrayDuplicate.push({
            TenLichDay: ld?.DT_CVNB_TBGD_LichHoc_TenHocPhan,
            NgayDay: ld?.DT_CVNB_TBGD_LichHoc_NgayBatDau
              ? dayjs(ld?.DT_CVNB_TBGD_LichHoc_NgayBatDau).format('DD/MM/YYYY')
              : '',
            TenTaiSan: dataTaiSan?.DT_QLTS_TS_TenTaiSan,
          })
        }
      } catch (error) {
        console.error('Error checking duplicate:', error)
      }
    }

    if (_arrayDuplicate.length > 0) {
      let _listThietBiMuon = _arrayDuplicate
        .map((item) => {
          return `<li>- Thiết bị <b>${item.TenTaiSan}</b> đã được đăng ký mượn trước đấy cho lịch dạy môn <b>${item.TenLichDay}</b> ngày <b>${item.NgayDay}</b></li>`
        })
        .join('<br/>')
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        html: `<ul>${_listThietBiMuon}</ul>
        <p>Vui lòng đợi xác nhận hoặc đăng ký lại sau!</p>
        `,
      })
      return
    }

    if (type === 'single') {
      setThietBiSelected((prevDSThietBi) =>
        prevDSThietBi.find(
          (tbs) =>
            tbs.DT_CVNB_TBGD_GuiYeuCau_IDTaiSan === dataTaiSan.DT_QLTS_TS_ID,
        )
          ? prevDSThietBi.filter(
              (tbs) =>
                tbs.DT_CVNB_TBGD_GuiYeuCau_IDTaiSan !==
                dataTaiSan.DT_QLTS_TS_ID,
            )
          : [
              ...prevDSThietBi,
              {
                DT_CVNB_TBGD_GuiYeuCau_IDTaiSan: dataTaiSan.DT_QLTS_TS_ID,
                DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Ten:
                  dataTaiSan.DT_QLTS_TS_TenTaiSan,
                DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong: 1,
              },
            ],
      )
    } else {
      setThietBiSelected((prevDSLichDay) => {
        if (dataTBGDTaiSanChoMuon.data?.data?.body?.length > 0) {
          const dataDSThietBi = dataTBGDTaiSanChoMuon.data?.data?.body.map(
            (tb) => {
              return {
                DT_CVNB_TBGD_GuiYeuCau_IDTaiSan: tb.DT_QLTS_TS_ID,
                DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Ten: tb.DT_QLTS_TS_TenTaiSan,
                DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong: 1,
              }
            },
          )
          return prevDSLichDay.length ===
            dataTBGDTaiSanChoMuon.data?.data?.body?.length
            ? []
            : dataDSThietBi
        }

        return []
      })
    }
  }

  const handleChangeQuantity = useCallback((idTaiSan, quantity) => {
    setThietBiSelected((prevDSThietBi) => {
      return prevDSThietBi.map((tbs) => {
        // Kiểm tra nếu cần cập nhật số lượng, nếu không trả về object hiện tại
        if (tbs.DT_CVNB_TBGD_GuiYeuCau_IDTaiSan === idTaiSan) {
          // Nếu số lượng không thay đổi, trả về object cũ để tránh re-render
          if (tbs.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong === quantity) {
            return tbs
          }
          return {
            ...tbs,
            DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong: Math.round(quantity),
          }
        }
        return tbs
      })
    })
  }, [])

  const handleSubmitData = async () => {
    if (isEmpty(lichDaySelected)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn lịch dạy để đăng ký sử dụng!',
      })
      return
    }

    if (isEmpty(thietBiSelected)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn thiết bị muốn đăng ký sử dụng!',
      })
      return
    }

    if (
      thietBiSelected.length > 0 &&
      thietBiSelected.some(
        (tbs) => tbs.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong < 1,
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Thiết bị đăng ký phải có số lượng lớn hơn 0!',
      })
      return
    }

    const listThietBiDangKy = thietBiSelected
      .map((tbs) => {
        return tbs.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Ten
      })
      .join('; ')

    let _dataSubmit = [],
      _dataMuonThietBi = []

    lichDaySelected.forEach((lichDay) => {
      const baseSubmit = {
        ...dataSubmit,
        DT_CVNB_TBGD_GuiYeuCau_IDLichHoc: lichDay?.Id,
      }

      thietBiSelected.forEach((thietBi) => {
        _dataSubmit.push({
          ...baseSubmit,
          ...thietBi,
        })
      })

      _dataMuonThietBi.push({
        ...initialMuonPara,
        DT_CVNB_TBGD_ID: lichDay?.DT_CVNB_TBGD_ID,
        DT_CVNB_TBGD_Giao_DanhSachThietBi: listThietBiDangKy,
      })
    })

    let _countSuccess = 0,
      _countDuplicate = 0
    try {
      const multiRes = await asyncPool(5, _dataSubmit, mutateDangKyYeuCau)

      multiRes.some((res) => {
        if (
          res.data.code === 200 &&
          res.data?.message !== 'Bản ghi bị trùng.'
        ) {
          _countSuccess++
        } else if (
          res.data?.code === 409 &&
          res.data?.message === 'Bản ghi bị trùng.'
        ) {
          _countDuplicate++
        }
      })

      await asyncPool(5, _dataMuonThietBi, mutateMuonThietBiPara)
      if (_countSuccess > 0 && _countDuplicate > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Thông báo',
          html: `
            <ul>
              <li>- Thầy cô đã đăng ký sử dụng ${_countSuccess} thiết bị thành công!</li>
              <li style="color: red">- Thầy cô đã đăng ký sử dụng ${_countDuplicate} thiết bị trước đấy. Vui lòng không đăng ký lại khi chưa được xác nhận!</li>
            </ul>
          `,
        })
      } else if (_countSuccess > 0 && _countDuplicate === 0) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thầy cô đã đăng ký sử dụng thiết bị thành công!',
        })
      } else if (_countSuccess === 0 && _countDuplicate > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: `Thầy/Cô đã đăng ký sử dụng thiết bị ${listThietBiDangKy} cho lịch dạy của mình. Vui lòng không đăng ký lại!`,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đã có lỗi xảy ra!',
          text: 'Thầy/Cô vui lòng đăng nhập và thực hiện lại hoặc liên hệ bộ phận kỹ thuật để khắc phục sự cố. Xin cảm ơn!',
        })
      }
      setDataSubmit(inititalDataSubmit)
      setLichDaySelected([])
      setThietBiSelected([])
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đã có lỗi xảy ra!',
        message:
          'Thầy/Cô vui lòng đăng nhập và thực hiện lại hoặc liên hệ bộ phận kỹ thuật để khắc phục sự cố. Xin cảm ơn!',
      })
      console.log('>>> error: ', error)
    }
  }

  useEffect(() => {
    if (lichDaySelected.length === 0) {
      setThietBiSelected([])
    }
  }, [lichDaySelected])

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full min-h-[500px]">
          <h2 className="uppercase text-center text-2xl font-bold text-cyan-700 mb-8">
            Đăng ký sử dụng thiết bị
          </h2>
          <div className="relative border border-gray-400 rounded-2xl p-4 mb-8">
            <h4 className="absolute -top-3 left-6 bg-white text-gray-900 px-2 text-sm font-medium">
              Danh sách lịch dạy:
            </h4>
            <DanhSachLichDay
              listLichDay={dataLichDayGiangVien.data?.data?.body || []}
              onSelectedLichDay={handleSelectedLichDay}
              lichDaySelected={lichDaySelected}
            />
            <p className="text-red-600 font-bold">
              * Lưu ý: Đăng ký sử dụng thiết bị trước 3 ngày làm việc.
            </p>
          </div>
          {/* END: Danh sách lịch dạy */}
          <div className="relative border border-gray-400 rounded-2xl p-4 mb-6">
            <h4 className="absolute -top-3 left-6 bg-white text-gray-900 px-2 text-sm font-medium">
              Danh sách thiết bị
            </h4>
            <DanhSachThietBi
              listThietBi={dataTBGDTaiSanChoMuon.data?.data?.body || []}
              listThietBiSelected={thietBiSelected}
              onSelectedTaiSan={handleSelectedTaiSan}
              onChangeQuantity={handleChangeQuantity}
            />
          </div>
          {/* END: Thông tin đăng ký */}

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mô tả
            </label>
            <textarea
              id="description"
              name="DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_MoTa"
              rows={2}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-blue-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập mô tả..."
              onChange={handleChangeValue}
              value={dataSubmit.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_MoTa}
            />
          </div>
          {/* END: Mô tả */}

          <div className="mb-6">
            <label
              htmlFor="reason"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Lý do
            </label>
            <textarea
              id="reason"
              name="DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_LyDo"
              rows={2}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-blue-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập lý do..."
              onChange={handleChangeValue}
              value={dataSubmit.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_LyDo}
            />
          </div>
          {/* END: Lý do */}

          <div className="mb-6">
            <label
              htmlFor="note"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ghi chú
            </label>
            <textarea
              id="note"
              name="DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_GhiChu"
              rows={2}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-blue-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập ghi chú..."
              onChange={handleChangeValue}
              value={dataSubmit.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_GhiChu}
            />
          </div>
          {/* END: Ghi chú */}

          <div className="uneti-action flex justify-center gap-2">
            <HuongDanSuDung />
            <button
              disabled={_isEmptyData}
              onClick={handleSubmitData}
              className={clsx(
                'duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl',
                _isEmptyData
                  ? ''
                  : 'cursor-pointer hover:bg-sky-800 hover:text-white',
              )}
            >
              Gửi yêu cầu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default DangKySuDungThietBiView
