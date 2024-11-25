import { lazy } from 'react'

const HomeHocTap = lazy(
  () => import('@/Pages/Clients/SinhVien/HocTap/HocTap.jsx'),
)
const HocTapKetQuaHocTap = lazy(
  () => import('@/Pages/Clients/SinhVien/HocTap/KetQuaHocTap/KetQuaHocTap.jsx'),
)
const HocTapOnLuyen = lazy(
  () => import('@/Pages/Clients/SinhVien/HocTap/OnLuyen/OnLuyen.jsx'),
)
const HocTapOnTap = lazy(
  () => import('@/Pages/Clients/SinhVien/HocTap/OnLuyen/OnTap/OnTap.jsx'),
)
const HocTapThiThu = lazy(
  () => import('@/Pages/Clients/SinhVien/HocTap/OnLuyen/ThiThu/ThiThu.jsx'),
)
const KetQuaHocTapChiTiet = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/HocTap/KetQuaHocTap/KetQuaHocTapChiTiet/KetQuaHocTapChiTiet'
    ),
)
const DeThi = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/HocTap/OnLuyen/ThiThu/DanhSachDeThi/DeThi/DeThi'
    ),
)
const ThiThuDanhSachDeThi = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/HocTap/OnLuyen/ThiThu/DanhSachDeThi/DanhSachDeThi'
    ),
)
const OnTapDanhSachCauHoi = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/HocTap/OnLuyen/OnTap/DanhSachCauHoi/DanhSachCauHoi'
    ),
)
const DanhSachPhan = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/HocTap/OnLuyen/OnTap/DanhSachPhan/DanhSachPhan'
    ),
)
const DanhSachChuong = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/HocTap/OnLuyen/OnTap/DanhSachChuong/DanhSachChuong'
    ),
)
export {
  HomeHocTap,
  HocTapKetQuaHocTap,
  HocTapOnLuyen,
  HocTapOnTap,
  HocTapThiThu,
  KetQuaHocTapChiTiet,
  DeThi,
  ThiThuDanhSachDeThi,
  OnTapDanhSachCauHoi,
  DanhSachPhan,
  DanhSachChuong,
}
