import http from '@/Configs/http'

// 1. Thống kê TTHCGV theo Phòng Ban
export const getTTHCGVThongKeTheoPhongBan = (
  params = {
    MC_TTHC_GV_LoaiTimKiem: '',
    MC_TTHC_GV_NamTimKiem: '',
    MC_TTHC_GV_ThangTimKiem: '',
  },
) =>
  http.get('SP_MC_TTHC_GV_TiepNhan/TTHC_GV_Load_ThongKe_TheoPhongBan', {
    params,
  })

// 2. Thống kê TTHCGV theo Thủ tục
export const getTTHCGVThongKeTheoThuTuc = (
  params = {
    MC_TTHC_GV_NamTimKiem: '',
    MC_TTHC_GV_ThangTimKiem: '',
    NgayBatDau: '',
    NgayKetThuc: '',
  },
) =>
  http.get('SP_MC_TTHC_GV_TiepNhan/TTHC_GV_Load_ThongKe_TheoThuTuc', { params })

// 3. Thống kê theo đơn vị xử lý
export const getTTHCGVThongKeTheoDVXuLy = (
  params = {
    NgayBatDau: '',
    NgayKetThuc: '',
  },
) =>
  http.get('SP_MC_TTHC_GV_TiepNhan/TTHC_GV_Load_ThongKe_TheoDonViXuLy', {
    params,
  })

// 4. Thống kê theo đơn vị đề nghị
export const getTTHCGVThongKeTheoDVDeNghi = (
  params = {
    NgayBatDau: '',
    NgayKetThuc: '',
  },
) =>
  http.get('SP_MC_TTHC_GV_TiepNhan/TTHC_GV_Load_ThongKe_TheoDonViDeNghi', {
    params,
  })
