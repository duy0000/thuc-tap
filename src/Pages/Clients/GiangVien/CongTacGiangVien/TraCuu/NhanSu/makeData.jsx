import dayjs from 'dayjs'
import { size } from 'lodash-unified'

export const makeData = Array(20)
  .fill(1)
  .map((_, index) => {
    return {
      firstName: `firstName ${index}`,
      lastName: `lastName ${index}`,
      age: index + 1 * 18,
      visits: index + 1,
      progress: 100,
      status: index % 2 === 0 ? 'success' : 'error',
    }
  })

export const columns = [
  // {
  //   header: 'STT',
  //   cell: (info) => info.row.index + 1,
  //   columns: [
  //     {
  //       header: '',
  //     },
  //   ],
  //   meta: {
  //     filterVariant: ' ',
  //   },
  // },
  {
    header: ' ',
    columns: [
      {
        header: () => <span>ID</span>,
        accessorKey: 'TTKL_NS_ID',
        id: 'TTKL_NS_ID',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        header: () => <span>Năm</span>,
        accessorKey: 'TTKL_NS_Nam',
        id: 'TTKL_NS_Nam',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        header: () => <span>Học kỳ</span>,
        accessorKey: 'TTKL_NS_HocKy',
        id: 'TTKL_NS_HocKy',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        header: () => <span>Cơ sở</span>,
        accessorKey: 'TTKL_NS_CoSo',
        id: 'TTKL_NS_CoSo',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        header: () => <span>Mã nhân sự</span>,
        accessorKey: 'TTKL_NS_MaNS',
        id: 'TTKL_NS_MaNS',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        header: () => <span>Họ đệm</span>,
        accessorKey: 'TTKL_NS_HoDem',
        id: 'TTKL_NS_HoDem',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        header: () => <span>Tên</span>,
        accessorKey: 'TTKL_NS_Ten',
        id: 'TTKL_NS_Ten',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
        footer: (props) => props.column.id,
        size: 100,
      },
      {
        header: () => <span>Trạng thái</span>,
        accessorKey: 'TTKL_NS_TrangThai',
        id: 'TTKL_NS_TrangThai',
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: 'text',
        },
        footer: (props) => props.column.id,
        size: 100,
      },
    ],
  },
  {
    header: 'Thông tin nhân sự',
    footer: (props) => props.column.id,
    columns: [
      {
        header: ' ',
        columns: [
          {
            header: () => <span>Mô tả trạng thái</span>,
            accessorKey: 'TTKL_NS_TrangThai_MoTa',
            id: 'TTKL_NS_TrangThai_MoTa',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Chức vụ</span>,
            accessorKey: 'TTKL_NS_ChucVu',
            id: 'TTKL_NS_ChucVu',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Chuyên ngành</span>,
            accessorKey: 'TTKL_NS_ChuyenNganh',
            id: 'TTKL_NS_ChuyenNganh',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Ngày sinh</span>,
            accessorKey: 'TTKL_NS_NgaySinh',
            id: 'TTKL_NS_NgaySinh',
            cell: (info) =>
              info.getValue()
                ? dayjs(info.getValue()).format('DD/MM/YYYY')
                : '',
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Giới tính</span>,
            accessorKey: 'TTKL_NS_GioiTinh',
            id: 'TTKL_NS_GioiTinh',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Địa chỉ</span>,
            accessorKey: 'TTKL_NS_DiaChi',
            id: 'TTKL_NS_DiaChi',
            cell: (info) =>
              info.getValue().length > 20
                ? info.getValue().substring(0, 20) + '...'
                : info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Điện thoại</span>,
            accessorKey: 'TTKL_NS_SoDienThoai',
            id: 'TTKL_NS_SoDienThoai',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Email</span>,
            accessorKey: 'TTKL_NS_Email',
            id: 'TTKL_NS_Email',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Mã số thuế</span>,
            accessorKey: 'TTKL_NS_MaSoThue',
            id: 'TTKL_NS_MaSoThue',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Loại GV</span>,
            accessorKey: 'TTKL_NS_LoaiGV',
            id: 'TTKL_NS_LoaiGV',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Ngạch GV</span>,
            accessorKey: 'TTKL_NS_LoaiGV2',
            id: 'TTKL_NS_LoaiGV2',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Đơn vị quản lý NS</span>,
            accessorKey: 'TTKL_NS_DonViQLNS',
            id: 'TTKL_NS_DonViQLNS',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
          {
            header: () => <span>Khoa chuyên môn</span>,
            accessorKey: 'TTKL_NS_KhoaChuyenMon',
            id: 'TTKL_NS_KhoaChuyenMon',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
            footer: (props) => props.column.id,
            size: 100,
          },
        ],
      },
      {
        header: ' ',
        columns: [
          {
            header: ' ',
            columns: [
              {
                header: 'Chứng minh thư/Căn cước công dân',
                columns: [
                  {
                    header: () => <span>Số CMT/CCCD</span>,
                    accessorKey: 'TTKL_NS_SoCMT',
                    id: 'TTKL_NS_SoCMT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                    footer: (props) => props.column.id,
                    size: 100,
                  },
                  {
                    header: () => <span>Ngày cấp</span>,
                    accessorKey: 'TTKL_NS_NgayCap',
                    id: 'TTKL_NS_NgayCap',
                    cell: (info) =>
                      info.getValue()
                        ? dayjs(info.getValue()).format('DD/MM/YYYY')
                        : '',
                    meta: {
                      filterVariant: 'text',
                    },
                    footer: (props) => props.column.id,
                    size: 100,
                  },
                  {
                    header: () => <span>Nơi cấp</span>,
                    accessorKey: 'TTKL_NS_NoiCap',
                    id: 'TTKL_NS_NoiCap',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                    footer: (props) => props.column.id,
                    size: 100,
                  },
                ],
              },
              {
                header: 'Ngân hàng',
                columns: [
                  {
                    header: () => <span>Tài khoản</span>,
                    accessorKey: 'TTKL_NS_SoTaiKhoan',
                    id: 'TTKL_NS_SoTaiKhoan',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                    footer: (props) => props.column.id,
                    size: 100,
                  },
                  {
                    header: () => <span>Tên ngân hàng</span>,
                    accessorKey: 'TTKL_NS_TenNganHang',
                    id: 'TTKL_NS_TenNganHang',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                    footer: (props) => props.column.id,
                    size: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    header: 'Trình độ giảng viên',
    footer: (props) => props.column.id,
    columns: [
      {
        header: () => <span>Trình độ</span>,
        accessorKey: 'TTKL_NS_TrinhDoGV_TrinhDo',
        id: 'TTKL_NS_TrinhDoGV_TrinhDo',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 100,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        header: () => <span>Trình độ (thuộc đối tượng)</span>,
        accessorKey: 'TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong',
        id: 'TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong',
        cell: (info) => info.getValue(),

        footer: (props) => props.column.id,
        size: 100,
        meta: {
          filterVariant: 'text',
        },
      },
      {
        header: () => <span>Hệ số trình độ</span>,
        accessorKey: 'TTKL_NS_TrinhDoGV_TrinhDo_HeSo',
        id: 'TTKL_NS_TrinhDoGV_TrinhDo_HeSo',
        cell: (info) => info.getValue(),

        footer: (props) => props.column.id,
        size: 100,
        meta: {
          filterVariant: 'text',
        },
      },
    ],
  },
  {
    header: 'Khối lượng giảm trừ',
    footer: (props) => props.column.id,
    columns: [
      {
        header: 'THAM GIA CÔNG TÁC QUẢN LÝ, ĐẢNG, ĐOÀN THỂ',
        columns: [
          {
            header: 'Trong giờ hành chính',
            columns: [
              {
                header: 'Công tác quản lý',
                size: 100,
                columns: [
                  {
                    header: '(01)',
                    accessorKey: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT',
                    id: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'Đảng',
                columns: [
                  {
                    header: '(02)',
                    accessorKey: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT',
                    id: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'Đoàn thể',
                size: 100,
                columns: [
                  {
                    header: '(03)',
                    accessorKey: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT',
                    id: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
            ],
          },
          {
            header: 'Ngoài giờ hành chính',
            columns: [
              {
                header: 'Công tác quản lý',
                columns: [
                  {
                    header: '(04)',
                    accessorKey: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTQL_KLGT',
                    id: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTQL_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'Đảng',
                columns: [
                  {
                    header: '(05)',
                    accessorKey: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT',
                    id: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'Đoàn thể',
                columns: [
                  {
                    header: '(06)',
                    accessorKey: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT',
                    id: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        header: ' ',
        columns: [
          {
            header: ' ',
            columns: [
              {
                header:
                  'CÔNG TÁC HỌC TẬP NÂNG CAO TRÌNH ĐỘ CHUYÊN MÔN, NGHIỆP VỤ, BỒI DƯỠNG GIẢNG VIÊN',
                size: 120,
                columns: [
                  {
                    header: '(07)',
                    accessorKey: 'TTKL_NS_KLGT_HCTCM_KLGT',
                    id: 'TTKL_NS_KLGT_HCTCM_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'QUẢN LÝ CƠ SỞ VẬT CHẤT',
                columns: [
                  {
                    header: '(08)',
                    accessorKey: 'TTKL_NS_KLGT_HCTCM_KLGT',
                    id: 'TTKL_NS_KLGT_HCTCM_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'NGHỈ CHẾ ĐỘ',
                columns: [
                  {
                    header: '(09)',
                    accessorKey: 'TTKL_NS_KLGT_HCTCM_KLGT',
                    id: 'TTKL_NS_KLGT_HCTCM_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'HỌP CÔNG TÁC CHUYÊN MÔN',
                columns: [
                  {
                    header: '(10)',
                    accessorKey: 'TTKL_NS_KLGT_HCTCM_KLGT',
                    id: 'TTKL_NS_KLGT_HCTCM_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'CÔNG TÁC KHÁC',
                columns: [
                  {
                    header: '(11)',
                    accessorKey: 'TTKL_NS_KLGT_CTK_KLGT',
                    id: 'TTKL_NS_KLGT_CTK_KLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
              {
                header: 'TỔNG KHỐI LƯỢNG GIẢM TRỪ',
                columns: [
                  {
                    header: 'Giờ',
                    accessorKey: 'TTKL_NS_KLGT_TongKLGT',
                    id: 'TTKL_NS_KLGT_TongKLGT',
                    cell: (info) => info.getValue(),
                    meta: {
                      filterVariant: 'text',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
