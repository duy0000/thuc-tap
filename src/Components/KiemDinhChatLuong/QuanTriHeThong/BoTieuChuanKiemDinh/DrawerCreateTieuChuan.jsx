import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Drawer } from '@/Components/Base'
import Swal from 'sweetalert2'
import { createTieuChuan } from '@/Apis/KDCL/BoTieuChuan/apiTieuChuan'
import Button from '@/Components/Base/Button/Button'

export const DrawerCreateTieuChuan = forwardRef(
  ({ boTieuChuanSelected, onCreated = () => null }, ref) => {
    const drawerRef = useRef()

    const [isPosting, setIsPosting] = useState(false)
    const [ten, setTen] = useState('')
    const [ma, setMa] = useState('')

    const validate = () => {
      if (!ma.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Mã tiêu chuẩn không được để trống',
        })
        return false
      }

      if (!ten.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Tên tiêu chuẩn không được để trống',
        })
        return false
      }

      return true
    }

    const onCreate = async () => {
      if (isPosting || !validate()) return
      try {
        setIsPosting(true)
        await createTieuChuan({
          KT_KDCL_TieuChuan_IDBoTieuChuan:
            boTieuChuanSelected.KT_KDCL_BoTieuChuan_ID,
          KT_KDCL_TieuChuan_Ma: ma,
          KT_KDCL_TieuChuan_Ten: ten,
        })
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thêm tiêu chuẩn thành công',
        })
        drawerRef.current?.close()
        onCreated?.()

        setMa('')
        setTen('')
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Có lỗi xảy ra, vui lòng thử lại sau',
        })
      } finally {
        setIsPosting(false)
      }
    }

    useImperativeHandle(ref, () => ({
      open: () => {
        drawerRef.current?.open()
      },
      close: () => {
        drawerRef.current?.close()
      },
    }))

    return (
      <Drawer ref={drawerRef}>
        <Drawer.Header>
          <h3 className="text-gray-600 text-lg">
            <b>Thêm tiêu chuẩn</b>
          </h3>
          <p className="text-base">
            Thuộc bộ tiêu chuẩn:
            <b>{boTieuChuanSelected?.KT_KDCL_BoTieuChuan_Ten}</b>
          </p>
        </Drawer.Header>
        <Drawer.Content>
          <div className="my-5 mr-1 flex flex-col gap-4">
            <div className="flex items-start">
              <label className="inline-block w-[60px] mt-2">
                Mã <span className="text-red-400">*</span>
              </label>
              <input
                className="base-input flex-1 p-2 w-56"
                value={ma}
                onChange={(e) => setMa(e.target.value)}
                placeholder="Nhập mã tiêu chuẩn"
              />
            </div>
            <div className="flex items-start">
              <label className="inline-block w-[60px] mt-2">
                Tên <span className="text-red-400">*</span>
              </label>

              <input
                className="base-input flex-1 p-2 w-56"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
                placeholder="Nhập tên tiêu chuẩn"
              />
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Footer>
          <div className="flex items-center justify-end gap-3">
            <Button
              color="danger"
              disabled={isPosting}
              onClick={() => drawerRef.current?.close()}
            >
              Hủy
            </Button>
            <Button isLoading={isPosting} onClick={onCreate}>
              Cập nhật
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    )
  },
)

DrawerCreateTieuChuan.displayName = 'DrawerCreateTieuChuan'
