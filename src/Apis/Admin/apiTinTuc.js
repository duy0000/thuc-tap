import http from '@/Configs/http'

const initialBodyTinTuc = {
  HT_TinTuc_TieuDe: '',
  HT_TinTuc_Link: '',
  HT_TinTuc_TenAnh: '',
  HT_TinTuc_Anh: '',
  HT_TinTuc_SV_STT: 1,
  HT_TinTuc_GV_STT: 1,
  HT_TinTuc_GV_IsThongBao: true,
  HT_TinTuc_GV_IsSuKien: true,
  HT_TinTuc_GV_IsTinTieuDiem: true,
}

const apiTinTuc = {
  list: (
    params = {
      SoTrang: 1,
      SoBanGhiTrenTrang: 10,
      HT_TinTuc_TieuDe: '',
      HT_TinTuc_Link: '',
      HT_TinTuc_SV_STT: 1,
      HT_TinTuc_GV_STT: 1,
      HT_TinTuc_GV_IsThongBao: false,
      HT_TinTuc_GV_IsSuKien: false,
      HT_TinTuc_GV_IsTinTieuDiem: false,
    },
  ) =>
    http.get('HT_TinTuc_QuanTri/Load_TongSoTrang_Graft', {
      params,
    }),
  detail: (
    params = {
      HT_TinTuc_ID: 0,
    },
  ) =>
    http.get('HT_TinTuc_QuanTri/Load_R_Para_File', {
      params,
    }),
  create: (body = initialBodyTinTuc) =>
    http.post('HT_TinTuc_QuanTri/Add_Para', body),
  edit: (body = initialBodyTinTuc) =>
    http.put('HT_TinTuc_QuanTri/Edit_Para', body),
  delete: (id) =>
    http.delete('HT_TinTuc_QuanTri/Del_Para', {
      data: {
        HT_TinTuc_ID: id,
      },
    }),
}

export default apiTinTuc
