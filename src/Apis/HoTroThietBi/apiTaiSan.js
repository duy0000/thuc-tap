import http from '@/Configs/http'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic'

// POST
export const postYeuCauBaoHongTaiSan = async (
  data = {
    DT_QLTS_TS_HoTroThietBi_IDTaiSan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_IDPhong: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail: 'null',
    DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '',
    DT_QLTS_TS_HoTroThietBi_XacNhan_NgayXacNhan: '',
    DT_QLTS_TS_HoTroThietBi_NguonTiepNhan: NguonTiepNhan_WEB,
  },
) => {
  try {
    const res = await http.post(
      'SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Add_Para',
      data,
    )
    if (res.status === 200) {
      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

// DELETE
export const deleteYeuCauBaoHongTaiSan = async (DT_QLTS_TS_HoTroThietBi_ID) => {
  return http.delete('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Del_Para', {
    data: {
      DT_QLTS_TS_HoTroThietBi_ID: DT_QLTS_TS_HoTroThietBi_ID.toString(),
    },
  })
}

// PUT
// 1. Cập nhật ngày xử lý báo hỏng
export const putNgayXuLyYeuCauBaoHong = async (
  data = {
    DT_QLTS_TS_HoTroThietBi_ID: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail: '',
  },
) => {
  return await http.put(
    'SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_XuLy_Edit_Para',
    data,
  )
}
// 2. Xác nhận sửa chữa hoàn thành
export const putXacNhanSuaChuaHoanThanh = async (
  data = {
    DT_QLTS_TS_HoTroThietBi_ID: '',
    DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '',
  },
) => {
  return await http.put(
    'SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_XacNhan_Edit_Para',
    data,
  )
}

// GET
// 1. Lấy danh sách báo hỏng
export const getDanhSachBaoHong = async (MaNhanSu = '') => {
  try {
    const response = await http.get(
      `SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Load_BaoHong`,
      {
        params: {
          MaNhanSu,
        },
      },
    )
    const data = await response.data
    const listData = await data.body
    return listData
  } catch (error) {
    console.log(error)
  }
}

// 2. Lấy danh sách tòa nhà
export const getDanhSachToaNha = async (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
  },
) => {
  try {
    const response = await http.get(
      'SP_DT_QLTS_TiepNhan/Load_Muti_Para_ToaNha',
      {
        params,
      },
    )
    const data = await response.data
    const listToaNha = await data.body
    return listToaNha
  } catch (error) {
    console.log(error)
  }
}

// 3. Lấy danh sách tầng
export const getDanhSachTang = async (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
    DT_QLP_Phong_ToaNha: '',
  },
) => {
  try {
    const response = await http.get('SP_DT_QLTS_TiepNhan/Load_Muti_Para_Tang', {
      params,
    })
    const data = await response.data
    const listTang = await data?.body
    return listTang
  } catch (error) {
    console.log(error)
  }
}

// 4. Lấy danh sách phòng
export const getDanhSachPhong = async (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
    DT_QLP_Phong_ToaNha: '',
    DT_QLP_Phong_Tang: '',
  },
) => {
  try {
    const response = await http.get(
      'SP_DT_QLTS_TiepNhan/Load_Muti_Para_TenPhong',
      {
        params,
      },
    )
    const data = await response.data
    const listPhong = await data?.body
    return listPhong
  } catch (error) {
    console.log(error)
  }
}

// 5. Lấy danh sách tài sản theo ID phòng
export const getDanhSachTaiSan = async (
  DT_QLTS_TS_PhongHienTai = '',
  DT_QLTS_TS_NhomTaiSan = '',
) => {
  try {
    const response = await http.get('SP_DT_QLTS_TiepNhan/TS_Load_ByPhong_Web', {
      params: {
        DT_QLTS_TS_PhongHienTai,
        DT_QLTS_TS_NhomTaiSan,
      },
    })
    const data = await response.data
    const listTaiSan = await data?.body
    return listTaiSan
  } catch (error) {
    console.log(error)
  }
}

// 6. Lấy thông tintài sản theo ID tài sản
export const getTaiSanById = async (DT_QLTS_TS_ID) => {
  try {
    const response = await http.get('SP_DT_QLTS_TiepNhan/TS_Load_R_Para_File', {
      params: {
        DT_QLTS_TS_ID,
      },
    })
    const data = await response.data
    const dataTaiSan = await data?.body[0]
    return dataTaiSan
  } catch (error) {
    console.log('>>>Lỗi: Lấy thông tintài sản theo ID tài sản ::', error)
  }
}

// 7.
export const getDanhSachSuCoByHoTroThietBi = async (
  params = {
    DT_CVNB_TBGD_TL_Nhom1: 'HoTroThietBi',
    DT_CVNB_TBGD_TL_Nhom2: 'DanhSachSuCo',
  },
) => {
  try {
    const response = await http.get(
      'SP_DT_QLP_Phong_TiepNhan/TBGD_TL_Load_R_Para_DanhSachSuCo',
      {
        params,
      },
    )
    const data = await response.data
    const listSuCo = await data?.body
    return listSuCo
  } catch (error) {
    console.log(error.message)
  }
}

// Kiểm tra trùng của SV
export const getKiemTraTrung_BaoHong_MaSinhVien = async (
  DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu,
) => {
  try {
    const res = await http.get(
      'SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_CheckTrung_MaNhanSu',
      {
        params: { DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu },
      },
    )
    const data = await res.data?.body?.length
    return data
  } catch (error) {
    console.log(error)
  }
}

// Lấy danh sách cán bộ hỗ trợ
export const getDanhSach_CanBoHoTro_PhanCongTruc = async () => {
  try {
    const res = await http.get(
      'SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_PhanCongTruc_Load',
    )
    const data = await res.data?.body
    return data
  } catch (error) {
    console.log('>>>Lỗi: Lấy danh sách cán bộ hỗ trợ ::', error)
  }
}
