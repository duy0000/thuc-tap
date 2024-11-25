import http from '@/Configs/http'

export const loadAllDGDCPhanCongThucHien = () =>
  http.get('SP_KT_KDCL/DGDC_PhanCongThucHien_Load')

export const loadDGDCPhanCongThucHien = (id) =>
  http.get('SP_KT_KDCL/DGDC_PhanCongThucHien_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_PhanCongThucHien_ID: id,
    },
  })

export const delDGDCPhanCongThucHien = (id) =>
  http.delete('SP_KT_KDCL/DGDC_PhanCongThucHien_Del_Para', {
    data: {
      KT_KDCL_CTDT_PhanCongThucHien_ID: id,
    },
  })

export const putDGDCPhanCongThucHien = (data) =>
  http.put('SP_KT_KDCL/DGDC_PhanCongThucHien_Edit_Para', data)

export const postDGDCPhanCongThucHien = (data) =>
  http.post('SP_KT_KDCL/DGDC_PhanCongThucHien_Add_Para', data)
