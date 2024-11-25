import { Route } from 'react-router-dom'
import {
  HomeTraCuu,
  ThoiKhoaBieu,
  DiemDanh,
  RenLuyen,
  ChuongTrinhDaoTao,
  DuKienKetQuaHocTap,
} from '../../RouteModules/ModuleSinhVien/ModuleTraCuu'

export const RouteNavigateTraCuuSinhVien = (
  <Route path="tra-cuu">
    <Route index element={<HomeTraCuu />} />
    <Route path="diem-danh" element={<DiemDanh />} />
    <Route path="ren-luyen" element={<RenLuyen />} />
    <Route path="thoi-khoa-bieu" element={<ThoiKhoaBieu />} />
    <Route path="du-kien-ket-qua-hoc-tap" element={<DuKienKetQuaHocTap />} />
    <Route path="chuong-trinh-dao-tao" element={<ChuongTrinhDaoTao />} />
  </Route>
)
