import http from '@/Configs/http'

export const getAllChuongTrinhDaoTao = () =>
  http.get('SP_KT_KDCL/Nganh_Load_ChuongTrinhDaoTao')
