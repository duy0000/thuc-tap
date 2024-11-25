import { Route } from 'react-router-dom'

import RoleMiddleware from '@/Middlewares/RoleMiddleware'
import { ROLES } from '@/Routers/constants'
import {
  CongTacGiangVien,
  TraCuuHome,
  TraCuuNhanSu,
  TraCuuLopHPGV,
  TraCuuKLCoiChamThi,
  TraCuuKhoiLuongBu,
  TraCuuTongHopKhoiLuong,
  TraCuuTongHopThanhToan,
  TraCuuThanhToanHDNgoai,
  CongTacGiangDayHome,
  LichTheoTienDo,
  CongTacGiangDayDiemDanhHangNgay,
  CongTacGiangDayNhapDiemThuongKy,
} from '@/Routers/RouteModules/ModuleGiangVien/ModuleCongTacGiangVien'

export const RouteNavigateCongTacGiangVien = (
  <Route element={<RoleMiddleware allowedRoles={[ROLES.G0101]} />}>
    <Route path="cong-tac-giang-vien">
      <Route index element={<CongTacGiangVien />} />
      <Route path="tra-cuu">
        <Route path="" element={<TraCuuHome />} />
        <Route path="nhan-su" element={<TraCuuNhanSu />} />
        <Route path="lop-hoc-phan-giang-vien" element={<TraCuuLopHPGV />} />
        <Route
          path="khoi-luong-coi-cham-thi"
          element={<TraCuuKLCoiChamThi />}
        />
        <Route path="khoi-luong-bu" element={<TraCuuKhoiLuongBu />} />
        <Route
          path="tong-hop-khoi-luong"
          element={<TraCuuTongHopKhoiLuong />}
        />
        <Route
          path="tong-hop-thanh-toan"
          element={<TraCuuTongHopThanhToan />}
        />
        <Route
          path="thanh-toan-hop-dong-ngoai"
          element={<TraCuuThanhToanHDNgoai />}
        />
      </Route>
      <Route path="cong-tac-giang-day">
        <Route path="" element={<CongTacGiangDayHome />} />
        <Route path="lich-theo-tien-do" element={<LichTheoTienDo />} />
        <Route
          path="nhap-diem-thuong-ky"
          element={<CongTacGiangDayNhapDiemThuongKy />}
        />
        <Route
          path="diem-danh-hang-ngay"
          element={<CongTacGiangDayDiemDanhHangNgay />}
        />
      </Route>
    </Route>
  </Route>
)
