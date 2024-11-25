import { enumLoaiCongViec } from '@/Layouts/LayoutQuanLyCongViec/constants'

export const CV_HT_TrangThai = {
  CV_CHUA_THUC_HIEN: '1',
  CV_DANG_THUC_HIEN: '2',
  CV_DA_HOAN_THANH: '3',
}

export const enumDanhMucCongViec = {
  LoaiCongViec: 'XDCV_',
  UuTienCongViec: 'UTCV_',
  ViTriThucHien: 'VTTCV_',
}

export const generateLoaiCongViecFilter = (tab) => {
  switch (tab) {
    case enumLoaiCongViec.TAT_CA: {
      return 'Tất cả'
    }
    case enumLoaiCongViec.TOI_GIAO: {
      return 'Tôi giao'
    }
    case enumLoaiCongViec.GIAO_TOI: {
      return 'Giao tôi'
    }
    case enumLoaiCongViec.LIEN_QUAN: {
      return 'Liên quan'
    }
    default: {
      return 'Tất cả'
    }
  }
}
