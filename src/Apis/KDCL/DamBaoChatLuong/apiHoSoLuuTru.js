import http from '@/Configs/http'

export const postHoSoLuuTru = (data) =>
  http.post('SP_KT_KDCL/HoSoLuuTru_Add_Para', data)

export const loadHoSoLuuTru = ({
  KT_KDCL_HoSoLuuTru_IDQuyTrinh,
  KT_KDCL_HoSoLuuTru_IDHoSoKiemDinh,
}) =>
  http.get('SP_KT_KDCL/HoSoLuuTru_Load_R_Para_File', {
    params: {
      KT_KDCL_HoSoLuuTru_IDQuyTrinh,
      KT_KDCL_HoSoLuuTru_IDHoSoKiemDinh,
    },
  })

export const loadAllHoSoLuuTru = () => http.get('SP_KT_KDCL/HoSoLuuTru_Load')

export const deleteHoSoLuuTru = (id) =>
  http.delete('SP_KT_KDCL/HoSoLuuTru_Del_Para', {
    data: {
      KT_KDCL_HoSoLuuTru_ID: id,
    },
  })

export const putHoSoLuuTru = (data) =>
  http.put('SP_KT_KDCL/HoSoLuuTru_Edit_Para', data)
