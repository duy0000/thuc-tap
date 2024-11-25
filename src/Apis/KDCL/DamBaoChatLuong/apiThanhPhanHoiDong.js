import http from '@/Configs/http'

export const postThanhPhanHoiDong = (data) =>
  http.post('SP_KT_KDCL/ThanhPhanHoiDong_Add_Para', data)

export const putThanhPhanHoiDong = (data) =>
  http.put('SP_KT_KDCL/ThanhPhanHoiDong_Edit_Para', data)

export const loadThanhPhanHoiDong = (id) =>
  http.get('SP_KT_KDCL/ThanhPhanHoiDong_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_ThanhPhanHoiDong_ID: id,
    },
  })

export const loadAllThanhPhanHoiDong = () =>
  http.get('SP_KT_KDCL/ThanhPhanHoiDong_Load')

export const delThanhPhanHoiDong = (id) =>
  http.delete('SP_KT_KDCL/ThanhPhanHoiDong_Del_Para', {
    data: {
      KT_KDCL_CTDT_ThanhPhanHoiDong_ID: id,
    },
  })
