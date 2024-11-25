import { lazy } from 'react'
const LayoutQuanLyCongViec = lazy(
  () => import('@/Layouts/LayoutQuanLyCongViec'),
)
const QuanLyCongViec = lazy(
  () => import('@/Pages/Clients/GiangVien/QuanLyCongViec'),
)
const TraCuuLichSuCongViec = lazy(
  () => import('@/Pages/Clients/GiangVien/QuanLyCongViec/TraCuuLichSuCongViec'),
)
export { LayoutQuanLyCongViec, QuanLyCongViec, TraCuuLichSuCongViec }
