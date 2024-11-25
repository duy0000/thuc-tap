// icons - images homeMain
import icoHTTBGD from '@/assets/Icons/icoHTTBGD.png'
import icoTTHCSV from '@/assets/Icons/icoTTHCSV.png'
import { ROLES } from '@/Routers/constants'

const homeOnLuyen = [
  {
    id: 1,
    title: 'Ôn tập',
    desc: 'Ôn tập lý thuyết',
    path: '/on-tap',
    thumbnail: icoHTTBGD,
    roleActive: [ROLES.S0202],
    moduleActive: true,
  },

  {
    id: 2,
    title: 'Thi thử',
    desc: 'Thi thử đánh giá',
    path: '/thi-thu',
    moduleActive: true,
    thumbnail: icoTTHCSV,
    roleActive: [ROLES.S0202],
  },
]

export default homeOnLuyen
