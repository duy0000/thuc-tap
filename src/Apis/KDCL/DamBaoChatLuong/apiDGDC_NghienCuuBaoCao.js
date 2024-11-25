import http from '@/Configs/http'

export const loadAllDGDCNghienCuuBaoCao = () =>
  http.get('SP_KT_KDCL/DGDC_NghienCuu_BaoCao_Load')

export const loadDGDCNghienCuuBaoCao = (id) =>
  http.get('SP_KT_KDCL/DGDC_NghienCuu_BaoCao_Load_R_Para_File', {
    params: {
      KT_KDCL_DGDC_NghienCuu_BaoCao_ID: id,
    },
  })

export const delDGDCNghienCuuBaoCao = (id) =>
  http.delete('SP_KT_KDCL/DGDC_NghienCuu_BaoCao_Del_Para', {
    data: {
      KT_KDCL_DGDC_NghienCuu_BaoCao_ID: id,
    },
  })

export const putDGDCNghienCuuBaoCao = (data) =>
  http.put('SP_KT_KDCL/DGDC_NghienCuu_BaoCao_Edit_Para', data)

export const postDGDCNghienCuuBaoCao = (data) =>
  http.post('SP_KT_KDCL/DGDC_NghienCuu_BaoCao_Add_Para', data)
