import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import {
  enumActionAddCongViec,
  generateTitleTableNhanSuCongViec,
} from '@/Layouts/LayoutQuanLyCongViec/constants'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { Autocomplete, Checkbox, TextField, Tooltip } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { enumDanhMucCongViec } from '../constants'

const DanhSachNhanSuCongViec = memo(function DanhSachNhanSu({
  disableChedkbox,
  typeAdd,
  dataSelectedNhanSu,
  onSelectNhanSu,
}) {
  const { data: dataNhanSuCongViec } = useQuery({
    queryKey: [QLCV_QUERY_KEY.GET_NHAN_SU_CONG_VIEC],
    queryFn: async () => {
      const response = await apiQuanLyCongViec.getNhanSu_CheckChon({
        CV_HT_NhanSu_ID: '',
      })
      return response.data
    },
  })
  const { data: dataVaiTroNhanSu } = useQuery({
    queryKey: [
      QLCV_QUERY_KEY.GET_VAI_TRO_NHAN_SU,
      enumDanhMucCongViec.ViTriThucHien,
    ],
    queryFn: async () => {
      const response = await apiQuanLyCongViec.getTenNhom1({
        CV_HT_DanhMuc_MaNhom1: enumDanhMucCongViec.ViTriThucHien,
      })
      return response.data
    },
    retry: 3,
    retryDelay: 30 * 60 * 1000,
  })
  const _title = generateTitleTableNhanSuCongViec(typeAdd)

  const _listNhanSuCongViec = useMemo(() => {
    return dataNhanSuCongViec?.body ?? []
  }, [dataNhanSuCongViec])

  const _listVaiTroNhanSu = useMemo(() => {
    return dataVaiTroNhanSu?.body ?? []
  }, [dataVaiTroNhanSu])

  const handleSelectVaiTroNhanSu = (nhanSu, vaiTro) => {
    const isSelectedIndex = dataSelectedNhanSu.findIndex(
      (i) => i.CV_HT_NhanSu_ID === nhanSu.CV_HT_NhanSu_ID,
    )

    onSelectNhanSu(
      {
        ...nhanSu,
        CV_HT_NhanSu_VaiTro: vaiTro?.CV_HT_DanhMuc_TenNhom1,
      },
      isSelectedIndex,
      false,
    )
  }

  // console.log('check searchQueryParams: ', searchQueryParams)

  return (
    <div className="w-full">
      <h3 className="font-bold mb-2">
        {_title} <span className="text-red-600">(*)</span>
        <span>:</span>
      </h3>
      {/* END: Heading */}
      <div className="w-full h-[700px] overflow-x-auto">
        <table className="relative z-[1] h-[500px]">
          <thead className="sticky top-0 z-[1] bg-sky-800 text-white">
            <tr>
              <th className="w-4 p-1 rounded-tl-xl border-b">Chọn</th>
              <th className="w-28 px-4 py-2 border whitespace-nowrap">
                Mã nhân sự
              </th>
              <th className="w-28 p-1 border">Họ tên</th>
              <th className="w-28 px-4 py-2 border">Khả năng chuyên môn</th>
              {typeAdd === enumActionAddCongViec.GIAO_VIEC_TRUC_TIEP && (
                <th className="w-28 px-4 py-2 border whitespace-nowrap">
                  Vai trò (*)
                </th>
              )}
              <th className="w-36 px-4 py-2 border whitespace-nowrap">
                Địa điểm làm việc
              </th>
              <th className="w-28 p-1 border">Đơn vị</th>
              <th className="w-28 px-4 py-2 border whitespace-nowrap">
                Tổ nghiệp vụ
              </th>
              <th className="w-28 p-1 border">Nhóm chuyên môn</th>
              <th className="w-28 p-1 border">Chức vụ</th>
              <th className="w-32 p-1 border">Loại nhân sự</th>
              <th className="w-28 p-1 border">Trình độ</th>
              <th className="w-28 p-1 rounded-tr-xl border-b">Cơ sở</th>
            </tr>
          </thead>
          <tbody>
            {_listNhanSuCongViec?.length > 0 ? (
              _listNhanSuCongViec?.map((item, index) => {
                const isSelectedIndex =
                  dataSelectedNhanSu &&
                  dataSelectedNhanSu?.findIndex(
                    (ns) => ns?.CV_HT_NhanSu_ID === item?.CV_HT_NhanSu_ID,
                  )
                return (
                  <tr key={item?.CV_HT_NhanSu_ID ?? index} className="border-b">
                    <td className="border-r text-center border-l">
                      <Checkbox
                        size="small"
                        disabled={disableChedkbox}
                        checked={isSelectedIndex !== -1}
                        onClick={() => {
                          onSelectNhanSu(
                            {
                              ...item,
                              CV_HT_NhanSu_VaiTro: '',
                            },
                            isSelectedIndex,
                            true,
                          )
                        }}
                      />
                    </td>
                    <td className="border-r text-center">
                      {item?.CV_HT_NhanSu_MaNhanSu}
                    </td>
                    <td className="border-r whitespace-nowrap">
                      <p className="p-2">{item?.CV_HT_NhanSu_HoTen}</p>
                    </td>
                    <td className="border-r">
                      <p className="p-2 w-32">
                        {item?.CV_HT_NhanSu_KhaNangChuyenMon}
                      </p>
                    </td>
                    {typeAdd === enumActionAddCongViec.GIAO_VIEC_TRUC_TIEP && (
                      <td className="border-r px-2 min-w-[240px]">
                        <Tooltip title="Vai trò" arrow placement="right">
                          <Autocomplete
                            disabled={isSelectedIndex === -1}
                            id="vaiTro"
                            className="w-full"
                            size="small"
                            options={_listVaiTroNhanSu}
                            // value={values.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon}
                            onChange={(event, newValue) => {
                              handleSelectVaiTroNhanSu(item, newValue)
                            }}
                            freeSolo={false}
                            getOptionLabel={(option) => {
                              return option?.CV_HT_DanhMuc_TenNhom1
                            }}
                            noOptionsText="Không có vai trò cần tìm!"
                            renderOption={(props, option) => (
                              <li {...props}>
                                {option?.CV_HT_DanhMuc_TenNhom1}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Chọn vai trò thực hiện"
                              />
                            )}
                          />
                        </Tooltip>
                      </td>
                    )}
                    <td className="border-r w-36">
                      <p className="p-2">{item?.CV_HT_NhanSu_DiaDiemLamViec}</p>
                    </td>
                    <td className="border-r">
                      <p className="w-36 p-2">{item?.CV_HT_NhanSu_DonVi}</p>
                    </td>
                    <td className="border-r">
                      <p className="p-2">{item?.CV_HT_NhanSu_ToNghiepVu}</p>
                    </td>
                    <td className="border-r">
                      <p className="w-36 p-2">
                        {item?.CV_HT_NhanSu_NhomChuyenMon}
                      </p>
                    </td>
                    <td className="border-r">
                      <p className="p-2 whitespace-nowrap">
                        {item?.CV_HT_NhanSu_ChucVu}
                      </p>
                    </td>
                    <td className="w-32 border-r">
                      <p className="w-32 p-2">
                        {item?.CV_HT_NhanSu_LoaiNhanSu}
                      </p>
                    </td>
                    <td className="border-r">
                      <p className="p-2 whitespace-nowrap">
                        {item?.CV_HT_NhanSu_TrinhDo}
                      </p>
                    </td>
                    <td className="border-r">
                      <p className="p-2 whitespace-nowrap">
                        {item?.CV_HT_NhanSu_CoSo}
                      </p>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={13}>Không có nhân sự!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* END: Table nhân sự*/}
    </div>
  )
})

export default DanhSachNhanSuCongViec
