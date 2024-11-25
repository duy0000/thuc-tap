import http from '@/Configs/http'

export const getTenLop = (filters = {}) =>
  http.get('SP_KT_KDCL/EDU_Load_TenLop_ByDieuKien', {
    params: filters,
  })
