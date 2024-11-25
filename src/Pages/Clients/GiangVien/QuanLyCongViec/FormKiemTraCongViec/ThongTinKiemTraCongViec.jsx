import { memo, useRef } from 'react'
import PropTypes from 'prop-types'
import { DebounceInput } from 'react-debounce-input'
import { dayjs } from '@/Services/Utils'

const ThongTinKiemTraCongViec = memo(function ThongTinKiemTraCongViec({
  dataCongViec,
}) {
  const inputFileRef = useRef(null)

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 w-full">
        <h3 className="font-semibold text-black mb-2">Tên công việc:</h3>
        <p className="p-2 h-10 rounded-lg border border-gray-300">
          {dataCongViec?.CV_HT_PhanCongThucHien_TenCongViec}
        </p>
      </div>
      {/* END: Tên công việc */}
      <div className="col-span-2 md:col-span-1">
        <div className="w-full">
          <h3 className="font-semibold text-black mb-2">Ngày bắt đầu:</h3>
          <p className="p-2 h-10 rounded-lg border border-gray-300">
            {dataCongViec?.CV_HT_PhanCongThucHien_NgayBatDau
              ? dayjs(dataCongViec?.CV_HT_PhanCongThucHien_NgayBatDau)
                  .utc()
                  .format('HH:mm, DD/MM/YYYY')
              : ''}
          </p>
        </div>
      </div>
      {/* END: Ngày bắt đầu */}
      <div className="col-span-2 md:col-span-1">
        <div className="w-full">
          <h3 className="font-semibold text-black mb-2">Ngày kết thúc:</h3>
          <p className="p-2 h-10 rounded-lg border border-gray-300">
            {dataCongViec?.CV_HT_PhanCongThucHien_NgayKetThuc
              ? dayjs(dataCongViec?.CV_HT_PhanCongThucHien_NgayKetThuc)
                  .utc()
                  .format('HH:mm, DD/MM/YYYY')
              : ''}
          </p>
        </div>
      </div>
      {/* END: Ngày kết thúc */}
      <div className="col-span-2 w-full">
        <h3 className="font-semibold text-black mb-2">Nhân sự thực hiện:</h3>
        <p className="p-2 h-10 rounded-lg border border-gray-300">
          {dataCongViec?.CV_HT_PhanCongThucHien_NhanSuThucHien_HoTen}
        </p>
      </div>
      {/* END: Nhân sự thực hiện */}
      <div className="col-span-2 w-full">
        <h3 className="font-semibold text-black mb-2">
          Thời gian hoàn thành công việc:
        </h3>
        <p className="p-2 h-10 rounded-lg border border-gray-300">
          {dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_NgayXacNhan
            ? dayjs(dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_NgayXacNhan)
                .utc()
                .format('HH:mm, DD/MM/YYYY')
            : ''}
        </p>
      </div>
      {/* END: Thời gian hoàn thành công việc */}
      <div className="col-span-2 w-full">
        <label
          htmlFor="file-kiem-tra"
          className="block w-full p-2 rounded-lg bg-sky-800 text-white font-semibold cursor-pointer hover:opacity-90"
        >
          File kiểm tra công việc
        </label>
        <input
          ref={inputFileRef}
          type="file"
          name=""
          id="file-kiem-tra"
          hidden
        />
      </div>
      {/* END: File kiểm tra công việc */}
      <div className="col-span-2 w-full">
        <h3 className="font-semibold text-black mb-2">
          Mô tả tiến độ hoàn thành:
        </h3>
        <DebounceInput
          element={'textarea'}
          className="w-full p-2 rounded-lg border border-gray-300"
          rows={4}
          value={dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_MoTa}
          disabled
        />
      </div>
      {/* END: Mô tả tiến độ hoàn thành */}
    </div>
  )
})

ThongTinKiemTraCongViec.propTypes = {
  dataCongViec: PropTypes.object,
}

export default ThongTinKiemTraCongViec
