import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { homeHoTroThietBiPhanMem } from '@/Services/Static/Common'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChartThongKe from './ThongKeBaoHong/ChartThongKe'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import clsx from 'clsx'
import ThongKeBaoHong from './DanhSachThongKeBaoHong/ThongKeBaoHong'
import { getDanhSach_CanBoHoTro_PhanCongTruc } from '@/Apis/HoTroThietBi/apiTaiSan'
import { groupArrayByFields } from '@/Services/Utils/arrayUtils'
import imgUneti from '@/assets/Images/Logo_Uneti_04_01.png'

const HomeTaiSan = () => {
  const { listHotlines, listAppSupport } = homeHoTroThietBiPhanMem
  const [openSupporter, setOpenSupporter] = useState(false)
  const [openSupportHotline, setOpenSupportHotline] = useState(false)
  const [openSupportApp, setOpenSupportApp] = useState(false)
  const [listCanBoHoTro, setListCanBoHoTro] = useState([])
  // event handlers
  const handleToggleSupporter = () => {
    setOpenSupporter(!openSupporter)
  }

  const handleToggleHotline = () => {
    setOpenSupportHotline(!openSupportHotline)
  }

  const handleToggleApp = () => {
    setOpenSupportApp(!openSupportApp)
  }

  useEffect(() => {
    getDanhSach_CanBoHoTro_PhanCongTruc().then((res) => {
      const dsCanBoHoTro = groupArrayByFields(res, [
        'DT_QLTS_TS_HoTroThietBi_PhanCongTruc_LinhVuc',
        'DT_QLTS_TS_HoTroThietBi_PhanCongTruc_CoSo',
      ])
      setListCanBoHoTro(dsCanBoHoTro)
    })
  }, [])

  return (
    <>
      <div className="mb-10 grid grid-cols-12 gap-6 p-4 bg-slate-100 rounded shadow-sm">
        <h3 className="col-span-12 p-2 text-2xl text-uneti-primary-lighter uppercase font-bold text-center">
          Thông tin chung
        </h3>
        <div className="col-span-12 lg:col-span-6">
          <div className="uneti__audits flex h-full items-center rounded-xl bg-white shadow-lg">
            <ChartThongKe />
          </div>
        </div>
        {/* End: .uneti__audits */}
        <div className="col-span-12 lg:col-span-3 relative mb-8 lg:mb-0">
          <h3 className="w-full absolute top-0 z-[2] rounded-t-xl bg-sky-800 p-2 text-center font-bold uppercase text-white">
            Danh sách cán bộ hỗ trợ
            {openSupporter ? (
              <FaAngleUp
                onClick={handleToggleSupporter}
                className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
              />
            ) : (
              <FaAngleDown
                onClick={handleToggleSupporter}
                className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
              />
            )}
          </h3>
          <div className="uneti__cbht max-h-[550px] relative overflow-hidden hover:overflow-auto rounded-xl bg-white shadow-lg">
            <div
              className={clsx(
                'flex h-full flex-col gap-4 py-10',
                !openSupporter && 'hidden lg:block',
              )}
            >
              {listCanBoHoTro.map((lv, index) => {
                return (
                  <div key={index}>
                    <div className="flex rounded-t-md text-white bg-uneti-primary px-1">
                      <img src={imgUneti} alt="UNETI" className="h-11 w-10" />
                      <h3>
                        <span className="font-bold">Lĩnh vực:</span> {lv.key}
                      </h3>
                    </div>
                    {/* End: Lĩnh vực */}
                    <div className="p-2">
                      {lv.value.map((cs, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-y-2 mb-4"
                          >
                            <h3 className="px-2 py-1 bg-uneti-primary/20 text-uneti-primary rounded-lg font-bold">
                              {cs.key}
                            </h3>
                            <div className="">
                              {cs.value.map((ns, index) => {
                                return (
                                  <Link
                                    key={index}
                                    to={`tel: ${ns.DT_QLTS_TS_HoTroThietBi_PhanCongTruc_DienThoai}`}
                                    className="flex items-center gap-x-2 mb-2 rounded-md text-uneti-primary bg-sky-100 px-1 hover:bg-sky-200"
                                  >
                                    <img
                                      src={imgUneti}
                                      alt="UNETI"
                                      className="h-11 w-10"
                                    />
                                    <div className="text-sm">
                                      <p className="font-semibold">
                                        {
                                          ns.DT_QLTS_TS_HoTroThietBi_PhanCongTruc_HoTen
                                        }
                                      </p>
                                      <p>
                                        <span className="font-semibold">
                                          Địa điểm:{' '}
                                        </span>
                                        {
                                          ns.DT_QLTS_TS_HoTroThietBi_PhanCongTruc_DiaDiem
                                        }
                                      </p>
                                      <p>
                                        <span className="font-semibold">
                                          Số điện thoại:{' '}
                                        </span>
                                        {
                                          ns.DT_QLTS_TS_HoTroThietBi_PhanCongTruc_DienThoai
                                        }
                                      </p>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* End: .uneti__cbht */}
        <div className="col-span-12 lg:col-span-3">
          <div className="uneti__support h-full rounded-xl bg-white shadow-lg">
            <div className="uneti__support--hotline mb-6 rounded-t-xl">
              <h3 className="mb-2 rounded-t-xl bg-sky-800 p-2 text-center font-bold uppercase text-white">
                Hotline hỗ trợ
                {openSupportHotline ? (
                  <FaAngleUp
                    onClick={handleToggleHotline}
                    className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                  />
                ) : (
                  <FaAngleDown
                    onClick={handleToggleHotline}
                    className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                  />
                )}
              </h3>
              <ul
                className={clsx(
                  'p-2',
                  !openSupportHotline && 'hidden lg:block',
                )}
              >
                {listHotlines.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`tel:${item.phone}`}
                      className="mb-2 flex gap-2 rounded-md bg-blue-100 p-2 shadow-md hover:bg-blue-50"
                    >
                      <img src={item.logo} alt="UNETI" className="h-11 w-10" />
                      <p className="flex flex-col">
                        <span className="font-bold text-sky-700">
                          {item.name}
                        </span>
                        <span className="text-sm font-semibold ">
                          Nhân sự:{' '}
                          <span className="italic text-red-500">
                            {item.user}
                          </span>
                        </span>
                        <span className="text-sm font-semibold ">
                          Số điện thoại:{' '}
                          <span className="italic text-red-500">
                            {item.phone}
                          </span>
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* End: .uneti__support--hotline */}
            <div className="uneti__support--app rounded-t-xl">
              <h3 className="mb-2 rounded-t-xl bg-sky-800 p-2 text-center font-bold uppercase text-white">
                Phần mềm hỗ trợ
                {openSupportApp ? (
                  <FaAngleUp
                    onClick={handleToggleApp}
                    className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                  />
                ) : (
                  <FaAngleDown
                    onClick={handleToggleApp}
                    className="float-right mt-1 align-middle hover:cursor-pointer lg:hidden"
                  />
                )}
              </h3>
              <ul className={clsx('p-2', !openSupportApp && 'hidden lg:block')}>
                {listAppSupport.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      target="_blank"
                      className="mb-2 flex items-center gap-1 rounded-md bg-blue-100 p-2 shadow-md hover:bg-blue-50"
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="h-10 w-10"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* End: .uneti__support--app */}
          </div>
        </div>
        {/* End: .uneti__support */}
      </div>
      {/* Start: List features */}
      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2 bg-slate-100 rounded shadow-sm">
        <h3 className="col-span-2 p-2 text-2xl text-uneti-primary-lighter uppercase font-bold text-center">
          Chức năng
        </h3>
        {homeHoTroThietBiPhanMem.listFeatures.map((itemTaiSan, index) => {
          return (
            <div className="col-span-2 md:col-span-1 w-full" key={index}>
              <ModuleItem item={itemTaiSan} />
            </div>
          )
        })}
      </div>
      {/* End: List features */}
      {/* Start: DS Yêu Cầu báo hỏng thống kê */}
      <div className="p-2 bg-slate-100 rounded shadow-sm">
        <ThongKeBaoHong />
      </div>
      {/* End: DS Yêu Cầu báo hỏng thống kê */}
    </>
  )
}

export default HomeTaiSan
