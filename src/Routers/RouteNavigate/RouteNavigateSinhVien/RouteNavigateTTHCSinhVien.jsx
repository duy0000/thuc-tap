import { Route } from 'react-router-dom'
import { ROLES } from '@/Routers/constants'
import {
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
} from '../../RouteModules/ModuleSinhVien/ModuleMotCua'

export const RouteNavigateTTHCSinhVien = (
  <Route path="mot-cua">
    <Route index element={<HomeMotCua />} />
    <Route path="khao-thi">
      <Route index element={<HomeKhaoThi />} />
      <Route path="mien-hoc-thi-tieng-anh" element={<MienHocThiTiengAnh />} />
      <Route path="phuc-khao" element={<PhucKhao />} />
      <Route path="lich-thi" element={<LichThi />} />
      <Route path="dang-ky-thi-lai" element={<DangKyThiLai />} />
      <Route path="hoan-thi" element={<HoanThi />} />
      <Route path="huy-dang-ky-thi-lai" element={<HuyDangKyThiLai />} />
      <Route path="ket-qua-hoc-tap" element={<KetQuaHocTap />} />
    </Route>
    <Route path="dao-tao">
      <Route index element={<HomeDaoTao />} />
      <Route path="cap-bang-diem" element={<CapBangDiem />} />
      <Route path="xac-nhan" element={<XacNhanDT />} />
      <Route path="dang-ky-tot-nghiep" element={<DangKyTotNghiep />} />
      <Route path="cap-ban-sao" element={<CapBanSao />} />
      <Route path="sua-thong-tin" element={<SuaThongTin />} />
      <Route path="mien-chung-chi" element={<MienChungChi />} />
      <Route path="chuyen-diem" element={<ChuyenDiem />} />
      <Route path="email-lms" element={<EmailLMS />} />
      <Route path="dang-ky-lop-chat-luong" element={<DangKyLopChatLuong />} />
    </Route>
    <Route path="ct&ctsv">
      <Route index element={<HomeCTSV />} />
      <Route path="cap-lai" element={<CapLai />} />
      <Route path="xac-nhan" element={<XacNhanCTSV />} />
      <Route path="qua-trinh-hoc" element={<QuaTrinhHoc />} />
      <Route path="nghi-hoc-tam-thoi" element={<NghiHocTamThoi />} />
      <Route path="xin-chuyen" element={<XinChuyen />} />
    </Route>
    <Route path="hanh-chinh">
      <Route index element={<HomeHanhChinh />} />
      <Route path="giay-gioi-thieu" element={<GiayGioiThieu />} />
    </Route>
    <Route path="huong-dan">
      <Route index element={<HomeHuongDan />} />
    </Route>
  </Route>
)
