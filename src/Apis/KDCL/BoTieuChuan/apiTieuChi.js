import http from '@/Configs/http'

export const loadAllTieuChi = () => http.get('SP_KT_KDCL/TieuChi_Load')

export const showTieuChi = (id) =>
  http.get('SP_KT_KDCL/TieuChi_Load_R_Para_File', {
    params: {
      KT_KDCL_TieuChi_ID: id,
    },
  })

export const postTieuChi = (data) =>
  http.post('SP_KT_KDCL/TieuChi_Add_Para', data)

export const updateTieuChi = (data) =>
  http.put('SP_KT_KDCL/TieuChi_Edit_Para', data)

export const deleteTieuChi = (id) =>
  http.delete('SP_KT_KDCL/TieuChi_Del_Para', {
    data: {
      KT_KDCL_TieuChi_ID: id,
    },
  })
