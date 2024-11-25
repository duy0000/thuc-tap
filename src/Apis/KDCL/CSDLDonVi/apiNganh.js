import http from '@/Configs/http'

export const getNganh = () => http.get('SP_KT_KDCL/Nganh_Load')
