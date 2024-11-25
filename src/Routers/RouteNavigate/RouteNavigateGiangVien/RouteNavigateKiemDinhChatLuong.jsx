import { Route } from 'react-router-dom'
import {
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
  TuDanhGiaBuoc1,
  TuDanhGiaBuoc2,
  TuDanhGiaBuoc3,
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
} from '../../RouteModules/ModuleGiangVien/ModuleKiemDinhChatLuong'

export const RouteNavigateKiemDinhChatLuong = (
  <Route element={<KDCLLayout />}>
    {/* Kiểm định chất lượng */}
    <Route path="kiem-dinh-chat-luong" element={<KiemDinhChatLuong />} />
    {/* Quản trị hệ thống */}
    <Route path="quan-tri-he-thong">
      <Route path="nguoi-dung" element={<QuanLyNguoiDung />} />
      <Route path="quan-ly-nhom-quyen" element={<QuanLyNhomQuyen />} />
      <Route path="danh-muc" element={<QuanLyDanhMuc />} />
      <Route path="so-do-to-chuc" element={<SoDoToChuc />} />
      <Route path="tham-so-he-thong" element={<ThamSoHeThong />} />
      <Route path="bo-tieu-chuan-kiem-dinh" element={<BoTieuChuanKiemDinh />} />
      <Route path="mau-khao-sat" element={<MauKhaoSat />} />
      <Route path="nam-hoc" element={<NamHoc />} />
      <Route path="thu-muc" element={<QuanLyThuMuc />} />
      <Route path="can-bo-chu-chot" element={<QuanLyCanBoChuChot />} />
    </Route>
    {/* Đảm bảo chất lượng */}
    <Route path="dam-bao-chat-luong">
      <Route path="chat-luong-ctdt">
        <Route index element={<KiemDinhChatLuongCTDT />} />
        <Route path=":id" element={<KDCLChuongTrinhDaoTaoDanhSachCongViec />}>
          <Route path="tu-danh-gia">
            <Route index path="buoc-1" element={<TuDanhGiaBuoc1 />} />
            <Route path="buoc-2" element={<TuDanhGiaBuoc2 />} />
            <Route path="buoc-3" element={<TuDanhGiaBuoc3 />} />
            <Route path="buoc-4" element={<TuDanhGiaBuoc4 />} />
            <Route path="buoc-5" element={<TuDanhGiaBuoc5 />} />
            <Route path="buoc-6" element={<TuDanhGiaBuoc6 />} />
            <Route path="buoc-7" element={<TuDanhGiaBuoc7 />} />
            <Route path="buoc-8" element={<TuDanhGiaBuoc8 />} />
          </Route>
          <Route path="danh-gia-ngoai">
            <Route index path="buoc-1" element={<DanhGiaDongCapBuoc1 />} />
            <Route path="buoc-2" element={<DanhGiaDongCapBuoc2 />} />
            <Route path="buoc-3" element={<DanhGiaDongCapBuoc3 />} />
            <Route path="buoc-4" element={<DanhGiaDongCapBuoc4 />} />
            <Route path="buoc-5" element={<DanhGiaDongCapBuoc5 />} />
          </Route>
          <Route path="ket-qua" element={<KDCLChuongTrinhDaoTaoKetQua />} />
          <Route
            path="ho-so-luu-tru"
            element={<KDCLChuongTrinhDaoTaoHoSoLuuTru />}
          />
        </Route>
      </Route>
      <Route path="chat-luong-csgd" element={<KiemDinhChatLuongCSGD />} />
      <Route path="cau-hinh-nhiem-vu" element={<CauHinhNhiemVu />} />
    </Route>

    {/* Khảo sát và đánh giá chất lượng */}
    <Route path="khao-sat-va-dgcl">
      <Route path="danh-gia-cua-cac-ben-lien-quan" element={<PhanHoi />} />
    </Route>

    {/* CSDL đơn vị */}
    <Route path="csdl-don-vi">
      <Route index path="tong-quan" element={<CSDLDonVi />} />
      <Route path="gioi-thieu" element={<GioiThieu />} />
      <Route path="thong-ke-nguoi-hoc" element={<ThongKeNguoiHoc />} />
      <Route
        path="danh-sach-can-bo-chu-chot"
        element={<DanhSachCanBoChuChot />}
      />
      <Route path="thong-ke-khoa-hoc" element={<ThongKeKhoaHoc />} />
      <Route path="danh-sach-cac-don-vi" element={<DanhSachCacDonVi />} />
      <Route path="co-so-vat-chat" element={<CoSoVatChat />} />
      <Route path="thong-ke-nhan-luc" element={<ThongKeNhanLuc />} />
      <Route path="doi-tac" element={<DoiTac />} />
    </Route>

    {/* Quản lý minh chứng */}
    <Route path="quan-ly-minh-chung">
      <Route
        index
        path="minh-chung-dung-chung-don-vi"
        element={<MCDungChungDonVi />}
      />

      <Route path="cau-hinh-ma-minh-chung" element={<CauHinhDinhDangMaMC />} />
    </Route>
  </Route>
)
