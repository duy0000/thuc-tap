import http from '@/Configs/http'
export const getAllHocKy = () => http.get('SP_EDU/QLD_Load_TenDot')
export const getSP_CVGV_TCCTGD_LichDayCoiThi_Load = ({
  HocKy = '',
  LoaiLich = '',
  MaGiangVien = '',
}) => {
  return http.get('SP_CVGV_TraCuuLichGV/TCCTGD_LichDayCoiThi_Load', {
    params: {
      MaGiangVien,
      HocKy,
      LoaiLich,
      // MaGiangVien:  '01011013',
      // HocKy: '1 (2022 - 2023)',
      // LoaiLich:'1',
    },
  })
}
