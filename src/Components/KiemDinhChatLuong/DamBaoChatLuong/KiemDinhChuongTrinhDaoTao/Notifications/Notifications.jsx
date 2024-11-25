import { Popper, PopperContent, PopperTrigger } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { BiBell } from 'react-icons/bi'
import Notification from './Notification'
import { useContext, useEffect } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { useQuery } from '@tanstack/react-query'
import { loadAllThongBaoCapNhat } from '@/Apis/KDCL/DamBaoChatLuong/apiThongBaoCapNhat'
import Empty from '@/Components/Base/Icons/Empty'

export default function Notifications() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const { data = [] } = useQuery({
    queryKey: [
      'getNotifications',
      hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
    ],
    queryFn: async () => {
      if (!hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID) return []

      const res = await loadAllThongBaoCapNhat()
      return res.data.body.filter(
        (e) =>
          e.MC_TrangThai_YeuCau_SinhVien_Cap1 ==
          hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      )
    },
  })

  return (
    <Popper placement="bottom-end" persistent>
      <PopperTrigger>
        <button className="icon-btn relative">
          <Icon size={26}>
            <BiBell />
          </Icon>
          <span className="flex items-center justify-center w-4 h-4 rounded-xl bg-red-500 absolute -top-1 -right-1 text-white text-[14px]">
            {data.length}
          </span>
        </button>
      </PopperTrigger>

      <PopperContent className="p-3">
        {/* Bộ lọc, khi ấn vào sẽ lọc thông báo theo từng group */}
        <div className="flex items-center gap-2 flex-wrap pb-2 shadow-2xl">
          <button className="bg-uneti-primary border-uneti-primary text-white border-blue-200 border px-2 rounded-md py-[2px]">
            Minh chứng
          </button>
          <button className="bg-[#ecf5ff] hover:bg-uneti-primary hover:border-uneti-primary hover:text-white border-blue-200 border px-2 rounded-md py-[2px]">
            Đánh giá tiêu chí
          </button>
        </div>
        <div className="max-h-[300px] overflow-auto pr-1">
          {data.length ? (
            <>
              {data.map((e, i) => (
                <Notification
                  key={i}
                  date={e.MC_TrangThai_YeuCau_SinhVien_DateCreate}
                  title="Cập nhật minh chứng"
                  description={e.MC_TrangThai_YeuCau_SinhVien_JSON_DATA.NoiDung}
                  url={e.MC_TrangThai_YeuCau_SinhVien_JSON_DATA.Url}
                />
              ))}
              <div className="w-full border border-solid border-t-transparent border-l-transparent border-r-transparent border-gray-300/80 my-1" />
              {/* Mở dialog xem tất cả thông báo */}
              <button className="hover:underline hover:text-uneti-primary mx-auto w-full">
                Xem tất cả thông báo
              </button>
            </>
          ) : (
            <div className="text-center p-3">
              <Empty />
              <p className="text-gray-500">Không có thông báo</p>
            </div>
          )}
        </div>
      </PopperContent>
    </Popper>
  )
}
