import http from '@/Configs/http'

export const getThongKeNguoiHoc = (filters = {}) =>
  http.get('SP_KT_KDCL/ThongKe_NguoiHoc', {
    params: filters,
  })
