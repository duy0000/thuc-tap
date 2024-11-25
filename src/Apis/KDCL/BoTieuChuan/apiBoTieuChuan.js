import http from '@/Configs/http'

export const loadAllBoTieuChuan = () => http.get('SP_KT_KDCL/BoTieuChuan_Load')

export const loadBoTieuChuan = (id) =>
  http.get('SP_KT_KDCL/BoTieuChuan_Load_R_Para_File', {
    params: {
      KT_KDCL_BoTieuChuan_ID: id,
    },
  })

export const postBoTieuChuan = (data) =>
  http.post('SP_KT_KDCL/BoTieuChuan_Add_Para', data)

export const putBoTieuChuan = (data) =>
  http.put('SP_KT_KDCL/BoTieuChuan_Edit_Para', data)

export const deleteBoTieuChuan = (id) =>
  http.delete('SP_KT_KDCL/BoTieuChuan_Del_Para', {
    data: {
      KT_KDCL_BoTieuChuan_ID: id,
    },
  })
