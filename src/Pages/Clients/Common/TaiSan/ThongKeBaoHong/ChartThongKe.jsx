import { useNamespace } from '@/Services/Hooks'
import React, { useMemo, useRef } from 'react'
import Chart from 'react-apexcharts'

import './ChartThongKe.scss'
import { getDanhSachThongKeYeuCau } from '@/Apis/MotCua/apiThongKe'
import { getRGBColor } from '@/Services/Utils/colorUtils'
import { useQuery } from '@tanstack/react-query'
import { TTHCSV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCSV.querykey'

function ChartThongKe() {
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
      <div className="rounded-lg w-full px-2">
        <div
          className={[
            bem.e('view'),
            ' flex flex-col items-center justify-center bg-white',
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
              _dataListThongKe[0]?.TK_PT_TiepNhan_DV_HC
                ? parseInt(_dataListThongKe[0]?.TK_PT_TiepNhan_DV_HC)
                : 1271,
            ]}
            options={{
              colors: ['#1a5cff', '#46c93a', '#ffba00', '#ff4757', '#78716c'],
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
              labels: [
                'Hệ thống Camera',
                'Sửa chữa, bảo trì thiết bị CNTT',
                'Hệ thống phòng họp (Kỹ thuật họp trực tuyến, trình chiếu)',
                'Hệ thống mạng (LAN, WIFI)',
                'Khác',
              ],
              fill: {
                colors: ['#1a5cff', '#46c93a', '#ffba00', '#ff4757', '#78716c'],
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
              ' flex flex-col md:flex-row md:flex-wrap justify-center gap-2',
            ]}
          >
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#1a5cff'),
                })}
              />
              <p>Hệ thống Camera</p>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#46c93a'),
                })}
              />
              <p>Sửa chữa, bảo trì thiết bị CNTT</p>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#ffba00'),
                })}
              />
              <p>Hệ thống phòng họp (Kỹ thuật họp trực tuyến, trình chiếu)</p>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#ff4757'),
                })}
              />
              <p>Hệ thống mạng (LAN, WIFI)</p>
            </div>
            <div className={bem.em('details', 'item')}>
              <div
                className={bem.em('details', 'item-color')}
                style={bem.cssVar({
                  color: getRGBColor('#78716c'),
                })}
              />
              <p>Sự cố khác</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChartThongKe
