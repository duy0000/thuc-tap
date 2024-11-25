import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'

const LichSuXacNhanTienDo = memo(function LichSuXacNhanTienDo({
  idPhanCongCongViec,
}) {
  const { data: listLichSuTienDo } = useQuery({
    queryKey: [
      QLCV_QUERY_KEY.PhanCongThucHien_Load_LichSuTienDo,
      idPhanCongCongViec,
    ],
    queryFn: async () => {
      const res = await apiQuanLyCongViec.getLichSuTienDoCapNhat({
        CV_HT_PhanCongThucHien_ID: idPhanCongCongViec,
      })
      return res.data
    },
  })

  const _dataLichSuTienDo = useMemo(() => {
    return listLichSuTienDo?.body ?? []
  }, [listLichSuTienDo])

  console.log('_dataLichSuTienDo: ', _dataLichSuTienDo)

  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-sky-800 text-white">
          <tr className="border-b">
            <th className="p-2 border-r border-gray-300 rounded-tl-lg">STT</th>
            <th className="p-2 border-r border-gray-300">Mã nhân sự</th>
            <th className="p-2 border-r border-gray-300">Họ tên</th>
            <th className="p-2 border-r border-gray-300">Tên file</th>
            <th className="p-2 border-r border-gray-300">Phần trăm</th>
            <th className="p-2 border-r border-gray-300">Ngày cập nhật</th>
            <th className="p-2 border-r border-gray-300">Trạng thái</th>
            <th className="p-2 border-gray-300 rounded-tr-lg">Mô tả</th>
          </tr>
        </thead>
        <tbody>
          {_dataLichSuTienDo.length > 0 ? (
            _dataLichSuTienDo.map((item, index) => {
              return (
                <tr key={index} className="border-b">
                  <td className="p-2 border-r border-gray-300">{index + 1}</td>
                  <td className="p-2 border-r border-gray-300">
                    {item.CV_HT_NhanSu_MaNhanSu}
                  </td>
                  <td className="p-2 border-r border-gray-300">
                    {item.CV_HT_NhanSu_HoTen}
                  </td>
                  <td className="p-2 border-r border-gray-300">
                    {item.CV_HT_PhanCongThucHien_XacNhan_TenFile}
                  </td>
                  <td className="p-2 border-r border-gray-300">
                    {item.CV_HT_PhanCongThucHien_XacNhan_PhanTram}
                  </td>
                  <td className="p-2 border-r border-gray-300">
                    {item.CV_HT_PhanCongThucHien_NgayCapNhat}
                  </td>
                  <td className="p-2 border-r border-gray-300">
                    {item.CV_HT_PhanCongThucHien_XacNhan_TrangThai}
                  </td>
                  <td className="p-2 border-gray-300">
                    {item.CV_HT_PhanCongThucHien_XacNhan_MoTa}
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan="8"
                className="text-center font-semibold text-red-600 py-4"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
})

export default LichSuXacNhanTienDo
