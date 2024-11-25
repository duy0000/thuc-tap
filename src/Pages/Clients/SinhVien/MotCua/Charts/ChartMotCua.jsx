import { useNamespace } from '@/Services/Hooks'
import React, { useRef, useMemo } from 'react'
import Chart from 'react-apexcharts'

import './ChartMotCua.scss'
import { getDanhSachThongKeYeuCau } from '@/Apis/MotCua/apiThongKe'
import { getRGBColor } from '@/Services/Utils/colorUtils'
import { TTHCSV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCSV.querykey'
import { useQuery } from '@tanstack/react-query'

function ChartMotCua() {
  const bem = useNamespace('uneti_chart')

  const apexchartRef = useRef()

  const { data: dataThongKe } = useQuery({
    queryKey: [TTHCSV_QUERY_KEY.TTHCSV_ThongKe],
    queryFn: async () => {
      return await getDanhSachThongKeYeuCau()
    },
  })

  const _dataListThongKe = useMemo(() => {
    return dataThongKe?.data?.body ?? []
  }, [dataThongKe])

  return (
    <React.Fragment>
      <div className="my-10 rounded-lg px-4">
        <div
          className={[
            bem.e('view'),
            ' bg-white flex flex-col lg:flex-row justify-center items-center',
          ]}
        >
          <Chart
            type="donut"
            ref={apexchartRef}
            width={400}
            height={400}
            series={[
              _dataListThongKe[0]?.TK_PT_TiepNhan_DV_KhaoThi
                ? parseInt(_dataListThongKe[0]?.TK_PT_TiepNhan_DV_KhaoThi)
                : 1271,
              _dataListThongKe[0]?.TK_PT_TiepNhan_DV_DaoTao
                ? parseInt(_dataListThongKe[0]?.TK_PT_TiepNhan_DV_DaoTao)
                : 1271,
              _dataListThongKe[0]?.TK_PT_TiepNhan_DV_CTSV
                ? parseInt(_dataListThongKe[0]?.TK_PT_TiepNhan_DV_CTSV)
                : 1271,
              _dataListThongKe[0]?.TK_PT_TiepNhan_DV_HC
                ? parseInt(_dataListThongKe[0]?.TK_PT_TiepNhan_DV_HC)
                : 1271,
            ]}
            options={{
              colors: ['#1a5cff', '#46c93a', '#ffba00', '#ff4757'],
              chart: {
                width: 400,
                height: 400,
              },
              responsive: [
                {
                  breakpoint: 660,
                  options: {
                    chart: {
                      width: 240,
                      height: 240,
                    },
                  },
                },
              ],
              labels: ['Khảo thí', 'Đào tạo', 'CT&CTSV', 'Hành chính'],
              fill: {
                colors: ['#1a5cff', '#46c93a', '#ffba00', '#ff4757'],
                opacity: [0.9, 0.9, 0.9, 0.9],
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        label: 'TỔNG',
                        fontSize: 24,
                        fontWeight: 600,
                        color: '#336699',
                      },
                    },
                  },
                },
              },
              legend: {
                show: false,
              },
            }}
          />
          <div
            className={[
              bem.e('details'),
              ' flex flex-row lg:flex-col flex-wrap gap-5 justify-center',
            ]}
          >
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#1a5cff'),
                })}
              />
              <span>Khảo thí</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#46c93a'),
                })}
              />
              <span>Đào tạo</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#ffba00'),
                })}
              />
              <span>CT&CTSV</span>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#ff4757'),
                })}
              />
              <span>Hành chính</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChartMotCua
