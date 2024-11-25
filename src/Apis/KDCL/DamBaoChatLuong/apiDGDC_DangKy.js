import http from '@/Configs/http'

export const postDkDanhGiaDongCap = (data) =>
  http.post('SP_KT_KDCL/CTDT_DK_DanhGiaDongCap_Add_Para', data)

export const loadDkDanhGiaDongCap = (id) =>
  http.get('SP_KT_KDCL/CTDT_DK_DanhGiaDongCap_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_DK_DanhGiaDongCap_ID: id,
    },
  })

export const loadAllDkDanhGiaDongCap = () =>
  http.get('SP_KT_KDCL/CTDT_DK_DanhGiaDongCap_Load')

export const deleteDkDanhGiaDongCap = (id) =>
  http.delete('SP_KT_KDCL/CTDT_DK_DanhGiaDongCap_Del_Para', {
    data: {
      KT_KDCL_CTDT_DK_DanhGiaDongCap_ID: id,
    },
  })

export const putDkDanhGiaDongCap = (data) =>
  http.put('SP_KT_KDCL/CTDT_DK_DanhGiaDongCap_Edit_Para', data)
