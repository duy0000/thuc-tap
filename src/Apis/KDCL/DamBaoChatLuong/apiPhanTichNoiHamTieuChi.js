import http from '@/Configs/http'

export const postPhanTichNoiHam = (data) =>
  http.post('SP_KT_KDCL/CTDT_PhanTichNoiHam_Add_Para', data)

export const loadPhanTichNoiHam = (id) =>
  http.get('SP_KT_KDCL/CTDT_PhanTichNoiHam_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_PhanTichNoiHam_ID: id,
    },
  })

export const loadAllPhanTichNoiHam = () =>
  http.get('SP_KT_KDCL/CTDT_PhanTichNoiHam_Load')

export const deletePhanTichNoiHam = (id) =>
  http.delete('SP_KT_KDCL/CTDT_PhanTichNoiHam_Del_Para', {
    data: {
      KT_KDCL_CTDT_PhanTichNoiHam_ID: id,
    },
  })

export const putPhanTichNoiHam = (newHoSo) =>
  http.put('SP_KT_KDCL/CTDT_PhanTichNoiHam_Edit_Para', newHoSo)

export const postPhanTichNoiHamChiTiet = (data) =>
  http.post('SP_KT_KDCL/CTDT_PhanTichNoiHam_ChiTiet_Add_Para', data)

export const loadPhanTichNoiHamChiTiet = (id) =>
  http.get('SP_KT_KDCL/CTDT_PhanTichNoiHam_ChiTiet_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ID: id,
    },
  })

export const loadAllPhanTichNoiHamChiTiet = () =>
  http.get('SP_KT_KDCL/CTDT_PhanTichNoiHam_ChiTiet_Load')

export const deletePhanTichNoiHamChiTiet = (id) =>
  http.delete('SP_KT_KDCL/CTDT_PhanTichNoiHam_ChiTiet_Del_Para', {
    data: {
      KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ID: id,
    },
  })

export const putPhanTichNoiHamChiTiet = (newHoSo) =>
  http.put('SP_KT_KDCL/CTDT_PhanTichNoiHam_ChiTiet_Edit_Para', newHoSo)
