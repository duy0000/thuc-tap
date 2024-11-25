import { putBoTieuChuan } from '@/Apis/KDCL/BoTieuChuan/apiBoTieuChuan'
import { Drawer } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import { Checkbox } from '@/Components/Base/Checkbox'
import Icon from '@/Components/Base/Icon/Icon'
import { Close } from '@/Components/Base/Icons/Close'
import { transformCls } from '@/Services/Utils/reactUtils'
import { cloneDeep } from 'lodash-unified'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export const DrawerUpdateBoTieuChuan = forwardRef(
  ({ boTieuChuanSelected, onUpdated }, ref) => {
    const drawerRef = useRef()
    const checkboxRef = useRef()

    const [isUpdating, setIsUpdating] = useState(false)
    const [boTieuChuan, setBoTieuChuan] = useState()

    useEffect(() => {
      if (!boTieuChuanSelected) return
      const btc = cloneDeep(boTieuChuanSelected)
      const jsonDataWithoutContentColumn =
        btc.KT_KDCL_BoTieuChuan_JSON_DATA.slice(1)

      setBoTieuChuan({
        ...btc,
        KT_KDCL_BoTieuChuan_JSON_DATA: jsonDataWithoutContentColumn,
      })
    }, [boTieuChuanSelected])

    const changeOrderColumn = (from, to) => {
      if (to < 0) return
      if (to > boTieuChuan.KT_KDCL_BoTieuChuan_JSON_DATA.length - 1) return

      const newKT_KDCL_BoTieuChuan_JSON_DATA = cloneDeep(
        boTieuChuan.KT_KDCL_BoTieuChuan_JSON_DATA,
      )
      const dataFrom = cloneDeep(newKT_KDCL_BoTieuChuan_JSON_DATA[from])
      const dataTo = cloneDeep(newKT_KDCL_BoTieuChuan_JSON_DATA[to])
      Object.assign(newKT_KDCL_BoTieuChuan_JSON_DATA[from], dataTo)
      Object.assign(newKT_KDCL_BoTieuChuan_JSON_DATA[to], dataFrom)

      setBoTieuChuan({
        ...boTieuChuan,
        KT_KDCL_BoTieuChuan_JSON_DATA: newKT_KDCL_BoTieuChuan_JSON_DATA,
      })
    }

    const addColumn = () => {
      const newKT_KDCL_BoTieuChuan_JSON_DATA = [
        ...boTieuChuan.KT_KDCL_BoTieuChuan_JSON_DATA,
        {
          KT_KDCL_BoTieuChuan_TenCot: '',
          KT_KDCL_BoTieuChuan_BatBuoc: false,
        },
      ]

      setBoTieuChuan({
        ...boTieuChuan,
        KT_KDCL_BoTieuChuan_JSON_DATA: newKT_KDCL_BoTieuChuan_JSON_DATA,
      })
    }
    const onColumnInputChange = (value, index, col) => {
      let newData = cloneDeep(boTieuChuan?.KT_KDCL_BoTieuChuan_JSON_DATA)

      newData[index][col] = value

      setBoTieuChuan({
        ...boTieuChuan,
        KT_KDCL_BoTieuChuan_JSON_DATA: newData,
      })
    }

    const onRemoveColumn = (index) => {
      const newData = cloneDeep(boTieuChuan.KT_KDCL_BoTieuChuan_JSON_DATA)
      newData.splice(index, 1)

      setBoTieuChuan({
        ...boTieuChuan,
        KT_KDCL_BoTieuChuan_JSON_DATA: newData,
      })
    }

    const validateBeforeCreate = () => {
      if (boTieuChuan.KT_KDCL_BoTieuChuan_Ten.trim().length == 0) {
        toast('Vui lòng điền tên bộ tiêu chuẩn', {
          type: 'error',
          closeButton: false,
          autoClose: 2000,
        })

        return false
      }

      if (
        boTieuChuan.KT_KDCL_BoTieuChuan_JSON_DATA.some(
          (e) => !e.KT_KDCL_BoTieuChuan_TenCot.trim().length,
        )
      ) {
        toast('Vui lòng điền đầy đủ các cột', {
          type: 'error',
          closeButton: false,
          autoClose: 2000,
        })

        return false
      }

      return true
    }

    const preprocesorFormData = () => {
      return {
        ...boTieuChuan,
        KT_KDCL_BoTieuChuan_JSON_DATA: JSON.stringify([
          {
            KT_KDCL_BoTieuChuan_TenCot: 'Nội dung',
            KT_KDCL_BoTieuChuan_BatBuoc: true,
            KT_KDCL_BoTieuChuan_ThuTu: 0,
          },
          ...boTieuChuan.KT_KDCL_BoTieuChuan_JSON_DATA.map((e, i) => ({
            ...e,
            KT_KDCL_BoTieuChuan_ThuTu: i + 1,
          })),
        ]),
      }
    }

    const onUpdate = async () => {
      if (isUpdating || !validateBeforeCreate()) {
        return
      }

      try {
        setIsUpdating(false)
        const formData = preprocesorFormData()
        await putBoTieuChuan(formData)
        onUpdated()
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Chỉnh sửa bộ tiêu chuẩn thành công',
        })
        drawerRef.current?.close()
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Có lỗi xảy ra, vui lòng thử lại sau',
        })
      } finally {
        setIsUpdating(false)
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
      <Drawer persistent ref={drawerRef} minWidth={450}>
        <Drawer.Header>
          <h3 className="font-semibold text-gray-600 text-base">
            Chỉnh sửa bộ tiêu chuẩn
          </h3>
        </Drawer.Header>
        <Drawer.Content>
          <div className="my-5 mr-1 flex flex-col gap-4">
            <div className="flex items-center">
              <label className="inline-block w-[100px]">
                Tên <span className="text-red-400">*</span>
              </label>
              <input
                value={boTieuChuan?.KT_KDCL_BoTieuChuan_Ten || ''}
                onChange={(e) =>
                  setBoTieuChuan((p) => ({
                    ...p,
                    KT_KDCL_BoTieuChuan_Ten: e.target.value,
                  }))
                }
                className="base-input flex-1"
              />
            </div>
            <div className="flex items-center">
              <label className="inline-block w-[100px]">Mô tả</label>
              <input
                className="base-input flex-1"
                value={boTieuChuan?.KT_KDCL_BoTieuChuan_MoTa || ''}
                onChange={(e) =>
                  setBoTieuChuan((p) => ({
                    ...p,
                    KT_KDCL_BoTieuChuan_MoTa: e.target.value,
                  }))
                }
                placeholder="Không bắt buộc"
              />
            </div>
          </div>

          <div className="my-7 py-7 border-y border-y-gray-200 flex gap-3">
            <Checkbox
              ref={checkboxRef}
              checked={boTieuChuan?.KT_KDCL_BoTieuChuan_Active == 'true'}
              onChange={(isCheck) =>
                setBoTieuChuan((p) => ({
                  ...p,
                  KT_KDCL_BoTieuChuan_Active: isCheck ? 'true' : 'false',
                }))
              }
            >
              <div className="-mt-1">
                <h4
                  onClick={checkboxRef.current?.toggle}
                  className="cursor-pointer font-semibold text-gray-600 w-max"
                >
                  Sử dụng
                </h4>
                <p className="text-gray-500">
                  Cho phép sử dụng bộ tiêu chuẩn này cho các lần đánh giá trong
                  tương lai
                </p>
              </div>
            </Checkbox>
          </div>

          <div className="pb-7 border-b border-b-gray-100">
            <h3 className="font-semibold text-gray-600">
              Các cột trong bảng tiêu chí
            </h3>

            <table className="w-full mt-2 mb-4">
              <thead>
                <tr>
                  <th className="w-[80px] pb-2"></th>
                  <th className="text-left pl-4 pb-2 text-gray-600">
                    Tên cột <span className="text-red-400">*</span>
                  </th>
                  <th className="w-[100px] text-center pb-2 text-gray-600">
                    Bắt buộc
                  </th>
                  <th className="w-[56px]"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="relative">
                    <div className="absolute-full bg-gray-100 my-1 z-[-1] rounded-[10px_0_0_10px]" />
                    <div className="flex flex-col py-3 pl-5">
                      <div
                        className={transformCls([
                          'cursor-not-allowed',
                          'flex items-center',
                        ])}
                      >
                        <Icon>
                          <BiChevronUp />
                        </Icon>
                      </div>
                      <div
                        className={transformCls([
                          'cursor-not-allowed',
                          'flex items-center',
                        ])}
                      >
                        <Icon>
                          <BiChevronDown />
                        </Icon>
                      </div>
                    </div>
                  </td>

                  <td className="relative">
                    <div className="absolute-full bg-gray-100 my-1 z-[-1]" />
                    <input
                      value="Nội dung"
                      onChange={() => {}}
                      className="base-input bg-white disabled border border-gray-300 py-2"
                    />
                  </td>

                  <td className="relative">
                    <div className="absolute-full bg-gray-100 my-1 z-[-1]" />
                    <div className="flex justify-center w-[100px] py-2">
                      <Checkbox checked disabled />
                    </div>
                  </td>

                  <td className="relative">
                    <div className="absolute-full rounded-[0_10px_10px_0] bg-gray-100 my-1 z-[-1]" />
                    <div className="flex disabled items-center h-max p-1 cursor-not-allowed py-2 pr-2 w-[50px]">
                      <Icon>
                        <Close />
                      </Icon>
                    </div>
                  </td>
                </tr>
                {boTieuChuan?.KT_KDCL_BoTieuChuan_JSON_DATA?.map((e, i) => (
                  <tr key={i}>
                    <td className="relative">
                      <div className="absolute-full bg-slate-100/90 my-1 z-[-1] rounded-[10px_0_0_10px]" />
                      <div className="flex flex-col py-3 pl-5">
                        <div
                          className={transformCls([
                            i > 0 ? 'cursor-pointer' : 'cursor-not-allowed',
                            'flex items-center',
                          ])}
                        >
                          <Icon onClick={() => changeOrderColumn(i, i - 1)}>
                            <BiChevronUp />
                          </Icon>
                        </div>
                        <div
                          className={transformCls([
                            i <
                            boTieuChuan.KT_KDCL_BoTieuChuan_JSON_DATA.length - 1
                              ? 'cursor-pointer'
                              : 'cursor-not-allowed',
                            'flex items-center',
                          ])}
                        >
                          <Icon onClick={() => changeOrderColumn(i, i + 1)}>
                            <BiChevronDown />
                          </Icon>
                        </div>
                      </div>
                    </td>

                    <td className="relative">
                      <div className="absolute-full bg-slate-100/90 my-1 z-[-1]" />
                      <input
                        value={
                          boTieuChuan?.KT_KDCL_BoTieuChuan_JSON_DATA[i]
                            .KT_KDCL_BoTieuChuan_TenCot || ''
                        }
                        onChange={(event) =>
                          onColumnInputChange(
                            event.target.value,
                            i,
                            'KT_KDCL_BoTieuChuan_TenCot',
                          )
                        }
                        className="base-input bg-white py-2"
                      />
                    </td>

                    <td className="relative">
                      <div className="absolute-full bg-slate-100/90 my-1 z-[-1]" />
                      <div className="flex justify-center py-2">
                        <Checkbox
                          checked={
                            boTieuChuan.KT_KDCL_BoTieuChuan_JSON_DATA[i]
                              .KT_KDCL_BoTieuChuan_BatBuoc
                          }
                          onChange={(isCheck) =>
                            onColumnInputChange(
                              isCheck,
                              i,
                              'KT_KDCL_BoTieuChuan_BatBuoc',
                            )
                          }
                        />
                      </div>
                    </td>

                    <td className="relative">
                      <div className="absolute-full rounded-[0_10px_10px_0] bg-slate-100/90 my-1 z-[-1]" />
                      <div
                        onClick={() => onRemoveColumn(i)}
                        className={transformCls([
                          'flex justify-center items-center w-max h-max p-1 py-2 pr-2 w-[56px]',
                          'cursor-pointer',
                        ])}
                      >
                        <Icon>
                          <Close />
                        </Icon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="h-14 rounded-lg border border-dashed border-gray-400 hover:border-uneti-primary-lighter flex items-center justify-center">
              <Button type="border" onClick={addColumn}>
                Thêm cột
              </Button>
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Footer>
          <div className="flex items-center justify-end gap-3">
            <Button
              disabled={isUpdating}
              color="danger"
              onClick={() => drawerRef.current?.close()}
            >
              Hủy
            </Button>
            <Button isLoading={isUpdating} onClick={onUpdate}>
              Cập nhật
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    )
  },
)

DrawerUpdateBoTieuChuan.displayName = 'DrawerUpdateBoTieuChuan'
