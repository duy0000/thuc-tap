import http from '@/Configs/http'

export const LOAI_THONG_KE = {
  HocHamHocVi: '',
  Tuoi: '1',
  GioiTinh: '2',
}

export const getThongKeCanBo = (loaiThongKe = '') =>
  http.get('SP_KT_KDCL/ThongKe_CanBo', {
    params: {
      LoaiThongKe: loaiThongKe,
    },
  })

export const getCanBo = (filters) =>
  http.get('SP_KT_KDCL/CanBo_Load_Para', {
    params: filters,
  })

export const getDanhSachNhanLucWithPaginate = (filters) =>
  http.get('SP_KT_KDCL/DanhSach_NhanLuc_TongSoTrang_Graft', {
    params: filters,
  })
