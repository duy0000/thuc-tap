import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Drawer } from '@/Components/Base'
import Swal from 'sweetalert2'
import { updateTieuChi } from '@/Apis/KDCL/BoTieuChuan/apiTieuChi'
import { cloneDeep } from 'lodash-unified'
import Button from '@/Components/Base/Button/Button'
import CloseCircle from '@/Components/Base/Icons/CloseCircle'
import Icon from '@/Components/Base/Icon/Icon'

export const DrawerUpdateTieuChi = forwardRef(
  (
    {
      boTieuChuanSelected,
      tieuChuanSelected,
      tieuChiUpdating,
      onUpdated = () => null,
    },
    ref,
  ) => {
    const drawerRef = useRef()

    const [isPosting, setIsPosting] = useState(false)
    const [tieuChi, setTieuChi] = useState({})

    const [mocChuan, setMocChuan] = useState(
      tieuChi?.KT_KDCL_TieuChi_MocChuan_JSON_DATA || [],
    )

    const handleChange = (tenCot, value) => {
      if (!tieuChi) return
      const oldData = tieuChi?.KT_KDCL_TieuChi_JSON_DATA || []
      const indexColAffect = oldData.findIndex(
        (e) => e?.KT_KDCL_BoTieuChuan_TenCot === tenCot,
      )
      if (indexColAffect == -1) {
        oldData.push({
          KT_KDCL_BoTieuChuan_TenCot: tenCot,
          KT_KDCL_BoTieuChuan_NoiDung: value,
        })
      } else {
        oldData.splice(indexColAffect, 1, {
          KT_KDCL_BoTieuChuan_TenCot: tenCot,
          KT_KDCL_BoTieuChuan_NoiDung: value,
        })
      }
      setTieuChi((prevData) => ({
        ...prevData,
        KT_KDCL_TieuChi_JSON_DATA: oldData,
      }))
    }

    useEffect(() => {
      const tc = cloneDeep(tieuChiUpdating)
      setTieuChi(tc)
      setMocChuan(tc?.KT_KDCL_TieuChi_MocChuan_JSON_DATA || [])
    }, [tieuChiUpdating])

    const validate = () => {
      for (const column of boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA ||
        []) {
        const columnName = column.KT_KDCL_BoTieuChuan_TenCot
        if (
          column.KT_KDCL_BoTieuChuan_BatBuoc &&
          !tieuChi.KT_KDCL_TieuChi_JSON_DATA?.find(
            (e) => e.KT_KDCL_BoTieuChuan_TenCot == columnName,
          )?.KT_KDCL_BoTieuChuan_NoiDung?.trim()
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: `${columnName} không được để trống`,
          })
          return false
        }
      }

      if (mocChuan.length) {
        for (const moc of mocChuan) {
          if (!moc.KT_KDCL_TieuChi_MocChuan_Ten) {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: 'Tên mốc chuẩn không được để trống',
            })

            return false
          }
        }
      }
      return true
    }

    const onUpdate = async () => {
      if (isPosting || !validate()) return
      try {
        setIsPosting(true)
        const formattedJsonData = JSON.stringify(
          tieuChi.KT_KDCL_TieuChi_JSON_DATA || '[]',
        )
        await updateTieuChi({
          KT_KDCL_TieuChi_ID: tieuChi.KT_KDCL_TieuChi_ID,
          KT_KDCL_TieuChi_IDTieuChuan: tieuChuanSelected.KT_KDCL_TieuChuan_ID,
          KT_KDCL_TieuChi_Ma: tieuChi.KT_KDCL_TieuChi_Ma,
          KT_KDCL_TieuChi_JSON_DATA: formattedJsonData,
          KT_KDCL_TieuChi_MocChuan_JSON_DATA: JSON.stringify(mocChuan),
        })
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Chỉnh sửa tiêu chí thành công',
        })
        drawerRef.current?.close()
        onUpdated?.()
        setTieuChi()
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
            <b>Chỉnh sửa tiêu chí</b>
          </h3>
          <p className="text-base flex gap-2">
            Thuộc tiêu chuẩn:{' '}
            <b
              dangerouslySetInnerHTML={{
                __html: tieuChuanSelected?.KT_KDCL_TieuChuan_Ten,
              }}
            ></b>
          </p>
          <p className="text-base flex gap-2">
            Thuộc bộ tiêu chuẩn:
            <b>{boTieuChuanSelected?.KT_KDCL_BoTieuChuan_Ten}</b>
          </p>
        </Drawer.Header>
        <Drawer.Content>
          <div className="my-5 mr-1 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <label className="inline-block mt-2">
                Mã tiêu chí
                <span className="text-red-400">*</span>
              </label>
              <div className="ml-auto w-[500px]">
                <input
                  className="base-input w-full"
                  value={tieuChi?.KT_KDCL_TieuChi_Ma || ''}
                  onChange={(e) =>
                    setTieuChi({
                      ...tieuChi,
                      KT_KDCL_TieuChi_Ma: e.target.value,
                    })
                  }
                  placeholder="Nhập mã tiêu chí"
                />
              </div>
            </div>
            {/* Them cac cot bi thieu neu bo tieu chuan thay doi cot */}
            {boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA?.map((e, i) => (
              <div className="flex items-start gap-3" key={i}>
                <label className="inline-block mt-2">
                  {e.KT_KDCL_BoTieuChuan_TenCot}
                  {e.KT_KDCL_BoTieuChuan_BatBuoc && (
                    <span className="text-red-400">*</span>
                  )}
                </label>
                <div className="ml-auto w-[500px]">
                  <textarea
                    className="base-input w-full"
                    value={
                      tieuChi?.KT_KDCL_TieuChi_JSON_DATA?.find(
                        (tc) =>
                          tc.KT_KDCL_BoTieuChuan_TenCot ===
                          e.KT_KDCL_BoTieuChuan_TenCot,
                      )?.KT_KDCL_BoTieuChuan_NoiDung || ''
                    }
                    onChange={(event) =>
                      handleChange(
                        e.KT_KDCL_BoTieuChuan_TenCot,
                        event.target.value,
                      )
                    }
                    placeholder={`Nhập ${e.KT_KDCL_BoTieuChuan_TenCot.toLowerCase()}`}
                  />
                </div>
              </div>
            ))}

            <div className="border-t border-t-gray-100 mt-1 pt-3">
              <h3 className="mb-1">Các mốc chuẩn (nếu có)</h3>

              <div className="overflow-auto max-h-[550px]">
                {mocChuan.length ? (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="sticky pt-2 z-[1] pb-1 top-0 bg-white text-left pl-6 text-gray-600 font-medium pt-1">
                          Tên mốc chuẩn
                        </th>
                        <th className="sticky pt-2 z-[1] pb-1 top-0 bg-white text-left pl-6 text-gray-600 font-medium pt-1">
                          Mô tả
                        </th>
                        <th className="sticky pt-2 z-[1] pb-1 top-0 bg-white"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {mocChuan.map((e, i) => (
                        <tr key={i}>
                          <td className="p-2 border-r border-b border-slate-100">
                            <div className="flex justify-center items-center">
                              <input
                                className="base-input w-full focus:!pl-[0.5rem]"
                                placeholder="Tên mốc chuẩn"
                                value={e.KT_KDCL_TieuChi_MocChuan_Ten}
                                onChange={(e) => {
                                  setMocChuan((prev) => {
                                    prev[i].KT_KDCL_TieuChi_MocChuan_Ten =
                                      e.target.value
                                    return [...prev]
                                  })
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-2 border-b border-slate-100">
                            <div className="flex justify-center items-center">
                              <input
                                className="base-input w-full focus:!pl-[0.5rem]"
                                placeholder="Mội dung mẫu (nếu có)"
                                value={e.KT_KDCL_TieuChi_MocChuan_MoTa}
                                onChange={(e) => {
                                  setMocChuan((prev) => {
                                    prev[i].KT_KDCL_TieuChi_MocChuan_MoTa =
                                      e.target.value
                                    return [...prev]
                                  })
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => {
                                setMocChuan((prev) => {
                                  prev.splice(i, 1)
                                  return [...prev]
                                })
                              }}
                              className="shrink-0 flex items-center justify-center"
                            >
                              <Icon size={20}>
                                <CloseCircle />
                              </Icon>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>

              <p className="text-slate-500 mt-1">
                * Mốc chuẩn là các mốc đánh giá tiêu chí, mỗi mốc chuẩn sẽ được
                áp dụng để đánh giá tiêu chí
              </p>
              <Button
                onClick={() =>
                  setMocChuan((prev) => [
                    ...prev,
                    {
                      KT_KDCL_TieuChi_MocChuan_Ten: '',
                      KT_KDCL_TieuChi_MocChuan_MoTa: '',
                    },
                  ])
                }
                className="w-max mt-2"
              >
                Thêm mốc chuẩn
              </Button>
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
            <Button isLoading={isPosting} onClick={onUpdate}>
              Cập nhật
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    )
  },
)

DrawerUpdateTieuChi.displayName = 'DrawerUpdateTieuChi'
