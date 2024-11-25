import { Route } from 'react-router-dom'
import {
  LayoutQuanLyCongViec,
  QuanLyCongViec,
  TraCuuLichSuCongViec,
} from '@/Routers/RouteModules/ModuleGiangVien/ModuleQuanLyCongViec'
export const RouteNavigateQuanLyCongViec = (
  <Route>
    <Route path="quan-ly-cong-viec" element={<LayoutQuanLyCongViec />}>
      <Route index element={<QuanLyCongViec />} />
      <Route path="bao-cao">
        <Route path="tra-cuu-lich-su" element={<TraCuuLichSuCongViec />} />
      </Route>
    </Route>
  </Route>
)
