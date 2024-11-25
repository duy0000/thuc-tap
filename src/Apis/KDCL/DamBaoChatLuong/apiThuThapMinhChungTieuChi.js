import http from '@/Configs/http'

export const postThuThapMinhChung = (data) =>
  http.post('SP_KT_KDCL/CTDT_ThuThapMinhChung_Add_Para', data)

export const loadThuThapMinhChung = (id) =>
  http.get('SP_KT_KDCL/CTDT_ThuThapMinhChung_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_ThuThapMinhChung_ID: id,
    },
  })

export const loadAllThuThapMinhChung = () =>
  http.get('SP_KT_KDCL/CTDT_ThuThapMinhChung_Load')

export const deleteThuThapMinhChung = (id) =>
  http.delete('SP_KT_KDCL/CTDT_ThuThapMinhChung_Del_Para', {
    data: {
      KT_KDCL_CTDT_ThuThapMinhChung_ID: id,
    },
  })

export const putThuThapMinhChung = (data) =>
  http.put('SP_KT_KDCL/CTDT_ThuThapMinhChung_Edit_Para', data)

export const postThuThapMinhChungTieuChi = (data) =>
  http.post('SP_KT_KDCL/CTDT_ThuThapMinhChung_ChiTiet_Add_Para', data)

export const loadThuThapMinhChungTieuChi = (id) =>
  http.get('SP_KT_KDCL/CTDT_ThuThapMinhChung_ChiTiet_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_ID: id,
    },
  })

export const loadAllThuThapMinhChungTieuChi = () =>
  http.get('SP_KT_KDCL/CTDT_ThuThapMinhChung_ChiTiet_Load')

export const deleteThuThapMinhChungTieuChi = (id) =>
  http.delete('SP_KT_KDCL/CTDT_ThuThapMinhChung_ChiTiet_Del_Para', {
    data: {
      KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_ID: id,
    },
  })

export const putThuThapMinhChungTieuChi = (newHoSo) =>
  http.put('SP_KT_KDCL/CTDT_ThuThapMinhChung_ChiTiet_Edit_Para', newHoSo)
