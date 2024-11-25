import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md'
import { CiViewList } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { FaAngleDown, FaFileSignature } from 'react-icons/fa6'

import clsx from 'clsx'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { ROLE_VIEW_ACTION_TTHCGV } from '@/Routers/constants'
import { QTHT_UNETI_ONLINE } from '@/Configs/constants'
import { ENUM_STATE_TTHCGV } from '../constants'

const PATH_TTHCGV = '/admin/quan-tri-TTHCGV/ho-so-thu-tuc'

function SidebarTTHCGV() {
  const dataCBNV = DataCanBoGV()

  const [showExpanded, setShowExpanded] = useState(true)
  const [openMenuQuanTri, setOpenMenuQuanTri] = useState(true)
  const handleOpenMenuQuanTri = () => {
    setOpenMenuQuanTri(!openMenuQuanTri)
  }

  return (
    <div
      className={clsx(
        'bg-white p-2 rounded-xl shadow-xl',
        openMenuQuanTri ? 'lg:flex flex-col' : 'lg:flex justify-center',
      )}
    >
      <div className="m-0 lg:mb-4">
        {openMenuQuanTri ? (
          <IoClose
            size={32}
            className="hover:text-red-500 cursor-pointer float-right"
            onClick={handleOpenMenuQuanTri}
          />
        ) : (
          <GiHamburgerMenu
            size={26}
            className=" cursor-pointer hover:text-slate-400"
            onClick={handleOpenMenuQuanTri}
          />
        )}
      </div>
      <div className={clsx(openMenuQuanTri ? '' : 'hidden')}>
        <div
          className={clsx(
            'mb-4',
            dataCBNV.HT_GROUPUSER_ID.includes(
              ROLE_VIEW_ACTION_TTHCGV.QT_TTHCGV,
            ) || dataCBNV.HT_GROUPUSER_ID.includes(QTHT_UNETI_ONLINE)
              ? ''
              : 'hidden',
          )}
        >
          <h4 className="text-md font-semibold uppercase mb-4">
            Quy trình/Hồ sơ
          </h4>
          <ul>
            <li>
              <Link
                to={`${PATH_TTHCGV}/them`}
                className={clsx(
                  'flex flex-row items-center gap-2 mb-4 bg-slate-200 p-1 rounded-md hover:bg-slate-500 hover:text-white',
                )}
              >
                <MdAddCircle size={24} />
                <span>Thêm quy trình hồ sơ</span>
              </Link>
            </li>
            <li>
              <Link
                to={`${PATH_TTHCGV}/xem/tat-ca`}
                className="flex flex-row items-center  gap-2 mb-4 bg-slate-200 p-1 rounded-md hover:bg-slate-500 hover:text-white"
              >
                <CiViewList size={24} />
                <span>Danh sách quy trình hồ sơ</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={clsx(
            dataCBNV.HT_GROUPUSER_ID.some(
              (role) =>
                role === ROLE_VIEW_ACTION_TTHCGV.CBNV_TTHCGV ||
                role === ROLE_VIEW_ACTION_TTHCGV.BGH_TTHCGV ||
                role === ROLE_VIEW_ACTION_TTHCGV.TP_TTHCGV ||
                role === QTHT_UNETI_ONLINE,
            )
              ? ''
              : 'hidden',
          )}
        >
          <h4 className="text-md font-semibold uppercase mb-4">
            Danh sách hồ sơ
          </h4>
          <ul>
            <li>
              <Link
                to={'/admin/xu-ly-nghiep-vu'}
                className="flex flex-row items-center justify-between  gap-2 mb-4 bg-slate-200 p-2 rounded-md hover:bg-slate-500 hover:text-white"
              >
                <div className="flex flex-row items-center  gap-2">
                  <AiOutlineFileSearch size={24} />
                  <span>Theo dõi hồ sơ</span>
                </div>
                {/* <p className="px-1 py-[0.5] bg-red-500 rounded-md text-white">120</p> */}
              </Link>
            </li>
            <li>
              <p
                onClick={() => setShowExpanded(!showExpanded)}
                className="flex items-center justify-between p-2 rounded-md bg-slate-200 hover:bg-slate-500 hover:text-white cursor-pointer mb-1"
              >
                <span className="flex items-center">
                  <FaFileSignature size={24} />
                  <span>Hồ sơ cần xử lý</span>
                </span>
                <FaAngleDown
                  size={16}
                  className={clsx(!showExpanded && '-rotate-90')}
                />
              </p>
              <ul
                className={clsx(
                  'bg-slate-200 rounded-md',
                  !showExpanded && 'hidden',
                )}
              >
                <li>
                  <Link
                    to={'/admin/xu-ly-nghiep-vu/ho-so-xu-ly'}
                    state={{ status: ENUM_STATE_TTHCGV.CAN_XU_LY }}
                    className="flex flex-row items-center justify-between gap-2 bg-slate-200 p-2 rounded-t-md hover:bg-sky-800 hover:text-white"
                  >
                    Tất cả
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/admin/xu-ly-nghiep-vu/ho-so-xu-ly'}
                    state={{ status: ENUM_STATE_TTHCGV.SAP_DEN_HAN_1_NGAY }}
                    className="flex flex-row items-center justify-between gap-2 bg-slate-200 p-2 rounded-t-md hover:bg-sky-800 hover:text-white"
                  >
                    Hồ sơ sắp đến hạn (1 ngày)
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/admin/xu-ly-nghiep-vu/ho-so-xu-ly'}
                    state={{ status: ENUM_STATE_TTHCGV.QUA_HAN }}
                    className="flex flex-row items-center justify-between gap-2 bg-slate-200 p-2 rounded-b-md hover:bg-sky-800 hover:text-white"
                  >
                    <div className="flex flex-row items-center gap-2 justify-between">
                      <span className="flex items-center gap-1">
                        <span>Hồ sơ quá hạn</span>
                      </span>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarTTHCGV
