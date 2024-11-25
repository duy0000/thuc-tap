import { lazy } from 'react'

const TheoDoiDeNghi = lazy(
  () => import('@/Pages/Clients/SinhVien/TheoDoiDeNghi/TheoDoiDeNghi.jsx'),
)
const TheoDoiDeNghiChiTiet = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/TheoDoiDeNghi/TheoDoiDeNghiChiTiet/TheoDoiDeNghiChiTiet.jsx'
    ),
)

export { TheoDoiDeNghi, TheoDoiDeNghiChiTiet }
