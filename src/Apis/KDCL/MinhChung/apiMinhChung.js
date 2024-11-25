import http from '@/Configs/http'

export const postMinhChung = (data) =>
  http.post('SP_KT_KDCL/TaiLieu_Add_Para', data)

export const loadAllMinhChung = () => http.get('SP_KT_KDCL/TaiLieu_Load')

export const loadMinhChung_R_Para_File = (id) =>
  http.get('SP_KT_KDCL/TaiLieu_Load_R_Para_File', {
    params: {
      KT_KDCL_TaiLieu_ID: id,
    },
  })

export const putMinhChung = (data) =>
  http.put('SP_KT_KDCL/TaiLieu_Edit_Para', data)

export const deleteMinhChung = (id) =>
  http.delete('SP_KT_KDCL/TaiLieu_Del_Para', {
    data: {
      KT_KDCL_TaiLieu_ID: id,
    },
  })
