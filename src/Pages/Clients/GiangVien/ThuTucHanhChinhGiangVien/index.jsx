import { useEffect, useState } from 'react'
import DashboardTTHCGV from '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/Home/Dashboard/Dashboard.jsx'
import HomeMenuLeft from '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/components/HomeMenuLeft.jsx'
import {
  filterConditional,
  homeSwitcher,
} from '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/constants.js'
import DanhSachThuTuc from './Home/DanhSachThuTuc/DanhSachThuTuc'
import { useSearchParams } from 'react-router-dom'
import useQueryParams from '@/Services/Hooks/useQueryParams'

function HomeThuTucHanhChinhGiangVien() {
  // 1. Hooks
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = useQueryParams()

  // 2. Variables
  const { department, rule, keywords, page } = queryParams

  // 3. State
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
  })
  const [homeSwitch, setHomeSwitch] = useState(homeSwitcher.dashboard)
  const [dataFilter, setDataFilter] = useState({
    phongBan: '',
    dieuKienLoc: filterConditional[0].value,
    keywords: searchParams.get('keywords') || '',
  })

  const handleRemoveKeySearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    Object.keys(queryParams).forEach((value) => {
      newSearchParams.delete(value)
    })
    setSearchParams(newSearchParams)
  }

  useEffect(() => {
    if (page) {
      setHomeSwitch(page)
    }
  }, [page])

  return (
    <section
      id="HomeThuTucHanhChinhGiangVien"
      className="min-h-full relative z-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 h-full">
        <div className="col-span-1">
          <HomeMenuLeft
            homeSwitch={homeSwitch}
            onChangeHomeView={setHomeSwitch}
            dataFilter={dataFilter}
            onChangeFilter={setDataFilter}
            dataSearchParams={searchParams}
            onSearchParams={setSearchParams}
            dataPagination={pagination}
            onChangePagination={setPagination}
          />
        </div>
        {/* END: col: menu-left*/}
        <div className="col-span-4">
          <div className="main min-h-full">
            {homeSwitch === homeSwitcher.home && (
              <DanhSachThuTuc
                dataSearchParams={searchParams}
                department={department}
                rule={rule}
                keywordsSearch={keywords}
                dataFilter={dataFilter}
                onChangeFilter={setDataFilter}
                onRemoveKeySearchParams={handleRemoveKeySearchParams}
                onSearchParams={setSearchParams}
                pagination={pagination}
              />
            )}
            {homeSwitch === homeSwitcher.dashboard && (
              <DashboardTTHCGV phongBan={dataFilter.phongBan} />
            )}
          </div>
        </div>
        {/* END: col: main*/}
      </div>
    </section>
  )
}

export default HomeThuTucHanhChinhGiangVien
