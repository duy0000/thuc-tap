import http from '@/Configs/http'

export const apiQuanLyCongViec = {
  addCongViec: (
    data = {
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
      IDNhanSu: '',
      HT_USER_Create: '',
    },
  ) => http.post('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Add_Para', data),
  addCongViecCaNhan: (
    data = {
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
    },
  ) => http.post('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_CaNhan_Add_Para', data),
  xacNhanCongViec: (
    data = {
      CV_HT_PhanCongThucHien_ID: '',
      CV_HT_PhanCongThucHien_XacNhan_PhanTram: '0' | '25' | '50' | '75' | '100',
      CV_HT_PhanCongThucHien_XacNhan_TenFile: '',
      CV_HT_PhanCongThucHien_XacNhan_DataFile: '',
      CV_HT_PhanCongThucHien_XacNhan_MoTa: '',
    },
  ) =>
    http.put(
      'SP_CV_HT_QuanLyCongViec/PhanCongThucHien_XacNhan_Edit_Para',
      data,
    ),
  editCongViec: (
    data = {
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
      IDNhanSu: '',
    },
  ) => http.put('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Edit_Para', data),
  editCongViecCaNhan: (
    data = {
      CV_HT_KhoiTaoCV_ID: '',
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
    },
  ) => http.put('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_CaNhan_Edit_Para', data),
  kiemTraCongViec: (
    data = {
      CV_HT_PhanCongThucHien_ID: '',
      CV_HT_PhanCongThucHien_KiemTra_XacNhan: false,
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_PhanCongThucHien_KiemTra_TenFile: '',
      CV_HT_PhanCongThucHien_KiemTra_DataFile: '',
      CV_HT_PhanCongThucHien_KiemTra_MoTa: '',
    },
  ) =>
    http.put(
      'SP_CV_HT_QuanLyCongViec/PhanCongThucHien_KiemTra_Edit_Para',
      data,
    ),
  getCongViec_ByMaNhanSu: (
    params = {
      TrangThai: '',
      MaNhanSu: '',
      Loai: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_Load_ByMaNhanSu', {
      params,
    }),
  getCongViecLienQuan: (
    params = {
      MaNhanSu: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Load_CVLienQuan', {
      params,
    }),
  delCongViec: (
    params = {
      CV_HT_KhoiTaoCV_ID: '',
    },
  ) =>
    http.delete('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Del_Para', {
      params,
    }),
  editPhanCongThucHien_XacNhan: (
    data = {
      CV_HT_PhanCongThucHien_ID: '',
      CV_HT_PhanCongThucHien_XacNhan_PhanTram: '',
      CV_HT_PhanCongThucHien_XacNhan_TenFile: '',
      CV_HT_PhanCongThucHien_XacNhan_DataFile: '',
      CV_HT_PhanCongThucHien_XacNhan_MoTa: '',
    },
  ) =>
    http.put(
      'SP_CV_HT_QuanLyCongViec/PhanCongThucHien_XacNhan_Edit_Para',
      data,
    ),
}
