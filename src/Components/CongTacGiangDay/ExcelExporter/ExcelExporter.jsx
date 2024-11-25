import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import logoImage from '@/assets/Images/Logo_Uneti_04_01.png'

const ExcelExporter = ({
  data,
  fileName,
  content,
  className,
  disabled,
  userInfo,
  hocKy,
  loaiLich,
  endCol,
}) => {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(
      `Lịch ${loaiLich == 0 ? 'giảng dạy' : 'coi thi'}`,
    )
    const response = await fetch(logoImage)
    const imageBuffer = await response.arrayBuffer() // Chuyển ảnh thành ArrayBuffer

    const imageId = workbook.addImage({
      buffer: imageBuffer,
      extension: 'png', // Loại ảnh
    })

    worksheet.addImage(imageId, {
      tl: { col: 0, row: 0 }, // Vị trí bắt đầu tại ô B2 (col: 1, row: 1)
      ext: { width: 70, height: 70 }, // Kích thước ảnh
    })

    // 1. Tiêu đề ở góc trên bên trái
    worksheet.mergeCells('A1:C3')
    const titleCellLeft = worksheet.getCell('A1')
    titleCellLeft.value =
      'BỘ CÔNG THƯƠNG\nTRƯỜNG ĐẠI HỌC KINH TẾ\nKỸ THUẬT CÔNG NGHIỆP'
    titleCellLeft.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    }
    titleCellLeft.font = { bold: true, size: 11 }
    worksheet.getRow(1).height = 40

    // 2. Tiêu đề ở góc trên bên phải

    const endColumn = String.fromCharCode(64 + endCol) // Calculate the letter for the end column
    const startTitleCellRightColumn = String.fromCharCode(64 + endCol - 3) // Calculate the letter for the start column, exactly 2 columns before

    worksheet.mergeCells(`${startTitleCellRightColumn}1:${endColumn}3`) // Merge cells across row 1

    const titleCellRight = worksheet.getCell(`${startTitleCellRightColumn}1`)
    titleCellRight.value =
      'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n-----------------------------'

    titleCellRight.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    }
    titleCellRight.font = { bold: true, size: 11 }

    // 3. Tiêu đề chính ở giữa
    worksheet.mergeCells(`A5:${endColumn}5`)
    const mainTitle = worksheet.getCell('A5')
    mainTitle.value = `LỊCH ${loaiLich == 0 ? 'GIẢNG DẠY' : 'COI THI'} CHI TIẾT CỦA GIẢNG VIÊN\nPHÒNG ĐÀO TẠO HN`
    mainTitle.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    }
    mainTitle.font = { bold: true, size: 16 }
    worksheet.getRow(5).height = 60

    // 4. Tiêu đề phụ (học kỳ, năm học)
    worksheet.mergeCells(`A6:${endColumn}6`)
    const subTitle = worksheet.getCell('A6')
    subTitle.value = `${hocKy}`
    subTitle.alignment = { horizontal: 'center', vertical: 'middle' }
    subTitle.font = { bold: true, size: 16 }

    // 5. Thông tin giảng viên
    worksheet.mergeCells('A8:C8')
    worksheet.getCell('A8').value = 'Thông tin giảng viên'
    worksheet.getCell('A8').alignment = {
      horizontal: 'left',
      vertical: 'middle',
    }

    worksheet.mergeCells('C9:D9')
    worksheet.getCell('B9').value = 'Họ tên'
    worksheet.getCell('B9').alignment = {
      horizontal: 'left',
      vertical: 'middle',
    }
    worksheet.getCell('B8').font = { size: 13 }
    worksheet.getCell('C9').value =
      `${userInfo.HoDem} ${userInfo.Ten}-${userInfo.MaNhanSu}`
    worksheet.getCell('C9').alignment = {
      horizontal: 'left',
      vertical: 'middle',
    }
    worksheet.getCell('C9').font = { size: 13 }
    worksheet.mergeCells('A11:B11')
    worksheet.getCell('A11').value =
      `Lịch ${loaiLich == 0 ? 'giảng dạy' : 'coi thi'}`
    worksheet.getCell('A11').font = { bold: true, size: 13, italic: true }

    // 6. Phần tiêu đề bảng
    if (loaiLich == 0) {
      worksheet.getColumn(1).width = 5 // Cột A
      worksheet.getColumn(2).width = 15 // Cột B
      worksheet.getColumn(3).width = 25 // Cột C
      worksheet.getColumn(4).width = 5 // Cột D
      worksheet.getColumn(5).width = 20 // Cột E
      worksheet.getColumn(6).width = 7 // Cột F
      worksheet.getColumn(7).width = 5 // Cột I
      worksheet.getColumn(8).width = 5 // Cột J
      worksheet.getColumn(9).width = 5 // Cột K
      worksheet.getColumn(10).width = 15 // Cột L
      worksheet.getColumn(11).width = 25 // Cột M
      worksheet.getColumn(12).width = 12 // Cột

      worksheet.mergeCells('A12:A13')
      worksheet.getCell('A12').value = 'STT'
      worksheet.getCell('A12').font = { bold: true }

      worksheet.mergeCells('B12:B13')
      worksheet.getCell('B12').value = 'Mã LHP'
      worksheet.getCell('B12').font = { bold: true }

      worksheet.mergeCells('C12:C13')
      worksheet.getCell('C12').value = 'Lớp học'
      worksheet.getCell('C12').font = { bold: true }

      worksheet.mergeCells('D12:D13')
      worksheet.getCell('D12').value = 'Sĩ số'
      worksheet.getCell('D12').font = { bold: true }

      worksheet.mergeCells('E12:E13')
      worksheet.getCell('E12').value = 'Môn học'
      worksheet.getCell('E12').font = { bold: true }

      worksheet.mergeCells('F12:F13')
      worksheet.getCell('F12').value = 'Nhóm'
      worksheet.getCell('F12').font = { bold: true }
      worksheet.mergeCells('G12:G13')
      worksheet.getCell('G12').value = 'Thứ'
      worksheet.getCell('G12').font = { bold: true }

      worksheet.mergeCells('H12:I12')
      worksheet.getCell('H12').value = 'Tiết'
      worksheet.getCell('H12').font = { bold: true }

      worksheet.getCell('H13').value = 'Từ'
      worksheet.getCell('H13').font = { bold: true }

      worksheet.getCell('I13').value = 'Đến'
      worksheet.getCell('I13').font = { bold: true }

      worksheet.mergeCells('J12:J13')
      worksheet.getCell('J12').value = 'Ngày Bắt Đầu'
      worksheet.getCell('J12').font = { bold: true }

      worksheet.mergeCells('K12:K13')
      worksheet.getCell('K12').value = 'Phòng'
      worksheet.getCell('K12').font = { bold: true }

      worksheet.mergeCells('L12:L13')
      worksheet.getCell('L12').value = 'Trạng Thái'
      worksheet.getCell('L12').font = { bold: true }
    } else {
      // Đặt độ rộng cho các cột trong bảng
      worksheet.getColumn(1).width = 5 // Cột A
      worksheet.getColumn(2).width = 15 // Cột B
      worksheet.getColumn(3).width = 15 // Cột C
      worksheet.getColumn(4).width = 15 // Cột D
      worksheet.getColumn(5).width = 5 // Cột E
      worksheet.getColumn(6).width = 20 // Cột F
      worksheet.getColumn(7).width = 5 // Cột G
      worksheet.getColumn(8).width = 14 // Cột H
      worksheet.getColumn(9).width = 7 // Cột I
      worksheet.getColumn(10).width = 7 // Cột J
      worksheet.getColumn(11).width = 7 // Cột K
      worksheet.getColumn(12).width = 7 // Cột L
      worksheet.getColumn(13).width = 15 // Cột M
      worksheet.getColumn(14).width = 10 // Cột N
      worksheet.getColumn(15).width = 20 // Cột O
      worksheet.getColumn(16).width = 20 // Cột P
      worksheet.getColumn(17).width = 20 // Cột Q
      worksheet.getColumn(19).width = 20 // Cột r

      // Tiêu đề cột bắt đầu từ A12
      worksheet.mergeCells('A12:A13')
      worksheet.getCell('A12').value = 'STT'
      worksheet.getCell('A12').font = { bold: true }

      worksheet.mergeCells('B12:B13')
      worksheet.getCell('B12').value = 'Lớp học'
      worksheet.getCell('B12').font = { bold: true }

      worksheet.mergeCells('C12:C13')
      worksheet.getCell('C12').value = 'Lớp dự kiến'
      worksheet.getCell('C12').font = { bold: true }

      worksheet.mergeCells('D12:D13')
      worksheet.getCell('D12').value = 'Mã LHP'
      worksheet.getCell('D12').font = { bold: true }

      worksheet.mergeCells('E12:E13')
      worksheet.getCell('E12').value = 'Sĩ số'
      worksheet.getCell('E12').font = { bold: true }

      worksheet.mergeCells('F12:F13')
      worksheet.getCell('F12').value = 'Tên môn học'
      worksheet.getCell('F12').font = { bold: true }

      worksheet.mergeCells('G12:G13')
      worksheet.getCell('G12').value = 'Thứ'
      worksheet.getCell('G12').font = { bold: true }

      worksheet.mergeCells('H12:H13')
      worksheet.getCell('H12').value = 'Ngày thi'
      worksheet.getCell('H12').font = { bold: true }

      worksheet.mergeCells('I12:I13')
      worksheet.getCell('I12').value = 'Nhóm'
      worksheet.getCell('I12').font = { bold: true }

      worksheet.mergeCells('J12:J13')
      worksheet.getCell('J12').value = 'Từ tiết'
      worksheet.getCell('J12').font = { bold: true }
      worksheet.getCell('J12').alignment = {
        wrapText: true,
      }

      worksheet.mergeCells('K12:K13')
      worksheet.getCell('K12').value = 'Đến tiết'
      worksheet.getCell('K12').font = { bold: true }
      worksheet.getCell('K12').alignment = {
        wrapText: true,
      }

      worksheet.mergeCells('L12:L13')
      worksheet.getCell('L12').value = 'Thời gian thi'
      worksheet.getCell('L12').font = { bold: true }
      worksheet.getCell('L12').alignment = {
        wrapText: true,
      }

      worksheet.mergeCells('M12:M13')
      worksheet.getCell('M12').value = 'Hình thức thi'
      worksheet.getCell('M12').font = { bold: true }

      worksheet.mergeCells('N12:N13')
      worksheet.getCell('N12').value = 'Cơ sở'
      worksheet.getCell('N12').font = { bold: true }

      worksheet.mergeCells('O12:O13')
      worksheet.getCell('O12').value = 'Phòng thi'
      worksheet.getCell('O12').font = { bold: true }

      worksheet.mergeCells('P12:P13')
      worksheet.getCell('P12').value = 'Giảng viên coi thi 01'
      worksheet.getCell('P12').font = { bold: true }

      worksheet.mergeCells('Q12:Q13')
      worksheet.getCell('Q12').value = 'Giảng viên coi thi 02'
      worksheet.getCell('Q12').font = { bold: true }

      worksheet.mergeCells('R12:R13')
      worksheet.getCell('R12').value = 'Ghi chú'
      worksheet.getCell('R12').font = { bold: true }
    }

    // Căn giữa và thêm viền cho bảng
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        if (rowNumber >= 12 && rowNumber <= 13) {
          cell.alignment = { vertical: 'middle', horizontal: 'center' }
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          }
        }
      })
    })

    for (let row = 1; row <= 12; row++) {
      for (let col = 1; col <= endCol; col++) {
        const cell = worksheet.getCell(row, col)
        if (row <= 11 && col <= endCol) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' },
          }
          cell.border = {
            top: {},
            left: {},
            bottom: {},
            right: {},
          }
        }
      }
    }

    // Thêm dữ liệu vào worksheet
    data.forEach((item) => {
      const row = worksheet.addRow(Object.values(item))

      row.eachCell((cell) => {
        cell.alignment = {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true,
        }
        // Set  border
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    })
    worksheet.getCell('A8').font = {
      bold: true, // In đậm
      size: 13, // Kích thước chữ
      italic: true, // In nghiêng
    }
    // Tải file Excel về
    const buffer = await workbook.xlsx.writeBuffer()
    const fileBlob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(fileBlob, `${fileName}.xlsx`)
  }

  return (
    <button onClick={exportToExcel} className={className} disabled={disabled}>
      {content}
    </button>
  )
}

export default ExcelExporter
