import { useMemo } from 'react'
import PhanTichNoiHam from './PhanTichTieuChi/PhanTichNoiHam.jsx'
import ThuThapMinhChung from './ThuThapMinhChung/ThuThapMinhChung.jsx'
import Actions from './Actions'

import { useTieuChiStore } from '@/Services/Store'

export default function Home() {
  const { listTieuChi } = useTieuChiStore()

  const listTieuChiMappedByTieuChuanID = useMemo(() => {
    return listTieuChi.reduce((acc, curr) => {
      if (!acc[curr.KT_KDCL_TieuChi_IDTieuChuan]) {
        acc[curr.KT_KDCL_TieuChi_IDTieuChuan] = []
      }
      acc[curr.KT_KDCL_TieuChi_IDTieuChuan].push(curr)

      return acc
    }, {})
  }, [listTieuChi])

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <div className="flex flex-col gap-3 flex-1">
        <PhanTichNoiHam listTieuChi={listTieuChiMappedByTieuChuanID} />

        <ThuThapMinhChung listTieuChi={listTieuChiMappedByTieuChuanID} />

        <div className="mt-3 px-4 py-3 rounded-xl bg-orange-200/20 border-l-orange-500 border-l-2">
          <b className="text-orange-700">Chú thích</b>

          <p className="whitespace-break-spaces my-2">
            Các tiêu chí có màu trắng{' '}
            <button className="inline-flex mx-[2px] shrink-0 icon-btn bg-gray-50 hover:bg-gray-100">
              n
            </button>{' '}
            là các tiêu chí <b>Chưa được phân công</b> nhiệm vụ cho thành viên
            nào.
          </p>
          <p className="whitespace-break-spaces my-2">
            Các tiêu chí có màu{' '}
            <button className="inline-flex mx-[2px] shrink-0 bg-uneti-primary-lighter icon-btn text-white hover:bg-uneti-primary">
              n
            </button>
            là các tiêu chí đã được giao nhiệm vụ và có trạng thái là{' '}
            <b>Đang thực hiện</b>.
          </p>
          <p className="whitespace-break-spaces my-2">
            Các tiêu chí có màu{' '}
            <button className="inline-flex mx-[2px] shrink-0 bg-uneti-primary icon-btn text-white hover:bg-uneti-primary">
              n
            </button>
            là các tiêu chí đã được đánh dấu là <b>Đã hoàn thành</b>.
          </p>
          <u>Với n là số tiêu chí</u>
        </div>
      </div>

      <Actions />
    </div>
  )
}
