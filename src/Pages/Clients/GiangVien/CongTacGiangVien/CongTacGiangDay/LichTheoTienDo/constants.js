import dayjs from 'dayjs'

export const home = {
  path: '/cong-tac-giang-vien',
  title: 'Công tác giảng viên',
}

export const breadcrumbs = [
  {
    path: '/cong-tac-giang-vien/cong-tac-giang-day',
    title: 'Công tác giảng dạy',
  },
  {
    path: '/cong-tac-giang-vien/cong-tac-giang-day/lich-theo-tien-do',
    title: 'Lịch theo tiến độ',
  },
]
export const DanhSachLoaiLich = [
  {
    label: 'Lịch học',
    value: 0,
  },
  {
    label: 'Lịch thi',
    value: 1,
  },
]
export const arrLichHocThead = [
  {
    className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[50px] relative lg:sticky lg:left-0 z-2`,
    content: 'STT',
  },
  {
    className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[50px] z-2`,
    content: 'Mã LHP',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 border-l-0 bg-uneti-primary p-2 w-[150px] relative lg:sticky lg:left-[150px] z-2`,
    content: 'Lớp',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 border-l-0 bg-uneti-primary p-2 w-[60px] relative lg:sticky lg:left-[300px] z-2`,
    content: 'Nhóm',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 border-l-0  bg-uneti-primary p-2 w-[160px] relative lg:sticky lg:left-[360px] z-2`,
    content: 'Môn học',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[60px]`,
    content: 'Sĩ số',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px]`,
    content: 'Thứ',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[80px]`,
    content: 'Ngày Bắt Đầu',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px]`,
    content: 'Từ tiết',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px]`,
    content: 'Đến tiết',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[180px]`,
    content: 'Tiết Học',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[120px]`,
    content: 'Phòng học',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[100px]`,
    content: 'Trạng thái',
  },
]
export const arrLichThiThead = [
  {
    className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[50px] relative lg:sticky lg:left-0 z-2`,
    content: 'STT',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[50px] z-2`,
    content: 'Lớp học',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[150px] z-2`,
    content: 'Lớp dự kiến',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[250px] z-2`,
    content: 'Mã LHP',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px] relative lg:sticky lg:left-[350px] z-2`,
    content: 'Sĩ số',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[150px]`,
    content: 'Môn thi',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px]`,
    content: 'Thứ',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[80px]`,
    content: 'Ngày Thi',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px]`,
    content: 'Nhóm',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px]`,
    content: 'Từ tiết',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px]`,
    content: 'Đến tiết',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[50px]`,
    content: 'Thời gian thi',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[80px]`,
    content: 'Hình thức thi',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[80px]`,
    content: 'Cơ sở',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[150px]`,
    content: 'Phòng thi',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[100px]`,
    content: 'Giảng viên coi thi 1',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[100px]`,
    content: 'Giảng viên coi thi 2',
  },
  {
    className: `text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 w-[100px]`,
    content: 'Ghi chú',
  },
]

export function timeTable(arr) {
  // Hàm tạo chuỗi dãy tiết học
  const generateTietRange = (TuTiet, DenTiet) => {
    let result = []

    for (let i = 1; i <= 16; i++) {
      if (i >= TuTiet && i <= DenTiet) {
        result.push(i)
      } else {
        result.push('-')
      }
    }

    return result.join('')
  }

  // Lặp qua mỗi phần tử trong mảng và sửa dữ liệu
  const updatedArr = arr?.map((item) => {
    // Kiểm tra TuTiet và DenTiet có tồn tại trong mỗi phần tử không
    const { TuTiet, DenTiet } = item

    if (TuTiet && DenTiet) {
      // Thêm trường TietHoc vào phần tử với giá trị dãy tiết học
      item.TietHoc = generateTietRange(TuTiet, DenTiet)
    } else {
      item.TietHoc = '' // Nếu không có TuTiet hoặc DenTiet, gán TietHoc là rỗng
    }

    return item
  })

  return updatedArr
}

export function confixArr(data, fieldOrder) {
  return data.map((item, index) => {
    const newItem = { ...item, STT: index + 1 }
    const reorderedItem = {}

    // Đặt giá trị cho STT
    reorderedItem['STT'] = newItem['STT']

    fieldOrder.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(newItem, field)) {
        if (field === 'NgayBatDau' && newItem[field]) {
          reorderedItem[field] = dayjs(newItem[field]).format('DD/MM/YYYY')
        } else {
          // Nếu giá trị là null hoặc undefined, đặt giá trị mặc định là chuỗi rỗng
          reorderedItem[field] =
            newItem[field] !== null && newItem[field] !== undefined
              ? newItem[field]
              : ''
        }
      } else {
        // Nếu trường không tồn tại trong newItem, đặt giá trị mặc định là chuỗi rỗng
        reorderedItem[field] = ''
      }
    })

    return reorderedItem
  })
}

export function confixArrLichThi(data, fieldOrder) {
  return data.map((item, index) => {
    // Thêm STT và sao chép các trường của item
    const newItem = { ...item, STT: index + 1 }

    // Xóa các trường không cần thiết
    delete newItem.HoTenGV3
    delete newItem.HoTenGV4

    const reorderedItem = {}

    // Thêm STT vào reorderedItem
    reorderedItem['STT'] = newItem['STT']

    fieldOrder.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(newItem, field)) {
        if (field === 'NgayThi' && newItem[field]) {
          // Định dạng trường NgayThi
          reorderedItem[field] = dayjs(newItem[field]).format('DD/MM/YYYY')
        } else {
          // Đặt giá trị mặc định nếu là null hoặc undefined
          reorderedItem[field] =
            newItem[field] !== null && newItem[field] !== undefined
              ? newItem[field]
              : ''
        }
      } else {
        // Đặt giá trị mặc định nếu trường không tồn tại
        reorderedItem[field] = ''
      }
    })

    return reorderedItem
  })
}

export const arrHeaderLichHoc = [
  'STT',
  'MaLopHocPhan',
  'TenLopHoc',
  'SiSo',
  'TenMonHoc',
  'Nhom',
  'Thu',
  'TuTiet',
  'DenTiet',
  'NgayBatDau',
  'TenPhong',
  'TenTrangThai',
]
export const arrHeaderLichThi = [
  'STT',
  'MaLopXepLichThi',
  'LopDuKien',
  'MaLopHocPhan',
  'SiSo',
  'TenMonHoc',
  'Thu',
  'NgayThi',
  'Nhom',
  'TuTiet',
  'DenTiet',
  'ThoiGianThi',
  'TenHinhThucThi',
  'TenDonVi',
  'TenPhong',
  'HoTenGV1',
  'HoTenGV2',
  'GhiChu',
]

export const defaultFilterValue = {
  MaLopHocPhan: {
    value: '',
    type: 'text',
    className:
      'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[50px] text-center',
  },
  TenLopHoc: {
    value: '',
    type: 'text',
    className:
      'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[150px] text-center',
  },
  Nhom: {
    value: '',
    type: 'text',
    className:
      'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[300px] text-center',
  },
  TenMonHoc: {
    value: '',
    type: 'text',
    className:
      'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[360px] text-center',
  },
  SiSo: {
    value: '',
    type: 'text',
    className: 'text-xs bg-white border border-gray-300 p-2 text-center',
  },
  Thu: {
    value: '',
    type: 'text',
    className: 'text-xs bg-white border border-gray-300 p-2 text-center',
  },
  NgayBatDau: {
    value: '',
    type: 'date',
    className: 'text-xs bg-white border border-gray-300 p-2 text-center',
  },
  TuTiet: {
    value: '',
    type: 'text',
    className: 'text-xs bg-white border border-gray-300 p-2 text-center',
  },
  DenTiet: {
    value: '',
    type: 'text',
    className: 'text-xs bg-white border border-gray-300 p-2 text-center',
  },
  TietHoc: {
    value: '',
    type: 'text',
    className: 'text-xs bg-white border border-gray-300 p-2 text-center',
  },
  TenPhong: {
    value: '',
    type: 'text',
    className: 'text-xs bg-white border border-gray-300 p-2 text-center',
  },
  TenTrangThai: {
    value: '',
    type: 'text',
    className: 'text-xs bg-white border border-gray-300 p-2 text-center',
  },
}
