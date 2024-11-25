import { lazy } from 'react'
const LayoutQuanLyBMS = lazy(() => import('@/Layouts/LayoutQuanLyBMS'))
const ThietLapThuCong = lazy(
  () =>
    import('@/Pages/Clients/GiangVien/BoDieuKhienThietBiBMS/ThietLapThuCong'),
)
const CauHinhLapLichThietBiBMS = lazy(
  () =>
    import('@/Pages/Clients/GiangVien/BoDieuKhienThietBiBMS/CauHinhLapLich'),
)
const LichSuCommandBMS = lazy(
  () => import('@/Pages/Clients/GiangVien/BoDieuKhienThietBiBMS/LichSuBMS'),
)
const LichSuTrangThaiBMS = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/BoDieuKhienThietBiBMS/LichSuTrangThaiBMS'
    ),
)
export {
  LayoutQuanLyBMS,
  ThietLapThuCong,
  CauHinhLapLichThietBiBMS,
  LichSuCommandBMS,
  LichSuTrangThaiBMS,
}
