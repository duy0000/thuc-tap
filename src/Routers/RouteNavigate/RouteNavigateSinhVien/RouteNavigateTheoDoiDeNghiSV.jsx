import { Route } from 'react-router-dom'
import {
  TheoDoiDeNghi,
  TheoDoiDeNghiChiTiet,
} from '../../RouteModules/ModuleSinhVien/ModuleTheoDoiDeNghi'

export const RouteNavigateTheoDoiDeNghiSV = (
  <Route path="theo-doi-de-nghi">
    <Route index element={<TheoDoiDeNghi />} />
    <Route
      path="theo-doi-de-nghi-chi-tiet"
      element={<TheoDoiDeNghiChiTiet />}
    />
  </Route>
)
