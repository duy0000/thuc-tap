const fetchMultipleRequest = async (
  dataArr,
  methodFetcher,
  fieldParams,
  maxNumRequests,
) => {
  if (dataArr.length === 0) {
    // Nếu danh sách dataArr trống, giải quyết ngay lập tức với mảng kết quả trống
    return Promise.resolve([])
  }

  const results = [] // Mảng kết quả từ các yêu cầu
  let index = 0 // Chỉ số của URL đang được xử lý
  let count = 0 // Số lượng yêu cầu đã hoàn thành

  async function fetcherRequest() {
    if (index === dataArr.length) {
      return {
        isSuccess: true,
        isError: false,
      } // Nếu đã xử lý tất cả các URL, thoát khỏi hàm
    }

    const i = index // Lưu chỉ số để sử dụng trong async function
    const dataItem = dataArr[index++] // Lấy data và tăng chỉ số

    try {
      // Thực hiện yêu cầu fetch và lưu kết quả vào mảng
      results[i] = await methodFetcher(dataItem)
    } catch (err) {
      // Nếu có lỗi, lưu lỗi vào mảng kết quả
      results[i] = err
    } finally {
      // Tăng biến đếm và kiểm tra hoàn thành tất cả các yêu cầu
      if (++count === dataArr.length) {
        console.log('Hoàn thành tất cả yêu cầu')
        resolve(results)
      }
      // Đặt thời gian chờ 1 giây và sau đó gọi lại hàm yêu cầu
      setTimeout(request, 100)
    }
  }

  const times = Math.min(maxNum, dataArr.length) // Số lần yêu cầu tối đa có thể được thực hiện đồng thời
  console.log(`:::001::`, times)

  // Bắt đầu thực hiện yêu cầu đồng thời
  Array.from({ length: times }, () => setTimeout(request, 1000))
}
