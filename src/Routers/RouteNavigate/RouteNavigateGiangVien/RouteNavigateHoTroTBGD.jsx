import { Route } from 'react-router-dom'
import {
  HomeTBGD,
  BaoHong,
  XuLySuCo,
  DangKySuDungThietBi,
  GopY,
  XuLyDangKyThietBi,
} from '../../RouteModules/ModuleGiangVien/ModuleThietBiGiangDuong'
import RoleViewActionMiddleware from '@/Middlewares/RoleViewActionMiddleware'
import { ROLE_VIEW_ACTION_HTTB } from '@/Routers/constants'

export const RouteNavigateHoTroTBGD = (
  <Route path="ho-tro-thiet-bi-giang-duong">
    <Route index element={<HomeTBGD />} />
    <Route path="bao-hong/:id?" element={<BaoHong />} />
    <Route
      path="xu-ly-su-co"
      element={
        <RoleViewActionMiddleware
          allowedRoleViewAction={[ROLE_VIEW_ACTION_HTTB.QT_XLSC]}
        />
      }
    >
      <Route index element={<XuLySuCo />} />
    </Route>
    <Route path="dang-ky-su-dung-thiet-bi" element={<DangKySuDungThietBi />} />
    <Route path="gop-y" element={<GopY />} />
    <Route
      path="xu-ly-dang-ky-thiet-bi"
      element={
        <RoleViewActionMiddleware
          allowedRoleViewAction={[ROLE_VIEW_ACTION_HTTB.QT_XLSC]}
        />
      }
    >
      <Route index element={<XuLyDangKyThietBi />} />
    </Route>
  </Route>
)
