import { useCallback, useState } from 'react'
import CongViecChuaThucHien from './components/CongViecChuaThucHien'
import CongViecDangThucHien from './components/CongViecDangThucHien'
import CongViecHoanThanh from './components/CongViecHoanThanh'
import { CV_HT_TrangThai } from './constants'
import clsx from 'clsx'

function QuanLyCongViec() {
  const [zoomTab, setZoomTab] = useState(null)

  const handleZoomTab = useCallback((tab) => {
    setZoomTab(tab)
  }, [])

  return (
    <section className="bg-white rounded-xl p-4 shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div
          className={clsx(
            !zoomTab
              ? 'col-span-3 lg:col-span-1'
              : zoomTab === CV_HT_TrangThai.CV_CHUA_THUC_HIEN
                ? 'col-span-3'
                : 'hidden',
          )}
        >
          <CongViecChuaThucHien zoomTab={zoomTab} onZoomTab={handleZoomTab} />
        </div>
        {/* END: Chưa thực hiện */}
        <div
          className={clsx(
            !zoomTab
              ? 'col-span-3 lg:col-span-1'
              : zoomTab === CV_HT_TrangThai.CV_DANG_THUC_HIEN
                ? 'col-span-3'
                : 'hidden',
          )}
        >
          <CongViecDangThucHien zoomTab={zoomTab} onZoomTab={handleZoomTab} />
        </div>
        {/* END: Đang thực hiện */}
        <div
          className={clsx(
            !zoomTab
              ? 'col-span-3 lg:col-span-1'
              : zoomTab === CV_HT_TrangThai.CV_DA_HOAN_THANH
                ? 'col-span-3'
                : 'hidden',
          )}
        >
          <CongViecHoanThanh zoomTab={zoomTab} onZoomTab={handleZoomTab} />
        </div>
        {/* END: Đã hoàn thành */}
      </div>
    </section>
  )
}

export default QuanLyCongViec
