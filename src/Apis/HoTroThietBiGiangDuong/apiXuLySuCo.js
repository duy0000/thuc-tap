import http from '@/Configs/http'

export const getTTPhongXuLySuCo = (id = '') => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/Load_R_Para_File', {
    params: {
      DT_QLP_Phong_ID: id,
    },
  })
}

export const getAllLichDayXuLySuCo = (
  NgayBatDau = '',
  DiaDiem = '',
  DayNha = '',
) => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/Load_Para_SuCoKhacPhuc', {
    params: {
      DT_CVNB_TBGD_LichHoc_NgayBatDau: NgayBatDau,
      DT_CVNB_TBGD_LichHoc_TenDiaDiem: DiaDiem,
      DT_CVNB_TBGD_LichHoc_TenDayNha: DayNha,
    },
  })
}

/**
 * Lấy danh sách kết quả khắc phục sự cố
 *
 * @param {string} DT_CVNB_TBGD_TL_Nhom1 : value HoTroThietBi | TrucThietBiGiangDuong ==> dành cho module: HoTroThietBi | TrucThietBiGiangDuong
 * @param {string} DT_CVNB_TBGD_TL_Nhom2 : value KetQuaKhacPhuc ==> Lấy Kết quả khắc phục
 * @param {string} DT_CVNB_TBGD_TL_Nhom3 : value ''
 * @param {string} DT_CVNB_TBGD_TL_Nhom4 : value 'Thiết bị' | 'Phần mềm' => xác định nguyên nhân của thiết bị hoặc phần mềm
 * @returns
 */
export const getAllKhacPhucXuLySuCo = (
  params = {
    DT_CVNB_TBGD_TL_Nhom1: '',
    DT_CVNB_TBGD_TL_Nhom2: 'KetQuaKhacPhuc',
    DT_CVNB_TBGD_TL_Nhom3: '',
    DT_CVNB_TBGD_TL_Nhom4: '',
  },
) => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/TL_Load_R_Para_KhacPhuc', {
    params,
  })
}

/**
 * Lấy danh sách nguyên nhân sự cố
 *
 * @param {string} DT_CVNB_TBGD_TL_Nhom1 : value HoTroThietBi | TrucThietBiGiangDuong ==> dành cho module: HoTroThietBi | TrucThietBiGiangDuong
 * @param {string} DT_CVNB_TBGD_TL_Nhom2 : value NguyenNhan ==> Lấy nguyên nhân
 * @param {string} DT_CVNB_TBGD_TL_Nhom3 : value ''
 * @param {string} DT_CVNB_TBGD_TL_Nhom4 : value 'Thiết bị' | 'Phần mềm' => xác định nguyên nhân của thiết bị hoặc phần mềm
 * @returns
 */
export const getAllNguyenNhanXuLySuCo = (
  params = {
    DT_CVNB_TBGD_TL_Nhom1: '',
    DT_CVNB_TBGD_TL_Nhom2: 'NguyenNhan',
    DT_CVNB_TBGD_TL_Nhom3: '',
    DT_CVNB_TBGD_TL_Nhom4: '',
  },
) => {
  return http.get('SP_DT_QLP_Phong_TiepNhan/TL_Load_R_Para_NguyenNhan', {
    params,
  })
}

export const updateXuLySuCo = (data = {}) => {
  return http.put('SP_DT_QLP_Phong_TiepNhan/Edit_Para_KhacPhucSuCo', data)
}
