import http from '@/Configs/http'

export const apiTheoDoiDeNghiGV = (
  params = {
    MaNhanSu: '',
  },
) =>
  http.get('SP_MC_TTHC_GV_TiepNhan/Load_YeuCau_ByMaNhanSu', {
    params,
  })
