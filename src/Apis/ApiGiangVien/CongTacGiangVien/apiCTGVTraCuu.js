import http from '@/Configs/http'
export const getAllNamHoc = () => http.get('SP_EDU/QLD_Load_Nam')

export const getAllHocKy = () => http.get('SP_EDU/QLD_Load_TenDot')
export const getCTGV_TTKL_NS_TheoDoi_Load_R_Para = () =>
  http.get(
    'SP_TTKL_TraCuCongTacGV/NS_TheoDoi_Load_ByMaNhanSu_TongSoTrang_Graft',
    {
      params: {
        SoTrang: '1',
        SoBanGhiTrenTrang: '10',
      },
    },
  )

export const getAllNhanSu = ({
  TTKL_NS_Nam = '',
  TTKL_NS_HocKy = '',
  TTKL_NS_MaNS = '',
  SoTrang = '',
  SoBanGhiTrenTrang = '',
  TTKL_NS_CoSo = '',
  TTKL_NS_HoDem = '',
  TTKL_NS_Ten = '',
  TTKL_NS_ChucVu = '',
  TTKL_NS_ChuyenNganh = '',
  TTKL_NS_NgaySinh = '',
  TTKL_NS_GioiTinh = '',
  TTKL_NS_DiaChi = '',
  TTKL_NS_SoCMT = '',
  TTKL_NS_NgayCap = '',
  TTKL_NS_NoiCap = '',
  TTKL_NS_SoDienThoai = '',
  TTKL_NS_Email = '',
  TTKL_NS_TenNganHang = '',
  TTKL_NS_SoTaiKhoan = '',
  TTKL_NS_MaSoThue = '',
  TTKL_NS_DonViQLNS = '',
  TTKL_NS_KhoaChuyenMon = '',
  TTKL_NS_LoaiGV = '',
  TTKL_NS_LoaiGV2 = '',
  TTKL_NS_TrinhDoGV_TrinhDo = '',
  TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong = '',
  TTKL_NS_TrinhDoGV_TrinhDo_HeSo = '',
  TTKL_NS_TongKLThucHien = '',
  TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT = '',
  TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT = '',
  TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT = '',
  TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTQL_KLGT = '',
  TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT = '',
  TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT = '',
  TTKL_NS_KLGT_HTCMNVBDGV_KLGT = '',
  TTKL_NS_KLGT_NCKH_KLGT = '',
  TTKL_NS_KLGT_QLCSVC_KLGT = '',
  TTKL_NS_KLGT_NCD_KLGT = '',
  TTKL_NS_KLGT_HCTCM_KLGT = '',
  TTKL_NS_KLGT_CTK_KLGT = '',
  TTKL_NS_KLGT_TongKLGT = '',
  TTKL_NS_TongKLPTH = '',
  TTKL_NS_TenFile = '',
  TTKL_NS_GhiChu = '',
  TTKL_NS_TrangThai = '',
  TTKL_NS_TrangThai_MoTa = '',
  TTKL_NS_TrangThai_TCCB = '',
  TTKL_NS_TrangThai_TCCB_MoTa = '',
  TTKL_NS_TrangThai_QLKH = '',
  TTKL_NS_TrangThai_QLKH_MoTa = '',
  TTKL_NS_TrangThai_TCKT = '',
  TTKL_NS_TrangThai_TCKT_MoTa = '',
  TTKL_NS_TrangThai_DaoTao = '',
  TTKL_NS_TrangThai_DaoTao_MoTa = '',
  TTKL_NS_Nguon = '',
}) => {
  return http.get(
    'SP_TTKL_TraCuCongTacGV/NS_TheoDoi_Load_ByMaNhanSu_TongSoTrang_Graft',
    {
      params,
    },
  )
}
export const getAllLopHocPhanGiangVien = (
  params = {
    SoTrang: 1,
    SoBanGhiTrenTrang: 10,
    TTKL_TKBLHPGV_TenCoSo: '',
    TTKL_TKBLHPGV_MaLopHocPhan: '',
    TTKL_TKBLHPGV_TenMonHoc: '',
    TTKL_TKBLHPGV_TenLopHoc: '',
    TTKL_TKBLHPGV_DiaDiemHocTap: '',
    TTKL_TKBLHPGV_XacDinhKhoiLuong: '',
    TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong: '',
    TTKL_TKBLHPGV_TrangThai: '',
    TTKL_TKBLHPGV_HopDong_So: '',
    TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_GhiChu: '',
    TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai: '',
    TTKL_TKBLHPGV_Nam: '',
    TTKL_TKBLHPGV_TenDot: '',
    TTKL_TKBLHPGV_TenKhoaChuQuanHP: '',
    TTKL_TKBLHPGV_IDMonHocNgoaiChuongTrinh: '',
    TTKL_TKBLHPGV_IsXepLich: '',
    TTKL_TKBLHPGV_TenKhoaHoc: '',
    TTKL_TKBLHPGV_TenNganh: '',
    TTKL_TKBLHPGV_TenHeDaoTao: '',
    TTKL_TKBLHPGV_TenLoaiHinhDT: '',
    TTKL_TKBLHPGV_SoTinChi: '',
    TTKL_TKBLHPGV_SiSoDangKy: '',
    TTKL_TKBLHPGV_SoTietLyThuyet: '',
    TTKL_TKBLHPGV_SoTietThucHanh: '',
    TTKL_TKBLHPGV_SLNhom: '',
    TTKL_TKBLHPGV_SiSoNhom: '',
    TTKL_TKBLHPGV_XepLichGiangDayCapGiangVien: '',
    TTKL_TKBLHPGV_SoTiet_ThucTeEDU: '',
    TTKL_TKBLHPGV_IsLyThuyet: '',
    TTKL_TKBLHPGV_LoaiLopHocPhan: '',
    TTKL_TKBLHPGV_HeSo_DoiTuongDaoTao: '',
    TTKL_TKBLHPGV_HeSo_GioHoc: '',
    TTKL_TKBLHPGV_HeSo_QuyMoLop: '',
    TTKL_TKBLHPGV_CoSo_GiangVien1: '',
    TTKL_TKBLHPGV_KhoaChuQuanGiangVien1: '',
    TTKL_TKBLHPGV_TenGiangVien1: '',
    TTKL_TKBLHPGV_MaNS: '',
    TTKL_TKBLHPGV_TrinhDoGiangVien1: '',
    TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_DoiTuong1: '',
    TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_HeSo1: '',
    TTKL_TKBLHPGV_HeSo_DiaDiemKhacCoSo_GV1: '',
    TTKL_TKBLHPGV_HeSo_KhoangCachDiaDiem_GV1: '',
    TTKL_TKBLHPGV_SoTietThucHien_GV1: '',
    TTKL_TKBLHPGV_QuyDoiSoTietThucHien_GV1: '',
    TTKL_TKBLHPGV_GhiChu: '',
    TTKL_TKBLHPGV_GhiChu2: '',
  },
) => {
  return http.get(
    'SP_TTKL_TraCuCongTacGV/TKBLHPGV_TheoDoi_Load_ByMaNhanSu_TongSoTrang_Graft',
    {
      params,
    },
  )
}

export const getAllKhoiLuongBu = (
  params = {
    TTKL_KLB_Nam: '',
    TTKL_KLB_HocKy: '',
    TTKL_KLB_MaNS: '',
    SoTrang: '',
    SoBanGhiTrenTrang: '',
    TTKL_KLB_CoSo: '',
    TTKL_KLB_HoDem: '',
    TTKL_KLB_Ten: '',
    TTKL_KLB_DVQLNS: '',
    TTKL_KLB_KhoaChuyenMon: '',
    TTKL_KLB_KLBenNgoai: '',
    TTKL_KLB_KLTrenPhanMem: '',
    TTKL_KLB_KLKhac: '',
    TTKL_KLB_TongKhoiLuongBu_Tiet: '',
    TTKL_KLB_TongKhoiLuongBu: '',
    TTKL_KLB_MoTaFile: '',
    TTKL_KLB_TenFile: '',
    TTKL_KLB_GhiChu: '',
    TTKL_KLB_TrangThai: '',
  },
) => {
  return http.get(
    'SP_TTKL_TraCuCongTacGV/KLB_TheoDoi_Load_ByMaNhanSu_TongSoTrang_Graft',
    {
      params,
    },
  )
}

export const getKhoiLuongBuDetail = (params = { TTKL_KLB_ID: '' }) => {
  return http.get('SP_TTKL_TraCuCongTacGV/KLB_TheoDoi_Load_R_Para', {
    params,
  })
}

export const getAllCoiChamThi = (
  params = {
    TTKL_KLCCT_Nam: '',
    TTKL_KLCCT_HocKy: '',
    TTKL_KLCCT_MaNS: '',
    SoTrang: '',
    SoBanGhiTrenTrang: '',
    TTKL_KLCCT_CoSo: '',
    TTKL_KLCCT_HoDem: '',
    TTKL_KLCCT_Ten: '',
    TTKL_KLCCT_DVQLNS: '',
    TTKL_KLCCT_KhoaChuyenMon: '',
    TTKL_KLCCT_KLCoiThi: '',
    TTKL_KLCCT_KLChamThi: '',
    TTKL_KLCCT_KLNCKH: '',
    TTKL_KLCCT_SoTiet: '',
    TTKL_KLCCT_GhiChuKLK: '',
    TTKL_KLCCT_TongKhoiLuong_Tiet: '',
    TTKL_KLCCT_TongKhoiLuong: '',
    TTKL_KLCCT_MoTaFile: '',
    TTKL_KLCCT_TenFile: '',
    TTKL_KLCCT_GhiChu: '',
    TTKL_KLCCT_TrangThai: '',
  },
) => {
  return http.get(
    'SP_TTKL_TraCuCongTacGV/KLCCT_TheoDoi_Load_ByMaNhanSu_TongSoTrang_Graft',
    {
      params,
    },
  )
}

export const getCoiChamThiDetail = (params = { TTKL_KLCCT_ID: '' }) => {
  return http.get('SP_TTKL_TraCuCongTacGV/KLCCT_TheoDoi_Load_R_Para', {
    params,
  })
}

export const getAllTongHopKhoiLuong = (
  params = {
    TTKL_THKL_Nam: '',
    TTKL_THKL_HocKy: '',
    TTKL_THKL_MaNS: '',
    SoTrang: 1,
    SoBanGhiTrenTrang: 10,
    TTKL_THKL_CoSo: '',
    TTKL_THKL_HoDem: '',
    TTKL_THKL_Ten: '',
    TTKL_THKL_DonViQLNS: '',
    TTKL_THKL_KhoaChuyenMon: '',
    TTKL_THKL_TongKLThucHien: '',
    TTKL_THKL_KLGT_QLDDT_Tong: '',
    TTKL_THKL_KLGT_HTCMNVBDGV_Tong: '',
    TTKL_THKL_KLGT_NCKH_Tong: '',
    TTKL_THKL_KLGT_QLCSVC_Tong: '',
    TTKL_THKL_KLGT_NCD_Tong: '',
    TTKL_THKL_KLGT_HCTCM_Tong: '',
    TTKL_THKL_KLGT_CTK_Tong: '',
    TTKL_THKL_KLGT_TongKLGT: '',
    TTKL_THKL_TongKLPTH: '',
    TTKL_THKL_TongKLGiangDay: '',
    TTKL_THKL_TongKLThua: '',
    TTKL_THKL_TongKLThua_DuKien: '',
    TTKL_THKL_TongKLThua_VuotGio: '',
    TTKL_THKL_TongKLThua_VuotGio_SLHopDong: '',
    TTKL_THKL_TongKLThua_VuotGio_SLHopDong_GhiChu: '',
    TTKL_THKL_TongKLThua_HopDon: '',
    TTKL_THKL_TongKLThua_HopDong_SLHopDong: '',
    TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu: '',
    TTKL_THKL_GhiChu: '',
    TTKL_THKL_TrangThai: '',
    TTKL_THKL_TrangThai_MoTa: '',
    TTKL_THKL_TrangThai_DaoTao: '',
    TTKL_THKL_TrangThai_DaoTao_MoTa: '',
    TTKL_THKL_XacDinhKhoiLuong: '',
    TTKL_THKL_TongKLPTH_Tiet: '',
    TTKL_THKL_TongKLGiangDay_Gio: '',
    TTKL_KLCCT_TongKhoiLuong: '',
    TTKL_KLB_TongKhoiLuongBu: '',
  },
) => {
  return http.get(
    'SP_TTKL_TraCuCongTacGV/THKL_TheoDoi_Load_ByMaNhanSu_TongSoTrang_Graft',
    {
      params,
    },
  )
}

export const getAllTongHopThanhToan = (
  params = {
    TTKL_THKL_Nam: '',
    TTKL_THKL_HocKy: '',
    TTKL_THKL_MaNS: '',
    SoTrang: 1,
    SoBanGhiTrenTrang: 10,
    TTKL_THKL_CoSo: '',
    TTKL_THKL_HoDem: '',
    TTKL_THKL_Ten: '',
    TTKL_THKL_DonViQLNS: '',
    TTKL_THKL_KhoaChuyenMon: '',
    TTKL_THKL_TongKLThucHien: '',
    TTKL_THKL_KLGT_QLDDT_Tong: '',
    TTKL_THKL_KLGT_HTCMNVBDGV_Tong: '',
    TTKL_THKL_KLGT_NCKH_Tong: '',
    TTKL_THKL_KLGT_QLCSVC_Tong: '',
    TTKL_THKL_KLGT_NCD_Tong: '',
    TTKL_THKL_KLGT_HCTCM_Tong: '',
    TTKL_THKL_KLGT_CTK_Tong: '',
    TTKL_THKL_KLGT_TongKLGT: '',
    TTKL_THKL_TongKLPTH: '',
    TTKL_THKL_TongKLGiangDay: '',
    TTKL_THKL_TongKLThua: '',
    TTKL_THKL_TongKLThua_VuotGio: '',
    TTKL_THKL_TongKLThua_VuotGio_SLHopDong: '',
    TTKL_THKL_TongKLThua_VuotGio_SLHopDong_GhiChu: '',
    TTKL_THKL_TongKLThua_HopDong: '',
    TTKL_THKL_TongKLThua_HopDong_SLHopDong: '',
    TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu: '',
    TTKL_THKL_TrangThai: '',
    TTKL_THKL_TrangThai_DaoTao: '',
    TTKL_THKL_TrangThai_DaoTao_MoTa: '',
    TTKL_KLCCT_TongKhoiLuong: '',
    TTKL_KLB_TongKhoiLuongBu: '',
    TTKL_TKBLHPGV_GhiChu: '',
  },
) => {
  return http.get(
    'SP_TTKL_TraCuCongTacGV/THTT_TheoDoi_Load_ByMaNhanSu_TongSoTrang_TKBLHPGV_Graft',
    {
      params,
    },
  )
}

export const getAllThanhToanHopDongNgoai = (params) => {
  return http.get(
    'SP_TTKL_TraCuCongTacGV/THTT_ThanhToan_Ngoai_Load_ByMaNhanSu_TongSoTrang_TKBLHPGV_Graft',
    {
      params,
    },
  )
}
