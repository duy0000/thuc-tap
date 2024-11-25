import { lazy } from 'react'

const HomeTBGD = lazy(
  () => import('@/Pages/Clients/GiangVien/ThietBiGiangDuong'),
)
const BaoHong = lazy(
  () => import('@/Pages/Clients/GiangVien/ThietBiGiangDuong/BaoHong/BaoHong'),
)
const XuLySuCo = lazy(
  () => import('@/Pages/Clients/GiangVien/ThietBiGiangDuong/XuLySuCo/XuLySuCo'),
)
const DangKySuDungThietBi = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/ThietBiGiangDuong/DangKySuDungThietBi/DangKySuDungThietBi'
    ),
)
const GopY = lazy(
  () => import('@/Pages/Clients/GiangVien/ThietBiGiangDuong/GopY/GopY'),
)

const XuLyDangKyThietBi = lazy(
  () => import('@/Pages/Clients/GiangVien/ThietBiGiangDuong/XuLyDangKyThietBi'),
)

export {
  HomeTBGD,
  BaoHong,
  XuLySuCo,
  DangKySuDungThietBi,
  GopY,
  XuLyDangKyThietBi,
}
