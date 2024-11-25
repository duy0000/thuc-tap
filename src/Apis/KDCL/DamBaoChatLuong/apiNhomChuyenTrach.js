import http from '@/Configs/http'

export const loadAllNhomChuyenTrach = () =>
  http.get('SP_KT_KDCL/NhomChuyenTrach_Load')

export const loadNhomChuyenTrach = (id) =>
  http.get('SP_KT_KDCL/NhomChuyenTrach_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_NhomChuyenTrach_ID: id,
    },
  })

export const postNhomChuyenTrach = (data) =>
  http.post('SP_KT_KDCL/NhomChuyenTrach_Add_Para', data)

export const putNhomChuyenTrach = (data) =>
  http.put('SP_KT_KDCL/NhomChuyenTrach_Edit_Para', data)

export const delNhomChuyenTrach = (id) =>
  http.delete('SP_KT_KDCL/NhomChuyenTrach_Del_Para', {
    data: {
      KT_KDCL_CTDT_NhomChuyenTrach_ID: id,
    },
  })

// Thanh vien
export const loadAllNhomChuyenTrachThanhVien = () =>
  http.get('SP_KT_KDCL/NhomChuyenTrach_ThanhVien_Load')

export const loadNhomChuyenTrachThanhVien = (id) =>
  http.get('SP_KT_KDCL/NhomChuyenTrach_ThanhVien_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_ID: id,
    },
  })

export const postNhomChuyenTrachThanhVien = (data) =>
  http.post('SP_KT_KDCL/NhomChuyenTrach_ThanhVien_Add_Para', data)

export const putNhomChuyenTrachThanhVien = (data) =>
  http.put('SP_KT_KDCL/NhomChuyenTrach_ThanhVien_Edit_Para', data)

export const delNhomChuyenTrachThanhVien = (id) =>
  http.delete('SP_KT_KDCL/NhomChuyenTrach_ThanhVien_Del_Para', {
    data: {
      KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_ID: id,
    },
  })
