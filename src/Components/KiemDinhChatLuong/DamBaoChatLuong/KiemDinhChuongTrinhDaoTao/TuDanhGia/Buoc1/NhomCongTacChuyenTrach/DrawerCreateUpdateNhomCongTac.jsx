import { Drawer } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import { useImperativeHandle, useRef, forwardRef, useEffect } from 'react'

export default forwardRef(function DrawerCreateUpdateNhomCongTac(
  { form, setForm, formTitle, onSubmit, onCanceled, isOpenForm, isPosting },
  ref,
) {
  const drawerRef = useRef()

  const _onCanceled = () => {
    onCanceled()
    drawerRef.current?.close()
  }

  useEffect(() => {
    if (isOpenForm) drawerRef.current?.open()
    else drawerRef.current?.close()
  }, [isOpenForm])

  useImperativeHandle(ref, () => ({
    open: () => drawerRef.current?.open(),
    close: () => drawerRef.current?.close(),
  }))

  return (
    <Drawer ref={drawerRef}>
      <Drawer.Header>
        <h3 className="text-uneti-primary text-lg">
          <b>{formTitle}</b>
        </h3>
      </Drawer.Header>

      <Drawer.Content>
        <div className="w-80">
          <div>
            <label
              className="ml-2 text-slate-500"
              htmlFor="KT_KDCL_CTDT_NhomChuyenTrach_TenNhom"
            >
              Tên nhóm
            </label>
            <input
              value={form.KT_KDCL_CTDT_NhomChuyenTrach_TenNhom}
              onChange={(event) =>
                setForm({
                  ...form,
                  KT_KDCL_CTDT_NhomChuyenTrach_TenNhom: event.target.value,
                })
              }
              id="KT_KDCL_CTDT_NhomChuyenTrach_TenNhom"
              className="base-input w-full"
              placeholder="Nhập tên nhóm, eg: N1 N2 N3..."
            />
          </div>
        </div>
      </Drawer.Content>

      <Drawer.Footer>
        <div className="flex gap-2 justify-end">
          <Button disabled={isPosting} color="danger" onClick={_onCanceled}>
            Hủy
          </Button>
          <Button isLoading={isPosting} onClick={onSubmit}>
            Cập nhật
          </Button>
        </div>
      </Drawer.Footer>
    </Drawer>
  )
})
