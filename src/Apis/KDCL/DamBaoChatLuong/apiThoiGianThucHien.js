import http from '@/Configs/http'

export const loadAllThoiGianThucHien = () =>
  http.get('SP_KT_KDCL/ThoiGianThucHien_Load')

export const loadThoiGianThucHien = (id) =>
  http.get('SP_KT_KDCL/ThoiGianThucHien_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_ThoiGianThucHien_ID: id,
    },
  })

export const putThoiGianThucHien = (data) =>
  http.put('SP_KT_KDCL/ThoiGianThucHien_Edit_Para', data)

export const delThoiGianThucHien = (id) =>
  http.delete('SP_KT_KDCL/ThoiGianThucHien_Del_Para', {
    data: {
      KT_KDCL_CTDT_ThoiGianThucHien_ID: id,
    },
  })

export const postThoiGianThucHien = (data) =>
  http.post('SP_KT_KDCL/ThoiGianThucHien_Add_Para', data)
