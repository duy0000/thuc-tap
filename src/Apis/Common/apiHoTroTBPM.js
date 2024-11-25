import http from '@/Configs/http'
import { NguonTiepNhan_WEB } from '@/Services/Static/dataStatic'

const postYeuCauBaoHongTaiSan = (
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
) => http.post('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Add_Para', data)
const deleteYeuCauBaoHongTaiSan = (data = { DT_QLTS_TS_HoTroThietBi_ID: '' }) =>
  http.delete('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Del_Para', {
    data,
  })
const putNgayXuLyYeuCauBaoHong = (
  data = {
    DT_QLTS_TS_HoTroThietBi_ID: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail: '',
  },
) => http.put('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_XuLy_Edit_Para', data)
const putXacNhanSuaChuaHoanThanh = (
  data = {
    DT_QLTS_TS_HoTroThietBi_ID: '',
    DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '',
  },
) => http.put('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_XacNhan_Edit_Para', data)
const getDanhSachBaoHong = (
  params = {
    MaNhanSu: '',
  },
) =>
  http.get(`SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_Load_BaoHong`, {
    params,
  })
// 2. Lấy danh sách tòa nhà
const getDanhSachToaNha = (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
  },
) =>
  http.get('SP_DT_QLTS_TiepNhan/Load_Muti_Para_ToaNha', {
    params,
  })
// 3. Lấy danh sách tầng theo ID tòa nhà
const getDanhSachTang = (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
    DT_QLP_Phong_ToaNha: '',
  },
) =>
  http.get('SP_DT_QLTS_TiepNhan/Load_Muti_Para_Tang', {
    params,
  })
// 4. Lấy danh sách phòng theo tầng
const getDanhSachPhong = (
  params = {
    DT_QLP_Phong_CoSo: '',
    DT_QLP_Phong_DiaDiem: '',
    DT_QLP_Phong_ToaNha: '',
    DT_QLP_Phong_Tang: '',
  },
) =>
  http.get('SP_DT_QLTS_TiepNhan/Load_Muti_Para_TenPhong', {
    params,
  })
// 5. Lấy danh sách tài sản theo ID phòng
const getDanhSachTaiSan = (
  params = {
    DT_QLTS_TS_PhongHienTai: '',
    DT_QLTS_TS_NhomTaiSan: '',
  },
) =>
  http.get('SP_DT_QLTS_TiepNhan/TS_Load_ByPhong_Web', {
    params,
  })
// 6. Lấy thông tin tài sản theo ID tài sản
const getTaiSanById = (
  params = {
    DT_QLTS_TS_ID: '',
  },
) =>
  http.get('SP_DT_QLTS_TiepNhan/TS_Load_R_Para_File', {
    params,
  })
// 7. Lấy danh sách sự cố theo hỗ trợ thiết bị
const getDanhSachSuCoByHoTroThietBi = (
  params = {
    DT_CVNB_TBGD_TL_Nhom1: 'HoTroThietBi',
    DT_CVNB_TBGD_TL_Nhom2: 'DanhSachSuCo',
    DT_CVNB_TBGD_TL_Nhom3: '',
    DT_CVNB_TBGD_TL_Nhom4: '',
  },
) =>
  http.get('SP_DT_QLP_Phong_TiepNhan/TBGD_TL_Load_R_Para_DanhSachSuCo', {
    params,
  })
// 8. Kiểm tra trùng của SV
const getKiemTraTrung_BaoHong_MaSinhVien = (
  params = { DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '' },
) =>
  http.get('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_CheckTrung_MaNhanSu', {
    params,
  })
// 9. Lấy danh sách cán bộ hỗ trợ phân công trực
const getDanhSach_CanBoHoTro_PhanCongTruc = () =>
  http.get('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_PhanCongTruc_Load')
// 10. Lấy danh sách lĩnh vực sự cố
const getDanhSachLinhVucSuCo = (
  params = {
    DT_CVNB_TBGD_TL_Nhom4: '',
  },
) =>
  http.get('SP_DT_QLP_Phong_TiepNhan/HoTroThietBi_LinhVuc_Load', {
    params,
  })

const apiHoTroTBPM = {
  postYeuCauBaoHongTaiSan,
  deleteYeuCauBaoHongTaiSan,
  putNgayXuLyYeuCauBaoHong,
  putXacNhanSuaChuaHoanThanh,
  getDanhSachBaoHong,
  getDanhSachToaNha,
  getDanhSachTang,
  getDanhSachPhong,
  getDanhSachTaiSan,
  getTaiSanById,
  getDanhSachSuCoByHoTroThietBi,
  getKiemTraTrung_BaoHong_MaSinhVien,
  getDanhSach_CanBoHoTro_PhanCongTruc,
  getDanhSachLinhVucSuCo,
}

export default apiHoTroTBPM
