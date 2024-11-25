import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import {
  arrayBufferToBase64,
  DataCanBoGV,
  dayjs,
  groupArrayByFields,
  handleDownloadFileBase64,
} from '@/Services/Utils'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Fragment, useMemo, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { isNil } from 'lodash-unified'
import { toast } from 'react-toastify'

const enumJobTypeHistory = {
  CONG_VIEC_CHA: 'CONG_VIEC_CHA',
  CONG_VIEC_CON: 'CONG_VIEC_CON',
  NGUOI_THUC_HIEN: 'NGUOI_THUC_HIEN',
}

const enumFileMatch = {
  FILE_DE_NGHI: 'FILE_DE_NGHI',
  FILE_KHOI_TAO: 'FILE_KHOI_TAO',
  FILE_XAC_NHAN: 'FILE_XAC_NHAN',
  FILE_KIEM_TRA: 'FILE_KIEM_TRA',
}

function TraCuuLichSuCongViec() {
  const dataCBGV = DataCanBoGV()
  const [searchData, setSearchData] = useState({
    searchQuaHan: '',
    searchPhanTram: '',
    searchTenCV: '',
    searchNhanSuThucHien: '',
    searchNgayBatDau: '',
    searchNgayKetThuc: '',
    searchDuAn: '',
    searchChiTietCV: '',
    searchVaiTro: '',
    searchID: '',
    searchSTT1: '',
    searchSTT2: '',
    searchCVCha: '',
    searchCVCon: '',
    searchLoaiCV: '',
    searchUuTien: '',
    searchMucDoKho: '',
    searchNgayThucHien: '',
    searchGioThucHien: '',
    searchPhutThucHien: '',
    searchTenFileDeNghi: '',
    searchMaNSThucHien: '',
    searchNhomChuyenMon: '',
    searchKhaNangChuyenMon: '',
    searchTenFileKhoiTao: '',
    searchNgayXacNhan: '',
    searchTrangThai: '',
    searchXacNhan: '',
    searchTenFileXacNhan: '',
    searchMoTaXacNhan: '',
    searchNgayKiemTra: '',
    searchMaNSKiemTra: '',
    searchNhanSuKiemTra: '',
    searchKiemTra: '',
    searchTenFileKiemTra: '',
    searchMoTaKiemTra: '',
  })
  const [showCollapsible, setShowCollapsible] = useState({
    indexCongViecCha: null,
    indexCongViecCon: null,
    indexNguoiThucHien: 0,
  })

  const { data } = useQuery({
    queryKey: [
      QLCV_QUERY_KEY.PhanCongThucHien_Load_LichSuTienDo,
      dataCBGV.MaNhanSu,
    ],
    queryFn: async () => {
      const res = await apiQuanLyCongViec.getQuanLyCongViec({
        MaNhanSu: dataCBGV.MaNhanSu,
        Loc: 'Tất cả công việc',
      })
      return res.data
    },
  })

  const listLichSu = useMemo(() => {
    return data?.body ? data?.body : []
  }, [data])

  const filteredList = useMemo(() => {
    // Lọc danh sách theo các điều kiện khác nhau
    return listLichSu.filter((item) => {
      const QuaHanMatch = searchData.searchQuaHan
        ? item.CV_HT_PhanCongThucHien_QuaHan === true
        : true

      const PhanTramMatch = (
        item.CV_HT_PhanCongThucHien_XacNhan_PhanTram?.toString() || ''
      ).includes(searchData.searchPhanTram.toLowerCase())

      const TenCVMatch = (item.CV_HT_PhanCongThucHien_TenCongViec || '')
        .toLowerCase()
        .includes(searchData.searchTenCV.toLowerCase())

      const NhanSuThucHienMatch = (
        item.CV_HT_PhanCongThucHien_NhanSuThucHien_HoTen || ''
      )
        .toLowerCase()
        .includes(searchData.searchNhanSuThucHien.toLowerCase())

      const NgayBatDauMatch = searchData.searchNgayBatDau
        ? new Date(item.CV_HT_PhanCongThucHien_NgayKetThuc) >=
          new Date(searchData.searchNgayBatDau)
        : true

      const NgayKetThucMatch = searchData.searchNgayKetThuc
        ? new Date(item.CV_HT_PhanCongThucHien_NgayBatDau) <=
          new Date(searchData.searchNgayKetThuc)
        : true

      const DuAnMatch = (item.CV_HT_PhanCongThucHien_NhomThucHien || '')
        .toLowerCase()
        .includes(searchData.searchDuAn.toLowerCase())

      const ChiTietCVMatch = (item.CV_HT_PhanCongThucHien_GhiChu || '')
        .toLowerCase()
        .includes(searchData.searchChiTietCV.toLowerCase())

      const VaiTroMatch = (item.CV_HT_PhanCongThucHien_GiaoNhanViec || '')
        .toLowerCase()
        .includes(searchData.searchVaiTro.toLowerCase())

      const IDMatch = (
        item.CV_HT_PhanCongThucHien_ID?.toString() || ''
      ).includes(searchData.searchID.toLowerCase())

      const STT1Match = (item.CV_HT_PhanCongThucHien_STT1 || '')
        .toLowerCase()
        .includes(searchData.searchSTT1.toLowerCase())

      const STT2Match = (item.CV_HT_PhanCongThucHien_STT2 || '')
        .toLowerCase()
        .includes(searchData.searchSTT2.toLowerCase())

      const CVChaMatch = (item.CV_HT_PhanCongThucHien_NhomCongViecCha || '')
        .toLowerCase()
        .includes(searchData.searchCVCha.toLowerCase())

      const CVConMatch = (item.CV_HT_PhanCongThucHien_NhomCongViecCon || '')
        .toLowerCase()
        .includes(searchData.searchCVCon.toLowerCase())

      const LoaiCVMatch = (item.CV_HT_KhoiTaoCV_KeHoach_LoaiCongViec || '')
        .toLowerCase()
        .includes(searchData.searchLoaiCV.toLowerCase())

      const UuTienMatch = (item.CV_HT_PhanCongThucHien_UuTien || '')
        .toLowerCase()
        .includes(searchData.searchUuTien.toLowerCase())

      const MucDoKhoMatch = (item.CV_HT_PhanCongThucHien_ThoiHan_MucDoKho || '')
        .toLowerCase()
        .includes(searchData.searchMucDoKho.toLowerCase())

      const NgayThucHienMatch = (
        String(item.CV_HT_PhanCongThucHien_ThoiHan_SoNgayThucHien) || ''
      )
        .toLowerCase()
        .includes(searchData.searchNgayThucHien.toLowerCase())
      const GioThucHienMatch = (
        String(item.CV_HT_PhanCongThucHien_ThoiHan_SoGioThucHien) || ''
      )
        .toLowerCase()
        .includes(searchData.searchGioThucHien.toLowerCase())

      const PhutThucHienMatch = (
        String(item.CV_HT_PhanCongThucHien_ThoiHan_SoPhutThucHien) || ''
      )
        .toLowerCase()
        .includes(searchData.searchPhutThucHien.toLowerCase())

      const TenFileDeNghiMatch = (
        item.CV_HT_PhanCongThucHien_KeHoach_TenFile || ''
      )
        .toLowerCase()
        .includes(searchData.searchTenFileDeNghi.toLowerCase())

      const MaNSThucHienMatch = (
        item.CV_HT_PhanCongThucHien_NhanSuXacNhan_MaNhanSu || ''
      )
        .toLowerCase()
        .includes(searchData.searchMaNSThucHien.toLowerCase())

      const NhomChuyenMonMatch = (
        item.CV_HT_PhanCongThucHien_NhanSuThucHien_NhomChuyenMon || ''
      )
        .toLowerCase()
        .includes(searchData.searchNhomChuyenMon.toLowerCase())

      const KhaNangChuyenMonMatch = (
        item.CV_HT_PhanCongThucHien_NhanSuThucHien_KhaNangChuyenMon || ''
      )
        .toLowerCase()
        .includes(searchData.searchKhaNangChuyenMon.toLowerCase())

      const TenFileKhoiTaoMatch = (item.CV_HT_PhanCongThucHien_TenFile || '')
        .toLowerCase()
        .includes(searchData.searchTenFileKhoiTao.toLowerCase())

      const NgayXacNhanMatch = searchData.searchNgayXacNhan
        ? new Date(item.CV_HT_PhanCongThucHien_XacNhan_NgayXacNhan).setHours(
            0,
            0,
            0,
            0,
          ) === new Date(searchData.searchNgayXacNhan).setHours(0, 0, 0, 0)
        : true

      const TrangThaiMatch = (
        item.CV_HT_PhanCongThucHien_XacNhan_TrangThai || ''
      )
        .toLowerCase()
        .includes(searchData.searchTrangThai.toLowerCase())

      const XacNhanMatch = searchData.searchXacNhan
        ? item.CV_HT_PhanCongThucHien_XacNhan_XacNhan === true
        : true
      // const XacNhanMatch = (
      //   item.CV_HT_PhanCongThucHien_XacNhan_XacNhan?.toString() || ''
      // )
      //   .toLowerCase()
      //   .includes(searchData.searchXacNhan.toLowerCase())

      const TenFileXacNhanMatch = (
        item.CV_HT_PhanCongThucHien_XacNhan_TenFile || ''
      )
        .toLowerCase()
        .includes(searchData.searchTenFileXacNhan.toLowerCase())

      const MoTaXacNhanMatch = (item.CV_HT_PhanCongThucHien_XacNhan_MoTa || '')
        .toLowerCase()
        .includes(searchData.searchMoTaXacNhan.toLowerCase())

      const NgayKiemTraMatch = (
        item.CV_HT_PhanCongThucHien_KiemTra_NgayKiemTra || ''
      )
        .toLowerCase()
        .includes(searchData.searchNgayKiemTra.toLowerCase())

      const MaNSKiemTraMatch = (
        item.CV_HT_PhanCongThucHien_NhanSuKiemTra_MaNhanSu || ''
      )
        .toLowerCase()
        .includes(searchData.searchMaNSKiemTra.toLowerCase())

      const NhanSuKiemTraMatch = (
        item.CV_HT_PhanCongThucHien_NhanSuKiemTra_HoTen || ''
      )
        .toLowerCase()
        .includes(searchData.searchNhanSuKiemTra.toLowerCase())

      const KiemTraMatch = searchData.searchKiemTra
        ? item.CV_HT_PhanCongThucHien_KiemTra_XacNhan === true
        : true
      // const KiemTraMatch = (
      //   item.CV_HT_PhanCongThucHien_KiemTra_XacNhan?.toString() || ''
      // )
      //   .toLowerCase()
      //   .includes(searchData.searchKiemTra.toLowerCase())

      const TenFileKiemTraMatch = (
        item.CV_HT_PhanCongThucHien_KiemTra_TenFile || ''
      )
        .toLowerCase()
        .includes(searchData.searchTenFileKiemTra.toLowerCase())

      const MoTaKiemTraMatch = (item.CV_HT_PhanCongThucHien_KiemTra_MoTa || '')
        .toLowerCase()
        .includes(searchData.searchMoTaKiemTra.toLowerCase())

      return (
        QuaHanMatch &&
        PhanTramMatch &&
        TenCVMatch &&
        NhanSuThucHienMatch &&
        NgayBatDauMatch &&
        NgayKetThucMatch &&
        DuAnMatch &&
        ChiTietCVMatch &&
        VaiTroMatch &&
        IDMatch &&
        STT1Match &&
        STT2Match &&
        CVChaMatch &&
        CVConMatch &&
        LoaiCVMatch &&
        UuTienMatch &&
        MucDoKhoMatch &&
        NgayThucHienMatch &&
        GioThucHienMatch &&
        PhutThucHienMatch &&
        TenFileDeNghiMatch &&
        MaNSThucHienMatch &&
        NhomChuyenMonMatch &&
        KhaNangChuyenMonMatch &&
        TenFileKhoiTaoMatch &&
        NgayXacNhanMatch &&
        TrangThaiMatch &&
        XacNhanMatch &&
        TenFileXacNhanMatch &&
        MoTaXacNhanMatch &&
        NgayKiemTraMatch &&
        MaNSKiemTraMatch &&
        NhanSuKiemTraMatch &&
        KiemTraMatch &&
        TenFileKiemTraMatch &&
        MoTaKiemTraMatch
      )
    })
  }, [listLichSu, searchData])

  const dataGroupFields = useMemo(() => {
    if (filteredList.length > 0) {
      return groupArrayByFields(filteredList, [
        'CV_HT_PhanCongThucHien_NhomCongViecCha',
        'CV_HT_PhanCongThucHien_NhomCongViecCon',
        'CV_HT_PhanCongThucHien_NhanSuThucHien_HoTen',
      ])
    } else {
      return []
    }
  }, [filteredList])

  const handleDownloadFile = async ({ fileMatch, nhomThucHienId }) => {
    switch (fileMatch) {
      case enumFileMatch.FILE_DE_NGHI: {
        try {
          const result = await apiQuanLyCongViec.getFileNhomThucHienById({
            CV_HT_NhomThucHien_ID: nhomThucHienId,
          })
          const tenFile = result?.data?.body?.[0]?.CV_HT_NhomThucHien_TenFile
          const dataFile =
            result?.data?.body?.[0]?.CV_HT_NhomThucHien_DataFile?.data
          console.log('result - FILE_KHOI_TAO: ', result)
          if (isNil(dataFile)) {
            toast.error('File đề nghị không tồn tại hoặc không có dữ liệu')
          } else {
            handleDownloadFileBase64(
              tenFile,
              arrayBufferToBase64(dataFile),
            ).then((r) => r)
          }
        } catch (error) {
          toast.error('File đề nghị không tồn tại hoặc không có dữ liệu')
        }
        return
      }
      case enumFileMatch.FILE_KHOI_TAO: {
        try {
          const result = await apiQuanLyCongViec.getFileKhoiTaoCV({
            CV_HT_KhoiTaoCV_ID: nhomThucHienId,
          })
          const tenFile =
            result?.data?.body?.[0]?.CV_HT_KhoiTaoCV_KeHoach_TenFile
          const dataFile =
            result?.data?.body?.[0]?.CV_HT_KhoiTaoCV_KeHoach_DataFile?.data
          if (isNil(dataFile)) {
            toast.error('File khởi tạo không tồn tại hoặc không có dữ liệu')
          } else {
            handleDownloadFileBase64(
              tenFile,
              arrayBufferToBase64(dataFile),
            ).then((r) => r)
          }
        } catch (error) {
          toast.error('File khởi tạo không tồn tại hoặc không có dữ liệu')
        }
        return
      }
      case enumFileMatch.FILE_XAC_NHAN: {
        try {
          const result = await apiQuanLyCongViec.getFilePhanCongThucHien({
            CV_HT_PhanCongThucHien_ID: nhomThucHienId,
          })
          const tenFile =
            result?.data?.body?.[0]?.CV_HT_PhanCongThucHien_XacNhan_TenFile
          const dataFile =
            result?.data?.body?.[0]?.CV_HT_PhanCongThucHien_XacNhan_DataFile
              ?.data
          if (isNil(dataFile)) {
            toast.error('File xác nhận không tồn tại hoặc không có dữ liệu')
          } else {
            handleDownloadFileBase64(
              tenFile,
              arrayBufferToBase64(dataFile),
            ).then((r) => r)
          }
        } catch (error) {
          toast.error('File xác nhận không tồn tại hoặc không có dữ liệu')
        }
        return
      }
      case enumFileMatch.FILE_KIEM_TRA: {
        try {
          const result = await apiQuanLyCongViec.getFilePhanCongThucHien({
            CV_HT_PhanCongThucHien_ID: nhomThucHienId,
          })
          const tenFile =
            result?.data?.body?.[0]?.CV_HT_PhanCongThucHien_KiemTra_TenFile
          const dataFile =
            result?.data?.body?.[0]?.CV_HT_PhanCongThucHien_KiemTra_DataFile
              ?.data
          if (isNil(dataFile)) {
            toast.error('File kiểm tra không tồn tại hoặc không có dữ liệu')
          } else {
            handleDownloadFileBase64(
              tenFile,
              arrayBufferToBase64(dataFile),
            ).then((r) => r)
          }
        } catch (error) {
          toast.error('File kiểm tra không tồn tại hoặc không có dữ liệu')
        }
        return
      }
      default:
        return
    }
  }

  const handleChangeCollapsible = ({ jobType, data }) => {
    let updatedCollapsible = { ...showCollapsible }

    // Đặt key độc lập cho từng loại công việc
    if (jobType === enumJobTypeHistory.CONG_VIEC_CHA) {
      updatedCollapsible[data.key] = !updatedCollapsible[data.key]
    }
    if (jobType === enumJobTypeHistory.CONG_VIEC_CON) {
      updatedCollapsible[`${data.key}-child`] =
        !updatedCollapsible[`${data.key}-child`]
    }
    if (jobType === enumJobTypeHistory.NGUOI_THUC_HIEN) {
      // Tạo key độc lập cho từng nhân sự
      updatedCollapsible[`${data.parentKey}-${data.key}-sub-child`] =
        !updatedCollapsible[`${data.parentKey}-${data.key}-sub-child`]
    }

    setShowCollapsible(updatedCollapsible)
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className="bg-sky-800 text-white">
          <tr className="border-b">
            <th rowSpan={3} className="p-2 border-r rounded-tl-xl">
              Chọn
            </th>
            <th colSpan={9} className="p-2 border-r">
              Thông tin tổng quan công việc
            </th>
            <th colSpan={12} className="p-2 border-r">
              Thông tin chung công việc
            </th>
            <th colSpan={10} className="p-2 border-r">
              Thông tin nhân sự thực hiện
            </th>
            <th colSpan={6} className="p-2">
              Thông tin nhân sự kiểm tra
            </th>
          </tr>
          {/* RowHead - 1 */}
          <tr className="border-b">
            <th className="p-2 border-r">Quá hạn</th>
            <th className="p-2 border-r">Phần trăm tiến độ</th>
            <th className="p-2 border-r">Tên công việc</th>
            <th className="p-2 border-r">Nhân sự thực hiện</th>
            <th className="p-2 border-r">Ngày bắt đầu</th>
            <th className="p-2 border-r">Ngày kết thúc</th>
            <th className="p-2 border-r">Dự án/Công việ cụ thể</th>
            <th className="p-2 border-r">Nội dung chi tiết công việc</th>
            <th className="p-2 border-r">Vai trò</th>
            {/* END: 9 col */}

            <th className="p-2 border-r">ID</th>
            <th className="p-2 border-r">STT1</th>
            <th className="p-2 border-r">STT2</th>
            <th className="p-2 border-r">Nhóm công việc cha</th>
            <th className="p-2 border-r">Nhóm công việc con</th>
            <th className="p-2 border-r">Loại công việc</th>
            <th className="p-2 border-r">Ưu tiên</th>
            <th className="p-2 border-r">Mức độ khó</th>
            <th className="p-2 border-r">Số ngày thực hiện</th>
            <th className="p-2 border-r">Số giờ thực hiện</th>
            <th className="p-2 border-r">Số phút thực hiện</th>
            <th className="p-2 border-r">Tên file đề nghị</th>
            {/* END: 12 col */}

            <th className="p-2 border-r">Mã nhân sự</th>
            <th className="p-2 border-r">Tên nhân sự</th>
            <th className="p-2 border-r">Nhóm chuyên môn</th>
            <th className="p-2 border-r">Khả năng chuyên môn</th>
            <th className="p-2 border-r">Tên file</th>
            <th className="p-2 border-r">Ngày xác nhận</th>
            <th className="p-2 border-r">Trạng thái</th>
            <th className="p-2 border-r">Xác nhận</th>
            <th className="p-2 border-r">Tên file xác nhận</th>
            <th className="p-2 border-r">Mô tả</th>
            {/* END: 10 col */}

            <th className="p-2 border-r">Ngày xác nhận</th>
            <th className="p-2 border-r">Mã nhân sự</th>
            <th className="p-2 border-r">Tên nhân sự</th>
            <th className="p-2 border-r">Xác nhận</th>
            <th className="p-2 border-r">Tên file</th>
            <th className="p-2">Mô tả</th>
            {/* END: 6 col */}
          </tr>
          {/* RowHead - 2 */}

          <tr>
            <td className="text-center">
              <DebounceInput
                id="searchQuaHan"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchQuaHan: e.target.checked,
                  })
                }}
                type="checkbox"
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm...'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchPhanTram"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchPhanTram: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm % tiến độ'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchTenCV"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchTenCV: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm tên công việc'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNhanSuThucHien"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNhanSuThucHien: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm tên nhân sự thực hiện'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNgayBatDau"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNgayBatDau: e.target.value,
                  })
                }}
                type="date"
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Nhập ngày bắt đầu'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNgayKetThuc"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNgayKetThuc: e.target.value,
                  })
                }}
                type="date"
                disabled={!searchData.searchNgayBatDau}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Nhập ngày kết thúc'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchDuAn"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchDuAn: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm dự án/công việc cụ thể'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchChiTietCV"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchChiTietCV: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm chi tiết công việc'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchVaiTro"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchVaiTro: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm vai trò'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchID"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchID: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm ID'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchSTT1"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchSTT1: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm STT1'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchSTT2"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchSTT2: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm STT2'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchCVCha"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchCVCha: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm nhóm công việc cha'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchCVCon"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchCVCon: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm nhóm công việc con'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchLoaiCV"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchLoaiCV: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm loại công việc'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchUuTien"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchUuTien: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm độ ưu tiên'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchMucDoKho"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchMucDoKho: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm mức độ khó'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNgayThucHien"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNgayThucHien: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm số ngày thực hiện'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchGioThucHien"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchGioThucHien: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm số giờ thực hiện'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchPhutThucHien"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchPhutThucHien: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm số phút thực hiện'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchTenFileDeNghi"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchTenFileDeNghi: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm tên file đề nghị'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchMaNSThucHien"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchMaNSThucHien: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm mã nhân sự'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNhanSuThucHien"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNhanSuThucHien: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm tên nhân sự'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNhomChuyenMon"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNhomChuyenMon: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm nhóm chuyên môn'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchKhaNangChuyenMon"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchKhaNangChuyenMon: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm khả năng chuyên môn'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchTenFileKhoiTao"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchTenFileKhoiTao: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm tên file'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNgayXacNhan"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNgayXacNhan: e.target.value,
                  })
                }}
                type="date"
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm ngày xác nhận'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchTrangThai"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchTrangThai: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm trạng thái'}
              />
            </td>
            <td className="text-center">
              <DebounceInput
                id="searchXacNhan"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchXacNhan: e.target.checked,
                  })
                }}
                type="checkbox"
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
              />
            </td>
            <td>
              <DebounceInput
                id="searchTenFileXacNhan"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchTenFileXacNhan: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm tên file'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchMoTaXacNhan"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchMoTaXacNhan: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm mô tả'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNgayKiemTra"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNgayKiemTra: e.target.value,
                  })
                }}
                type="date"
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm ngày kiểm tra'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchMaNSKiemTra"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchMaNSKiemTra: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm mã nhân sự'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchNhanSuKiemTra"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchNhanSuKiemTra: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm tên nhân sự'}
              />
            </td>
            <td className="text-center">
              <DebounceInput
                id="searchKiemTra"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchKiemTra: e.target.checked,
                  })
                }}
                type="checkbox"
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
              />
            </td>
            <td>
              <DebounceInput
                id="searchTenFileKiemTra"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchTenFileKiemTra: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm tên file'}
              />
            </td>
            <td>
              <DebounceInput
                id="searchMoTaKiemTra"
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchMoTaKiemTra: e.target.value,
                  })
                }}
                className="text-black focus:outline-1 focus:outline-cyan-500 p-1"
                placeholder={'Tìm mô tả'}
              />
            </td>
          </tr>
          {/* RowHead - 3 */}
        </thead>
        <tbody className="border">
          {dataGroupFields && dataGroupFields.length > 0 ? (
            dataGroupFields.map((cv, index) => {
              return (
                <Fragment key={index}>
                  <tr
                    className={clsx(
                      'border-b',
                      index % 2 === 0 ? 'bg-slate-100' : '',
                    )}
                  >
                    <td colSpan={40}>
                      <div
                        className="flex items-center gap-1 p-2 cursor-pointer transition-colors"
                        onClick={() => {
                          handleChangeCollapsible({
                            jobType: enumJobTypeHistory.CONG_VIEC_CHA,
                            data: cv,
                          })
                        }}
                      >
                        {showCollapsible[cv.key] ? (
                          <FaAngleDown className="text-uneti-primary-light" />
                        ) : (
                          <FaAngleUp className="text-uneti-primary-light" />
                        )}
                        <p className="font-semibold text-gray-800">{cv.key}</p>
                      </div>
                    </td>
                  </tr>
                  {/* Expanded-Parent-1 */}
                  {showCollapsible[cv.key] &&
                    cv.value &&
                    cv.value.map((cvc) => {
                      return (
                        <Fragment key={cvc.key}>
                          <tr className="border-b">
                            <td colSpan={40}>
                              <div
                                className="flex items-center gap-1 px-10 py-2 cursor-pointer transition-colors"
                                onClick={() => {
                                  handleChangeCollapsible({
                                    jobType: enumJobTypeHistory.CONG_VIEC_CON,
                                    data: cvc,
                                  })
                                }}
                              >
                                {showCollapsible[`${cvc.key}-child`] ? (
                                  <FaAngleDown className="text-uneti-primary-light" />
                                ) : (
                                  <FaAngleUp className="text-uneti-primary-light" />
                                )}
                                <p className="font-medium text-gray-700">
                                  {cvc.key}
                                </p>
                              </div>
                            </td>
                          </tr>
                          {showCollapsible[`${cvc.key}-child`] &&
                            cvc.value &&
                            cvc.value.map((cvth) => {
                              return (
                                <Fragment key={cvth.key}>
                                  <tr className="border-b">
                                    <td colSpan={38}>
                                      <div
                                        className="flex items-center gap-1 pl-16 py-2 cursor-pointer transition-colors"
                                        onClick={() => {
                                          handleChangeCollapsible({
                                            jobType:
                                              enumJobTypeHistory.NGUOI_THUC_HIEN,
                                            data: {
                                              key: cvth.key,
                                              parentKey: cvc.key,
                                            },
                                          })
                                        }}
                                      >
                                        {showCollapsible[
                                          `${cvc.key}-${cvth.key}-sub-child`
                                        ] ? (
                                          <FaAngleDown className="text-uneti-primary-light" />
                                        ) : (
                                          <FaAngleUp className="text-uneti-primary-light" />
                                        )}
                                        <p className="font-normal text-gray-600">
                                          {cvth.key}
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                  {showCollapsible[
                                    `${cvc.key}-${cvth.key}-sub-child`
                                  ] &&
                                    cvth.value &&
                                    cvth.value.map((i, index) => {
                                      return (
                                        <tr key={index} className="border-b">
                                          <td className="border-r">
                                            <input
                                              hidden
                                              type="checkbox"
                                              name=""
                                              id=""
                                            />
                                          </td>
                                          <td className="border-r text-center">
                                            <input
                                              type="checkbox"
                                              checked={
                                                i.CV_HT_PhanCongThucHien_QuaHan
                                              }
                                              readOnly
                                            />
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_XacNhan_PhanTram
                                              }
                                              %
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_TenCongViec
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhanSuThucHien_HoTen
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {i.CV_HT_PhanCongThucHien_NgayBatDau
                                                ? dayjs(
                                                    i.CV_HT_PhanCongThucHien_NgayBatDau,
                                                  ).format('HH:mm, DD/MM/YYYY')
                                                : ''}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {i.CV_HT_PhanCongThucHien_NgayKetThuc
                                                ? dayjs(
                                                    i.CV_HT_PhanCongThucHien_NgayKetThuc,
                                                  ).format('HH:mm, DD/MM/YYYY')
                                                : ''}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhomThucHien
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {i.CV_HT_PhanCongThucHien_GhiChu}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_GiaoNhanViec
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>{i.CV_HT_PhanCongThucHien_ID}</p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {i.CV_HT_PhanCongThucHien_STT1}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {i.CV_HT_PhanCongThucHien_STT2}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhomCongViecCha
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhomCongViecCon
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_KhoiTaoCV_KeHoach_LoaiCongViec
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {i.CV_HT_PhanCongThucHien_UuTien}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_ThoiHan_MucDoKho
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_ThoiHan_SoNgayThucHien
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_ThoiHan_SoGioThucHien
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_ThoiHan_SoPhutThucHien
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p
                                              onClick={() =>
                                                handleDownloadFile({
                                                  fileMatch:
                                                    enumFileMatch.FILE_DE_NGHI,
                                                  nhomThucHienId:
                                                    i.CV_HT_PhanCongThucHien_ID,
                                                })
                                              }
                                              className={
                                                'text-cyan-600 font-semibold hover:opacity-80 cursor-pointer'
                                              }
                                            >
                                              {i.CV_HT_PhanCongThucHien_TenFile}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhanSuXacNhan_MaNhanSu
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhanSuXacNhan_HoTen
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhanSuThucHien_NhomChuyenMon
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhanSuThucHien_KhaNangChuyenMon
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p
                                              onClick={() =>
                                                handleDownloadFile({
                                                  fileMatch:
                                                    enumFileMatch.FILE_KHOI_TAO,
                                                  nhomThucHienId:
                                                    i.CV_HT_PhanCongThucHien_ID,
                                                })
                                              }
                                              className={
                                                'text-cyan-600 font-semibold hover:opacity-80 cursor-pointer'
                                              }
                                            >
                                              {
                                                i.CV_HT_PhanCongThucHien_KeHoach_TenFile
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {i.CV_HT_PhanCongThucHien_XacNhan_NgayXacNhan
                                                ? dayjs(
                                                    i.CV_HT_PhanCongThucHien_XacNhan_NgayXacNhan,
                                                  ).format('HH:mm, DD/MM/YYYY')
                                                : ''}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_XacNhan_TrangThai
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <input
                                              type="checkbox"
                                              checked={
                                                i.CV_HT_PhanCongThucHien_XacNhan_XacNhan
                                              }
                                              readOnly
                                            />
                                          </td>
                                          <td className="border-r text-center">
                                            <p
                                              onClick={() =>
                                                handleDownloadFile({
                                                  fileMatch:
                                                    enumFileMatch.FILE_XAC_NHAN,
                                                  nhomThucHienId:
                                                    i.CV_HT_PhanCongThucHien_ID,
                                                })
                                              }
                                              className={
                                                'text-cyan-600 font-semibold hover:opacity-80 cursor-pointer'
                                              }
                                            >
                                              {
                                                i.CV_HT_PhanCongThucHien_XacNhan_TenFile
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_XacNhan_MoTa
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {i.CV_HT_PhanCongThucHien_KiemTra_NgayKiemTra
                                                ? dayjs(
                                                    i.CV_HT_PhanCongThucHien_KiemTra_NgayKiemTra,
                                                  ).format('HH:mm, DD/MM/YYYY')
                                                : ''}
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhanSuKiemTra_MaNhanSu
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_NhanSuKiemTra_HoTen
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <input
                                              type="checkbox"
                                              checked={
                                                i.CV_HT_PhanCongThucHien_KiemTra_XacNhan
                                              }
                                              readOnly
                                            />
                                          </td>
                                          <td className="border-r text-center">
                                            <p
                                              onClick={() =>
                                                handleDownloadFile({
                                                  fileMatch:
                                                    enumFileMatch.FILE_KIEM_TRA,
                                                  nhomThucHienId:
                                                    i.CV_HT_PhanCongThucHien_ID,
                                                })
                                              }
                                              className={
                                                'text-cyan-600 font-semibold hover:opacity-80 cursor-pointer'
                                              }
                                            >
                                              {
                                                i.CV_HT_PhanCongThucHien_KiemTra_TenFile
                                              }
                                            </p>
                                          </td>
                                          <td className="border-r text-center">
                                            <p>
                                              {
                                                i.CV_HT_PhanCongThucHien_KiemTra_MoTa
                                              }
                                            </p>
                                          </td>
                                        </tr>
                                      )
                                    })}
                                </Fragment>
                              )
                            })}
                        </Fragment>
                      )
                    })}
                </Fragment>
              )
            })
          ) : (
            <tr>
              <td colSpan={40} className="p-10 text-red-600 font-bold">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TraCuuLichSuCongViec
