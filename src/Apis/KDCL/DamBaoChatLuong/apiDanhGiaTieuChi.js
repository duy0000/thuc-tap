import http from '@/Configs/http'

export const loadAllDanhGiaTieuChi = () =>
  http.get('SP_KT_KDCL/CTDT_DanhGiaTieuChi_Load')

export const loadDanhGiaTieuChi = (id) =>
  http.get('SP_KT_KDCL/CTDT_DanhGiaTieuChi_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_DanhGiaTieuChi_ID: id,
    },
  })

export const putDanhGiaTieuChi = (data) =>
  http.put('SP_KT_KDCL/CTDT_DanhGiaTieuChi_Edit_Para', data)

export const delDanhGiaTieuChi = (id) =>
  http.delete('SP_KT_KDCL/CTDT_DanhGiaTieuChi_Del_Para', {
    data: {
      KT_KDCL_CTDT_DanhGiaTieuChi_ID: id,
    },
  })

export const postDanhGiaTieuChi = (data) =>
  http.post('SP_KT_KDCL/CTDT_DanhGiaTieuChi_Add_Para', data)

// Lich su danh gia tieu chi
export const loadDanhGiaTieuChi_LichSu_Graft = ({
  KT_KDCL_CTDT_DanhGiaTieuChi_ID,
  SoTrang,
  SoBanGhiTrenTrang,
}) =>
  http.get('SP_KT_KDCL/CTDT_DanhGiaTieuChi_LichSu_Load_TongSoTrang_Graft', {
    params: {
      KT_KDCL_CTDT_DanhGiaTieuChi_ID,
      SoTrang,
      SoBanGhiTrenTrang,
    },
  })

// Ke hoach hanh dong
export const loadAllKeHoachHanhDong = () =>
  http.get('SP_KT_KDCL/CTDT_KHDG_CT_Load')

export const loadKeHoachHanhDong = (id) =>
  http.get('SP_KT_KDCL/CTDT_KHDG_CT_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_KHDG_CT_ID: id,
    },
  })

export const putKeHoachHanhDong = (data) =>
  http.put('SP_KT_KDCL/CTDT_KHDG_CT_Edit_Para', data)

export const delKeHoachHanhDong = (id) =>
  http.delete('SP_KT_KDCL/CTDT_KHDG_CT_Del_Para', {
    data: {
      KT_KDCL_CTDT_KHDG_CT_ID: id,
    },
  })

export const postKeHoachHanhDong = (data) =>
  http.post('SP_KT_KDCL/CTDT_KHDG_CT_Add_Para', data)
