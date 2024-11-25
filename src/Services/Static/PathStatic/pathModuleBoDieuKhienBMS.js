const pathModuleBoDieuKhienBMS = [
  {
    id: 1,
    label: 'Thiết lập thủ công',
    path: '',
    isActive: true,
  },
  {
    id: 2,
    label: 'Thiết lập tư động',
    path: '',
    isActive: false,
  },
  {
    id: 3,
    label: 'Cấu hình',
    path: 'cau-hinh-bms',
    chilrenPath: [
      {
        id: 1,
        label: 'Cấu hình thiết bị BMS',
        path: 'cau-hinh-thiet-bi',

        isActive: false,
      },
      {
        id: 2,
        label: 'Cấu hình lập lịch',
        path: 'cau-hinh-lap-lich',

        isActive: true,
      },
    ],
  },
  {
    id: 4,
    label: 'Lịch sử',
    path: 'lich-su-bms',
    isActive: true,
    chilrenPath: [
      {
        id: 1,
        label: 'Lịch sử thao tác lệnh',
        path: 'thao-tac-lenh',

        isActive: true,
      },
      {
        id: 2,
        label: 'Lịch sử mất kết nối',
        path: 'mat-ket-noi',

        isActive: true,
      },
    ],
  },
]

export default pathModuleBoDieuKhienBMS
