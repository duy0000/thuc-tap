import Footer from '../Footers/Footer'
import RouterCore from '@/Routers'
import { useLocation } from 'react-router-dom'
import HeaderSV from '../Headers/HeaderSV/HeaderSV'
import HeaderCBGV from '../Headers/HeaderCBGV/HeaderCBGV'
import AutoScrollTop from '@/Components/BackToTop/AutoScrollTop'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'

import '../Headers/Header.scss'
import clsx from 'clsx'
import { ROLES } from '@/Routers/constants'
import { decryptAESWithKey } from '@/Services/Utils'

function MainCommon() {
  const location = useLocation()
  const { pathname } = location

  const dataUser = DataSinhVien() ? DataSinhVien() : DataCanBoGV()
  const dataRole = dataUser?.Role

  return (
    <>
      {pathname === '/' || pathname === '/dang-nhap' ? null : decryptAESWithKey(
          dataRole,
        ) == ROLES.S0202 ? (
        <HeaderSV />
      ) : (
        <HeaderCBGV />
      )}

      <main
        className={clsx(
          'mx-auto mb-12 min-h-[500px] px-5',
          [
            'tra-cuu',
            'ho-tro-thiet-bi-phan-mem',
            'quan-ly-dieu-khien-dien-bms',
            'admin',
            'tin-tuc',
          ].some((e) => pathname.includes(e))
            ? 'mt-32'
            : 'mt-44 xl:mt-52',
          [
            'kiem-dinh-chat-luong',
            'quan-tri-he-thong',
            'dam-bao-chat-luong',
            'khao-sat-va-dgcl',
            'csdl-don-vi',
            'quan-ly-minh-chung',
            'quan-ly-cong-viec',
            'quan-ly-dieu-khien-dien-bms',
            'cong-tac-giang-vien/tra-cuu/',
            'admin',
          ].some((e) => pathname.includes(e))
            ? ' w-full'
            : ' max-w-7xl',
        )}
      >
        <RouterCore />
      </main>
      {pathname === '/' || pathname === '/dang-nhap' ? null : <Footer />}
      <AutoScrollTop />
    </>
  )
}

export default MainCommon
