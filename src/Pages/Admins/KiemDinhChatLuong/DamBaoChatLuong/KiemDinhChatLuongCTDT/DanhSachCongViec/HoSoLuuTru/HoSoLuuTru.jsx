import { loadAllHoSoLuuTru } from '@/Apis/KDCL'
import Icon from '@/Components/Base/Icon/Icon'
import { HoSoKiemDinhCtx, IDQuyTrinhKiemDinhEnum } from '@/Services/Tokens'
import { transformCls } from '@/Services/Utils'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useMemo, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { FaArrowDown } from 'react-icons/fa6'

export default function HoSoLuuTru() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const [tab, setTab] = useState(0)

  const listFileShow = {
    0: [
      {
        name: 'Quyết định thành lập hội đồng tự đánh giá',
        id: [IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc1],
      },
      {
        name: 'Kế hoạch tự đánh giá',
        id: [IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc2],
      },
      {
        name: 'Cơ sở dữ liệu đơn vị',
        id: [IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc3],
      },
      {
        name: 'Các phiếu đánh giá tiêu chí',
        id: [
          IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc4,
          IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc5,
        ],
      },
      {
        name: 'Báo cáo tự đánh giá',
        id: [IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc6],
      },
      {
        name: 'Công văn đề nghị đánh giá ngoài',
        id: [IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc8],
      },
    ],
    1: [
      {
        name: 'Thông tin đoàn đánh giá ngoài',
        id: [IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc1],
      },
      {
        name: 'Kế hoạch đánh giá ngoài',
        id: [IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc2],
      },
      {
        name: 'Thông tin nghiên cứu báo cáo đánh giá ngoài',
        id: [IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc3],
      },
      {
        name: 'Báo cáo đánh giá tiêu chí',
        id: [IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc4],
      },
    ],
  }

  const { data = [] } = useQuery({
    queryKey: ['KT_KDCL_HoSoLuuTru'],
    queryFn: async () => {
      const res = await loadAllHoSoLuuTru()
      return res.data.body
    },
  })

  const listHoSoLuuTru = useMemo(() => {
    if (!data || !hoSoKiemDinh.hoSoKiemDinh) return {}

    return data
      .filter(
        (item) =>
          item.KT_KDCL_HoSoLuuTru_IDHoSoKiemDinh ===
          hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      )
      .reduce((acc, curr) => {
        if (!acc[curr.KT_KDCL_HoSoLuuTru_IDQuyTrinh]) {
          acc[curr.KT_KDCL_HoSoLuuTru_IDQuyTrinh] = curr
        }

        return acc
      }, {})
  }, [data, hoSoKiemDinh.hoSoKiemDinh])

  return (
    <div className="p-4 rounded-xl bg-white">
      <div className="flex gap-[3px]">
        <p
          onClick={() => setTab(0)}
          className={transformCls([
            'hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-lg text-[15px] font-medium',
            tab === 0
              ? 'bg-gray-100 text-uneti-primary'
              : 'bg-white text-slate-500',
          ])}
        >
          Quá trình tự đánh giá
        </p>
        <p
          onClick={() => setTab(1)}
          className={transformCls([
            'hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-lg text-[15px] font-medium',
            tab === 1
              ? 'bg-gray-100 text-uneti-primary'
              : 'bg-white text-slate-500',
          ])}
        >
          Quá trình đánh giá ngoài
        </p>
      </div>

      <div className="uneti-divider" />

      <table className="uneti-u-table">
        <thead>
          <tr>
            <th>Tên file</th>
            <th>Tác vụ</th>
          </tr>
        </thead>

        <tbody>
          {listFileShow[tab].map((item, i) => (
            <Fragment key={i}>
              <tr>
                <td colSpan={2} className="!bg-slate-50">
                  <div className="flex items-end text-slate-600 font-medium">
                    <Icon>
                      <BiChevronDown />
                    </Icon>{' '}
                    {item.name}
                  </div>
                </td>
              </tr>

              {item.id.map(
                (e) =>
                  listHoSoLuuTru[e]?.KT_KDCL_HoSoLuuTru_TenFile && (
                    <tr key={e}>
                      <td className="!pl-10">
                        {listHoSoLuuTru[e].KT_KDCL_HoSoLuuTru_TenFile}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            hoSoKiemDinh.downloadFileHoSoLuuTru(
                              listHoSoLuuTru[e].KT_KDCL_HoSoLuuTru_IDQuyTrinh,
                            )
                          }
                          className="icon-btn mx-auto"
                        >
                          <Icon>
                            <FaArrowDown />
                          </Icon>
                        </button>
                      </td>
                    </tr>
                  ),
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
