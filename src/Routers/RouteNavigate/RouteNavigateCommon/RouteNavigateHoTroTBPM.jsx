import { Route } from 'react-router-dom'
import { ROLE_VIEW_ACTION_HTTB } from '@/Routers/constants'
import {
  HomeTaiSan,
  BaoHongTaiSan,
  SuaChuaTaiSan,
  TraCuuTaiSan,
  CapNhatTaiSan,
} from '../../RouteModules/ModuleCommon/ModuleHoTroTBPM'
import RoleViewActionMiddleware from '@/Middlewares/RoleViewActionMiddleware'

export const RouteNavigateHoTroTBPM = (
  <Route path="ho-tro-thiet-bi-phan-mem">
    <Route index element={<HomeTaiSan />} />
    <Route path="bao-hong-tai-san" element={<BaoHongTaiSan />} />
    <Route
      path="sua-chua-tai-san"
      element={
        <RoleViewActionMiddleware
          allowedRoleViewAction={[ROLE_VIEW_ACTION_HTTB.QT_XLSC]}
        />
      }
    >
      <Route index element={<SuaChuaTaiSan />} />
    </Route>
    <Route path="tra-cuu-tai-san/:id?" element={<TraCuuTaiSan />} />
    <Route path="cap-nhat-tai-san" element={<CapNhatTaiSan />} />
  </Route>
)
