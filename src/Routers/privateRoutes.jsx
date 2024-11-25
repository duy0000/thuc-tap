import { lazy } from 'react'
import { Route } from 'react-router-dom'
// Middlewares
import AuthMiddleware from '@/Middlewares/AuthMiddleware'
import RoleMiddleware from '@/Middlewares/RoleMiddleware.jsx'
import RouteNavigate from './RouteNavigate'
import { ROLES } from './constants'
import Home from '@/Pages/Clients/Home/Home'
import LayoutAdmin from '@/Layouts/LayoutAdmin'
import HomeAdmin from '@/Pages/Admins/Home'
// import TinTucHome from '@/Pages/Clients/Common/TinTuc'

// const Home = lazy(() => import('@/Pages/Clients/Home/Home'))
const TinTucHome = lazy(() => import('@/Pages/Clients/Common/TinTuc'))

const {
  RouteNavigateCommon,
  RouteNavigateGiangVien,
  RouteNavigateSinhVien,
  RouteNavigateAdmin,
} = RouteNavigate
export const privateRoutes = (
  <>
    <Route element={<AuthMiddleware />}>
      <Route path="/uneti">
        <Route index element={<Home />} />
      </Route>

      {/* ModuleCommon: */}
      <Route
      // element={<RoleMiddleware allowedRoles={[ROLES.G0101, ROLES.S0202]} />}
      >
        {RouteNavigateCommon.RouteNavigateHoTroTBPM}
        {RouteNavigateCommon.RouteNavigateHTSDPM}
        <Route path="tin-tuc" element={<TinTucHome />} />
      </Route>

      {/* Module Sinh Viên */}
      <Route element={<RoleMiddleware allowedRoles={[ROLES.S0202]} />}>
        {/* 1. Theo dõi đề nghị Sinh Viên */}
        {RouteNavigateSinhVien.RouteNavigateTheoDoiDeNghiSV}

        {/* 2. Thủ tục hành chính Sinh Viên */}
        {RouteNavigateSinhVien.RouteNavigateTTHCSinhVien}

        {/* 3. Trang Tra cứu Sinh Viên */}
        {RouteNavigateSinhVien.RouteNavigateTraCuuSinhVien}

        {/* 4. Trang Học tập Sinh Viên */}
        {RouteNavigateSinhVien.RouteNavigateHocTapSV}
      </Route>

      {/* Module Giảng Viên */}
      <Route element={<RoleMiddleware allowedRoles={[ROLES.G0101]} />}>
        {RouteNavigateGiangVien.RouteNavigateHoTroTBGD}
        {RouteNavigateGiangVien.RouteNavigateTTHCGiangVien}
        {RouteNavigateGiangVien.RouteNavigateKiemDinhChatLuong}
        {RouteNavigateGiangVien.RouteNavigateQLDieuKhienBMS}
        {RouteNavigateGiangVien.RouteNavigateQuanLyCongViec}
        {RouteNavigateGiangVien.RouteNavigateCongTacGiangVien}
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          {RouteNavigateAdmin.RouteNavigateTinTuc}
        </Route>
      </Route>
    </Route>
  </>
)
