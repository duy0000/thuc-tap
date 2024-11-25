// icons - images homeMain
import icoHTTBGD from '@/assets/Icons/icoHTTBGD.png'
import icoTTHCSV from '@/assets/Icons/icoTTHCSV.png'
import icoHTSDPM from '@/assets/Icons/icoHTSDPM.png'
import icoTCTTTS from '@/assets/Icons/icoTCTTTS.png'
import icoQLCTCV from '@/assets/Icons/icoQLCTCV.png'
import icoHocTap from '@/assets/Icons/icoHocTap.png'
import icoTinTuc from '@/assets/Icons/Common/iconTinTuc.png'

// icons - thumbnails Module Công tác giảng viên
import iconCTGVHome from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVHome.png'

import { ROLES } from '@/Routers/constants'

// data Static NguonTiepNhan
export const NguonTiepNhan_WEB = 1

// data Static WEB Version
export const WEB_VERSION = '2.1.1.2'

// data Static homeMain
export const homeMain = [
  {
    title: 'Hỗ trợ thiết bị giảng đường',
    desc: 'Theo dõi và báo hỏng thiết bị trong phòng học.',
    icon: icoHTTBGD,
    path: '/ho-tro-thiet-bi-giang-duong',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Thủ tục hành chính',
    desc: 'Tiếp nhận giải quyết các thủ tục hành chính cho sinh viên.',
    icon: icoTTHCSV,
    path: '/mot-cua',
    moduleActive: true,
    roleActive: [ROLES.S0202],
  },
  {
    title: 'Học tập',
    desc: 'Tra cứu kết quả học tập; Chương trình đào tạo; Ôn luyện; Dự kiến kết quả học tập.',
    icon: icoHocTap,
    path: '/hoc-tap',
    moduleActive: true,
    roleActive: [ROLES.S0202],
  },
  {
    title: 'Tra cứu',
    desc: 'Tra cứu thông tin: Lịch học - Lịch thi; Điểm danh; Rèn luyện; Lịch thi; Công nợ.',
    icon: icoTCTTTS,
    path: '/tra-cuu',
    moduleActive: true,
    roleActive: [ROLES.S0202],
  },
  {
    title: 'Hỗ trợ thiết bị, phần mềm',
    desc: 'Theo dõi và báo hỏng thiết bị ở sảnh, hành lang và phòng làm việc.',
    icon: icoTCTTTS,
    path: '/ho-tro-thiet-bi-phan-mem',
    moduleActive: true,
    roleActive: [ROLES.G0101, ROLES.S0202],
  },
  {
    title: 'Hướng dẫn sử dụng phần mềm',
    desc: 'Tổng hợp file cài đặt, tài liệu hướng dẫn sử dụng các phần mềm.',
    icon: icoHTSDPM,
    path: '/huong-dan-su-dung-phan-mem',
    moduleActive: true,
    roleActive: [ROLES.G0101, ROLES.S0202],
  },
  {
    title: 'Tin tức',
    desc: 'Tin tức thông báo, tiêu điểm, sự kiện',
    icon: icoTinTuc,
    path: '/tin-tuc',
    moduleActive: true,
    roleActive: [ROLES.G0101, ROLES.S0202],
  },
  {
    title: 'Quản lý chi tiết công việc',
    desc: 'Hệ thống quản lý chi tiết công việc cán bộ phòng, ban.',
    icon: icoQLCTCV,
    path: '/quan-ly-cong-viec',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Thủ tục hành chính',
    desc: 'Tiếp nhận giải quyết các thủ tục hành chính cho giảng viên.',
    icon: icoTTHCSV,
    path: '/tthc-giang-vien',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Kiểm định chất lượng',
    desc: 'Kiểm định chất lượng, Khảo sát và đánh giá chất lượng, Cơ sở dữ liệu đơn vị, Quản lý minh chứng, Tiện ích, Quản trị hệ thống.',
    icon: icoTTHCSV,
    path: '/kiem-dinh-chat-luong',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Bộ điều khiển điện BMS',
    desc: 'Quản lý, điều khiển điện trực tuyến qua bộ điều khiển BMS.',
    icon: icoTTHCSV,
    path: '/quan-ly-dieu-khien-dien-bms',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'Công Tác Giảng Viên',
    desc: 'Công tác giảng viên',
    icon: icoTTHCSV,
    path: '/cong-tac-giang-vien',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
]

export const homeMotCua = [
  {
    title: 'Công tác giảng viên',
    desc: 'Công tác giảng viên.',
    icon: iconCTGVHome,
    path: '/cong-tac-giang-vien',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
  {
    title: 'TEST EVERYTHING',
    desc: 'Module test.',
    icon: iconCTGVHome,
    path: '/cong-tac-giang-vien',
    moduleActive: true,
    roleActive: [ROLES.G0101],
  },
]

// Data Loại Thi
export const dataLoaiThi = [
  {
    id: 2,
    title: 'Thi lần 1',
    value: 'Thi lần 1',
  },
  {
    id: 3,
    title: 'Thi lại',
    value: 'Thi lại',
  },
]

export const listCoSo = [
  {
    id: 1,
    title: 'Hà Nội',
    value: 'Hà Nội',
  },
  {
    id: 2,
    title: 'Nam Định',
    value: 'Nam Định',
  },
]

export const listDiaDiem = {
  haNoi: [
    {
      id: 1,
      title: '1 - 456 Minh Khai',
      value: '1 - 456 Minh Khai',
    },
    {
      id: 2,
      title: '2 - 454 Minh Khai',
      value: '2 - 454 Minh Khai',
    },
    {
      id: 3,
      title: '3 - 218 Lĩnh Nam',
      value: '3 - 218 Lĩnh Nam',
    },
  ],
  namDinh: [
    {
      id: 4,
      title: '4 - 353 Trần Hưng Đạo',
      value: '4 - 353 Trần Hưng Đạo',
    },
    {
      id: 5,
      title: '5 - Mỹ Xá',
      value: '5 - Mỹ Xá',
    },
  ],
}
