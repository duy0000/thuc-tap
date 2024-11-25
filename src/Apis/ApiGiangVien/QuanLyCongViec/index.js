import http from '@/Configs/http'

export const apiQuanLyCongViec = {
  addCongViec: (
    data = {
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
      IDNhanSu: '',
    },
  ) => http.post('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Add_Para', data),

  editXacNhanCongViec: (
    data = {
      CV_HT_PhanCongThucHien_ID: '',
      CV_HT_PhanCongThucHien_XacNhan_PhanTram: '',
      CV_HT_PhanCongThucHien_XacNhan_TenFile: '',
      CV_HT_PhanCongThucHien_XacNhan_DataFile: '',
      CV_HT_PhanCongThucHien_XacNhan_MoTa: '',
    },
  ) =>
    http.put(
      'SP_CV_HT_QuanLyCongViec/PhanCongThucHien_XacNhan_Edit_Para',
      data,
    ),

  addCongViecCaNhan: (
    data = {
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
      HT_USER_Create: '',
    },
  ) => http.post('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_CaNhan_Add_Para', data),

  editCongViecCaNhan: (
    data = {
      CV_HT_KhoiTaoCV_ID: '',
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
      HT_USER_Editor: '',
    },
  ) => http.put('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_CaNhan_Edit_Para', data),

  editCongViec: (
    data = {
      CV_HT_KhoiTaoCV_ID: '',
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
      IDNhanSu: '',
    },
  ) => http.put('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Edit_Para', data),

  editKiemTraCongViec: (
    data = {
      CV_HT_PhanCongThucHien_ID: '',
      CV_HT_PhanCongThucHien_KiemTra_XacNhan: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_PhanCongThucHien_KiemTra_TenFile: '',
      CV_HT_PhanCongThucHien_KiemTra_DataFile: '',
      CV_HT_PhanCongThucHien_KiemTra_MoTa: '',
    },
  ) =>
    http.put(
      'SP_CV_HT_QuanLyCongViec/PhanCongThucHien_KiemTra_Edit_Para',
      data,
    ),

  getCongViec_ByMaNhanSu: (
    params = {
      TrangThai: '',
      MaNhanSu: '',
      Loai: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_Load_ByMaNhanSu_Loc', {
      params,
    }),

  getCongViecLienQuan: (
    params = {
      MaNhanSu: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Load_CVLienQuan', {
      params,
    }),

  getQuanLyCongViec: (
    params = {
      MaNhanSu: '',
      Loc: 'Tất cả công việc',
    },
  ) =>
    http.get(
      'SP_CV_HT_QuanLyCongViec/PhanCongThucHien_HoanThanh_Load_ByMaNhanSu',
      {
        params,
      },
    ),

  delCongViec: (
    params = {
      CV_HT_KhoiTaoCV_ID: '',
    },
  ) =>
    http.delete('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Del_Para', {
      params,
    }),

  getCongViecPhanCongThucHienTheoID: (
    params = {
      CV_HT_PhanCongThucHien_ID: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_Load_R_Para_File', {
      params,
    }),
  getCongViecKhoiTaoTheoID: (
    params = {
      CV_HT_KhoiTaoCV_ID: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Load_R_Para_File', { params }),

  getLichSuTienDoCapNhat: (
    params = {
      CV_HT_KhoiTaoCV_ID: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_Load_LichSuTienDo', {
      params,
    }),

  getCongViecAll: (
    params = {
      CV_HT_PhanCongThucHien_ID: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_Load_All', {
      params,
    }),

  getNhomThucHien: () => http.get('SP_CV_HT_QuanLyCongViec/NhomThucHien_Load'),

  getTenNhom1: (
    params = {
      CV_HT_DanhMuc_MaNhom1: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/TenNhom1_Load', {
      params,
    }),

  getTenNhomCVCha: () =>
    http.get('SP_CV_HT_QuanLyCongViec/KhungNhomCongViec_TenNhomCVCha_Load'),

  getTenNhomCVCon: (
    params = {
      CV_HT_KhungNhomCongViec_TenNhomCVCha: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/KhungNhomCongViec_TenNhomCVCon_Load', {
      params,
    }),

  getTenCongViec: (
    params = {
      CV_HT_KhungCongViec_NhomCVCon: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/KhungCongViec_TenCongViec_Load', {
      params,
    }),

  getNhanSu_CheckChon: (
    params = {
      CV_HT_NhanSu_ID: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/NhanSu_Load_CheckChon', {
      params,
    }),

  getPhongBan: () => http.get('SP_HT_HPTD/HT_PB_Load'),

  getTenDot: () => http.get('SP_EDU/Load_TenDot'),

  getNhomThucHien_ByTen: (
    params = {
      CV_HT_NhomThucHien_NhomThucHien: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/NhomThucHien_Load_By_Ten_R_Para_File', {
      params,
    }),

  getTenDeNghi: (
    params = {
      MaNhanSu: '',
      TenDeNghi: '',
      Loai: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_Load_ByDeNghi', {
      params,
    }),

  getLichSu_ByIDKhoiTao: (
    params = {
      CV_HT_PhanCongThucHien_IDKhoiTaoCV: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_LichSu_ByIDKhoiTaoCV', {
      params,
    }),

  getCVHoanThanh_ByMaNS: (
    params = {
      MaNhanSu: '',
      Loc: '',
      NgayBatDau: '',
      NgayKetThuc: '',
    },
  ) =>
    http.get(
      'SP_CV_HT_QuanLyCongViec/PhanCongThucHien_HoanThanh_Load_ByMaNhanSu',
      {
        params,
      },
    ),

  delCongViecPhanCong: (
    data = {
      CV_HT_PhanCongThucHien_IDKhoiTaoCV: '',
    },
  ) =>
    http.delete('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_Del_Para', {
      data,
    }),
  getNhanSu_ByMaNhanSu: (
    params = {
      CV_HT_NhanSu_MaNhanSu: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/NhanSu_Load_ByMaNhanSu', {
      params,
    }),

  getCVDinhKy: (
    params = {
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Load_CVDinhKy', {
      params,
    }),

  addCVDinhKy: (
    data = {
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: '',
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: '',
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_UuTien: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: '',
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: '',
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: '',
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: '',
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: '',
      IDNhanSu: '',
      HT_USER_Create: '',
      CV_HT_KhoiTaoCV_HienThi: '',
      CV_HT_KhoiTaoCV_SuDung: '',
    },
  ) => http.post('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Add_Para_DongBo', data),
  getFileNhomThucHien: (
    params = {
      CV_HT_NhomThucHien_NhomThucHien: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/NhomThucHien_Load_By_Ten_R_Para_File', {
      params,
    }),
  getFileNhomThucHienById: (
    params = {
      CV_HT_NhomThucHien_ID: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/NhomThucHien_Load_R_Para_File', {
      params,
    }),
  getFileKhoiTaoCV: (
    params = {
      CV_HT_KhoiTaoCV_ID: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/KhoiTaoCV_Load_R_Para_File', { params }),
  getFilePhanCongThucHien: (
    params = {
      CV_HT_PhanCongThucHien_ID: '',
    },
  ) =>
    http.get('SP_CV_HT_QuanLyCongViec/PhanCongThucHien_Load_R_Para_File', {
      params,
    }),
}
