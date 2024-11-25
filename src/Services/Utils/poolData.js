/**
 *
 * @param {number} poolLimit  Cho biết mỗi lần xử lý bao nhiêu item.
 * @param {Array} array Đại diện cho một mảng, ví dụ 1 triệu item. [1,2..., 1000000]
 * @param {function} iteratorFn (Loại hàm): Đại diện cho một hàm lặp, được sử dụng để xử lý từng mục tác vụ. Hàm này trả về một đối tượng Promise hoặc một hàm không đồng bộ.
 */
function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0
  const ret = [] // Lưu trữ tất cả các tác vụ không đồng bộ
  const executing = [] // Lưu trữ các tác vụ không đồng bộ đang được thực thi

  // Hàm enqueue: xử lý logic để thêm tác vụ vào hàng đợi và đảm bảo không vượt quá giới hạn poolLimit
  const enqueue = async function () {
    if (i === array.length) {
      return Promise.resolve()
    }

    const item = array[i++] // Nhận một mục nhiệm vụ mới
    // console.log('1. Nhan item nay de thuc thi::: ', item)
    const p = Promise.resolve().then(() => iteratorFn(item))
    // console.log('2. Thuc thi item nay::: ', p)
    ret.push(p)

    let r = Promise.resolve()

    if (poolLimit <= array.length) {
      // Khi nhiệm vụ đã hoàn thành, hãy xóa nhiệm vụ đã hoàn thành khỏi mảng nhiệm vụ đang được thực thi
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= poolLimit) {
        r = Promise.race(executing)
      }
    }

    // Sau khi tác vụ nhanh hơn trong danh sách tác vụ được thực thi, tác vụ cần làm mới sẽ nhận được từ mảng
    return r.then(() => enqueue())
  }
  console.log(enqueue().then(() => Promise.all(ret)))
  return enqueue().then(() => Promise.all(ret))
}

export { asyncPool }
