import http from '@/Configs/http'
export const getAllHocKy = () => http.get('SP_EDU/QLD_Load_TenDot')
export const getAllNamHoc = () => http.get('SP_EDU/QLD_Load_Nam')
export const getALlDanhSachLichGV = (
  params = {
    MaGiangVien,
    HocKy,
    LoaiLich,
  },
) =>
  http.get('SP_CVGV_TraCuuLichGV/TCCTGD_LichDayCoiThi_Load', {
    params,
  })

export const getAllDiemDanhHangNgay = (
  params = {
    HocKy,
    NgayDiemDanh,
    MaLopHocPhan,
  },
) => {
  return http.get('SP_CVGV_TraCuuLichGV/TCCTGD_DiemDanhHangNgay_Load', {
    params,
  })
}
export const getAllNhapDiemThuongKy = (
  params = {
    MaGiangVien,
    HocKy,
    CoSo,
    MonHoc,
    LopHoc,
    MaLopHocPhan,
    TrangThaiSinhVien,
  },
) => {
  return http.get('SP_CVGV_TraCuuLichGV/TCCTGD_DiemThuongKy_Load', {
    params,
  })
}
export const getAllDanhSachLopHocPhan = (
  params = {
    MaGiangVien,
    HocKy,
    CoSo,
    // MonHoc,
    // LopHoc,
    // MaLopHocPhan,
  },
) => {
  return http.get('SP_CVGV_TraCuuLichGV/TCCTGD_DSLopHocPhan_Load', {
    params,
  })
}
