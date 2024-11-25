import { useMemo, useState } from 'react'
import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey'
import { getTTHCGVThongKeTheoThuTuc } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThongKeTTHCGV'
import { filterData } from '@/Services/Utils'
import { DebounceInput } from 'react-debounce-input'
import Swal from 'sweetalert2'
import { isEmpty } from 'lodash-unified'
import { DATA_AUDIT_KEY } from '../../../constants'

function DanhSachGuiYeuCau({ dataFilterCommon }) {
  const [columnFilters, setColumnFilters] = useState({
    MC_TTHC_GV_NoiTiepNhan: '',
    MC_TTHC_GV_TenThuTuc: '',
    MC_TTHC_GV_SoLuong_Tong: '',
    MC_TTHC_GV_SoLuong_HuyTra: '',
    MC_TTHC_GV_SoLuong_ChuaTiepNhan: '',
    MC_TTHC_GV_SoLuong_DangXuLy: '',
    MC_TTHC_GV_SoLuong_DaHoanThanh: '',
  })
  const [dataFormFilter, setDataFormFilter] = useState({
    NgayBatDau: '',
    NgayKetThuc: '',
  })

  const { data: listThongKeDVXuLy, isLoading } = useQuery({
    queryKey: [
      TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_Load_ThongKe_TheoThuTuc,
      dataFormFilter,
      dataFilterCommon,
    ],
    queryFn: async () => {
      const response = await getTTHCGVThongKeTheoThuTuc({
        NgayBatDau: !isEmpty(dataFormFilter.NgayBatDau)
          ? dataFormFilter.NgayBatDau
          : dataFilterCommon.dieuKienLoc === DATA_AUDIT_KEY[3].value ||
              dataFilterCommon.dieuKienLoc === DATA_AUDIT_KEY[0].value
            ? dataFilterCommon.ngayBatDau
            : '',
        NgayKetThuc: !isEmpty(dataFormFilter.NgayKetThuc)
          ? dataFormFilter.NgayKetThuc
          : dataFilterCommon.dieuKienLoc === DATA_AUDIT_KEY[3].value ||
              dataFilterCommon.dieuKienLoc === DATA_AUDIT_KEY[0].value
            ? dataFilterCommon.ngayKetThuc
            : '',
        MC_TTHC_GV_NamTimKiem: '',
        MC_TTHC_GV_ThangTimKiem: '',
      })
      return response
    },
    retry: 3,
  })

  const _listThongKeDVXuLy = useMemo(() => {
    return listThongKeDVXuLy?.data?.body || []
  }, [listThongKeDVXuLy?.data, isLoading])

  const _dataThongKeFilter = useMemo(() => {
    return filterData(_listThongKeDVXuLy, columnFilters)
  }, [_listThongKeDVXuLy, columnFilters])

  const _totalSuggestion = useMemo(() => {
    let totalCommon = 0,
      totalTraDoSai = 0,
      totalQuaHanChuaXuLy = 0,
      totalQuaHanDaXuLy = 0,
      totalHoanThanhDungHan = 0,
      totalDangTrongThoiHanXuLy = 0

    _dataThongKeFilter?.forEach((item) => {
      totalCommon += item?.MC_TTHC_GV_SoLuong_Tong
      totalTraDoSai += item?.MC_TTHC_GV_SoLuong_TraDoSai
      totalQuaHanChuaXuLy += item?.MC_TTHC_GV_SoLuong_QuaHanChuaXuLy
      totalQuaHanDaXuLy += item?.MC_TTHC_GV_SoLuong_QuaHanDaXuLy
      totalHoanThanhDungHan += item?.MC_TTHC_GV_SoLuong_HoanThanhDungHan
      totalDangTrongThoiHanXuLy += item?.MC_TTHC_GV_SoLuong_DangTrongThoiHanXuLy
    })

    return {
      totalCommon,
      totalTraDoSai,
      totalQuaHanChuaXuLy,
      totalQuaHanDaXuLy,
      totalHoanThanhDungHan,
      totalDangTrongThoiHanXuLy,
    }
  }, [_dataThongKeFilter])

  const handleChangeFilter = (e) => {
    const { name, value } = e.target
    setColumnFilters({
      ...columnFilters,
      [name]: value,
    })
  }

  const handleExportExcel = async () => {
    if (_dataThongKeFilter?.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Thống báo',
        text: 'Không có dữ liệu để xuất file!',
      })
      return
    }

    const wb = new ExcelJS.Workbook()
    const worksheet = wb.addWorksheet('Sheet 1')
    worksheet.properties.defaultRowHeight = 80

    // Merge cells for the header row
    worksheet.mergeCells('D1:H1')
    worksheet.getCell('D1').value = 'SỐ LƯỢNG ĐỀ NGHỊ THEO TỪNG TRẠNG THÁI'
    worksheet.getCell('D1').font = {
      bold: true,
    }
    worksheet.getCell('D1').border = {
      right: { style: 'thin' },
    }
    worksheet.getCell('D1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    }

    // Define the second row for the detailed headers under merged cells
    const row1 = worksheet.getRow(1)
    row1.getCell(1).font = { bold: true }
    const row2 = worksheet.getRow(2)
    row2.getCell(1).font = { bold: true }
    // Set values for the second row (row 2)
    row2.values = [
      '', // STT (merged)
      '', // ĐƠN VỊ/TỔ CHỨC (merged)
      '', // TÊN THỦ TỤC (merged)
      'CHƯA TIẾP NHẬN',
      'HỦY TRẢ HỒ SƠ',
      'ĐANG XỬ LÝ',
      'ĐÃ HOÀN THÀNH',
      'TỔNG',
    ]

    // Style the second row (row 2)
    row2.eachCell((cell) => {
      cell.font = { bold: true }
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      }
    })
    row1.eachCell((cell) => {
      cell.font = { bold: true }
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      }
    })

    // Merge cells for STT and ĐƠN VỊ/TỔ CHỨC across rows 1 and 2
    worksheet.mergeCells('A1:A2') // STT
    worksheet.mergeCells('B1:B2') // ĐƠN VỊ/TỔ CHỨC
    worksheet.mergeCells('C1:C2') // TÊN THỦ TỤC

    const cellA1A2 = worksheet.getCell('A1:A2')
    cellA1A2.font = { bold: true, color: { argb: 'FF0000' } }

    // Set values for the merged cells
    worksheet.getCell('A1').value = 'STT'
    worksheet.getCell('A1').font = { bold: true }
    worksheet.getCell('B1').value = 'ĐƠN VỊ/TỔ CHỨC'
    worksheet.getCell('C1').value = 'TÊN THỦ TỤC'

    // Apply style to merged cells in row 1 and 2
    const headerCells = ['A1', 'B1', 'C1', 'D1', 'A2', 'B2', 'C2']
    headerCells.forEach((cell) => {
      worksheet.getCell(cell).font = { bold: true }
      worksheet.getCell(cell).style = {
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        },
      }
      worksheet.getCell(cell).alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      }
    })

    const cellStyle = {
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      },
      alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
    }

    _dataThongKeFilter.forEach((item, index) => {
      const row = worksheet.addRow([
        index + 1,
        item.MC_TTHC_GV_NoiTiepNhan,
        item.MC_TTHC_GV_TenThuTuc,
        item.MC_TTHC_GV_SoLuong_ChuaTiepNhan,
        item.MC_TTHC_GV_SoLuong_HuyTra,
        item.MC_TTHC_GV_SoLuong_DangXuLy,
        item.MC_TTHC_GV_SoLuong_DaHoanThanh,
        item.MC_TTHC_GV_SoLuong_Tong,
      ])

      row.getCell(1).style = cellStyle
      row.getCell(2).style = cellStyle
      row.getCell(3).style = cellStyle
      row.getCell(4).style = cellStyle
      row.getCell(5).style = cellStyle
      row.getCell(6).style = cellStyle
      row.getCell(7).style = cellStyle
      row.getCell(8).style = cellStyle
    })
    // Style the header row
    worksheet.getRow(2).eachCell((cell) => {
      cell.font = { bold: true }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      }
    })

    // Set custom widths for each column
    worksheet.columns = [
      { width: 4 }, // Column A (STT)
      { width: 34 }, // Column B (ĐƠN VỊ/TỔ CHỨC)
      { width: 40 }, // Column C (TÊN THỦ TỤC)
      { width: 10 }, // Column D (CHƯA TIẾP NHẬN)
      { width: 10 }, // Column E (HỦY TRẢ HỒ SƠ)
      { width: 10 }, // Column F (ĐANG XỬ LÝ)
      { width: 10 }, // Column G (ĐÃ HOÀN THÀNH)
      { width: 10 }, // Column H (TỔNG)
    ]

    // Generate Excel file and trigger download
    let currentDate = dayjs().format('DD-MM-YYYY')
    const buffer = await wb.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(blob, `TTHCGV_ThongKeYeuCau_ThuTuc_${currentDate}.xlsx`)
  }

  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <h3 className="text-center font-bold uppercase text-lg md:text-xl mb-2">
        Thống Kê Theo <span className="text-red-600">Thủ tục</span>
      </h3>
      <div className="flex flex-col md:flex-row items-center md:flex-wrap lg:justify-center gap-6 bg-white p-2 rounded-xl shadow mb-4">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-700">Ngày bắt đầu:</p>
          <DebounceInput
            className="p-2 border rounded-xl focus:outline-1 focus:outline-cyan-500"
            name="ngayBatDau"
            type="date"
            onChange={(e) => {
              const { value } = e.target
              setDataFormFilter({
                ...dataFormFilter,
                NgayBatDau: value,
              })
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-700">Ngày kết thúc:</p>
          <DebounceInput
            className="p-2 border rounded-xl focus:outline-1 focus:outline-cyan-500"
            name="ngayKetThuc"
            type="date"
            onChange={(e) => {
              const { value } = e.target
              setDataFormFilter({
                ...dataFormFilter,
                NgayKetThuc: value,
              })
            }}
          />
        </div>
        <div className="flex items-center justify-between p-2">
          <button
            onClick={handleExportExcel}
            className="bg-cyan-600 text-white font-semibold p-2 rounded-xl whitespace-nowrap hover:opacity-80"
          >
            Export Excel
          </button>
        </div>
      </div>
      <div className="relative bg-white w-full max-h-[700px] shadow rounded-md overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow">
          <thead className="sticky top-0 z-10 text-xs text-white bg-sky-800 dark:bg-gray-700 dark:text-gray-400 shadow rounded-md">
            <tr className="border-b border-white">
              <th
                scope="col"
                rowSpan={3}
                className="px-6 py-1 text-center border-r border-white uppercase"
              >
                STT
              </th>

              <th
                scope="col"
                rowSpan={2}
                className="px-6 py-1 text-center border-r border-white uppercase"
              >
                Đơn vị/Tổ chức
              </th>
              <th
                scope="col"
                rowSpan={2}
                className="px-6 py-1 text-center border-r border-white uppercase"
              >
                Tên thủ tục
              </th>
              <th
                scope="col"
                rowSpan={2}
                className="px-6 py-1 text-center border-r border-white uppercase"
              >
                Tổng số đề nghị
              </th>
              <th
                scope="col"
                colSpan={5}
                className="px-6 py-1 text-center uppercase"
              >
                Số lượng đề nghị
              </th>
            </tr>
            <tr className="border-b border-white">
              <th className="px-2 py-1 text-center border-r border-white uppercase">
                <span className="text-red-600">Trả do sai</span>
              </th>
              <th className="px-2 py-1 text-center border-r border-white uppercase">
                Quá hạn nhưng <span className="text-red-600">chưa xử lý</span>
              </th>
              <th className="px-2 py-1 text-center border-r border-white uppercase">
                Quá hạn nhưng{' '}
                <span className="text-red-600">đã xử lý xong</span>
              </th>
              <th className="px-2 py-1 text-center border-r border-white uppercase">
                Hoàn thành đúng hạn
              </th>
              <th className="px-2 py-1 text-center border-r border-white uppercase">
                Đang trong thời hạn xử lý
              </th>
            </tr>
            <tr>
              <th className="p-1 border-r border-white">
                <DebounceInput
                  className="p-2 focus:outline-cyan-600 text-gray-900 rounded w-36"
                  placeholder={'Tìm đơn vị'}
                  name="MC_TTHC_GV_NoiTiepNhan"
                  onChange={handleChangeFilter}
                />
              </th>
              <th className="p-1 border-r border-white">
                <DebounceInput
                  className="p-2 focus:outline-cyan-600 text-gray-900 rounded w-full"
                  placeholder={'Tìm tên thủ tục'}
                  name="MC_TTHC_GV_TenThuTuc"
                  onChange={handleChangeFilter}
                />
              </th>
              <th className="p-1 border-r border-white">
                <DebounceInput
                  className="p-2 focus:outline-cyan-600 text-gray-900 rounded w-full"
                  placeholder={'Tìm ...'}
                  name="MC_TTHC_GV_SoLuong_Tong"
                  onChange={handleChangeFilter}
                />
              </th>
              <th className="p-1 border-r border-white">
                <DebounceInput
                  className="p-2 focus:outline-cyan-600 text-gray-900 rounded w-[80px]"
                  placeholder={'Tìm ...'}
                  name="MC_TTHC_GV_SoLuong_TraDoSai"
                  onChange={handleChangeFilter}
                />
              </th>
              <th className="p-1 border-r border-white">
                <DebounceInput
                  className="p-2 focus:outline-cyan-600 text-gray-900 rounded  max-w-[80px]"
                  placeholder={'Tìm ...'}
                  name="MC_TTHC_GV_SoLuong_QuaHanChuaXuLy"
                  onChange={handleChangeFilter}
                />
              </th>
              <th className="p-1 border-r border-white">
                <DebounceInput
                  className="p-2 focus:outline-cyan-600 text-gray-900 rounded max-w-[80px]"
                  placeholder={'Tìm ...'}
                  name="MC_TTHC_GV_SoLuong_QuaHanDaXuLy"
                  onChange={handleChangeFilter}
                />
              </th>
              <th className="p-1 border-r border-white">
                <DebounceInput
                  className="p-2 focus:outline-cyan-600 text-gray-900 rounded max-w-[100px]"
                  placeholder={'Tìm ...'}
                  name="MC_TTHC_GV_SoLuong_HoanThanhDungHan"
                  onChange={handleChangeFilter}
                />
              </th>
              <th className="p-1 border-r border-white">
                <DebounceInput
                  className="p-2 focus:outline-cyan-600 text-gray-900 rounded max-w-[80px]"
                  placeholder={'Tìm ...'}
                  name="MC_TTHC_GV_SoLuong_DangTrongThoiHanXuLy"
                  onChange={handleChangeFilter}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {_dataThongKeFilter.length > 0 ? (
              _dataThongKeFilter?.map((tt, index) => (
                <tr
                  key={tt.MC_TTHC_GV_GuiYeuCau_ID ?? index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 text-center whitespace-nowrap dark:text-white border-r border-gray-200"
                  >
                    {index + 1}
                  </th>

                  <td className="p-2 border-r border-gray-200">
                    {tt.MC_TTHC_GV_NoiTiepNhan ?? 'Không có thông tin'}
                  </td>
                  <td className="p-2 border-r border-gray-200">
                    {tt.MC_TTHC_GV_TenThuTuc ?? 'Không có thông tin'}
                  </td>
                  <td className="p-2 text-center font-bold text-red-600 border-r border-gray-200">
                    {tt.MC_TTHC_GV_SoLuong_Tong ?? '0'}
                  </td>
                  <td className="p-2 text-center border-r border-gray-200">
                    {tt.MC_TTHC_GV_SoLuong_TraDoSai ?? '0'}
                  </td>
                  <td className="p-2 text-center border-r border-gray-200">
                    {tt.MC_TTHC_GV_SoLuong_QuaHanChuaXuLy ?? '0'}
                  </td>
                  <td className="p-2 text-center border-r border-gray-200">
                    {tt.MC_TTHC_GV_SoLuong_QuaHanDaXuLy ?? '0'}
                  </td>
                  <td className="p-2 text-center border-r border-gray-200">
                    {tt.MC_TTHC_GV_SoLuong_HoanThanhDungHan ?? '0'}
                  </td>
                  <td className="p-2 text-center">
                    {tt.MC_TTHC_GV_SoLuong_DangTrongThoiHanXuLy ?? '0'}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-200">
                <td colSpan={8}>
                  <p className="text-center text-red-600 font-semibold py-4">
                    Không có dữ liệu thống kê!
                  </p>
                </td>
              </tr>
            )}
            <tr>
              <th
                colSpan={3}
                className="p-2 text-center border-r border-gray-200"
              >
                Tổng
              </th>
              <th className="p-2 text-center border-r border-gray-200">
                {_totalSuggestion.totalCommon}
              </th>
              <th className="p-2 text-center border-r border-gray-200">
                {_totalSuggestion.totalTraDoSai}
              </th>
              <th className="p-2 text-center border-r border-gray-200">
                {_totalSuggestion.totalQuaHanChuaXuLy}
              </th>
              <th className="p-2 text-center border-r border-gray-200">
                {_totalSuggestion.totalHoanThanhDungHan}
              </th>
              <th className="p-2 text-center border-r border-gray-200">
                {_totalSuggestion.totalDangTrongThoiHanXuLy}
              </th>
            </tr>
          </tbody>
        </table>
        {/* <div className="sticky bottom-0 z-10 w-full flex items-center justify-between p-2">
          <button
            onClick={handleExportExcel}
            className="bg-cyan-600 text-white font-semibold h-10 p-2 rounded-md whitespace-nowrap hover:opacity-80"
          >
            Export Excel
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default DanhSachGuiYeuCau
