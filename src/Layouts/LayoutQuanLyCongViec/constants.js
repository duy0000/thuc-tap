export const quanlycongviecSidebar = [
  {
    path: '',
    searchParams: {
      tab: 'tat-ca',
    },
    label: 'Tất cả công việc',
    sidebarActive: true,
  },
  {
    path: '',
    searchParams: {
      tab: 'toi-giao',
    },
    label: 'Công việc tôi giao',
    sidebarActive: true,
  },
  {
    path: '',
    searchParams: {
      tab: 'giao-toi',
    },
    label: 'Công việc giao tôi',
    sidebarActive: true,
  },
  {
    path: '',
    searchParams: {
      tab: 'lien-quan',
    },
    label: 'Công việc liên quan',
    sidebarActive: true,
  },
]

export const listTenCongViec = [
  {
    label: 'Nhân sự thực hiện',
    value: '0',
  },
  {
    label: 'Tên dự án',
    value: '1',
  },
  {
    label: 'Nhóm công việc cha',
    value: '2',
  },
  {
    label: 'Tên công việc',
    value: '3',
  },
]

export const enumLoaiCongViec = {
  TAT_CA: 'tat-ca',
  TOI_GIAO: 'toi-giao',
  GIAO_TOI: 'giao-toi',
  LIEN_QUAN: 'lien-quan',
  CHINH_SUA: 'chinh-sua',
}

export const enumActionAddCongViec = {
  TAO_VIEC_CUA_TOI: 'TAO_VIEC_CUA_TOI',
  GIAO_VIEC_TRUC_TIEP: 'GIAO_VIEC_TRUC_TIEP',
  GIAO_VIEC_UY_QUYEN: 'GIAO_VIEC_UY_QUYEN',
  CHINH_SUA_CONG_VIEC: 'CHINH_SUA_CONG_VIEC',
}

export const generateTitleActionAddCongViec = (action) => {
  switch (action) {
    case enumActionAddCongViec.TAO_VIEC_CUA_TOI: {
      return 'Tạo việc của tôi'
    }
    case enumActionAddCongViec.GIAO_VIEC_TRUC_TIEP: {
      return 'Giao việc trực tiếp'
    }
    case enumActionAddCongViec.GIAO_VIEC_UY_QUYEN: {
      return 'Giao việc ủy quyền'
    }
    case enumActionAddCongViec.CHINH_SUA_CONG_VIEC: {
      return 'Chỉnh sửa công việc'
    }
    default: {
      return 'Tạo công việc'
    }
  }
}

export const generateTitleTableNhanSuCongViec = (action) => {
  switch (action) {
    case enumActionAddCongViec.TAO_VIEC_CUA_TOI: {
      return 'Chọn nhân sự kiểm tra'
    }
    case enumActionAddCongViec.GIAO_VIEC_TRUC_TIEP: {
      return 'Chọn nhân sự thực hiện'
    }
    case enumActionAddCongViec.GIAO_VIEC_UY_QUYEN: {
      return 'Chọn nhân sự ủy quyền'
    }
    case enumActionAddCongViec.CHINH_SUA_CONG_VIEC: {
      return 'Chọn nhân sự kiểm tra'
    }
    default: {
      return 'Nhân sự kiểm tra'
    }
  }
}

export const generateLoaiCongViec = (loaiCongViec) => {
  switch (loaiCongViec) {
    case enumLoaiCongViec.TAT_CA: {
      return 'Tât cả công việc'
    }
    case enumLoaiCongViec.TOI_GIAO: {
      return 'Công việc tôi giao'
    }
    case enumLoaiCongViec.GIAO_TOI: {
      return 'Công việc giao tôi'
    }
    case enumLoaiCongViec.LIEN_QUAN: {
      return 'Công việc liên quan'
    }
    default: {
      return 'Tất cả công việc'
    }
  }
}
