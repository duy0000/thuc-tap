import http from '@/Configs/http'

export const loadAllKetQuaKiemDinh = () =>
  http.get('SP_KT_KDCL/KetQuaKiemDinh_Load')

export const loadKetQuaKiemDinh = (KT_KDCL_KetQuaKiemDinh_IDHoSoKiemDinh) =>
  http.get('SP_KT_KDCL/KetQuaKiemDinh_Load_R_Para_File', {
    params: {
      KT_KDCL_KetQuaKiemDinh_IDHoSoKiemDinh,
    },
  })

export const putKetQuaKiemDinh = (data) =>
  http.put('SP_KT_KDCL/KetQuaKiemDinh_Edit_Para', data)

export const postKetQuaKiemDinh = (data) =>
  http.post('SP_KT_KDCL/KetQuaKiemDinh_Add_Para', data)

export const delKetQuaKiemDinh = (id) =>
  http.delete('SP_KT_KDCL/KetQuaKiemDinh_Del_Para', {
    data: {
      KT_KDCL_KetQuaKiemDinh_ID: id,
    },
  })
