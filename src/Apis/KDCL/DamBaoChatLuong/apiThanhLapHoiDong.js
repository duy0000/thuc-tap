import http from '@/Configs/http'

export const loadThanhLapHoiDong = ({
  KT_KDCL_CTDT_ThanhLapHoiDong_ID = '',
  KT_KDCL_CTDT_ThanhLapHoiDong_IDHoSoKiemDinh = '',
  KT_KDCL_CTDT_ThanhLapHoiDong_IDQuyTrinh = null,
}) =>
  http.get('SP_KT_KDCL/ThanhLapHoiDong_Load_R_Para_File', {
    params: {
      KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      KT_KDCL_CTDT_ThanhLapHoiDong_IDHoSoKiemDinh,
      KT_KDCL_CTDT_ThanhLapHoiDong_IDQuyTrinh,
    },
  })

export const loadAllThanhLapHoiDong = () =>
  http.get('SP_KT_KDCL/ThanhLapHoiDong_Load')

export const putThanhLapHoiDong = (newHoSo) =>
  http.put('SP_KT_KDCL/ThanhLapHoiDong_Edit_Para', newHoSo)

export const postThanhLapHoiDong = (data) =>
  http.post('SP_KT_KDCL/ThanhLapHoiDong_Add_Para', data)
