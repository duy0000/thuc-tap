/* eslint-disable no-unused-vars */
import SidebarTTHCGV from '../../Sidebar/SidebarTTHCGV'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  getKiemTraTrungTTHCGVEditPara,
  getThuTucHanhChinhByID,
  putThongTinHoSoThuTuc,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import Loading from '@/Components/Loading/Loading'

// icons
import { MdOutlineZoomInMap, MdOutlineZoomOutMap } from 'react-icons/md'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic'
import { toast } from 'react-toastify'
import { checkConditionObject } from '@/Services/Utils/objectUtils'
import {
  delTrinhTuThucHienTTHCGV,
  putTrinhTuThucHienTTHCGV,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiTrinhTuThucHien'
import {
  deleteTrangThaiTTHCGV,
  putTrangthaiTTHCGV,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiTrangThai'
import {
  delThanhPhanHoSoTTHCGV,
  getThanhPhanHoSoByIdTTHCGV,
  getThanhPhanHoSoGuiYeuCauById,
  putThanhPhanHoSoTTHCGV,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo'
import { delPhanQuyenTTHCGV } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiPhanQuyen'
import { convertDataFileToBase64 } from '@/Services/Utils/stringUtils'
import { EditPhanQuyenThuTuc } from './EditPhanQuyenThuTuc/EditPhanQuyenThuTuc'
import ThongTinChungHoSoChiTiet from './components/ThongTinChungHoSoChiTiet'
import TPHSDeNghiChiTiet from './components/TPHSDeNghiChiTiet'
import TrinhTuThucHienChiTiet from './components/TrinhTuThucHienChiTiet'
import PhanQuyenChiTiet from './components/PhanQuyenChiTiet'
import TrangThaiChiTiet from './components/TrangThaiChiTiet'
import { useQuery } from '@tanstack/react-query'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey'

function ThongTinChiTietHoSo() {
  const { id } = useParams()
  const [detailHoSoThuTuc, setDetailHoSoThuTuc] = useState({})
  const [loading, setLoading] = useState(true)

  const [showThongTinHoSo, setShowThongTinHoSo] = useState(true)
  const [showTPHSDeNghi, setShowTPHSDeNghi] = useState(false)
  const [showTrinhTuThucHien, setShowTrinhTuThucHien] = useState(false)
  const [showPhanQuyen, setShowPhanQuyen] = useState(false)
  const [showTrangThai, setShowTrangThai] = useState(false)
  const [showEditPhanQuyen, setShowEditPhanQuyen] = useState(false)

  const [zoomView, setZoomView] = useState(false)
  const [updatetepThuTuc, setUpdatetepThuTuc] = useState(false)

  const [editRowIndex, setEditRowIndex] = useState(-1)
  const [editValueRow, setEditValueRow] = useState({})
  const [editType, setEditType] = useState('')
  const [editThongTinChung, setEditThongTinChung] = useState({})
  const [dataQuyTrinhThucHien, setDataQuyTrinhThucHien] = useState('')

  const TABS = {
    tabThongTinHoSo: 'ThongTinHoSo',
    tabTPHSDeNghi: 'ThanhPhanHoSoDeNghi',
    tabTrinhTuThucHien: 'TrinhTuThucHien',
    tabPhanQuyen: 'PhanQuyen',
    tabTrangThai: 'TrangThai',
  }

  // Fetch Data
  const {
    data: dataTPHSDeNghi,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_ThanhPhanHoSo_Load_ByIDGoc, id],
    queryFn: async () => {
      const response = await getThanhPhanHoSoGuiYeuCauById(id)

      return response
    },
    retry: 5,
    refetchInterval: 5 * 1000,
  })

  const {
    data: dataThuTucHanhChinh,
    isFetching: isFetchingTTHC_GV,
    isLoading: isLoadingTTHC_GV,
    error: errorTTHC_GV,
    refetch: refetchData_TTHC_GV_ByID,
  } = useQuery({
    queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_LoadChiTietHoSoTTHC_ByID, id],
    queryFn: async () => {
      const response = await getThuTucHanhChinhByID(id)

      return response
    },
    retry: 5,
  })

  // Events handlers
  const handleShowView = (tab) => {
    if (tab === TABS.tabThongTinHoSo) {
      setShowThongTinHoSo(!showThongTinHoSo)
    }
    if (tab === TABS.tabTPHSDeNghi) {
      setShowTPHSDeNghi(!showTPHSDeNghi)
    }
    if (tab === TABS.tabTrinhTuThucHien) {
      setShowTrinhTuThucHien(!showTrinhTuThucHien)
    }
    if (tab === TABS.tabPhanQuyen) {
      setShowPhanQuyen(!showPhanQuyen)
    }
    if (tab === TABS.tabTrangThai) {
      setShowTrangThai(!showTrangThai)
    }
  }

  const handleDeleteRow = async (type, valueRow) => {
    // DELETE TrangThai
    if (type === TABS.tabTrangThai) {
      Swal.fire({
        icon: 'question',
        html: `Bạn chắc chắn muốn xóa trạng thái <p class="font-semibold uppercase text-red-600">${valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const dataIDDelete = {
              MC_TTHC_GV_TrangThai_ID:
                valueRow?.MC_TTHC_GV_TrangThai_ID.toString(),
            }
            setLoading(true)
            const resDelete = await deleteTrangThaiTTHCGV(dataIDDelete)
            if (resDelete.status === 200) {
              setLoading(false)
              return toast.success(
                `Xóa thành công công việc ${valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai}!`,
              )
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }

    // DELETE TrinhTuThucHien
    if (type === TABS.tabTrinhTuThucHien) {
      Swal.fire({
        icon: 'question',
        html: `Bạn chắc chắn muốn xóa công việc <p class="font-semibold uppercase text-red-600">${valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const dataIDDelete = {
              MC_TTHC_GV_TrinhTuThucHien_ID:
                valueRow?.MC_TTHC_GV_TrinhTuThucHien_ID.toString(),
            }
            setLoading(true)
            const resDelete = await delTrinhTuThucHienTTHCGV(dataIDDelete)
            if (resDelete.status === 200) {
              setLoading(false)
              return toast.success(
                `Xóa thành công công việc ${valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}!`,
              )
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }

    // DELETE TPHSDeNghi
    if (type === TABS.tabTPHSDeNghi) {
      Swal.fire({
        icon: 'question',
        html: `Bạn chắc chắn muốn xóa mẫu giấy tờ kèm theo <p class="font-semibold uppercase text-red-600">${valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const resDelete = await delThanhPhanHoSoTTHCGV(
              valueRow?.MC_TTHC_GV_ThanhPhanHoSo_ID.toString(),
            )
            if (resDelete.status === 200) {
              refetchData_TTHC_GV_ByID()
              toast.success(`Xóa thành công mẫu giấy tờ kèm theo!`)
              return
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }

    // DELETE PhanQuyen
    if (type === TABS.tabPhanQuyen) {
      if (dataThuTucHanhChinh?.data?.PhanQuyen?.length === 1) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Hồ sơ thủ tục cần ít nhất 1 nhân sự được phân quyền xử lý. Không thể xóa!',
          footer: 'Vui lòng thêm mới 1 nhân sự khác và thực hiện xóa!',
        })
        return
      }
      Swal.fire({
        icon: 'question',
        html: `Bạn chắc chắn muốn xóa quyền của nhân sự <p class="font-semibold uppercase text-red-600">${valueRow?.MC_TTHC_GV_PhanQuyen_HoTen}</p> không?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const resDelete = await delPhanQuyenTTHCGV(
              valueRow?.MC_TTHC_GV_PhanQuyen_ID.toString(),
            )
            if (resDelete.status === 200) {
              toast.success(
                `Xóa thành công phân quyền của nhân sự ${valueRow?.MC_TTHC_GV_PhanQuyen_HoTen} khỏi hồ sơ!`,
              )
              refetchData_TTHC_GV_ByID()
              return
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }
  }

  const handleEditRow = async (index, type, valueRow) => {
    setEditType(type)
    setEditRowIndex(index)
    setEditValueRow(valueRow)
  }

  const handleCancelUpdateRow = () => {
    setEditType('')
    setEditRowIndex(-1)
    setEditValueRow({})
  }

  const handleChangeValue = (tab, e) => {
    const { value, checked, type, files, name } = e.target

    if (tab === TABS.tabThongTinHoSo) {
      setEditThongTinChung((prevObject) => ({
        ...prevObject,
        [name]: value,
      }))
    } else {
      if (type === 'checkbox') {
        setEditValueRow((prevEditValueRow) => ({
          ...prevEditValueRow,
          [name]: checked,
        }))
      } else if (type === 'file') {
        if (files && files.length > 0) {
          if (tab === TABS.tabTPHSDeNghi) {
            setEditValueRow((prevEditValueRow) => ({
              ...prevEditValueRow,
              MC_TTHC_GV_ThanhPhanHoSo_TenFile: files[0].name,
            }))
            convertDataFileToBase64(files[0]).then((dataFileBase64) => {
              setEditValueRow((prevEditValueRow) => ({
                ...prevEditValueRow,
                MC_TTHC_GV_ThanhPhanHoSo_DataFile: dataFileBase64.split(',')[1],
              }))
            })
          }
        }
      } else {
        setEditValueRow((prevEditValueRow) => ({
          ...prevEditValueRow,
          [name]: value,
        }))
      }
    }
  }

  const handleUpdate = async (type, valueRow) => {
    if (type === TABS.tabThongTinHoSo) {
      const newDataUpdateThongTinHoSo = {
        MC_TTHC_GV_ID: editThongTinChung?.MC_TTHC_GV_ID,
        MC_TTHC_GV_ThuTu: editThongTinChung?.MC_TTHC_GV_ThuTu,
        MC_TTHC_GV_MaThuTuc: editThongTinChung?.MC_TTHC_GV_MaThuTuc,
        MC_TTHC_GV_TenThuTuc: editThongTinChung?.MC_TTHC_GV_TenThuTuc,
        MC_TTHC_GV_GhiChu: editThongTinChung?.MC_TTHC_GV_GhiChu,
        MC_TTHC_GV_IDMucDo: editThongTinChung?.MC_TTHC_GV_IDMucDo,
        MC_TTHC_GV_LinhVuc: editThongTinChung?.MC_TTHC_GV_LinhVuc,
        MC_TTHC_GV_IsTruongPhongPheDuyet:
          editThongTinChung?.MC_TTHC_GV_IsTruongPhongPheDuyet,
        MC_TTHC_GV_IsBGHPheDuyet: editThongTinChung?.MC_TTHC_GV_IsBGHPheDuyet,
        MC_TTHC_GV_ThuTucLienThong:
          editThongTinChung?.MC_TTHC_GV_ThuTucLienThong,
        MC_TTHC_GV_ThuTucKhongApDungTrucTuyen:
          editThongTinChung?.MC_TTHC_GV_ThuTucKhongApDungTrucTuyen,
        MC_TTHC_GV_SoBoHoSo: editThongTinChung?.MC_TTHC_GV_SoBoHoSo,
        MC_TTHC_GV_TongThoiGianGiaiQuyet:
          editThongTinChung?.MC_TTHC_GV_TongThoiGianGiaiQuyet,
        MC_TTHC_GV_DoiTuongThucHien:
          editThongTinChung?.MC_TTHC_GV_DoiTuongThucHien,
        MC_TTHC_GV_CanCuPhapLyCuaTTHC:
          editThongTinChung?.MC_TTHC_GV_CanCuPhapLyCuaTTHC,
        MC_TTHC_GV_DieuKienThucHien:
          editThongTinChung?.MC_TTHC_GV_DieuKienThucHien,
        MC_TTHC_GV_QuyTrinhThucHien: dataQuyTrinhThucHien,
        MC_TTHC_GV_TepThuTuc_TenFile:
          editThongTinChung?.MC_TTHC_GV_TepThuTuc_TenFile,
        MC_TTHC_GV_TepThuTuc_DataFileFile:
          editThongTinChung?.MC_TTHC_GV_TepThuTuc_DataFileFile,
        MC_TTHC_GV_NguonTiepNhan: NguonTiepNhan_WEB,
        MC_TTHC_GV_NoiTiepNhan: editThongTinChung?.MC_TTHC_GV_NoiTiepNhan,
        MC_TTHC_GV_NoiTraKetQua: editThongTinChung?.MC_TTHC_GV_NoiTraKetQua,
      }
      const isEqualValue = checkConditionObject(
        dataThuTucHanhChinh?.data?.ThongTinHoSo,
        newDataUpdateThongTinHoSo,
      )

      if (isEqualValue == true) {
        Swal.fire({
          icon: 'question',
          title: 'Bạn có chắc chắn muốn cập nhật thông tin này không?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const checkDuplicateMaThuTuc =
                await getKiemTraTrungTTHCGVEditPara(
                  newDataUpdateThongTinHoSo.MC_TTHC_GV_ID,
                  newDataUpdateThongTinHoSo.MC_TTHC_GV_MaThuTuc,
                )

              let checkTrungMaThuTuc = false
              if (checkDuplicateMaThuTuc.status === 200) {
                const dataTrung = checkDuplicateMaThuTuc.data?.body

                if (dataTrung?.length > 0) {
                  checkTrungMaThuTuc = true
                }
              }

              if (checkTrungMaThuTuc === true) {
                Swal.fire({
                  icon: 'error',
                  title:
                    'Mã thủ tục đã tồn tại. Vui lòng nhập mã thủ tục khác!',
                })
                return
              }

              const resUpdateThongTinHoSo = await putThongTinHoSoThuTuc(
                newDataUpdateThongTinHoSo,
              )
              if (resUpdateThongTinHoSo.status === 200) {
                setEditType('')
                Swal.fire({
                  icon: 'success',
                  title: 'Cập nhật thông tin hồ sơ thành công!',
                })
                refetchData_TTHC_GV_ByID()
                return
              }
            } catch (error) {
              console.log(error.message)
            }
          }
        })
      } else {
        return toast.warning(
          'Không có thay đổi nào để cập nhật thông tin hồ sơ!',
        )
      }
    }

    if (type === TABS.tabTPHSDeNghi) {
      let dataTPHPUpdate = {
        MC_TTHC_GV_ThanhPhanHoSo_ID: valueRow?.MC_TTHC_GV_ThanhPhanHoSo_ID,
        MC_TTHC_GV_ThanhPhanHoSo_IDTTHC:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_IDTTHC,
        MC_TTHC_GV_ThanhPhanHoSo_STT: valueRow?.MC_TTHC_GV_ThanhPhanHoSo_STT,
        MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo,
        MC_TTHC_GV_ThanhPhanHoSo_TenFile:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
        MC_TTHC_GV_ThanhPhanHoSo_DataFile:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_DataFile,
        MC_TTHC_GV_ThanhPhanHoSo_BanChinh:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_BanChinh,
        MC_TTHC_GV_ThanhPhanHoSo_BanSao:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_BanSao,
        MC_TTHC_GV_ThanhPhanHoSo_BatBuoc:
          valueRow?.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc,
      }

      Swal.fire({
        icon: 'question',
        title:
          'Bạn chắc chắn muốn cập nhật thông tin mẫu hồ sơ/hướng dẫn này chứ?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const resUpdateTPHSDeNghi =
              await putThanhPhanHoSoTTHCGV(dataTPHPUpdate)
            if (resUpdateTPHSDeNghi.status === 200) {
              Swal.fire({
                icon: 'success',
                title: `Cập nhật thông tin thành phần hồ sơ ${valueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo} thành công!`,
              })
              refetchData_TTHC_GV_ByID()
              setEditType('')
              setEditRowIndex(-1)
              setEditValueRow({})
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }

    if (type === TABS.tabTrinhTuThucHien) {
      let dataTrinhTuUpdate = {
        MC_TTHC_GV_TrinhTuThucHien_ID: valueRow?.MC_TTHC_GV_TrinhTuThucHien_ID,
        MC_TTHC_GV_TrinhTuThucHien_IDTTHC:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_IDTTHC,
        MC_TTHC_GV_TrinhTuThucHien_Buoc:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_Buoc,
        MC_TTHC_GV_TrinhTuThucHien_TenCongViec:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec,
        MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien,
        MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra,
        MC_TTHC_GV_TrinhTuThucHien_DonViThucHien:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien,
        MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop,
        MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay,
        MC_TTHC_GV_TrinhTuThucHien_KetQua:
          valueRow?.MC_TTHC_GV_TrinhTuThucHien_KetQua,
      }
      Swal.fire({
        icon: 'question',
        title:
          'Bạn chắc chắn muốn cập nhật thông tin trình tự thực hiện này chứ?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const resUpdateTrinhTuThucHien =
              await putTrinhTuThucHienTTHCGV(dataTrinhTuUpdate)
            if (resUpdateTrinhTuThucHien.status === 200) {
              Swal.fire({
                icon: 'success',
                title: `Cập nhật thông tin trình tự thực hiện ${valueRow?.MC_TTHC_GV_TrinhTuThucHien_TenCongViec} thành công!`,
              })
              setEditType('')
              setEditRowIndex(-1)
              setEditValueRow({})
              refetchData_TTHC_GV_ByID()
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }

    if (type === TABS.tabTrangThai) {
      let dataTrangThaiUpdate = {
        MC_TTHC_GV_TrangThai_ID: valueRow?.MC_TTHC_GV_TrangThai_ID,
        MC_TTHC_GV_TrangThai_IDTTHC: valueRow?.MC_TTHC_GV_TrangThai_IDTTHC,
        MC_TTHC_GV_TrangThai_STT: valueRow?.MC_TTHC_GV_TrangThai_STT,
        MC_TTHC_GV_TrangThai_TenTrangThai:
          valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai,
        MC_TTHC_GV_TrangThai_MoTa: valueRow?.MC_TTHC_GV_TrangThai_MoTa,
        MC_TTHC_GV_TrangThai_DoiTuongXuLy:
          valueRow?.MC_TTHC_GV_TrangThai_DoiTuongXuLy,
        MC_TTHC_GV_TrangThai_IsHienThiThongTin:
          valueRow?.MC_TTHC_GV_TrangThai_IsHienThiThongTin,
      }

      Swal.fire({
        icon: 'question',
        title: 'Bạn chắc chắn muốn cập nhật thông tin trạng thái này chứ?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const resUpdateTPHSDeNghi =
              await putTrangthaiTTHCGV(dataTrangThaiUpdate)
            if (resUpdateTPHSDeNghi.status === 200) {
              Swal.fire({
                icon: 'success',
                title: `Cập nhật thông tin trạng thái ${valueRow?.MC_TTHC_GV_TrangThai_TenTrangThai} thành công!`,
              })
              refetchData_TTHC_GV_ByID()
              setEditType('')
              setEditRowIndex(-1)
              setEditValueRow({})
            }
          } catch (error) {
            console.log(error.message)
          }
        }
      })
    }
  }

  // Effects
  useEffect(() => {
    if (dataThuTucHanhChinh) {
      setDataQuyTrinhThucHien(
        dataThuTucHanhChinh.data?.ThongTinHoSo.MC_TTHC_GV_QuyTrinhThucHien,
      )
      setEditThongTinChung(dataThuTucHanhChinh.data?.ThongTinHoSo)
    }
  }, [dataThuTucHanhChinh])

  if (isLoadingTTHC_GV) {
    return <Loading />
  }

  return (
    <div className="px-5 lg:px-0 grid grid-cols-12 flex-row gap-4">
      <div className="col-span-12 lg:col-span-2">
        <SidebarTTHCGV />
      </div>
      <div
        className={clsx(
          'col-span-12 lg:col-span-10 w-full p-4 rounded-xl shadow-lg bg-white',
          zoomView ? 'absolute left-0 right-0' : '',
        )}
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h3 className="font-semibold text-md lg:text-2xl uppercase mb-6 text-[#336699] underline">
              Chi tiết quy trình hồ sơ - thủ tục
            </h3>
            {zoomView ? (
              <MdOutlineZoomInMap
                size={24}
                onClick={() => {
                  setZoomView(false)
                }}
                className="text-sky-800 cursor-pointer"
              />
            ) : (
              <MdOutlineZoomOutMap
                size={24}
                onClick={() => {
                  setZoomView(true)
                }}
                className="text-sky-800 cursor-pointer"
              />
            )}
          </div>
          {!isLoadingTTHC_GV && (
            <>
              {/* Thông tin hồ sơ */}
              <ThongTinChungHoSoChiTiet
                dataThongTinHoSoChung={dataThuTucHanhChinh?.data.ThongTinHoSo}
                dataQuyTrinhThucHien={dataQuyTrinhThucHien}
                dataUpdateTepThuTuc={updatetepThuTuc}
                dataEditThongTinChung={editThongTinChung}
                onSetDataQuyTrinhThucHien={setDataQuyTrinhThucHien}
                showThongTinHoSo={showThongTinHoSo}
                onShowView={handleShowView}
                onUpdateThongTinChung={handleUpdate}
                onChangeValue={handleChangeValue}
                onUpdateTepThuTuc={setUpdatetepThuTuc}
                onEditThongTinChung={setEditThongTinChung}
              />
              {/* Thành phần hồ sơ */}
              {dataThuTucHanhChinh?.data?.ThanhPhanHoSo?.length ? (
                <TPHSDeNghiChiTiet
                  dataTPHSDeNghi={dataThuTucHanhChinh?.data?.ThanhPhanHoSo}
                  dataEditType={editType}
                  dataEditRowIndex={editRowIndex}
                  dataEditValueRow={editValueRow}
                  showTPHSDeNghi={showTPHSDeNghi}
                  onShowView={handleShowView}
                  onChangeValue={handleChangeValue}
                  onEditRow={handleEditRow}
                  onSetEditValueRow={setEditValueRow}
                  onDeleteRow={handleDeleteRow}
                  onUpdate={handleUpdate}
                  onCancelUpdateRow={handleCancelUpdateRow}
                />
              ) : null}
              {/* Trình tự thực hiện */}
              {dataThuTucHanhChinh?.data?.TrinhTuThucHien?.length ? (
                <TrinhTuThucHienChiTiet
                  showTrinhTuThucHien={showTrinhTuThucHien}
                  dataTrinhTuThucHien={
                    dataThuTucHanhChinh?.data?.TrinhTuThucHien
                  }
                  dataEditType={editType}
                  dataEditRowIndex={editRowIndex}
                  dataEditValueRow={editValueRow}
                  onShowView={handleShowView}
                  onChangeValue={handleChangeValue}
                  onEditRow={handleEditRow}
                  onDeleteRow={handleDeleteRow}
                  onUpdate={handleUpdate}
                  onCancelUpdateRow={handleCancelUpdateRow}
                />
              ) : null}
              {/* Phân quyền */}
              {dataThuTucHanhChinh?.data?.PhanQuyen?.length ? (
                <PhanQuyenChiTiet
                  showPhanQuyen={showPhanQuyen}
                  showEditPhanQuyen={showEditPhanQuyen}
                  dataPhanQuyen={dataThuTucHanhChinh?.data?.PhanQuyen}
                  dataTTHC_GV_ID={
                    dataThuTucHanhChinh?.data?.ThongTinHoSo?.MC_TTHC_GV_ID
                  }
                  onShowView={handleShowView}
                  onDeleteRow={handleDeleteRow}
                  onSetShowEditPhanQuyen={setShowEditPhanQuyen}
                  onSetLoading={setLoading}
                  onGetDataDetailHoSoThuTuc={refetchData_TTHC_GV_ByID}
                />
              ) : (
                <div className="">
                  <button
                    onClick={() => {
                      setShowEditPhanQuyen(true)
                    }}
                    className="px-3 py-2 bg-sky-800 text-white hover:opacity-70 rounded-md"
                  >
                    Thêm phân quyền mới
                  </button>
                  {showEditPhanQuyen ? (
                    <EditPhanQuyenThuTuc
                      idTTHCGoc={
                        dataThuTucHanhChinh?.data?.ThongTinHoSo?.MC_TTHC_GV_ID
                      }
                      onLoading={setLoading}
                      onGetDataDetailHoSoThuTuc={refetchData_TTHC_GV_ByID}
                      onShowEditPhanQuyen={setShowEditPhanQuyen}
                    />
                  ) : null}
                </div>
              )}
              {/* Trạng thái */}
              {dataThuTucHanhChinh?.data?.TrangThai?.length ? (
                <TrangThaiChiTiet
                  showTrangThai={showTrangThai}
                  dataTrangThai={dataThuTucHanhChinh.data?.TrangThai}
                  dataEditType={editType}
                  dataEditRowIndex={editRowIndex}
                  dataEditValueRow={editValueRow}
                  onEditRow={handleEditRow}
                  onShowView={handleShowView}
                  onDeleteRow={handleDeleteRow}
                  onChangeValue={handleChangeValue}
                  onUpdate={handleUpdate}
                  onCancelUpdateRow={handleCancelUpdateRow}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ThongTinChiTietHoSo
