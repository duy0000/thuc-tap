import Dialog from '@/Components/Base/Dialog/Dialog'
import { useRef } from 'react'
import { useState } from 'react'

export default function HuongDanSuDung() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const dialogRef = useRef()

  return (
    <>
      <button
        onClick={() => setIsOpenDialog(true)}
        className="cursor-pointer duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl hover:bg-sky-800 hover:text-white"
      >
        Hướng dẫn sử dụng
      </button>

      <Dialog
        ref={dialogRef}
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        header={
          <h2 className="uppercase text-uneti-primary text-lg md:text-xl font-bold">
            Quy trình thực hiện
          </h2>
        }
        footer={
          <div className="flex justify-end">
            <button
              onClick={() => dialogRef.current.close()}
              className="rounded-xl outline-none border-none px-8 py-2 bg-uneti-primary text-white"
            >
              OK
            </button>
          </div>
        }
      >
        <ul>
          <li>
            <p className="text-gray-900 md:text-lg mb-4">
              <span className="font-bold">Bước 1: </span>
              <span>
                Giảng viên thực hiện đăng ký mượn thiết bị (đăng ký trong vòng 1
                tuần trước buổi dạy và phải hoàn thành đăng ký ít nhất 3 ngày
                trước thời gian lên lớp).
              </span>
            </p>
          </li>
          <li>
            <p className="text-gray-900 md:text-lg mb-4">
              <span className="font-bold">Bước 2: </span>
              <span>
                Căn cứ vào đăng ký của giảng viên, bộ phận thiết bị giảng đường
                sẽ xem xét và phê duyệt (kết quả phê duyệt sẽ được thông báo qua
                email).
              </span>
            </p>
            <ul>
              <li>
                <p className="text-gray-900 md:text-lg mb-4">
                  <span>
                    <span>o </span>
                    <span className="font-bold">Không phê duyệt: </span>
                  </span>
                  <span>
                    Trường hợp không có thiết bị phù hợp hoặc đề nghị được cho
                    là không thích hợp.
                  </span>
                </p>
              </li>
              <li>
                <p className="text-gray-900 md:text-lg mb-4">
                  <span>
                    <span>o </span>
                    <span className="font-bold">Phê duyệt: </span>
                  </span>
                  <span>
                    Bộ phận thiết bị sẽ chuẩn bị thiết bị và giảng viên đến nhận
                    trước giờ lên lớp 5-10 phút.
                  </span>
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p className="text-gray-900 md:text-lg mb-4">
              <span className="font-bold">Bước 3: </span>
              <span>
                Mượn / Trả thiết bị sẽ được thực hiện tại phòng bàn giao thiết
                bị của các địa điểm đào tạo. Theo quy trình Mượn / Trả thiết bị.
              </span>
            </p>
          </li>
        </ul>
      </Dialog>
    </>
  )
}
