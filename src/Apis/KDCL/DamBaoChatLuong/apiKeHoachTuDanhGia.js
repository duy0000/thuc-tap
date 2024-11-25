import http from '@/Configs/http'

// Ke hoach
export const loadAllKeHoach_TDG = () =>
  http.get('SP_KT_KDCL/CTDT_KeHoach_TDG_Load')

export const loadKeHoach_TDG = (ID) =>
  http.get('SP_KT_KDCL/CTDT_KeHoach_TDG_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_KeHoach_TDG_ID: ID,
    },
  })

export const putKeHoach_TDG = (data) =>
  http.put('SP_KT_KDCL/CTDT_KeHoach_TDG_Edit_Para', data)

export const delKeHoach_TDG = (ID) =>
  http.delete('SP_KT_KDCL/CTDT_KeHoach_TDG_Del_Para', {
    data: {
      KT_KDCL_CTDT_KeHoach_TDG_ID: ID,
    },
  })

export const postKeHoach_TDG = (data) =>
  http.post('SP_KT_KDCL/CTDT_KeHoach_TDG_Add_Para', data)

// Kế hoạch - Các hoạt động
export const loadAllKeHoach_TDG_HoatDong = () =>
  http.get('SP_KT_KDCL/CTDT_KeHoach_TDG_HoatDong_Load')

export const loadKeHoach_TDG_HoatDong = (ID) =>
  http.get('SP_KT_KDCL/CTDT_KeHoach_TDG_HoatDong_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ID: ID,
    },
  })

export const putKeHoach_TDG_HoatDong = (data) =>
  http.put('SP_KT_KDCL/CTDT_KeHoach_TDG_HoatDong_Edit_Para', data)

export const delKeHoach_TDG_HoatDong = (ID) =>
  http.delete('SP_KT_KDCL/CTDT_KeHoach_TDG_HoatDong_Del_Para', {
    data: {
      KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ID: ID,
    },
  })

export const postKeHoach_TDG_HoatDong = (data) =>
  http.post('SP_KT_KDCL/CTDT_KeHoach_TDG_HoatDong_Add_Para', data)

// Kế hoạch - Các hoạt động
export const loadAllKeHoach_TDG_DK_NguonLuc = () =>
  http.get('SP_KT_KDCL/CTDT_KeHoach_TDG_DK_NguonLuc_Load')

export const loadKeHoach_TDG_DK_NguonLuc = (ID) =>
  http.get('SP_KT_KDCL/CTDT_KeHoach_TDG_DK_NguonLuc_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_ID: ID,
    },
  })

export const putKeHoach_TDG_DK_NguonLuc = (data) =>
  http.put('SP_KT_KDCL/CTDT_KeHoach_TDG_DK_NguonLuc_Edit_Para', data)

export const delKeHoach_TDG_DK_NguonLuc = (ID) =>
  http.delete('SP_KT_KDCL/CTDT_KeHoach_TDG_DK_NguonLuc_Del_Para', {
    data: {
      KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ID: ID,
    },
  })

export const postKeHoach_TDG_DK_NguonLuc = (data) =>
  http.post('SP_KT_KDCL/CTDT_KeHoach_TDG_DK_NguonLuc_Add_Para', data)
