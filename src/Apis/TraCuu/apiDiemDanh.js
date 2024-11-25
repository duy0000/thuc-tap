import http from '@/Configs/http'

export const getAllDiemDanh = (MaSinhVien = '') => {
  return http.get(
    'SP_TC_SV_KetQuaHocTap_TiepNhan/EDU_Load_Para_MaSinhVien_DiemDanhSinhVien',
    {
      params: {
        TC_SV_KetQuaHocTap_MaSinhVien: MaSinhVien,
      },
    },
  )
}

export const getDiemDanhChiTiket = (
  TC_SV_KetQuaHocTap_IDSinhVien = '',
  TC_SV_KetQuaHocTap_IDLopHocPhan = '',
) => {
  return http.get(
    'SP_TC_SV_KetQuaHocTap_TiepNhan/EDU_Load_Para_MaSinhVien_DiemDanhSinhVien_ChiTiet',
    {
      params: {
        TC_SV_KetQuaHocTap_IDSinhVien,
        TC_SV_KetQuaHocTap_IDLopHocPhan,
      },
    },
  )
}
