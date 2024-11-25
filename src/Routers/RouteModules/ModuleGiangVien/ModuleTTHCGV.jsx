import { lazy } from 'react'

const ChiTietThuTuc = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/ChiTietThuTuc/ChiTietThuTuc.jsx'
    ),
)
const SoanHoSo = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/SoanHoSo/SoanHoSo'
    ),
)
const AdminTTHCGV = lazy(() => import('@/Pages/Admins/TTHCGV/AdminTTHCGV.jsx'))
const CanBoNghiepVu = lazy(
  () => import('@/Pages/Admins/TTHCGV/CanBoNghiepVu/CanBoNghiepVu.jsx'),
)
const ChiTietHoSoYeuCau = lazy(
  () => import('@/Pages/Admins/TTHCGV/ChiTietHoSoYeuCau/ChiTietHoSoYeuCau.jsx'),
)
const ThongTinChiTietHoSo = lazy(
  () =>
    import(
      '@/Pages/Admins/TTHCGV/DanhSachHoSo/ThongTinChiTietHoSo/ThongTinChiTietHoSo.jsx'
    ),
)
const DanhSachHoSo = lazy(
  () => import('@/Pages/Admins/TTHCGV/DanhSachHoSo/DanhSachHoSo.jsx'),
)
const TheoDoiDeNghiTTHCGV = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/TheoDoiDeNghiTTHCGV/TheoDoiDeNghiTTHCGV.jsx'
    ),
)
const TheoDoiDeNghiTTHCGVChiTiet = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/TheoDoiDeNghiTTHCGV/TheoDoiDeNghiTTHCGVChiTiet.jsx'
    ),
)
import HomeThuTucHanhChinhGiangVien from './../../../Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/index'

export {
  // HomeTTHCGV,
  HomeThuTucHanhChinhGiangVien,
  ChiTietThuTuc,
  SoanHoSo,
  AdminTTHCGV,
  CanBoNghiepVu,
  ChiTietHoSoYeuCau,
  ThongTinChiTietHoSo,
  DanhSachHoSo,
  TheoDoiDeNghiTTHCGV,
  TheoDoiDeNghiTTHCGVChiTiet,
}
