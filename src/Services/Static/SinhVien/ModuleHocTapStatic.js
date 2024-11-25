// icons - thumbnails Module Học Tập
import icoHTTBGD from '@/assets/Icons/icoHTTBGD.png'
import icoTTHCSV from '@/assets/Icons/icoTTHCSV.png'
import icoKetQuaHocTapOnLuyen from '@/assets/Icons/icoKetQuaHocTapOnLuyen.png'
import icoOnLuyenTracNghiem from '@/assets/Icons/icoOnLuyenTracNghiem.png'
import { ROLES } from '@/Routers/constants'

const homeHocTap = [
  {
    id: 1,
    title: 'Kết quả học tập',
    desc: 'Kết quả đánh giá chi tiết của từng môn học trong học kỳ.',
    path: '/ket-qua-hoc-tap',
    thumbnail: icoHTTBGD,
    roleActive: [ROLES.S0202],
    moduleActive: true,
  },

  {
    id: 2,
    title: 'Ôn luyện trắc nghiệm',
    desc: 'Ôn tập: Thi thử : Dành cho các học phần đã đăng ký.',
    path: '/on-luyen',
    moduleActive: true,
    thumbnail: icoTTHCSV,
    roleActive: [ROLES.S0202],
  },
]

export default homeHocTap
