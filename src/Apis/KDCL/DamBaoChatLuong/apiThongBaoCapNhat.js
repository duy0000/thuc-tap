import http from '@/Configs/http'

export const loadAllThongBaoCapNhat = () => http.get('SP_KT_KDCL/ThongBao_Load')

export const postThongBaoCapNhat = (data) =>
  http.post(
    'SP_MC_TrangThai_YeuCau_SinhVien/YeuCau_SinhVien_Add_Full_Para',
    data,
  )
