import http from '@/Configs/http'

export const getNguoiHocWithPaginate = (filters = {}) =>
  http.get('SP_KT_KDCL/DanhSach_NguoiHoc_TongSoTrang_Graft', {
    params: filters,
  })
