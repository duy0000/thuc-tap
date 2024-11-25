import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'
import dayjs from 'dayjs'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { RiFileExcel2Fill } from 'react-icons/ri'

const __excelStyleBorder = {
  top: { style: 'thin' },
  left: { style: 'thin' },
  bottom: { style: 'thin' },
  right: { style: 'thin' },
}

export default function BtnExportExcel({
  tieuChuan,
  tieuChi,
  listThuThapMinhChungTieuChi,
}) {
  // console.log('dataExport: ', { tieuChuan, tieuChi, thuThapMinhChung, listThuThapMinhChungTieuChi })
  // return
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

    // Merge cells for the header row: Tiêu chuẩn
    worksheet.getCell('B3').value =
      `${tieuChuan.KT_KDCL_TieuChuan_Ma}. ${tieuChuan.KT_KDCL_TieuChuan_Ten}`
    worksheet.getCell('B3').font = {
      name: 'Times New Roman', // Optional: set font family
      bold: true, // Set to bold
      size: 13, // Optional: set font size
    }
    worksheet.getCell('B3').alignment = {
      vertical: 'middle',
      wrapText: true,
    }
    worksheet.getCell('A3').value = '1'
    worksheet.getCell('A3').alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    }
    worksheet.mergeCells('B3:E3')
    const row3 = worksheet.getRow(3)
    row3.eachCell((cell) => {
      cell.font = {
        name: 'Times New Roman', // Font family
        size: 13, // Font size
        bold: true,
      }
      cell.border = __excelStyleBorder
    })

    // Merge cells for the header row: Tiêu chí
    worksheet.getCell('B4').value =
      `${tieuChi.KT_KDCL_TieuChi_Ma}. ${tieuChi.KT_KDCL_TieuChi_JSON_DATA?.map((i) => i.KT_KDCL_BoTieuChuan_NoiDung).join(', ')}`
    worksheet.getCell('B4').font = {
      name: 'Times New Roman', // Optional: set font family
      bold: true, // Set to bold
      size: 13, // Optional: set font size
    }
    worksheet.getCell('B4').alignment = {
      vertical: 'middle',
      wrapText: true,
    }
    worksheet.getCell('A4').value = '2'
    worksheet.getCell('A4').alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    }
    worksheet.mergeCells('B4:E4')
    const row4 = worksheet.getRow(4)
    row4.eachCell((cell) => {
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

    listThuThapMinhChungTieuChi.forEach((item, index) => {
      const row = worksheet.addRow([
        index + 3,
        item.KT_KDCL_TaiLieu_Ma,
        item.KT_KDCL_TaiLieu_Ten,
        [
          item.KT_KDCL_TaiLieu_SoBanHanh,
          dayjs(item.KT_KDCL_TaiLieu_NgayBanHanh).format('DD/MM/YYYY'),
        ].join(', '),
        item.KT_KDCL_TaiLieu_NoiBanHanh,
      ])

      row.getCell(1).style = cellStyle
      row.getCell(2).style = cellStyle
      row.getCell(3).style = cellStyle
      row.getCell(4).style = cellStyle
      row.getCell(5).style = cellStyle
    })

    // Set custom widths for each column
    worksheet.columns = [
      { width: 6 }, // Column A (STT)
      { width: 34 }, // Column B (Mã minh chứng)
      { width: 40 }, // Column C (Tên minh chứng)
      { width: 20 }, // Column D (Số, ngày/tháng/năm)
      { width: 20 }, // Column E (Nơi ban hành)
    ]

    // row1.eachCell((cell) => {
    //   cell.font = {
    //     name: 'Times New Roman', // Font family
    //     size: 13, // Font size
    //     bold: true,
    //   }
    // })

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
