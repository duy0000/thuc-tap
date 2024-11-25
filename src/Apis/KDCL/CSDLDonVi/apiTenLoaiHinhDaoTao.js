import http from '@/Configs/http'

export const getTenLoaiHinhDaoTao = () =>
  http.get('SP_KT_KDCL/EDU_Load_TenLoaiHinhDT')
