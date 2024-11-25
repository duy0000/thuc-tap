import { lazy } from 'react'

// Trang chủ - Một cửa
const HomeMotCua = lazy(() => import('@/Pages/Clients/SinhVien/MotCua'))
// Pages MC - Khảo Thí
const HomeKhaoThi = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/KhaoThi'),
)
const MienHocThiTiengAnh = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/MotCua/KhaoThi/MienHocThiTiengAnh/MienHocThiTiengAnh.jsx'
    ),
)
const PhucKhao = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/KhaoThi/PhucKhao/PhucKhao'),
)
const LichThi = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/KhaoThi/LichThi/LichThi'),
)
const DangKyThiLai = lazy(
  () =>
    import('@/Pages/Clients/SinhVien/MotCua/KhaoThi/DangKyThiLai/DangKyThiLai'),
)
const HoanThi = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/KhaoThi/HoanThi/HoanThi'),
)
const HuyDangKyThiLai = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/MotCua/KhaoThi/HuyDangKyThilai/HuyDangKyThiLai'
    ),
)
const KetQuaHocTap = lazy(
  () =>
    import('@/Pages/Clients/SinhVien/MotCua/KhaoThi/KetQuaHocTap/KetQuaHocTap'),
)

// Pages MC - Đào Tạo
const HomeDaoTao = lazy(() => import('@/Pages/Clients/SinhVien/MotCua/DaoTao'))
const CapBangDiem = lazy(
  () =>
    import('@/Pages/Clients/SinhVien/MotCua/DaoTao/CapBangDiem/CapBangDiem'),
)
const XacNhanDT = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/DaoTao/XacNhanDT/XacNhanDT'),
)
const DangKyTotNghiep = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/MotCua/DaoTao/DangKyTotNghiep/DangKyTotNghiep'
    ),
)
const CapBanSao = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/DaoTao/CapBanSao/CapBanSao'),
)
const SuaThongTin = lazy(
  () =>
    import('@/Pages/Clients/SinhVien/MotCua/DaoTao/SuaThongTin/SuaThongTin'),
)
const MienChungChi = lazy(
  () =>
    import('@/Pages/Clients/SinhVien/MotCua/DaoTao/MienChungChi/MienChungChi'),
)
const ChuyenDiem = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/DaoTao/ChuyenDiem/ChuyenDiem'),
)
const EmailLMS = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/DaoTao/EmailLMS/EmailLMS'),
)
const DangKyLopChatLuong = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/MotCua/DaoTao/DangKyLopChatLuong/DangKyLopChatLuong'
    ),
)

// Pages MC - CT&CTSV
const HomeCTSV = lazy(() => import('@/Pages/Clients/SinhVien/MotCua/CTSV'))
const CapLai = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/CTSV/CapLai/CapLai'),
)
const XacNhanCTSV = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/CTSV/XacNhanCTSV/XacNhanCTSV'),
)
const QuaTrinhHoc = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/CTSV/QuaTrinhHoc/QuaTrinhHoc'),
)
const NghiHocTamThoi = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/MotCua/CTSV/NghiHocTamThoi/NghiHocTamThoi'
    ),
)
const XinChuyen = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/CTSV/XinChuyen/XinChuyen'),
)

// Pages MC - Hành Chính
const HomeHanhChinh = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/HanhChinh'),
)
const GiayGioiThieu = lazy(
  () =>
    import(
      '@/Pages/Clients/SinhVien/MotCua/HanhChinh/GiayGioiThieu/GiayGioiThieu'
    ),
)

// Pages MC - Hướng dẫn
const HomeHuongDan = lazy(
  () => import('@/Pages/Clients/SinhVien/MotCua/HuongDan'),
)

export {
  HomeMotCua,
  HomeKhaoThi,
  MienHocThiTiengAnh,
  PhucKhao,
  LichThi,
  DangKyThiLai,
  HoanThi,
  HuyDangKyThiLai,
  KetQuaHocTap,
  HomeDaoTao,
  CapBangDiem,
  XacNhanDT,
  DangKyTotNghiep,
  CapBanSao,
  SuaThongTin,
  MienChungChi,
  ChuyenDiem,
  EmailLMS,
  DangKyLopChatLuong,
  HomeCTSV,
  CapLai,
  XacNhanCTSV,
  QuaTrinhHoc,
  NghiHocTamThoi,
  XinChuyen,
  HomeHanhChinh,
  GiayGioiThieu,
  HomeHuongDan,
}
