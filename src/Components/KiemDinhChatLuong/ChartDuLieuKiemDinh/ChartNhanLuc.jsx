import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const colors = [
  '#2d99ae',
  '#46c93a',
  '#6366f1',
  '#f87171',
  '#ffba00',
  '#ff4757',
  '#b85b56',
  '#db2777',
]

const ChartNhanLuc = (props) => {
  const totalData = props.data.reduce((acc, curr) => acc + curr.SoLuong, 0)
  return (
    <>
      <div className="grid grid-cols-3 items-center justify-center gap-10 lg:justify-between">
        <div className="col-span-3 flex items-center justify-center lg:col-span-2">
          <Chart
            type="pie"
            width={300}
            height={300}
            series={props.data.map((e) => e.SoLuong)}
            options={{
              colors,
              chart: {
                width: 300,
                height: 300,
              },
              responsive: [
                {
                  breakpoint: 660,
                  options: {
                    chart: {
                      width: 300,
                      height: 300,
                    },
                  },
                },
              ],
              labels: props.data.map((e) => e.Ten),
              fill: {
                colors,
                opacity: Array(props.data.length).fill(0.9),
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: false,
                      total: {
                        show: true,
                        label: 'Tổng số giảng viên',
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
        </div>
        {/* START: Ghi chú nhân lực */}
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-col">
            {props.data.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`h-2 w-2`}
                  style={{
                    backgroundColor: colors[i],
                  }}
                ></div>
                <p className="text-xs font-medium">
                  {item.Ten}: {item.SoLuong} (
                  {Number((item.SoLuong / totalData) * 100 || 0).toFixed(1)}%)
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* END: Ghi chú nhân lực */}
      </div>
    </>
  )
}

ChartNhanLuc.propTypes = {}

export default ChartNhanLuc
