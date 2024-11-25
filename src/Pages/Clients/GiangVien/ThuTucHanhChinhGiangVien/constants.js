export const homeSwitcher = {
  dashboard: 'Thống kê',
  home: 'Thủ tục hành chính',
}

export const filterConditional = [
  {
    label: 'Đơn vị/Tổ chức',
    value: 'NoiTiepNhan',
  },
  {
    label: 'Lĩnh vực',
    value: 'LinhVuc',
  },
]

export const listTypeTTHCGVThongKe = [
  {
    key: 'Tất cả',
    value: '0',
  },
  {
    key: 'Trạng thái',
    value: 'Trạng thái',
  },
  {
    key: 'Tháng',
    value: 'Tháng',
  },
]

export const listLoaiTimKiemThongKeTTHCGV = [
  {
    key: 'Tất cả',
    value: '',
  },
  {
    key: 'Đã hủy trả',
    value: '1',
  },
  {
    key: 'Chưa tiếp nhận',
    value: '2',
  },
  {
    key: 'Đang xử lý',
    value: '3',
  },
  {
    key: 'Đã hoàn thành',
    value: '4',
  },
]

export const listThangThongKeTTHCGV = Array.from({ length: 13 }, (_, i) => {
  return {
    key: i === 0 ? 'Tất cả' : `Tháng ${i}`,
    value: i === 0 ? '' : i,
  }
})
export const DATA_AUDIT_KEY = [
  {
    label: 'Tất cả',
    value: 'ALL',
  },
  {
    label: 'Đơn vị đề nghị',
    value: 'DON_VI_DE_NGHI',
  },
  {
    label: 'Đơn vị xử lý',
    value: 'DON_VI_XU_LY',
  },
  {
    label: 'Đơn vị/Tổ chức',
    value: 'DON_VI_TO_CHUC',
  },
]
