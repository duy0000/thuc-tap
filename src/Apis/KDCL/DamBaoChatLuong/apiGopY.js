import http from '@/Configs/http'

export const loadAllGopY = () => http.get('SP_KT_KDCL/CTDT_GopY_TDG_Load')

export const loadGopY = (id) =>
  http.get('SP_KT_KDCL/CTDT_GopY_TDG_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_GopY_TDG_ID: id,
    },
  })

export const putGopY = (data) =>
  http.put('SP_KT_KDCL/CTDT_GopY_TDG_Edit_Para', data)

export const postGopY = (data) =>
  http.post('SP_KT_KDCL/CTDT_GopY_TDG_Add_Para', data)

export const delGopY = (id) =>
  http.delete('SP_KT_KDCL/CTDT_GopY_TDG_Del_Para', {
    data: {
      KT_KDCL_CTDT_GopY_TDG_ID: id,
    },
  })
