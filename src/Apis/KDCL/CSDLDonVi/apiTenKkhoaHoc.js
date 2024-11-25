import http from '@/Configs/http'

export const getTenKhoaHoc = () => http.get('SP_KT_KDCL/EDU_Load_TenKhoaHoc')
