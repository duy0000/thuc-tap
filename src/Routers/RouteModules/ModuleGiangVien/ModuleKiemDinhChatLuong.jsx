import { lazy } from 'react'

import KDCLLayout from '@/Layouts/LayoutKDCL/KDCLLayout'

const KiemDinhChatLuong = lazy(
  () => import('@/Pages/Admins/KiemDinhChatLuong/GioiThieuChung'),
)
const QuanLyNhomQuyen = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/QuanLyNhomQuyen/QuanLyNhomQuyen'
    ),
)
const QuanLyDanhMuc = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/QuanLyDanhMuc/QuanLyDanhMuc'
    ),
)
const QuanLyThuMuc = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/QuanLyThuMuc/QuanLyThuMuc'
    ),
)
const SoDoToChuc = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/SoDoToChuc/SoDoToChuc'
    ),
)
const ThamSoHeThong = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/ThamSoHeThong/ThamSoHeThong'
    ),
)
const BoTieuChuanKiemDinh = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/BoTieuChuanKiemDinh/BoTieuChuanKiemDinh'
    ),
)
const MauKhaoSat = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/MauKhaoSat/MauKhaoSat'
    ),
)
const NamHoc = lazy(
  () => import('@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/NamHoc/NamHoc'),
)
const QuanLyNguoiDung = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/QuanLyNguoiDung/QuanLyNguoiDung'
    ),
)
const KiemDinhChatLuongCTDT = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/KiemDinhChatLuongCTDT'
    ),
)

const KiemDinhChatLuongCSGD = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCSGD/KiemDinhChatLuongCSGD'
    ),
)
const KDCLChuongTrinhDaoTaoDanhSachCongViec = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/DanhSachCongViec'
    ),
)
const TuDanhGiaBuoc1 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/TuDanhGia/Buoc1'
    ),
)
const TuDanhGiaBuoc2 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/TuDanhGia/Buoc2'
    ),
)
const TuDanhGiaBuoc3 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/TuDanhGia/Buoc3'
    ),
)

const TuDanhGiaBuoc4 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/TuDanhGia/Buoc4'
    ),
)
const TuDanhGiaBuoc5 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/TuDanhGia/Buoc5'
    ),
)
const TuDanhGiaBuoc6 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/TuDanhGia/Buoc6'
    ),
)
const TuDanhGiaBuoc7 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/TuDanhGia/Buoc7'
    ),
)
const TuDanhGiaBuoc8 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/TuDanhGia/Buoc8'
    ),
)

// KDCL_DanhGiaDongCap
const DanhGiaDongCapBuoc1 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/DanhGiaDongCap/Buoc1'
    ),
)
const DanhGiaDongCapBuoc2 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/DanhGiaDongCap/Buoc2'
    ),
)
const DanhGiaDongCapBuoc3 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/DanhGiaDongCap/Buoc3'
    ),
)
const DanhGiaDongCapBuoc4 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/DanhGiaDongCap/Buoc4'
    ),
)
const DanhGiaDongCapBuoc5 = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/DanhGiaDongCap/Buoc5'
    ),
)

// KDCL_KetQua
const KDCLChuongTrinhDaoTaoKetQua = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/KetQua/KetQua'
    ),
)
const KDCLChuongTrinhDaoTaoHoSoLuuTru = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChatLuongCTDT/DanhSachCongViec/HoSoLuuTru/HoSoLuuTru'
    ),
)

const CauHinhNhiemVu = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/DamBaoChatLuong/CauHinhNhiemVu/CauHinhNhiemVu'
    ),
)
const PhanHoi = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/KhaoSatVaDanhGiaChatLuong/PhanHoi/PhanHoi'
    ),
)
const CSDLDonVi = lazy(
  () => import('@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/CSDLDonVi'),
)
const MCDungChungDonVi = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanLyMinhChung/MCDungChungDonVi/MCDungChungDonVi'
    ),
)
const CauHinhDinhDangMaMC = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanLyMinhChung/CauHinhDinhDangMaMC/CauHinhDinhDangMaMC'
    ),
)
const GioiThieu = lazy(
  () =>
    import('@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/GioiThieu/GioiThieu'),
)
const ThongKeNguoiHoc = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/ThongKeNguoiHoc/ThongKeNguoiHoc'
    ),
)
const DanhSachCanBoChuChot = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/DanhSachCanBoChuChot/DanhSachCanBoChuChot'
    ),
)
const ThongKeKhoaHoc = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/ThongKeKhoaHoc/ThongKeKhoaHoc'
    ),
)
const DanhSachCacDonVi = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/DanhSachCacDonVi/DanhSachCacDonVi'
    ),
)
const CoSoVatChat = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/CoSoVatChat/CoSoVatChat'
    ),
)
const ThongKeNhanLuc = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/ThongKeNhanLuc/ThongKeNhanLuc'
    ),
)
const DoiTac = lazy(
  () => import('@/Pages/Admins/KiemDinhChatLuong/CSDLDonVi/DoiTac/DoiTac'),
)

const QuanLyCanBoChuChot = lazy(
  () =>
    import(
      '@/Pages/Admins/KiemDinhChatLuong/QuanTriHeThong/QuanLyCanBoChuChot/QuanLyCanBoChuChot'
    ),
)

export {
  KDCLLayout,
  KiemDinhChatLuong,
  QuanLyNhomQuyen,
  QuanLyDanhMuc,
  QuanLyThuMuc,
  SoDoToChuc,
  ThamSoHeThong,
  BoTieuChuanKiemDinh,
  MauKhaoSat,
  NamHoc,
  QuanLyNguoiDung,
  KiemDinhChatLuongCTDT,
  KDCLChuongTrinhDaoTaoDanhSachCongViec,
  TuDanhGiaBuoc3,
  TuDanhGiaBuoc1,
  TuDanhGiaBuoc2,
  TuDanhGiaBuoc4,
  TuDanhGiaBuoc5,
  TuDanhGiaBuoc6,
  TuDanhGiaBuoc7,
  TuDanhGiaBuoc8,
  DanhGiaDongCapBuoc1,
  DanhGiaDongCapBuoc2,
  DanhGiaDongCapBuoc3,
  DanhGiaDongCapBuoc4,
  DanhGiaDongCapBuoc5,
  KDCLChuongTrinhDaoTaoKetQua,
  KDCLChuongTrinhDaoTaoHoSoLuuTru,
  KiemDinhChatLuongCSGD,
  CauHinhNhiemVu,
  PhanHoi,
  CSDLDonVi,
  MCDungChungDonVi,
  CauHinhDinhDangMaMC,
  GioiThieu,
  ThongKeNguoiHoc,
  DanhSachCanBoChuChot,
  ThongKeKhoaHoc,
  DanhSachCacDonVi,
  CoSoVatChat,
  ThongKeNhanLuc,
  DoiTac,
  QuanLyCanBoChuChot,
}
