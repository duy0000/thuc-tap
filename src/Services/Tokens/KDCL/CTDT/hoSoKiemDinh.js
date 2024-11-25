import { createContext } from 'react'

export const HoSoKiemDinhCtx = createContext()

export const chucVu = ['Cán bộ nghiệp vụ', 'Chuyên viên', 'Sinh viên']
export const loaiNhanSu = [
  {
    label: 'Giảng viên',
    value: 0,
  },
  {
    label: 'Sinh viên',
    value: 1,
  },
  {
    label: 'Khác',
    value: 2,
  },
]

export const NhiemVuEnum = {
  ChuTich: 0,
  PhoChuTich: 1,
  ThuKy: 2,
  TruongBanThuKy: 3,
  NhomTruong: 4,
  SinhVien: 5,
  ThanhVien: 6,
}

export const NhiemVuEnumText = {
  [NhiemVuEnum.ChuTich]: 'Chủ tịch',
  [NhiemVuEnum.PhoChuTich]: 'Phó chủ tịch',
  [NhiemVuEnum.ThuKy]: 'Thư ký',
  [NhiemVuEnum.TruongBanThuKy]: 'Trưởng ban thư ký',
  [NhiemVuEnum.NhomTruong]: 'Nhóm trưởng',
  [NhiemVuEnum.SinhVien]: 'Sinh viên',
  [NhiemVuEnum.ThanhVien]: 'Thành viên',
}

export const nhiemVu = [
  'Chủ tịch',
  'Phó chủ tịch',
  'Sinh viên',
  'Thư ký',
  'Trưởng ban thư ký',
  'Nhóm trưởng',
  'Thành viên',
]

export const LoaiThanhPhanHoiDongEnum = {
  TDG_ThanhPhanHoiDong: 1,
  TDG_BanThuKy: 2,

  DGDC_ThanhPhanHoiDong: 3,
}

export const stepStatusEnum = {
  ChuaThucHien: 0, // Chưa thực hiện
  DangThucHien: 1, // Đang thực hiện
  DaTrinhGui: 2, // Đã trình gửi
  DaPheDuyet: 3, // Đã phê duyệt
  KhongPheDuyet: 4, // Không phê duyệt
  DaHoanThanh: 5, // Đã hoàn thành
}

export const stepStatusTextEnum = {
  [stepStatusEnum.ChuaThucHien]: 'Chưa thực hiện',
  [stepStatusEnum.DangThucHien]: 'Đang thực hiện',
  [stepStatusEnum.DaTrinhGui]: 'Đã trình gửi',
  [stepStatusEnum.DaPheDuyet]: 'Đã phê duyệt',
  [stepStatusEnum.KhongPheDuyet]: 'Không phê duyệt',
  [stepStatusEnum.DaHoanThanh]: 'Đã hoàn thành',
}

export const IDQuyTrinhKiemDinhEnum = {
  TuDanhGia: {
    INDEX: 2,
    Buoc1: 6,
    Buoc2: 7,
    Buoc3: 18,
    Buoc4: 8,
    Buoc5: 9,
    Buoc6: 10,
    Buoc7: 11,
    Buoc8: 12,
  },
  DanhGiaDongCap: {
    INDEX: 3,
    Buoc1: 13,
    Buoc2: 14,
    Buoc3: 15,
    Buoc4: 16,
    Buoc5: 17,
  },
  KetQua: 4,
  HoSoLuuTru: 5,
}

export const stepMetadata = [
  {
    title: 'Tự đánh giá',
    route: 'tu-danh-gia',
    IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.INDEX,
    CanUpdateStatus: true,
    CanUpdateTimeline: true,
    ShouldShowTimeline: false,
    ShouldShowStatus: false,
    children: [
      {
        title: 'Thành lập hội đồng',
        route: 'buoc-1',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc1,
        CanUpdateStatus: false,
        CanUpdateTimeline: false,
        ShouldShowTimeline: false,
        ShouldShowStatus: false,
      },
      {
        title: 'Lập kế hoạch tự đánh giá',
        route: 'buoc-2',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc2,
        CanUpdateStatus: true,
        CanUpdateTimeline: true,
        ShouldShowTimeline: true,
        ShouldShowStatus: true,
      },
      {
        title: 'Cơ sở dữ liệu đơn vị',
        route: 'buoc-3',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc3,
        CanUpdateStatus: true,
        CanUpdateTimeline: true,
        ShouldShowTimeline: true,
        ShouldShowStatus: false,
      },
      {
        title: 'Phân tích tiêu chí, thu thập thông tin và minh chứng',
        route: 'buoc-4',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc4,
        CanUpdateStatus: true,
        CanUpdateTimeline: true,
        ShouldShowTimeline: true,
        ShouldShowStatus: true,
      },
      {
        title: 'Đánh giá tiêu chí',
        route: 'buoc-5',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc5,
        CanUpdateStatus: true,
        CanUpdateTimeline: true,
        ShouldShowTimeline: true,
        ShouldShowStatus: true,
      },
      {
        title: 'Viết báo cáo tự đánh giá',
        route: 'buoc-6',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc6,
        CanUpdateStatus: true,
        CanUpdateTimeline: true,
        ShouldShowTimeline: true,
        ShouldShowStatus: false,
      },
      {
        title: 'Góp ý báo cáo tự đánh giá',
        route: 'buoc-7',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc7,
        CanUpdateStatus: true,
        CanUpdateTimeline: true,
        ShouldShowTimeline: true,
        ShouldShowStatus: false,
      },
      {
        title: 'Đăng ký đánh giá ngoài',
        route: 'buoc-8',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc8,
        CanUpdateStatus: true,
        CanUpdateTimeline: true,
        ShouldShowTimeline: true,
        ShouldShowStatus: true,
      },
    ],
  },
  {
    title: 'Đánh giá ngoài',
    route: 'danh-gia-ngoai',
    IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.INDEX,
    CanUpdateStatus: false,
    CanUpdateTimeline: false,
    ShouldShowTimeline: false,
    children: [
      {
        title: 'Thành lập đoàn đánh giá ngoài',
        route: 'buoc-1',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc1,
        CanUpdateStatus: false,
        CanUpdateTimeline: false,
        ShouldShowTimeline: false,
        ShouldShowStatus: false,
      },
      {
        title: 'Lập kế hoạch đánh giá',
        route: 'buoc-2',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc2,
        CanUpdateStatus: false,
        CanUpdateTimeline: false,
        ShouldShowTimeline: false,
        ShouldShowStatus: false,
      },
      {
        title: 'Nghiên cứu báo cáo tự đánh giá',
        route: 'buoc-3',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc3,
        CanUpdateStatus: false,
        CanUpdateTimeline: false,
        ShouldShowTimeline: false,
        ShouldShowStatus: false,
      },
      {
        title: 'Báo cáo đánh giá tiêu chí',
        route: 'buoc-4',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc4,
        CanUpdateStatus: false,
        CanUpdateTimeline: false,
        ShouldShowTimeline: false,
        ShouldShowStatus: false,
      },
      {
        title: 'Phản hồi của đơn vị',
        route: 'buoc-5',
        IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc5,
        CanUpdateStatus: false,
        CanUpdateTimeline: false,
        ShouldShowTimeline: false,
        ShouldShowStatus: false,
      },
    ],
  },
  {
    title: 'Kết quả',
    route: 'ket-qua',
    IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.KetQua,
    CanUpdateStatus: true,
    CanUpdateTimeline: true,
    ShouldShowTimeline: true,
    ShouldShowStatus: true,
  },
  {
    title: 'Hồ sơ lưu trữ',
    route: 'ho-so-luu-tru',
    IDQuyTrinhKiemDinh: IDQuyTrinhKiemDinhEnum.HoSoLuuTru,
    CanUpdateStatus: true,
    CanUpdateTimeline: true,
    ShouldShowTimeline: true,
    ShouldShowStatus: true,
  },
]
