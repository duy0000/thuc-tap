import http from '@/Configs/http'

export const getDanhSachThongKeYeuCau = () =>
  http.get('SP_TK_PT_TiepNhan_DV_TiepNhanRoutes/Load_ThongKe')
