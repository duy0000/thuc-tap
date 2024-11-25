import { useNamespace } from '@/Services/Hooks/index.js'
import { useMemo, useRef, useState } from 'react'
import Chart from 'react-apexcharts'

import './ChartThongKeTTHCGV.scss'
import { getRGBColor } from '@/Services/Utils/colorUtils.js'
// import DropdownMultiLevel from '@/Components/Dropdowns/DropdownMultiLevel'
import { useTTHCGVThongKePhongBanStore } from '@/Services/QueryStores/QueryFunc/GiangVien/ThuTucHanhChinhGiangVien/TTHCGVThongKePhongBanStore'
import {
  listLoaiTimKiemThongKeTTHCGV,
  listThangThongKeTTHCGV,
  listTypeTTHCGVThongKe,
} from '../../constants'
import { Select } from '@/Components/Base/Select/Select'

const listColors = [
  '#856F57',
  '#ffba00',
  '#F8A857',
  '#E7586B',
  '#D06580',
  '#C5EFBD',
  '#99C5C2',
  '#A5D2EE',
  '#5061B0',
  '#D7D0EB',
  '#B87A60',
  '#1F2F56',
  '#A776DB',
  '#145CD7',
  '#6B9DEC',
  '#18A0DA',
  '#1985BD',
  '#9B5650',
  '#E77F62',
  '#DD5E4D',
  '#CE335C',
  '#F58811',
]
function ChartThongKeTTHCGV() {
  const bem = useNamespace('uneti_chart')

  const apexchartRef = useRef()
  const [dataType, setDataType] = useState(listTypeTTHCGVThongKe[0].value)
  const [dataFilter, setDataFilter] = useState({
    MC_TTHC_GV_LoaiTimKiem: '0',
    MC_TTHC_GV_NamTimKiem: new Date().getFullYear(),
    MC_TTHC_GV_ThangTimKiem: '',
  })

  const { dataThongKePhongBan } = useTTHCGVThongKePhongBanStore({
    ...dataFilter,
  })

  // eslint-disable-next-line no-unused-vars
  const dataSeriesPhongBan = useMemo(() => {
    return dataThongKePhongBan?.data?.body?.map((item) => item.SoLuong)
  }, [dataThongKePhongBan?.data?.body])

  const listLabelPhongBan = useMemo(() => {
    return dataThongKePhongBan?.data?.body?.map(
      (item) => item.MC_TTHC_GV_NoiTiepNhan,
    )
  }, [dataThongKePhongBan?.data?.body])

  // eslint-disable-next-line no-unused-vars
  const handleChangeFilter = (e) => {
    const { name, value } = e.target
    setDataFilter({
      ...dataFilter,
      [name]: value,
    })
  }

  return (
    <div className={'flex flex-col items-center'}>
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="col-span-2 md:col-span-1">
          <Select
            modelValue={dataType}
            data={listTypeTTHCGVThongKe}
            valueKey="value"
            labelKey="key"
            label="Chọn loại thống kê"
            onChange={(value) => {
              setDataType(value)
              if (value === '0') {
                setDataFilter({
                  ...dataFilter,
                  MC_TTHC_GV_LoaiTimKiem: '0',
                  MC_TTHC_GV_NamTimKiem: '',
                  MC_TTHC_GV_ThangTimKiem: '',
                })
              }
            }}
            valueOnClear={listTypeTTHCGVThongKe[0].value}
            triggerClass="w-full"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Select
            modelValue={
              dataType === listTypeTTHCGVThongKe[1].value
                ? dataFilter.MC_TTHC_GV_LoaiTimKiem
                : dataFilter.MC_TTHC_GV_ThangTimKiem
            }
            data={
              dataType === listTypeTTHCGVThongKe[2].value
                ? listThangThongKeTTHCGV
                : listLoaiTimKiemThongKeTTHCGV
            }
            valueKey="value"
            labelKey="key"
            label="Thống kê"
            onChange={(value) => {
              setDataFilter({
                ...dataFilter,
                MC_TTHC_GV_LoaiTimKiem:
                  dataType === listTypeTTHCGVThongKe[1].value ? value : '',
                MC_TTHC_GV_NamTimKiem: new Date().getFullYear(),
                MC_TTHC_GV_ThangTimKiem:
                  dataType === listTypeTTHCGVThongKe[2].value
                    ? value
                    : dataFilter.MC_TTHC_GV_ThangTimKiem,
              })
            }}
            valueOnClear={listLoaiTimKiemThongKeTTHCGV[0].value}
            disabled={dataType === listTypeTTHCGVThongKe[0].value}
            triggerClass="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 my-4">
        {dataSeriesPhongBan?.length === 0 ||
          (dataSeriesPhongBan?.every((item) => item === 0) && (
            <div className="flex items-center">
              <p className="text-center font-bold text-red-600">
                Không có dữ liệu thống kê!
              </p>
            </div>
          ))}
        {dataSeriesPhongBan?.length > 0 &&
          dataSeriesPhongBan?.some((item) => item !== 0) && (
            <Chart
              type="donut"
              ref={apexchartRef}
              width={340}
              height={340}
              series={dataSeriesPhongBan ?? []}
              // series={[1930, 8912, 1298, 1234, 6271]}
              options={{
                colors: listColors,
                responsive: [
                  {
                    breakpoint: 660,
                    options: {
                      chart: {
                        type: 'pie',
                        width: 240,
                        height: 240,
                      },
                    },
                  },
                ],
                labels: listLabelPhongBan ?? [],
                fill: {
                  colors: listColors,
                  opacity: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
                },
                plotOptions: {
                  pie: {},
                },
                dataLabels: {
                  enabled: false,
                },
                legend: {
                  show: false,
                },
              }}
            />
          )}
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-2'}>
          {listLabelPhongBan &&
            listLabelPhongBan.map((item, index) => (
              <div className={bem.em('details', 'item')} key={index}>
                <div
                  className={bem.em('details', 'item-color')}
                  style={bem.cssVar({
                    color: getRGBColor(listColors[index]),
                  })}
                />
                <p>{item}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ChartThongKeTTHCGV
