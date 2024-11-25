import http from '@/Configs/http'

export const postDGDCLichTrich = (data) =>
  http.post('SP_KT_KDCL/LapKH_DanhGiaDongCap_Add_Para', data)

export const loadDGDCLichTrich = (id) =>
  http.get('SP_KT_KDCL/LapKH_DanhGiaDongCap_Load_R_Para_File', {
    params: {
      KT_KDCL_LapKH_DanhGiaDongCap_ID: id,
    },
  })

export const loadAllDGDCLichTrich = () =>
  http.get('SP_KT_KDCL/LapKH_DanhGiaDongCap_Load')

export const deleteDGDCLichTrich = (id) =>
  http.delete('SP_KT_KDCL/LapKH_DanhGiaDongCap_Del_Para', {
    data: {
      KT_KDCL_LapKH_DanhGiaDongCap_ID: id,
    },
  })

export const putDGDCLichTrich = (data) =>
  http.put('SP_KT_KDCL/LapKH_DanhGiaDongCap_Edit_Para', data)
