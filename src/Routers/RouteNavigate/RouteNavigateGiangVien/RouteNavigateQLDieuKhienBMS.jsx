import { Route } from 'react-router-dom'
import {
  LayoutQuanLyBMS,
  ThietLapThuCong,
  CauHinhLapLichThietBiBMS,
  LichSuCommandBMS,
  LichSuTrangThaiBMS,
} from '../../RouteModules/ModuleGiangVien/ModuleBoDieuKhienBMS'

import { ROLE_VIEW_ACTION_HTTB } from '@/Routers/constants'
import { QTHT_UNETI_ONLINE } from '@/Configs/constants'
import RoleViewActionMiddleware from '@/Middlewares/RoleViewActionMiddleware'

export const RouteNavigateQLDieuKhienBMS = (
  <Route
    element={
      <RoleViewActionMiddleware
        allowedRoleViewAction={[
          QTHT_UNETI_ONLINE,
          ROLE_VIEW_ACTION_HTTB.QT_XLSC,
        ]}
      />
    }
  >
    <Route path="quan-ly-dieu-khien-dien-bms" element={<LayoutQuanLyBMS />}>
      <Route index element={<ThietLapThuCong />} />
      <Route path="cau-hinh-bms">
        <Route path="" element={<CauHinhLapLichThietBiBMS />} />
        <Route
          path="cau-hinh-lap-lich"
          element={<CauHinhLapLichThietBiBMS />}
        />
        <Route
          path="cau-hinh-thiet-bi"
          element={<CauHinhLapLichThietBiBMS />}
        />
      </Route>
      <Route path="lich-su-bms">
        <Route path="" element={<LichSuCommandBMS />} />
        <Route path="thao-tac-lenh" element={<LichSuCommandBMS />} />
        <Route path="mat-ket-noi" element={<LichSuTrangThaiBMS />} />
      </Route>
    </Route>
  </Route>
)
