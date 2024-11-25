import ChartThongKeTTHCGV from '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/components/ChartThongKeTTHC/ChartThongKeTTHC.jsx'
import DanhSachGuiYeuCau from './DanhSachGuiYeuCau/DanhSachGuiYeuCau.jsx'
import { useQuery } from '@tanstack/react-query'
import { getAllCanBoXuLy } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien.js'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey.js'
import { useMemo, useState } from 'react'
import { groupArrayByFields } from '@/Services/Utils/arrayUtils.js'
import imgUneti from '@/assets/Images/Logo_Uneti_04_01.png'
import TTHCGVThongKeDonViXuLy from '../../ThongKeDonViXuLy/index.jsx'
import TTHCGVThongKeDonViDeNghi from '../../ThongKeDonViDeNghi/index.jsx'
import { DebounceInput } from 'react-debounce-input'
import { Select } from '@/Components/Base/index.js'
import { DATA_AUDIT_KEY } from '../../constants.js'

export default function DashboardTTHCGV() {
  const [dataFormFilter, setDataFormFilter] = useState({
    dieuKienLoc: '',
    ngayBatDau: '',
    ngayKetThuc: '',
  })

  const { data: listCanBoXuLy } = useQuery({
    queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_PhanQuyen_Load_CanBoXuLy],
    queryFn: async () => {
      return await getAllCanBoXuLy()
    },
  })

  const groupCBXL = useMemo(() => {
    return groupArrayByFields(listCanBoXuLy?.data?.body, [
      'MC_TTHC_GV_PhanQuyen_PhongBan',
    ])
  }, [listCanBoXuLy?.data])

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 mb-4 bg-white p-2 shadow rounded-md">
        <div className="col-span-2">
          <div className="w-full h-full flex items-center justify-center">
            <ChartThongKeTTHCGV />
          </div>
        </div>
        <div className="col-span-1 hidden">
          {/* START: Danh sách bán bộ xử lý */}
          <div className="w-full relative hidden">
            <h3 className="w-full absolute top-0 z-[2] rounded-t-xl bg-sky-800 p-2 text-center font-bold uppercase text-white">
              Danh sách bán bộ xử lý
            </h3>
            <div className="uneti__cbht max-h-[550px] relative overflow-hidden hover:overflow-auto rounded-xl bg-white shadow">
              <div className="flex h-full flex-col gap-2 pt-10">
                {groupCBXL &&
                  groupCBXL.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center rounded-t-md text-white bg-uneti-primary px-1">
                        <img src={imgUneti} alt="UNETI" className="h-11 w-10" />
                        <h3 className={''}>{item.key}</h3>
                      </div>
                      <div className={'p-1 flex flex-col gap-y-2'}>
                        {item.value.map((cb, index) => (
                          <p
                            key={index}
                            className="rounded-md text-uneti-primary bg-sky-200 p-2"
                          >
                            <span>{cb.MC_TTHC_GV_PhanQuyen_MaNhanSu}</span>
                            {' - '}
                            <span>{cb.MC_TTHC_GV_PhanQuyen_HoTen}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* END: Danh sách bán bộ xử lý */}
        </div>
      </div>
      {/*  END: Biểu đồ + Danh sách cán bộ */}

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center md:flex-wrap lg:justify-between gap-6 bg-white p-2 rounded-xl shadow">
          {/* <p className="text-xl font-semibold mb-4">Điều kiện lọc:</p> */}
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-700">Điều kiện lọc:</p>
            <Select
              modelValue={dataFormFilter.dieuKienLoc}
              labelKey="label"
              valueKey="value"
              label="Chọn điều kiện"
              data={DATA_AUDIT_KEY}
              // onChange={(value) => handleChangeDieuKienLoc(value)}
              onChange={(value) => {
                setDataFormFilter({
                  ...dataFormFilter,
                  dieuKienLoc: value,
                })
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-700">Ngày bắt đầu:</p>
            <DebounceInput
              className="p-2 border rounded-xl focus:outline-1 focus:outline-cyan-500"
              name="ngayBatDau"
              type="date"
              // onChange={handleChangeDataFormFilter}
              onChange={(e) => {
                const { value } = e.target
                setDataFormFilter({
                  ...dataFormFilter,
                  ngayBatDau: value,
                })
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-700">Ngày kết thúc:</p>
            <DebounceInput
              className="p-2 border rounded-xl focus:outline-1 focus:outline-cyan-500"
              name="ngayKetThuc"
              type="date"
              // onChange={handleChangeDataFormFilter}
              onChange={(e) => {
                const { value } = e.target
                setDataFormFilter({
                  ...dataFormFilter,
                  ngayKetThuc: value,
                })
              }}
            />
          </div>
        </div>
        <TTHCGVThongKeDonViDeNghi dataFilterCommon={dataFormFilter} />
        <TTHCGVThongKeDonViXuLy dataFilterCommon={dataFormFilter} />
        <DanhSachGuiYeuCau dataFilterCommon={dataFormFilter} />
      </div>
    </div>
  )
}
