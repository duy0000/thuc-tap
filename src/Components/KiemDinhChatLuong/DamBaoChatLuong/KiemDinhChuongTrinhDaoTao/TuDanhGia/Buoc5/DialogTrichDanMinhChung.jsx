import Button from '@/Components/Base/Button/Button'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { useEffect, useRef, useState } from 'react'

export default function DialogTrichDanMinhChung({
  isOpen,
  setIsOpen,
  handleSubmit,
}) {
  const dialogRef = useRef()
  const inputRef = useRef()

  const [trichDan, setTrichDan] = useState('')

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  return (
    <Dialog
      ref={dialogRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={
        <h3 className="pt-2 font-medium text-uneti-primary text-base">
          Trích dẫn minh chứng
        </h3>
      }
      footer={
        <div className="flex justify-end">
          <Button
            type="border"
            onClick={() => {
              handleSubmit(trichDan)
              dialogRef.current.close()
            }}
          >
            Xác nhận
          </Button>
        </div>
      }
    >
      <p className="ml-2 text-gray-500">
        Vui lòng điền thông tin minh chứng chi tiết, như trang minh chứng...
      </p>

      <input
        ref={inputRef}
        type="text"
        placeholder="Ví dụ: Trang số 12"
        className="base-input w-full"
        value={trichDan}
        onChange={(e) => setTrichDan(e.target.value)}
      />
    </Dialog>
  )
}
