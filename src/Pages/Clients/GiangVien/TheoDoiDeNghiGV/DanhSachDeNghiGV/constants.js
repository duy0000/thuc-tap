import { delThuTucHanhChinhGuiYeuCauByID } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { putTBGDDangKySuDungThietBi_XuLy } from '@/Apis/HoTroThietBiGiangDuong/apiDangKySuDungThietBi'
import Swal from 'sweetalert2'

export const handleCancelRequest_HTTBGD_DKSDTB = async ({
  idYeuCau,
  DataCBGV,
  onRefresh,
}) => {
  Swal.fire({
    icon: 'question',
    title: 'Thầy/Cô có chắc chắn muốn hủy yêu cầu này không?',
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: 'Hủy',
    confirmButtonText: 'Đồng ý',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const dataSubmit = {
        DT_CVNB_TBGD_GuiYeuCau_ID: idYeuCau,
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_Email: DataCBGV.EmailUneti,
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_HoTen:
          DataCBGV.HoDem + ' ' + DataCBGV.Ten,
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_MaNhanSu: DataCBGV.MaNhanSu,
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_SoDienThoai:
          DataCBGV.SoDienThoai || '',
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan: -1,
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_Ngay: new Date().toISOString(),
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_GhiChu: '',
      }
      const response = await putTBGDDangKySuDungThietBi_XuLy(dataSubmit)
      if (response.data.code === 200) {
        onRefresh()
        Swal.fire({
          icon: 'success',
          title: 'Hủy yêu cầu thành công!',
          showConfirmButton: false,
          cancelButtonText: 'OK',
          timer: 3000,
        })
      }
    }
  })
}

export const handleCancelRequest_TTHCGV = async ({ idYeuCau, onRefresh }) => {
  Swal.fire({
    icon: 'question',
    title: 'Thầy/Cô có chắc chắn muốn hủy yêu cầu này không?',
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: 'Hủy',
    confirmButtonText: 'Đồng ý',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await delThuTucHanhChinhGuiYeuCauByID(idYeuCau)
      if (response.data.code === 200) {
        onRefresh()
        Swal.fire({
          icon: 'success',
          title: 'Hủy yêu cầu thành công!',
          showConfirmButton: false,
          cancelButtonText: 'OK',
          timer: 3000,
        })
      }
    }
  })
}
