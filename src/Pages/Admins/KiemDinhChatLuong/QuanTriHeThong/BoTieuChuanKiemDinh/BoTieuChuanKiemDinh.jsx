import { postBoTieuChuan } from '@/Apis/KDCL/BoTieuChuan/apiBoTieuChuan'
import { Drawer } from '@/Components/Base'
import { Checkbox } from '@/Components/Base/Checkbox'
import Icon from '@/Components/Base/Icon/Icon'
import { Close } from '@/Components/Base/Icons/Close'
// import TCKiemDinhCSGD from '@/Components/KiemDinhChatLuong/QuanTriHeThong/BoTieuChuanKiemDinh/TCKiemDinhCSGD'
import TCKiemDinhCTDT from '@/Components/KiemDinhChatLuong/QuanTriHeThong/BoTieuChuanKiemDinh/TCKiemDinhCTDT'
import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import { Box, Tab, Tabs } from '@mui/material'
import { cloneDeep } from 'lodash-unified'
import { useRef, useState } from 'react'
import { BiChevronDown, BiChevronUp, BiPlus } from 'react-icons/bi'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useBoTieuChuanStore } from '@/Services/Store/index.js'
import Button from '@/Components/Base/Button/Button'

export const BoTieuChuanKiemDinh = () => {
  const ns = useNamespace('kiem-dinh-chat-luong')

  const [tab, setTab] = useState(0)

  const handleChangeTab = (event, tab) => {
    setTab(tab)
  }

  const drawerRef = useRef()
  const checkboxRef = useRef()
  const { refetch: refetchListBoTieuChuan } = useBoTieuChuanStore()

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    KT_KDCL_BoTieuChuan_Ten: '',
    KT_KDCL_BoTieuChuan_MoTa: '',
    KT_KDCL_BoTieuChuan_Active: 'true',
    KT_KDCL_BoTieuChuan_JSON_DATA: [],
  })

  const changeOrderColumn = (from, to) => {
    if (to < 0) return
    if (to > form.KT_KDCL_BoTieuChuan_JSON_DATA.length - 1) return

    const newKT_KDCL_BoTieuChuan_JSON_DATA = cloneDeep(
      form.KT_KDCL_BoTieuChuan_JSON_DATA,
    )
    const dataFrom = cloneDeep(newKT_KDCL_BoTieuChuan_JSON_DATA[from])
    const dataTo = cloneDeep(newKT_KDCL_BoTieuChuan_JSON_DATA[to])
    Object.assign(newKT_KDCL_BoTieuChuan_JSON_DATA[from], dataTo)
    Object.assign(newKT_KDCL_BoTieuChuan_JSON_DATA[to], dataFrom)

    setForm({
      ...form,
      KT_KDCL_BoTieuChuan_JSON_DATA: newKT_KDCL_BoTieuChuan_JSON_DATA,
    })
  }

  const addColumn = () => {
    const newKT_KDCL_BoTieuChuan_JSON_DATA = [
      ...form.KT_KDCL_BoTieuChuan_JSON_DATA,
      {
        KT_KDCL_BoTieuChuan_TenCot: '',
        KT_KDCL_BoTieuChuan_BatBuoc: false,
      },
    ]

    setForm({
      ...form,
      KT_KDCL_BoTieuChuan_JSON_DATA: newKT_KDCL_BoTieuChuan_JSON_DATA,
    })
  }

  const onColumnInputChange = (value, index, col) => {
    const newData = cloneDeep(form.KT_KDCL_BoTieuChuan_JSON_DATA)
    newData[index][col] = value

    setForm({
      ...form,
      KT_KDCL_BoTieuChuan_JSON_DATA: newData,
    })
  }

  const onRemoveColumn = (index) => {
    const newData = cloneDeep(form.KT_KDCL_BoTieuChuan_JSON_DATA)
    newData.splice(index, 1)

    setForm({
      ...form,
      KT_KDCL_BoTieuChuan_JSON_DATA: newData,
    })
  }

  const validateBeforeCreate = () => {
    if (form.KT_KDCL_BoTieuChuan_Ten.trim().length == 0) {
      toast('Vui lòng điền tên bộ tiêu chuẩn', {
        type: 'error',
        closeButton: false,
        autoClose: 2000,
      })

      return false
    }

    if (
      form.KT_KDCL_BoTieuChuan_JSON_DATA.some(
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

  const resetFormState = () => {
    setForm({
      KT_KDCL_BoTieuChuan_Ten: '',
      KT_KDCL_BoTieuChuan_MoTa: '',
      KT_KDCL_BoTieuChuan_Active: 'true',
      KT_KDCL_BoTieuChuan_JSON_DATA: [],
    })
  }

  const preprocesorFormData = () => {
    return {
      ...form,
      KT_KDCL_BoTieuChuan_JSON_DATA: JSON.stringify([
        {
          KT_KDCL_BoTieuChuan_TenCot: 'Nội dung',
          KT_KDCL_BoTieuChuan_BatBuoc: true,
          KT_KDCL_BoTieuChuan_ThuTu: 0,
        },
        ...form.KT_KDCL_BoTieuChuan_JSON_DATA.map((e, i) => ({
          ...e,
          KT_KDCL_BoTieuChuan_ThuTu: i + 1,
        })),
      ]),
    }
  }

  const onCreate = async () => {
    if (isPosting || !validateBeforeCreate()) return

    try {
      setIsPosting(true)
      const formData = preprocesorFormData()
      await postBoTieuChuan(formData)
      await refetchListBoTieuChuan()

      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Tạo bộ tiêu chuẩn thành công',
      })
      resetFormState()
      drawerRef.current?.close()
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="box">
      <div className="flex justify-between">
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          variant="scrollable"
          aria-label="tab cau hinh nhiem vu"
          className="border-b border-gray-200"
        >
          <Tab
            label="Bộ tiêu chí kiểm định CTĐT"
            className={ns.em('tabs', 'tab')}
            id={ns.m('tab-0')}
          />
          <Tab
            label="Bộ tiêu chí kiểm định CSGD"
            className={ns.em('tabs', 'tab')}
            id={ns.m('tab-1')}
          />
        </Tabs>

        <Button
          onClick={() => {
            drawerRef.current?.open()
          }}
        >
          <Icon>
            <BiPlus />
          </Icon>
          Thêm bộ tiêu chuẩn
        </Button>
      </div>

      <Box sx={{ pt: 2 }}>
        <TCKiemDinhCTDT tab={tab} index={0} key="ctdt" />
      </Box>

      <Drawer persistent ref={drawerRef} minWidth={450}>
        <Drawer.Header>
          <h3 className="font-semibold text-gray-600 text-base">
            Tạo bộ tiêu chuẩn mới
          </h3>
        </Drawer.Header>
        <Drawer.Content>
          <div className="my-5 mr-1 flex flex-col gap-4">
            <div className="flex items-center">
              <label className="inline-block w-[100px]">
                Tên <span className="text-red-400">*</span>
              </label>
              <input
                value={form.KT_KDCL_BoTieuChuan_Ten}
                onChange={(e) =>
                  setForm((p) => ({
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
                value={form.KT_KDCL_BoTieuChuan_MoTa}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    KT_KDCL_BoTieuChuan_MoTa: e.target.value,
                  }))
                }
                placeholder="Không bắt buộc"
              />
            </div>
          </div>

          <div className="my-5 md:my-7 py-5 md:py-7 border-y border-y-gray-200 flex gap-3">
            <Checkbox
              ref={checkboxRef}
              checked
              onChange={(isCheck) =>
                setForm((p) => ({
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

          <div className="pb-7 border-b border-b-gray-200">
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
                  <th className="w-[80px] text-center pb-2 text-gray-600">
                    Bắt buộc
                  </th>
                  <th></th>
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
                      className="base-input disabled border border-gray-300 py-2"
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
                    <div className="flex disabled justify-center items-center h-max p-1 cursor-not-allowed py-2 pr-2 w-[50px]">
                      <Icon>
                        <Close />
                      </Icon>
                    </div>
                  </td>
                </tr>
                {form.KT_KDCL_BoTieuChuan_JSON_DATA.map((e, i) => (
                  <tr key={i}>
                    <td className="relative">
                      <div className="absolute-full bg-slate-100 my-1 z-[-1] rounded-[10px_0_0_10px]" />
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
                            i < form.KT_KDCL_BoTieuChuan_JSON_DATA.length - 1
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
                      <div className="absolute-full bg-slate-100 my-1 z-[-1]" />
                      <input
                        value={
                          form.KT_KDCL_BoTieuChuan_JSON_DATA[i]
                            .KT_KDCL_BoTieuChuan_TenCot
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
                      <div className="absolute-full bg-slate-100 my-1 z-[-1]" />
                      <div className="flex justify-center w-[100px] py-2">
                        <Checkbox
                          checked={
                            form.KT_KDCL_BoTieuChuan_JSON_DATA[i]
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
                      <div className="absolute-full rounded-[0_10px_10px_0] bg-slate-100 my-1 z-[-1]" />
                      <div
                        onClick={() => onRemoveColumn(i)}
                        className="flex justify-center items-center h-max p-1 cursor-pointer py-2 pr-2 w-[50px]"
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
              disabled={isPosting}
              onClick={() => drawerRef.current?.close()}
              color="danger"
            >
              Hủy
            </Button>
            <Button isLoading={isPosting} onClick={onCreate}>
              Cập nhật
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    </div>
  )
}

export default BoTieuChuanKiemDinh
