import http from '@/Configs/http'

export const createDonVi = (data) =>
  http.post('SP_KT_KDCL/DonVi_Add_Para', data)

export const getListDonVi = () => http.get('SP_KT_KDCL/DonVi_Load')
