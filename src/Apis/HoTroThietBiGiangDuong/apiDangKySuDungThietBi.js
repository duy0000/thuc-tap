import http from '@/Configs/http'

// 1. GET: Load danh sách đang ký sử dụng thiết bị
export const getTBGDDangKySuDungThietBi = () =>
  http.get('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_Load')

// 2. GET: Load chi tiết đang ký sử dụng thiết bị theo ID
export const getTBGDDangKySuDungThietBiByID = (
  params = { DT_CVNB_TBGD_GuiYeuCau_ID: '' },
) =>
  http.get('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_Load_R_Para_File', {
    params,
  })

// 3. GET: Load danh sách tài sản/thiết bị cho mượn
export const getTBGDTaiSanThietBi = () =>
  http.get('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_Load_TS_ChoMuon')

// 4. GET: Load danh sách lịch dạy của Giảng viên theo Mã Giảng Viên
export const getTBGDLichDachByMaNhanSu = (
  params = { DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu: '' },
) =>
  http.get('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_Load_LichDay_ByMaNhanSu', {
    params,
  })

// 5. POST: Đăng ký sử dụng thiết bị
export const postTBGDDangKySuDungThietBi = (data = {}) =>
  http.post('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_Add_Para', data)

// 6. PUT: Đăng ký sử dụng thiết bị
export const putTBGDDangKySuDungThietBi = (data = {}) =>
  http.put('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_Edit_Para', data)

// 7. DELETE: Đăng ký sử dụng thiết bị
export const delTBGDDangKySuDungThietBi = (data = {}) =>
  http.delete('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_Del_Para', { data })

// 8. PUT: Bàn giao thiết bị
export const putTBGDMuonPara = (data = {}) =>
  http.put('SP_DT_QLP_Phong_TiepNhan/TBGD_Muon_Para', data)

// 9. GET: Kiểm tra yêu cầu mượn thiết bị trùng
export const getTBGDMuonThietBi_KiemTraTrung = (
  params = {
    DT_CVNB_TBGD_GuiYeuCau_IDLichHoc: '',
    DT_CVNB_TBGD_GuiYeuCau_IDTaiSan: '',
  },
) => http.get('SP_DT_QLP_Phong_TiepNhan/GuiYeuCau_CheckTrung', { params })

// 10. GET: Danh sách gửi yêu cầu đăng ký thiết bị
export const getTBGDDanhSachDangKyThietBi = () =>
  http.get('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_XuLy_Load')

// 11. PUT: Xử lý đăng ký sử dụng thiết bị
export const putTBGDDangKySuDungThietBi_XuLy = (data = {}) =>
  http.put('SP_DT_QLP_Phong_TiepNhan/TBGD_GuiYeuCau_XuLy_Edit_Para', data)
