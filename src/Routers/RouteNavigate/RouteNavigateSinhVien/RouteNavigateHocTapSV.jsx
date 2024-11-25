import { Route } from 'react-router-dom'
import {
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
} from '../../RouteModules/ModuleSinhVien/ModuleHocTap'

export const RouteNavigateHocTapSV = (
  <Route path="hoc-tap">
    <Route index element={<HomeHocTap />} />
    <Route path="ket-qua-hoc-tap" element={<HocTapKetQuaHocTap />} />
    <Route
      path="ket-qua-hoc-tap/ket-qua-hoc-tap-chi-tiet/:id?"
      element={<KetQuaHocTapChiTiet />}
    />
    <Route path="on-luyen">
      <Route index element={<HocTapOnLuyen />} />

      <Route path="on-tap">
        <Route index element={<HocTapOnTap />} />
        <Route path="danh-sach-phan/:id?">
          <Route index element={<DanhSachPhan />} />
          <Route path="danh-sach-chuong/:id?">
            <Route index element={<DanhSachChuong />} />
            <Route
              path="danh-sach-cau-hoi/:id?"
              element={<OnTapDanhSachCauHoi />}
            />
          </Route>
        </Route>
      </Route>
      <Route path="thi-thu">
        <Route index element={<HocTapThiThu />} />
        <Route path="danh-sach-de-thi/:id?">
          <Route index element={<ThiThuDanhSachDeThi />} />
          <Route path="de-thi/:id?" element={<DeThi />}></Route>
        </Route>
      </Route>
    </Route>
  </Route>
)
