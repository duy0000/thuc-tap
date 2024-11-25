import http from '@/Configs/http'

export const loadAllQuyTrinhKiemDinh = () =>
  http.get('SP_KT_KDCL/QuyTrinhKiemDinh_Load')
