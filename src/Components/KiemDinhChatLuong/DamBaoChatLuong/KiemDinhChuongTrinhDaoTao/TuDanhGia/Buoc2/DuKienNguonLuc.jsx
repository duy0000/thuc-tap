import { useNavigate } from 'react-router-dom'
import Button from '@/Components/Base/Button/Button.jsx'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  DuKienNguonLucEnum,
  DuKienNguonLucEnumText,
  HoSoKiemDinhCtx,
} from '@/Services/Tokens'
import {
  useKeHoachTDG_DuKienNguonLucStore,
  usePhanCongThucHienStore,
} from '@/Services/Store'
import { DatepickerV2, Drawer, Select } from '@/Components/Base'
import { dayjs, handleBackRoute, transformCls } from '@/Services/Utils'
import Icon from '@/Components/Base/Icon/Icon.jsx'
import { Brush } from '@/Components/Base/Icons/Brush.jsx'
import { DrawerFooter } from '@/Components/Base/Drawer/Drawer.Footer.jsx'
import { DrawerContent } from '@/Components/Base/Drawer/Drawer.Content.jsx'
import Swal from 'sweetalert2'
import { DrawerHeader } from '@/Components/Base/Drawer/Drawer.Header.jsx'
import { isNil, keys } from 'lodash-unified'
import { required } from '@/Services/Validators/required'
import {
  postKeHoach_TDG_DK_NguonLuc,
  putKeHoach_TDG_DK_NguonLuc,
} from '@/Apis/KDCL'

export default function DuKienNguonLuc({ keHoach }) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const navigate = useNavigate()

  const { listPhanCongThucHienMapped } = usePhanCongThucHienStore(hoSoKiemDinh)
  const { listKeHoachDuKienNguonLuc, refetch: refetchKeHoachDuKienNguonLuc } =
    useKeHoachTDG_DuKienNguonLucStore()

  const drawerRef = useRef()
  const [isPosting, setIsPosting] = useState(false)
  const [nguonLuc, setNguonLuc] = useState({})

  const handleChange = (key, value) => {
    setNguonLuc({
      ...nguonLuc,
      [key]: value,
    })
  }

  const listDuKienNguonLuc = useMemo(() => {
    return listKeHoachDuKienNguonLuc.filter(
      (kh) =>
        kh.KT_KDCL_CTDT_KeHoach_TDG_ID == keHoach?.KT_KDCL_CTDT_KeHoach_TDG_ID,
    )
  }, [keHoach, listKeHoachDuKienNguonLuc])

  const validate = () =>
    [
      required(
        nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_GhiChu,
        'Vui lòng nhập ghi chú',
      ),
      required(
        nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Den,
        'Vui lòng chọn ngày kết thúc',
      ),
      required(
        nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Tu,
        'Vui lòng chọn ngày bắt đầu',
      ),
      required(
        nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_Loai,
        'Vui lòng chọn nguồn lực cần huy động',
      ),
      required(
        nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_NDHoatDong,
        'Vui lòng nhập nội dung hoạt động',
      ),
    ].every((e) => e)

  const handleSubmit = async () => {
    if (isPosting || !validate()) return

    setIsPosting(true)
    try {
      if (isNil(nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_ID)) {
        await postKeHoach_TDG_DK_NguonLuc(nguonLuc)
      } else {
        await putKeHoach_TDG_DK_NguonLuc(nguonLuc)
      }
      await refetchKeHoachDuKienNguonLuc()
      drawerRef.current.close()
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  const listTieuChuanDuocPhanCong = useMemo(
    () =>
      hoSoKiemDinh.listTieuChuan.filter((tieuChuan) =>
        listPhanCongThucHienMapped.find(
          (phanCong) =>
            phanCong.KT_KDCL_CTDT_PhanCongThucHien_IDTieuChuan ==
            tieuChuan.KT_KDCL_TieuChuan_ID,
        ),
      ),
    [hoSoKiemDinh.listTieuChuan, listPhanCongThucHienMapped],
  )

  useEffect(() => {
    setNguonLuc({
      ...nguonLuc,
      KT_KDCL_CTDT_KeHoach_TDG_ID: keHoach?.KT_KDCL_CTDT_KeHoach_TDG_ID,
    })
  }, [keHoach])

  return (
    <div className="z-[2]">
      <div className="my-6 flex items-center justify-between">
        <Button
          type="border"
          onClick={() =>
            handleBackRoute(
              navigate,
              `/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2`,
            )
          }
        >
          Quay lại
        </Button>
        <p className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Danh sách dự kiến nguồn lực
        </p>
      </div>

      <table className="uneti-u-table">
        <thead>
          <tr>
            <th>Tiêu chuẩn</th>
            <th>Các hoạt động</th>
            <th>Các nguồn lực được huy động</th>
            <th>Thời điểm cần huy động</th>
            <th>Ghi chú</th>
            <th>Tác vụ</th>
          </tr>
        </thead>

        <tbody>
          {listTieuChuanDuocPhanCong.map((tieuChuan, i) => {
            const dkNguonLuc =
              listDuKienNguonLuc.find(
                (nl) =>
                  nl.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_IDTieuChuan ==
                  tieuChuan.KT_KDCL_TieuChuan_ID,
              ) || {}

            return (
              <tr key={i}>
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: tieuChuan.KT_KDCL_TieuChuan_Ma,
                    }}
                  />
                </td>
                <td>
                  {dkNguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_NDHoatDong}
                </td>
                <td>
                  {
                    DuKienNguonLucEnumText[
                      dkNguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_Loai
                    ]
                  }
                </td>
                <td>
                  {dkNguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Tu &&
                    dkNguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Den && (
                      <div className="flex gap-1">
                        <span>Từ</span>
                        <span>
                          {dayjs(
                            dkNguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Tu,
                          ).format('DD/MM/YYYY')}
                        </span>
                        <span>-</span>
                        <span>
                          {dayjs(
                            dkNguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Den,
                          ).format('DD/MM/YYYY')}
                        </span>
                      </div>
                    )}
                </td>
                <td>
                  {dkNguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_GhiChu}
                </td>
                <td>
                  <button
                    onClick={() => {
                      if (!hoSoKiemDinh.isBanThuKy) {
                        return
                      }
                      setNguonLuc({
                        ...dkNguonLuc,
                        KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_IDTieuChuan:
                          tieuChuan.KT_KDCL_TieuChuan_ID,
                        KT_KDCL_TieuChuan_Ma: tieuChuan.KT_KDCL_TieuChuan_Ma,
                        KT_KDCL_CTDT_KeHoach_TDG_ID:
                          keHoach?.KT_KDCL_CTDT_KeHoach_TDG_ID,
                      })
                      drawerRef.current.open()
                    }}
                    className={transformCls([
                      'icon-btn mx-auto',
                      hoSoKiemDinh.isBanThuKy
                        ? ''
                        : 'cursor-not-allowed pointer-events-none',
                    ])}
                  >
                    <Icon>
                      <Brush />
                    </Icon>
                  </button>
                </td>
              </tr>
            )
          })}

          {!listTieuChuanDuocPhanCong.length && (
            <tr>
              <td
                colSpan={6}
                className="text-base text-uneti-primary font-medium text-center !py-2"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Drawer ref={drawerRef} closeOnClickOutside={!isPosting}>
        <DrawerHeader>
          <h3 className="text-uneti-primary font-medium text-base">
            Cập nhật dự kiến nguồn lực cho tiêu chuẩn
          </h3>
          <div className="flex gap-1 mt-1">
            <span>Tiêu chuẩn: </span>{' '}
            <p
              dangerouslySetInnerHTML={{
                __html: nguonLuc.KT_KDCL_TieuChuan_Ma,
              }}
            />
          </div>
        </DrawerHeader>

        <DrawerContent>
          <div className="flex flex-col gap-5 px-1">
            <div className="flex gap-4 items-start">
              <p className="w-[160px] mt-1">Nội dung hoạt động</p>
              <input
                type="text"
                value={nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_NDHoatDong}
                onChange={(event) =>
                  handleChange(
                    'KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_NDHoatDong',
                    event.target.value,
                  )
                }
                className="base-input w-full flex-1"
              />
            </div>

            <div className="flex gap-4 items-start">
              <p className="w-[160px] mt-1">Các nguồn lực được huy động</p>
              <Select
                modelValue={nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_Loai}
                onChange={(value) =>
                  handleChange(
                    'KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_Loai',
                    value,
                  )
                }
                data={keys(DuKienNguonLucEnum).map((key) => ({
                  value: DuKienNguonLucEnum[key],
                  label: DuKienNguonLucEnumText[DuKienNguonLucEnum[key]],
                }))}
                valueKey="value"
                labelKey="label"
              />
            </div>

            <div className="flex gap-4 items-start">
              <p className="w-[160px] mt-1">Thời điểm cần huy động</p>

              <div>
                <p className="text-xs text-gray-500/90">Từ ngày</p>
                <DatepickerV2
                  modelValue={
                    nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Tu
                  }
                  onChange={(date) =>
                    handleChange(
                      'KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Tu',
                      date,
                    )
                  }
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                />
                <p className="mt-2 text-xs text-gray-500/90">Đến ngày</p>
                <DatepickerV2
                  modelValue={
                    nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Den
                  }
                  onChange={(date) =>
                    handleChange(
                      'KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_TGHD_Den',
                      date,
                    )
                  }
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                />
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <p className="w-[160px] mt-1">Ghi chú</p>
              <input
                type="text"
                className="base-input w-full flex-1"
                value={nguonLuc.KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_GhiChu}
                onChange={(event) =>
                  handleChange(
                    'KT_KDCL_CTDT_KeHoach_TDG_DK_NguonLuc_GhiChu',
                    event.target.value,
                  )
                }
              />
            </div>
          </div>
        </DrawerContent>

        <DrawerFooter>
          <div className="flex items-center gap-2 justify-end">
            <Button
              color="danger"
              disabled={isPosting}
              onClick={() => drawerRef.current.close()}
            >
              Hủy
            </Button>
            <Button onClick={handleSubmit} isLoading={isPosting}>
              Cập nhật
            </Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </div>
  )
}
