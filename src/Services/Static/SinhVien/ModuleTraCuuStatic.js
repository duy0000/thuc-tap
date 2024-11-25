// icons - images homeMain
import icoTTHCSV from '@/assets/Icons/icoTTHCSV.png'
import icoHocTap from '@/assets/Icons/icoHocTap.png'
import iconDiemDanh from '@/assets/Icons/iconDiemDanh.png'
import iconLich from '@/assets/Icons/iconLich.png'
import { ROLES } from '@/Routers/constants'

const homeTraCuu = [
  {
    id: 1,
    title: 'Điểm danh',
    desc: 'Theo dõi toàn bộ quá trình điểm danh đối với các môn học tương ứng tại các học kỳ',
    path: '/diem-danh',
    thumbnail: iconDiemDanh,
    roleActive: [ROLES.S0202],
    moduleActive: true,
  },

  {
    id: 2,
    title: 'Rèn luyện',
    desc: 'Theo dõi toàn bộ kết quả rèn luyện theo học kỳ',
    path: '/ren-luyen',
    moduleActive: true,
    thumbnail: icoTTHCSV,
    roleActive: [ROLES.S0202],
  },
  {
    id: 3,
    title: 'Thời khóa biểu',
    desc: 'Theo dõi toàn bộ lịch học và lịch thi theo ngày, tuần, tháng đối với từng môn học trong học kỳ',
    path: '/thoi-khoa-bieu',
    moduleActive: true,
    thumbnail: iconLich,
    roleActive: [ROLES.S0202],
  },
  {
    id: 4,
    title: 'Chương trình đào tạo',
    desc: 'Theo dõi chương trình đào tạo',
    path: '/chuong-trinh-dao-tao',
    moduleActive: true,
    thumbnail: iconLich,
    roleActive: ['SV'],
  },
  {
    id: 5,
    title: 'Dự kiến kết quả học tập',
    desc: 'Dự kiến kết quả học tập',
    path: '/du-kien-ket-qua-hoc-tap',
    moduleActive: true,
    thumbnail: icoHocTap,
  },
]

export default homeTraCuu
