import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Drawer } from '@/Components/Base'
import { cloneDeep } from 'lodash-unified'
import Swal from 'sweetalert2'
import { updateTieuChuan } from '@/Apis/KDCL/BoTieuChuan/apiTieuChuan'
import Button from '@/Components/Base/Button/Button'

export const DrawerUpdateTieuChuan = forwardRef(
  ({ boTieuChuanSelected, tieuChuanUpdating, onUpdated = () => null }, ref) => {
    const drawerRef = useRef()

    const [isPosting, setIsPosting] = useState(false)
    const [tieuChuan, setTieuChuan] = useState()

    useEffect(() => {
      setTieuChuan(cloneDeep(tieuChuanUpdating))
    }, [tieuChuanUpdating])

    const onUpdate = async () => {
      if (isPosting || !tieuChuan) return
      try {
        setIsPosting(true)
        await updateTieuChuan({
          KT_KDCL_TieuChuan_IDBoTieuChuan:
            boTieuChuanSelected.KT_KDCL_BoTieuChuan_ID,
          KT_KDCL_TieuChuan_ID: tieuChuan.KT_KDCL_TieuChuan_ID,
          KT_KDCL_TieuChuan_Ma: tieuChuan.KT_KDCL_TieuChuan_Ma,
          KT_KDCL_TieuChuan_Ten: tieuChuan.KT_KDCL_TieuChuan_Ten,
        })
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Chỉnh sửa tiêu chuẩn thành công',
        })
        drawerRef.current?.close()
        onUpdated?.()
      } catch (e) {
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
      toggle: () => {
        drawerRef.current?.toggle()
      },
    }))

    return (
      <Drawer persistent ref={drawerRef} minWidth={400}>
        <Drawer.Header>
          <div className="text-gray-600 text-lg flex gap-2">
            Chỉnh sửa tiêu chuẩn:{' '}
            <b
              dangerouslySetInnerHTML={{
                __html: tieuChuanUpdating?.KT_KDCL_TieuChuan_Ma,
              }}
            >
              {}
            </b>
          </div>
          <p className="text-base">
            Thuộc bộ tiêu chuẩn:{' '}
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
                value={tieuChuan?.KT_KDCL_TieuChuan_Ma || ''}
                onChange={(event) =>
                  setTieuChuan((p) => ({
                    ...p,
                    KT_KDCL_TieuChuan_Ma: event.target.value,
                  }))
                }
                placeholder="Nhập mã tiêu chuẩn"
              />
            </div>
            <div className="flex items-start">
              <label className="inline-block w-[60px] mt-2">
                Tên <span className="text-red-400">*</span>
              </label>

              <input
                className="base-input flex-1 p-2 w-56"
                value={tieuChuan?.KT_KDCL_TieuChuan_Ten || ''}
                onChange={(event) =>
                  setTieuChuan((p) => ({
                    ...p,
                    KT_KDCL_TieuChuan_Ten: event.target.value,
                  }))
                }
                placeholder="Nhập tên tiêu chuẩn"
              />
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Footer>
          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={() => drawerRef.current?.close()}
              color="danger"
              disabled={isPosting}
            >
              Hủy
            </Button>
            <Button onClick={onUpdate} isLoading={isPosting}>
              Cập nhật
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    )
  },
)

DrawerUpdateTieuChuan.displayName = 'DrawerUpdateTieuChuan'
