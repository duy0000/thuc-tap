import http from '@/Configs/http'

export const loadAllPhanCongThucHien = () =>
  http.get('SP_KT_KDCL/PhanCongThucHien_Load')

export const loadPhanCongThucHien = (id) =>
  http.get('SP_KT_KDCL/PhanCongThucHien_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_PhanCongThucHien_ID: id,
    },
  })

export const delPhanCongThucHien = (id) =>
  http.delete('SP_KT_KDCL/PhanCongThucHien_Del_Para', {
    data: {
      KT_KDCL_CTDT_PhanCongThucHien_ID: id,
    },
  })

export const putPhanCongThucHien = (data) =>
  http.put('SP_KT_KDCL/PhanCongThucHien_Edit_Para', data)

export const postPhanCongThucHien = (data) =>
  http.post('SP_KT_KDCL/PhanCongThucHien_Add_Para', data)

// Thanhvien
export const loadAllPhanCongThucHienThanhVien = () =>
  http.get('SP_KT_KDCL/CTDT_PhanCongThucHien_ThanhVien_Load')

export const loadPhanCongThucHienThanhVien = (id) =>
  http.get('SP_KT_KDCL/CTDT_PhanCongThucHien_ThanhVien_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_PhanCongThucHien_ID: id,
    },
  })

export const delPhanCongThucHienThanhVien = (id) =>
  http.delete('SP_KT_KDCL/CTDT_PhanCongThucHien_ThanhVien_Del_Para', {
    data: {
      KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_ID: id,
    },
  })

export const putPhanCongThucHienThanhVien = (data) =>
  http.put('SP_KT_KDCL/CTDT_PhanCongThucHien_ThanhVien_Edit_Para', data)

export const postPhanCongThucHienThanhVien = (data) =>
  http.post('SP_KT_KDCL/CTDT_PhanCongThucHien_ThanhVien_Add_Para', data)
