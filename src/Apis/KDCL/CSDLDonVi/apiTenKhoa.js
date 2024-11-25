import http from '@/Configs/http'

export const getTenKhoa = (coSo = '') =>
  http.get('SP_KT_KDCL/EDU_Load_TenKhoa_ByCoSo', { params: { CoSo: coSo } })
