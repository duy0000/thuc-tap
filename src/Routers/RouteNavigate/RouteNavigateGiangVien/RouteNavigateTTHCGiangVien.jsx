import { Route } from 'react-router-dom'
import {
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
} from '../../RouteModules/ModuleGiangVien/ModuleTTHCGV'
import RoleViewActionMiddleware from '@/Middlewares/RoleViewActionMiddleware'
import { ROLE_VIEW_ACTION_TTHCGV } from '@/Routers/constants'
import { QTHT_UNETI_ONLINE } from '@/Configs/constants'

export const RouteNavigateTTHCGiangVien = (
  <>
    <Route path="admin">
      <Route
        path="xu-ly-nghiep-vu"
        element={
          <RoleViewActionMiddleware
            allowedRoleViewAction={[
              ROLE_VIEW_ACTION_TTHCGV.CBNV_TTHCGV,
              ROLE_VIEW_ACTION_TTHCGV.TP_TTHCGV,
              ROLE_VIEW_ACTION_TTHCGV.BGH_TTHCGV,
              QTHT_UNETI_ONLINE,
            ]}
          />
        }
      >
        <Route index element={<CanBoNghiepVu />} />
        <Route path="ho-so-xu-ly" element={<CanBoNghiepVu />} />
        <Route
          path="chi-tiet-yeu-cau/:yeucau/:id"
          element={<ChiTietHoSoYeuCau />}
        />
      </Route>
      <Route
        path="quan-tri-TTHCGV"
        element={
          <RoleViewActionMiddleware
            allowedRoleViewAction={[
              ROLE_VIEW_ACTION_TTHCGV.QT_TTHCGV,
              QTHT_UNETI_ONLINE,
            ]}
          />
        }
      >
        <Route index element={<DanhSachHoSo />} />
        <Route path="ho-so-thu-tuc/xem/tat-ca" element={<DanhSachHoSo />} />
        <Route path="ho-so-thu-tuc/them" element={<AdminTTHCGV />} />
        <Route
          path="ho-so-thu-tuc/xem/chi-tiet/:title/:id"
          element={<ThongTinChiTietHoSo />}
        />
      </Route>
    </Route>
    <Route path="tthc-giang-vien">
      <Route index element={<HomeThuTucHanhChinhGiangVien />} />
      <Route path="chi-tiet/:tieude/:id" element={<ChiTietThuTuc />} />
      <Route path="soan-ho-so/:tieude/:id/submit" element={<SoanHoSo />} />
      <Route path="theo-doi-quy-trinh">
        <Route index element={<TheoDoiDeNghiTTHCGV />} />
        <Route
          path="chi-tiet/:tieude/:id"
          element={<TheoDoiDeNghiTTHCGVChiTiet />}
        />
      </Route>
    </Route>
  </>
)
