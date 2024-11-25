import { lazy } from 'react'

const HomeTraCuu = lazy(() => import('@/Pages/Clients/SinhVien/TraCuu'))
const ThoiKhoaBieu = lazy(
  () => import('@/Pages/Clients/SinhVien/TraCuu/ThoiKhoaBieu/ThoiKhoaBieu'),
)
const DiemDanh = lazy(
  () => import('@/Pages/Clients/SinhVien/TraCuu/DiemDanh/DiemDanh'),
)
const RenLuyen = lazy(
  () => import('@/Pages/Clients/SinhVien/TraCuu/RenLuyen/RenLuyen'),
)
const ChuongTrinhDaoTao = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/TraCuu/ChuongTrinhDaoTao/ChuongTrinhDaoTao'
    ),
)
const DuKienKetQuaHocTap = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/TraCuu/DuKienKetQuaHocTap/DuKienKetQuaHocTap'
    ),
)

export {
  HomeTraCuu,
  ThoiKhoaBieu,
  DiemDanh,
  RenLuyen,
  ChuongTrinhDaoTao,
  DuKienKetQuaHocTap,
}
