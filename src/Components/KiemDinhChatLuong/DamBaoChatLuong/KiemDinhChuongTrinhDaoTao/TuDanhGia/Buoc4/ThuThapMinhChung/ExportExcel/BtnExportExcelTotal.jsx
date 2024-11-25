import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'
import dayjs from 'dayjs'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { useContext, useMemo } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { useMinhChungStore } from '@/Services/Store/Module/KiemDinhChatLuong/minhChung'
import {
  useThuThapMinhChungStore,
  useThuThapMinhChungTieuChiStore,
} from '@/Services/Store'

const __excelStyleBorder = {
  top: { style: 'thin' },
  left: { style: 'thin' },
  bottom: { style: 'thin' },
  right: { style: 'thin' },
}

export default function BtnExportExcelTotal() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const { listMinhChung } = useMinhChungStore()
  const { listThuThapMinhChung } = useThuThapMinhChungStore()
  const { listThuThapMinhChungTieuChi: _listThuThapMinhChungTieuChi } =
    useThuThapMinhChungTieuChiStore()

  const listThuThapMinhChungHoiDong = useMemo(() => {
    return listThuThapMinhChung.filter(
      (e) =>
        e.KT_KDCL_CTDT_ThuThapMinhChung_IDThanhLapHoiDong ==
        hoSoKiemDinh.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [listThuThapMinhChung, hoSoKiemDinh.hoiDong])

  const listThuThapMinhChungTieuChi = useMemo(() => {
    if (!listMinhChung.length) return []

    return _listThuThapMinhChungTieuChi.map((e) => {
      const minhChung = listMinhChung.find(
        (mc) =>
          mc.KT_KDCL_TaiLieu_ID ===
          e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDMinhChung,
      )

      return {
        ...e,
        ...minhChung,
      }
    })
  }, [_listThuThapMinhChungTieuChi, listMinhChung])

  const handleExport = async () => {
    const wb = new ExcelJS.Workbook()
    const worksheet = wb.addWorksheet('Sheet 1')
    worksheet.properties.defaultRowHeight = 40
    // Đặt font cho toàn bộ sheet (lặp qua tất cả các hàng và ô)

    // Merge cells for the header row
    worksheet.mergeCells('A1:E1')
    worksheet.getCell('A1').value = 'DANH MỤC MINH CHỨNG NGÀNH'
    worksheet.getCell('A1').font = {
      bold: true,
    }
    worksheet.getCell('A1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
    worksheet.getCell('D1').border = {
      right: { style: 'thin' },
    }
    worksheet.getCell('A1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    }

    const row1 = worksheet.getRow(1)
    row1.eachCell((cell) => {
      cell.font = { bold: true }
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      }
    })
    // Merge cells for the second-header row
    const row2 = worksheet.getRow(2)
    row2.getCell(1).font = { bold: true }
    row2.values = [
      'STT',
      'Mã minh chứng',
      'Tên minh chứng',
      'Số, ngày/tháng/năm',
      'Nơi ban hành',
    ]
    // Style the second row (row 2)
    row2.eachCell((cell) => {
      cell.font = { bold: true }
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      }
      cell.border = __excelStyleBorder
    })

    // Apply style to merged cells in row 1 and 2
    const cellStyle = {
      border: __excelStyleBorder,
      alignment: { horizontal: 'left', vertical: 'middle', wrapText: true },
    }

    let currentRow = 3
    hoSoKiemDinh.listTieuChuan.forEach((tieuChuan) => {
      // Merge cells for the header row: Tiêu chuẩn
      worksheet.getCell(`B${currentRow}`).value =
        `${tieuChuan.KT_KDCL_TieuChuan_Ma}. ${tieuChuan.KT_KDCL_TieuChuan_Ten}`
      worksheet.getCell(`B${currentRow}`).font = {
        name: 'Times New Roman', // Optional: set font family
        bold: true, // Set to bold
        size: 13, // Optional: set font size
      }
      worksheet.getCell(`B${currentRow}`).alignment = {
        vertical: 'middle',
        wrapText: true,
      }
      worksheet.getCell(`A${currentRow}`).value = `${currentRow - 2}`
      worksheet.getCell(`A${currentRow}`).alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      }
      worksheet.mergeCells(`B${currentRow}:E${currentRow}`)
      const row = worksheet.getRow(currentRow)

      row.eachCell((cell, colNumber) => {
        cell.font = {
          name: 'Times New Roman', // Font family
          size: 13, // Font size
          bold: colNumber !== 1 ? true : false,
        }
        cell.border = __excelStyleBorder
      })

      const listTieuChi =
        hoSoKiemDinh.listTieuChiMappedByTieuChuanID[
          tieuChuan.KT_KDCL_TieuChuan_ID
        ]

      currentRow += 1
      listTieuChi.forEach((tieuChi) => {
        // Merge cells for the header row: Tiêu chí
        worksheet.getCell(`B${currentRow}`).value =
          `${tieuChi.KT_KDCL_TieuChi_Ma}. ${tieuChi.KT_KDCL_TieuChi_JSON_DATA?.map((i) => i.KT_KDCL_BoTieuChuan_NoiDung).join(', ')}`
        worksheet.getCell(`B${currentRow}`).font = {
          name: 'Times New Roman', // Optional: set font family
          bold: true, // Set to bold
          size: 13, // Optional: set font size
        }
        worksheet.getCell(`B${currentRow}`).alignment = {
          vertical: 'middle',
          wrapText: true,
        }
        worksheet.getCell(`A${currentRow}`).value = `${currentRow - 2}`
        worksheet.getCell(`A${currentRow}`).alignment = {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true,
        }
        worksheet.mergeCells(`B${currentRow}:E${currentRow}`)
        const row = worksheet.getRow(currentRow)

        row.eachCell((cell, colNumber) => {
          cell.font = {
            name: 'Times New Roman', // Font family
            size: 13, // Font size
            bold: colNumber !== 1 ? true : false,
          }
          cell.border = __excelStyleBorder
        })

        if (currentRow == 4) {
          worksheet.getRow(currentRow).eachCell((cell) => {
            cell.font = {
              name: 'Times New Roman', // Font family
              size: 13, // Font size
              bold: true,
            }
            cell.border = __excelStyleBorder
          })
          worksheet.eachRow((row) => {
            row.eachCell((cell) => {
              cell.font = {
                name: 'Times New Roman', // Font family
                size: 13, // Font size
                bold: true,
              }
            })
          })
        }

        currentRow += 1

        const listThuThapMinhChungHoiDongTieuChi =
          listThuThapMinhChungHoiDong.find(
            (e) =>
              e.KT_KDCL_CTDT_ThuThapMinhChung_IDTieuChi ===
              tieuChi.KT_KDCL_TieuChi_ID,
          )

        if (!listThuThapMinhChungHoiDongTieuChi) return

        const _listThuThapMinhChungTieuChi = listThuThapMinhChungTieuChi.filter(
          (e) =>
            e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDThuThapMinhChung ==
            listThuThapMinhChungHoiDongTieuChi.KT_KDCL_CTDT_ThuThapMinhChung_ID,
        )

        listMinhChung.forEach((minhChung) => {
          if (
            !_listThuThapMinhChungTieuChi.find(
              (thuThapMC) =>
                thuThapMC.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDMinhChung ==
                minhChung.KT_KDCL_TaiLieu_ID,
            )
          )
            return

          const row = worksheet.addRow([
            currentRow - 2,
            minhChung.KT_KDCL_TaiLieu_Ma,
            minhChung.KT_KDCL_TaiLieu_Ten,
            [
              minhChung.KT_KDCL_TaiLieu_SoBanHanh,
              dayjs(minhChung.KT_KDCL_TaiLieu_NgayBanHanh).format('DD/MM/YYYY'),
            ].join(', '),
            minhChung.KT_KDCL_TaiLieu_NoiBanHanh,
          ])

          row.getCell(1).style = cellStyle
          row.getCell(2).style = cellStyle
          row.getCell(3).style = cellStyle
          row.getCell(4).style = cellStyle
          row.getCell(5).style = cellStyle
          worksheet.getCell(`A${currentRow}`).alignment = {
            horizontal: 'center',
            vertical: 'middle',
            wrapText: true,
          }
          currentRow += 1
        })
      })

      // Set custom widths for each column
      worksheet.columns = [
        { width: 6 }, // Column A (STT)
        { width: 34 }, // Column B (Mã minh chứng)
        { width: 40 }, // Column C (Tên minh chứng)
        { width: 20 }, // Column D (Số, ngày/tháng/năm)
        { width: 20 }, // Column E (Nơi ban hành)
      ]
    })

    // Generate Excel file and trigger download
    let currentDate = dayjs().format('DD-MM-YYYY')
    const buffer = await wb.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(blob, `KDCL_${currentDate}.xlsx`)
  }

  return (
    <Button onClick={handleExport}>
      <Icon>
        <RiFileExcel2Fill />
      </Icon>
      Xuất file
    </Button>
  )
}
