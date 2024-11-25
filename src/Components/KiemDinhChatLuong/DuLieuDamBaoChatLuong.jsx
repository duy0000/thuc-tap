import { useState } from 'react'

import ChartNhanLuc from './ChartDuLieuKiemDinh/ChartNhanLuc'
import ChartNguoiHoc from './ChartDuLieuKiemDinh/ChartNguoiHoc'
import ChartNguonThuNhap from './ChartDuLieuKiemDinh/ChartNguonThuNhap'
import ChartCongBoKhoaHoc from './ChartDuLieuKiemDinh/ChartCongBoKhoaHoc'
import { transformCls } from '@/Services/Utils/reactUtils'
import AdvanceFilterNguoiHoc from './DuLieudamBaoChatLuong/AdvanceFilterNguoiHoc'
import AdvanceFilterNhanLuc, {
  loaiThongKeList,
} from './DuLieudamBaoChatLuong/AdvanceFilterNhanLuc'
import { useNamespace } from '@/Services/Hooks'
import { LOAI_THONG_KE } from '@/Apis/KDCL/CSDLDonVi/apiCanBo'
import { keys } from 'lodash-unified'

export default function DuLieuDamBaoChatLuong() {
  const ns = useNamespace('dbcl')

  const [filters, setFilters] = useState({
    nhanLuc: {
      loaiThongKe: loaiThongKeList.find(
        ({ ID }) => ID === LOAI_THONG_KE.HocHamHocVi,
      )?.ten,
      label: 'Loại thống kê',
      value: LOAI_THONG_KE.HocHamHocVi,
    },
    nguoiHoc: {
      CoSo: {
        label: '',
        value: '',
      },
      KhoaHoc: {
        label: '',
        value: '',
      },
      Khoa: {
        label: '',
        value: '',
      },
      Nganh: {
        label: '',
        value: '',
      },
      HeDaoTao: {
        label: '',
        value: '',
      },
      LoaiHinhDT: {
        label: '',
        value: '',
      },
      Lop: {
        label: '',
        value: '',
      },
    },
  })

  const [dataThongKeNhanLuc, setDataThongKeNhanLuc] = useState([])
  const [dataThongKeNguoiHoc, setDataThongKeNguoiHoc] = useState([])

  return (
    <>
      <div
        className={[
          ns.b('header'),
          'flex items-center rounded-md mb-3 justify-between bg-uneti-primary p-2 text-white',
        ]}
      >
        <p className="font-bold uppercase">Dữ liệu đảm bảo chất lượng</p>
      </div>
      <div className={transformCls([ns.b('list')])}>
        <div className="grid grid-cols-2 gap-4">
          {/* START: item dữ liệu đảm bảo chất lượng */}
          <div className="col-span-2 lg:col-span-1">
            <div
              className={
                'h-full bg-stone-200/60 border-1 border-solid border-blue-400 p-3 rounded-lg'
              }
            >
              <div className="z-[2] relative">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-semibold uppercase text-uneti-primary">
                      Nhân lực
                    </p>
                  </div>

                  <AdvanceFilterNhanLuc
                    filters={filters.nhanLuc.value}
                    setFilters={(
                      value,
                      loaiThongKe = LOAI_THONG_KE.HocHamHocVi,
                    ) => {
                      setFilters({
                        ...filters,
                        nhanLuc: {
                          label: 'Loại thống kê',
                          loaiThongKe,
                          value,
                        },
                      })
                    }}
                    setThongKe={setDataThongKeNhanLuc}
                  />
                </div>
                <div className="pr-2 rounded-lg w-full flex gap-1 flex-wrap my-1">
                  {filters.nhanLuc.loaiThongKe && (
                    <div className="whitespace-nowrap text-uneti-primary h-max border px-2 rounded-md bg-white select-none">
                      {filters.nhanLuc.label}: {filters.nhanLuc.loaiThongKe}
                    </div>
                  )}
                </div>
              </div>
              {/* START: Chart Nhân lực */}
              <div
                className={transformCls([
                  ns.em('chart', 'nhan-luc'),
                  'h-full relative z-[1]',
                ])}
              >
                <ChartNhanLuc data={dataThongKeNhanLuc} />
              </div>
              {/* End: Chart Nhân lực */}
            </div>
          </div>
          {/* END: item dữ liệu đảm bảo chất lượng */}
          {/* START: item dữ liệu đảm bảo chất lượng */}
          <div className="col-span-2 lg:col-span-1">
            <div
              className={
                'h-full bg-stone-200/60 border-1 border-solid border-blue-400 p-3 rounded-lg'
              }
            >
              <div className="z-[2] relative">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-semibold uppercase text-uneti-primary">
                      Người học
                    </p>
                  </div>

                  <AdvanceFilterNguoiHoc
                    setThongKe={setDataThongKeNguoiHoc}
                    filters={filters.nguoiHoc}
                    setFilters={({ key, label, value }) => {
                      setFilters((prev) => ({
                        ...prev,
                        nguoiHoc: {
                          ...prev.nguoiHoc,
                          [key]: {
                            label,
                            value,
                          },
                        },
                      }))
                    }}
                  />
                </div>

                <div className="pr-2 rounded-lg w-full flex gap-1 flex-wrap my-1">
                  {keys(filters.nguoiHoc).map(
                    (key, index) =>
                      filters.nguoiHoc[key].value && (
                        <div
                          key={index}
                          className="whitespace-nowrap text-uneti-primary h-max border px-2 rounded-md bg-white select-none"
                        >
                          {filters.nguoiHoc[key].label}:{' '}
                          {filters.nguoiHoc[key].value}
                        </div>
                      ),
                  )}
                </div>
              </div>
              {/* START: Chart người học */}
              <div
                className={transformCls([
                  ns.em('chart', 'nguoi-hoc'),
                  ' h-full',
                ])}
              >
                <ChartNguoiHoc data={dataThongKeNguoiHoc} />
              </div>
              {/* END: Chart người học */}
            </div>
          </div>
          {/* END: item dữ liệu đảm bảo chất lượng */}
          {/* START: item dữ liệu đảm bảo chất lượng */}
          <div className="col-span-2 h-full lg:col-span-1">
            <div
              className={
                'h-full bg-stone-200/60 border-1 border-solid border-blue-400 p-3 rounded-lg'
              }
            >
              <p className="font-semibold uppercase text-uneti-primary">
                Nguồn thu nhập
              </p>
              {/* START: Chart nguồn thu nhập */}
              <div
                className={transformCls([
                  ns.em('chart', 'nguon-thu-nhap'),
                  ' h-full',
                ])}
              >
                <ChartNguonThuNhap />
              </div>
              {/* END: Chart nguồn thu nhập */}
            </div>
          </div>
          {/* END: item dữ liệu đảm bảo chất lượng */}
          {/* START: item dữ liệu đảm bảo chất lượng */}
          <div className="col-span-2 lg:col-span-1 relative z-[1]">
            <div
              className={
                'bg-stone-200/60 border-1 border-solid border-blue-400 p-3 rounded-lg'
              }
            >
              <p className="font-semibold uppercase text-uneti-primary">
                Công bố khoa học
              </p>
              {/* START: Chart công bố khoa học */}
              <div
                className={transformCls([
                  ns.em('chart', 'cong-bo-khoa-hoc'),
                  ' h-full',
                ])}
              >
                <ChartCongBoKhoaHoc />
              </div>
              {/* END: Chart công bố khoa học */}
            </div>
          </div>
          {/* END: item dữ liệu đảm bảo chất lượng */}
        </div>
      </div>
    </>
  )
}
