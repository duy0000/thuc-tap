import { lazy } from 'react'

const CongTacGiangVien = lazy(
  () => import('@/Pages/Clients/GiangVien/CongTacGiangVien'),
)

const TraCuuHome = lazy(
  () => import('@/Pages/Clients/GiangVien/CongTacGiangVien/TraCuu'),
)
const CongTacGiangDayHome = lazy(
  () => import('@/Pages/Clients/GiangVien/CongTacGiangVien/CongTacGiangDay'),
)

// 1. Module Children - Tra cứu
const TraCuuNhanSu = lazy(
  () => import('@/Pages/Clients/GiangVien/CongTacGiangVien/TraCuu/NhanSu'),
)
const TraCuuLopHPGV = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/CongTacGiangVien/TraCuu/LopHocPhanGiangVien'
    ),
)
const TraCuuKLCoiChamThi = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/CongTacGiangVien/TraCuu/KhoiLuongCoiChamThi'
    ),
)
const TraCuuKhoiLuongBu = lazy(
  () => import('@/Pages/Clients/GiangVien/CongTacGiangVien/TraCuu/KhoiLuongBu'),
)
const TraCuuTongHopKhoiLuong = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/CongTacGiangVien/TraCuu/TongHopKhoiLuong'
    ),
)
const TraCuuTongHopThanhToan = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/CongTacGiangVien/TraCuu/TongHopThanhToan'
    ),
)
const TraCuuThanhToanHDNgoai = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/CongTacGiangVien/TraCuu/ThanhToanHDNgoai'
    ),
)
const LichTheoTienDo = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/CongTacGiangVien/CongTacGiangDay/LichTheoTienDo'
    ),
)
// 2.Module Chidlren - Công tác giảng dạy
const CongTacGiangDayDiemDanhHangNgay = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/CongTacGiangVien/CongTacGiangDay/DiemDanhHangNgay'
    ),
)
const CongTacGiangDayNhapDiemThuongKy = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/CongTacGiangVien/CongTacGiangDay/NhapDiemThuongKy'
    ),
)
export {
  TraCuuHome,
  TraCuuNhanSu,
  TraCuuLopHPGV,
  TraCuuKLCoiChamThi,
  TraCuuKhoiLuongBu,
  TraCuuTongHopKhoiLuong,
  TraCuuTongHopThanhToan,
  TraCuuThanhToanHDNgoai,
  CongTacGiangVien,
  CongTacGiangDayHome,
  LichTheoTienDo,
  CongTacGiangDayDiemDanhHangNgay,
  CongTacGiangDayNhapDiemThuongKy,
}
