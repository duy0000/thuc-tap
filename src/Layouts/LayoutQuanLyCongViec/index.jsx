import { useCallback, useMemo, useRef, useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './LayoutQuanLyCongViec.scss'
import { transformCls } from '@/Services/Utils/reactUtils'
import SidebarCongViec from './SidebarCongViec'
import {
  enumActionAddCongViec,
  generateLoaiCongViec,
  generateTitleActionAddCongViec,
  listTenCongViec,
  quanlycongviecSidebar,
} from './constants'
import useQueryParams from '@/Services/Hooks/useQueryParams'
import { Select } from '@/Components/Base'
import { DebounceInput } from 'react-debounce-input'
import { TfiReload } from 'react-icons/tfi'
import { SlReload } from 'react-icons/sl'
import { FiFileText, FiPlus } from 'react-icons/fi'
import { Fade, Popper } from '@mui/material'
import FormCongViec from '@/Pages/Clients/GiangVien/QuanLyCongViec/FormCongViec'
import { isEmpty, isNull } from 'lodash-unified'
import clsx from 'clsx'
import DanhSachCongViecDinhKy from '@/Pages/Clients/GiangVien/QuanLyCongViec/components/DanhSachCongViecDinhKy'
import { useClickOutside } from '@/Services/Hooks'

const LayoutQuanLyCongViec = () => {
  const { pathname } = useLocation()

  const [openSidebar, setOpenSidebar] = useState(true)
  const [dataSearch, setDataSearch] = useState(null)

  const [selectOptionSearch, setSelectOptionSearch] = useState('')
  const [inputKeywordSearch, setInputKeywordSearch] = useState('')

  const [popperAdd, setPopperAdd] = useState({
    openPopper: false,
    typeAdd: null,
  })
  const [openDialogSyncJob, setOpenDialogSyncJob] = useState(false)
  const [anchorElPopperAdd, setAnchorElPopperAdd] = useState(null)

  const [openPopperReport, setOpenPopperReport] = useState(false)
  const [anchorElPopperReport, setAnchorElPopperReport] = useState(null)

  const searchParams = useQueryParams()
  const { tab } = searchParams
  const openPopperAddRef = useRef(null)
  const openPopperReportRef = useRef(null)

  const handleClosePopper = () => {
    setPopperAdd((previousOpen) => ({
      ...previousOpen,
      openPopper: false,
    }))
    setOpenPopperReport(false)
  }
  useClickOutside(openPopperAddRef, handleClosePopper)
  useClickOutside(openPopperReportRef, handleClosePopper)

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

  const handleCloseFormCV = useCallback(() => {
    setPopperAdd((previousOpen) => ({
      ...previousOpen,
      openPopper: false,
      typeAdd: null,
    }))
  }, [])

  const titleFormCV = useMemo(() => {
    return generateTitleActionAddCongViec(popperAdd.typeAdd)
  }, [popperAdd.typeAdd])

  const handleOpenPopperAdd = (event) => {
    setAnchorElPopperAdd(event.currentTarget)
    setPopperAdd((previousOpen) => ({
      ...previousOpen,
      openPopper: !previousOpen.openPopper,
    }))
  }
  const canBeOpenAdd = popperAdd.openPopper && Boolean(anchorElPopperAdd)
  const idPopperAdd = canBeOpenAdd ? 'transition-popper-add' : undefined

  const handleOpenPopperReport = (event) => {
    setAnchorElPopperReport(event.currentTarget)
    setOpenPopperReport((previousOpen) => !previousOpen)
  }
  const canBeOpenReport = openPopperReport && Boolean(anchorElPopperReport)
  const idPopperReport = canBeOpenReport
    ? 'transition-popper-report'
    : undefined

  const handleSearch = () => {
    setDataSearch({
      optionSearch: selectOptionSearch,
      keywordSearch: inputKeywordSearch,
    })
  }

  const handleCloseDialogSyncJob = () => {
    setOpenDialogSyncJob(false)
  }

  return (
    <>
      <div
        className={clsx(
          'grid w-full grid-cols-12 items-start px-0 md:gap-4',
          pathname.includes('/quan-ly-cong-viec/bao-cao/tra-cuu-lich-su')
            ? ''
            : '-mt-20',
        )}
      >
        <div className="hidden h-max lg:col-span-2 lg:block">
          <SidebarCongViec
            titleSidebar={'Quản lý công việc'}
            sidebarList={quanlycongviecSidebar}
            openSidebar={openSidebar}
            onOpenSidebar={handleOpenSidebar}
          />
        </div>

        <div
          className={transformCls([
            'h-max',
            openSidebar ? 'col-span-12 lg:col-span-10' : 'col-span-12',
          ])}
        >
          <div className="flex items-center gap-10">
            {!openSidebar && (
              <div className="p-4">
                <IoMenu
                  size={24}
                  onClick={handleOpenSidebar}
                  className="cursor-pointer hover:opacity-50"
                />
              </div>
            )}
          </div>
          <section className="w-full">
            <div className="w-full bg-white rounded-xl mb-4 p-2  shadow-md">
              <h3 className="font-semibold text-lg lg:text-xl uppercase mb-2">
                {generateLoaiCongViec(tab)}
              </h3>
              <hr />
              <div className="cv-header-action my-4 grid grid-cols-2 gap-2 items-center justify-between">
                <div className="header-action__left col-span-2 lg:col-span-1">
                  <div className="w-full flex flex-wrap items-center gap-2">
                    <Select
                      modelValue={selectOptionSearch}
                      labelKey="label"
                      valueKey="value"
                      label="Tìm kiếm nâng cao"
                      data={listTenCongViec}
                      onChange={(value) => {
                        setSelectOptionSearch(value)
                      }}
                    />
                    <DebounceInput
                      debounceTimeout={500}
                      placeholder="Nhập từ khóa tìm kiếm"
                      className="col-span-1 py-1 px-2 border border-slate-300 rounded-md focus:outline-cyan-500"
                      value={inputKeywordSearch}
                      onChange={(e) => {
                        const { value } = e.target
                        setInputKeywordSearch(value)
                      }}
                    />
                    <button
                      disabled={
                        isEmpty(selectOptionSearch) ||
                        isEmpty(inputKeywordSearch)
                      }
                      onClick={handleSearch}
                      type="button"
                      className={clsx(
                        'py-1 px-2 border border-cyan-400 rounded-md focus:outline-cyan-500 bg-cyan-600 text-white hover:opacity-60',
                        (isEmpty(selectOptionSearch) ||
                          isEmpty(inputKeywordSearch)) &&
                          'cursor-not-allowed opacity-75',
                      )}
                    >
                      Tìm kiếm
                    </button>
                    <button
                      onClick={() => {
                        if (
                          !isEmpty(selectOptionSearch) ||
                          !isEmpty(inputKeywordSearch)
                        ) {
                          setDataSearch(null)
                          setSelectOptionSearch('')
                          setInputKeywordSearch('')
                        }
                      }}
                      className="p-2 border border-slate-300 rounded-md bg-slate-100"
                    >
                      <SlReload />
                    </button>
                  </div>
                </div>
                {/* END: Action Left */}
                <div className="header-action__right col-span-2 lg:col-span-1 flex lg:justify-end flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDialogSyncJob(true)
                    }}
                    className="flex items-center gap-2 px-2 py-1 border border-green-400 rounded-lg focus:outline-cyan-500 bg-green-600 text-white hover:opacity-60"
                  >
                    <TfiReload />
                    <span className="ml-2">Đồng bộ lại công việc định kỳ</span>
                  </button>

                  {/* START: Poper thêm mới */}
                  <button
                    aria-describedby={idPopperAdd}
                    type="button"
                    onClick={handleOpenPopperAdd}
                    className="flex items-center gap-1 px-2 py-1 border border-sky-700 rounded-lg focus:outline-cyan-500 bg-sky-800 text-white hover:opacity-60"
                  >
                    <FiPlus />
                    <span className="ml-2">Thêm mới</span>
                  </button>
                  <Popper
                    id={idPopperAdd}
                    open={popperAdd.openPopper}
                    anchorEl={anchorElPopperAdd}
                    transition
                    ref={openPopperAddRef}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <div className="flex flex-col bg-white min-w-[180px] shadow-md rounded-xl my-1">
                          <button
                            onClick={() => {
                              setPopperAdd((previousOpen) => ({
                                ...previousOpen,
                                openPopper: false,
                                typeAdd: enumActionAddCongViec.TAO_VIEC_CUA_TOI,
                              }))
                            }}
                            className="text-left text-cyan-700 p-2 rounded-md hover:bg-sky-800 hover:text-white"
                          >
                            Tạo việc của tôi
                          </button>
                          <button
                            onClick={() => {
                              setPopperAdd((previousOpen) => ({
                                ...previousOpen,
                                openPopper: false,
                                typeAdd:
                                  enumActionAddCongViec.GIAO_VIEC_TRUC_TIEP,
                              }))
                            }}
                            className="text-left text-cyan-700 p-2 rounded-md hover:bg-sky-800 hover:text-white"
                          >
                            Giao việc trực tiếp
                          </button>
                          <button
                            // onClick={() => {
                            //   setPopperAdd((previousOpen) => ({
                            //     ...previousOpen,
                            //     openPopper: false,
                            //     typeAdd:
                            //       enumActionAddCongViec.GIAO_VIEC_UY_QUYEN,
                            //   }))
                            // }}
                            className="text-left text-cyan-700 p-2 rounded-md hover:bg-sky-800 hover:text-white"
                          >
                            Giao việc ủy quyền
                          </button>
                        </div>
                      </Fade>
                    )}
                  </Popper>
                  {/* END: Poper thêm mới */}

                  {/* START: Poper báo cáo */}
                  <button
                    aria-describedby={idPopperReport}
                    type="button"
                    onClick={handleOpenPopperReport}
                    className="flex items-center gap-1 px-2 py-1 border border-orange-600 rounded-lg focus:outline-cyan-500 bg-orange-600 text-white hover:opacity-60"
                  >
                    <FiFileText />
                    <span className="ml-2">Báo cáo</span>
                  </button>
                  <Popper
                    id={idPopperReport}
                    open={openPopperReport}
                    anchorEl={anchorElPopperReport}
                    transition
                    ref={openPopperReportRef}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <div className="flex flex-col bg-white min-w-[180px] shadow-md rounded-xl my-1">
                          <Link
                            to={'/quan-ly-cong-viec/bao-cao/tra-cuu-lich-su'}
                            onClick={() => setOpenPopperReport(false)}
                            className="text-cyan-700 p-2 rounded-md hover:bg-orange-600 hover:text-white"
                          >
                            Tra cứu lịch sử
                          </Link>
                        </div>
                      </Fade>
                    )}
                  </Popper>
                  {/* END: Poper báo cáo */}
                </div>
                {/* END: Action Right */}
              </div>
              {/* END: Header Action */}
            </div>
            {/* END: Header Action */}
            <Outlet context={[tab, dataSearch]} />
          </section>
        </div>
      </div>
      <FormCongViec
        title={titleFormCV}
        open={!isNull(popperAdd.typeAdd)}
        typeAdd={popperAdd.typeAdd}
        onClose={handleCloseFormCV}
      />
      {openDialogSyncJob && (
        <DanhSachCongViecDinhKy
          open={openDialogSyncJob}
          onClose={handleCloseDialogSyncJob}
        />
      )}
    </>
  )
}

LayoutQuanLyCongViec.propTypes = {}

export default LayoutQuanLyCongViec
