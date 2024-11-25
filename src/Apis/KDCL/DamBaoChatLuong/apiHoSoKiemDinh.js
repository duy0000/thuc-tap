import http from '@/Configs/http'

export const postHoSoKiemDinh = (data) =>
  http.post('SP_KT_KDCL/HoSoKiemDinh_Add_Para', data)

export const loadHoSoKiemDinh = (id) =>
  http.get('SP_KT_KDCL/HoSoKiemDinh_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_HoSoKiemDinh_ID: id,
    },
  })

export const loadAllHoSoKiemDinh = () =>
  http.get('SP_KT_KDCL/HoSoKiemDinh_Load')

export const deleteHoSoKiemDinh = (id) =>
  http.delete('SP_KT_KDCL/HoSoKiemDinh_Del_Para', {
    data: {
      KT_KDCL_CTDT_HoSoKiemDinh_ID: id,
    },
  })

export const putHoSoKiemDinh = (newHoSo) =>
  http.put('SP_KT_KDCL/HoSoKiemDinh_Edit_Para', newHoSo)
