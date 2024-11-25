import http from '@/Configs/http'

export const loadAllTieuChuan = () => http.get('SP_KT_KDCL/TieuChuan_Load')

export const showTieuChuan = (id) =>
  http.get('SP_KT_KDCL/TieuChuan_Load_R_Para_File', {
    params: {
      KT_KDCL_TieuChuan_ID: id,
    },
  })

export const createTieuChuan = (data) =>
  http.post('SP_KT_KDCL/TieuChuan_Add_Para', data)

export const updateTieuChuan = (data) =>
  http.put('SP_KT_KDCL/TieuChuan_Edit_Para', data)

export const deleteTieuChuan = (id) =>
  http.delete('SP_KT_KDCL/TieuChuan_Del_Para', {
    data: {
      KT_KDCL_TieuChuan_ID: id,
    },
  })
