import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Select } from '@/Components/Base'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'

import {
  useNhomChuyenTrachThanhVienStore,
  useTieuChiStore,
} from '@/Services/Store'
import {
  usePhanCongThucHienStore,
  usePhanCongThucHienThanhVienStore,
} from '@/Services/Store/Module/KiemDinhChatLuong/phanCongThucHien'
import {
  delPhanCongThucHienThanhVien,
  postPhanCongThucHien,
  postPhanCongThucHienThanhVien,
  putPhanCongThucHien,
  putPhanCongThucHienThanhVien,
} from '@/Apis/KDCL'
import { retries } from '@/Services/Utils'
import {
  differenceWith,
  isEmpty,
  isEqual,
  isNil,
  toNumber,
} from 'lodash-unified'
import Button from '@/Components/Base/Button/Button.jsx'

export default memo(function DialogPhanCongChiTiet({
  isOpen,
  setIsOpen,
  phanCongTieuChuan,
  setIDTieuChuanSelected,
}) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const dialogRef = useRef()

  const {
    listPhanCongThucHienThanhVien,
    refetch: refetchListPhanCongThucHienThanhVien,
  } = usePhanCongThucHienThanhVienStore()
  const { listNhomChuyenTrachThanhVien } = useNhomChuyenTrachThanhVienStore()
  const { listTieuChi } = useTieuChiStore()
  const { refetch: refetchListPhanCongThucHien } = usePhanCongThucHienStore()

  const [IDNhomChuyenTrachSelected, setIDNhomChuyenTrachSelected] = useState(
    phanCongTieuChuan?.KT_KDCL_CTDT_PhanCongThucHien_IDNhomChuyenTrach,
  )
  const [phanCongThanhVien, setPhanCongThanhVien] = useState(null)

  // Lưu lại trạng thái cũ để phát hiện sự thay đổi lựa chọn phân công
  const [phanCongThanhVienConst, setPhanCongThanhVienConst] = useState(null)
  const [isPosting, setIsPosting] = useState(false)

  const thanhVien = useMemo(
    () =>
      IDNhomChuyenTrachSelected
        ? hoSoKiemDinhCtx.nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach[
            IDNhomChuyenTrachSelected
          ]
        : [],
    [
      IDNhomChuyenTrachSelected,
      hoSoKiemDinhCtx.nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach,
    ],
  )

  const listPhanCongThanhVienTrongNhom = useMemo(() => {
    return listPhanCongThucHienThanhVien.filter(
      (pc) =>
        pc.KT_KDCL_CTDT_PhanCongThucHien_IDPCTH ===
          phanCongTieuChuan?.KT_KDCL_CTDT_PhanCongThucHien_ID &&
        thanhVien.find(
          (tv) =>
            tv.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDThanhPhanHoiDong ===
            pc.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong,
        ),
    )
  }, [
    listPhanCongThucHienThanhVien,
    phanCongTieuChuan,
    IDNhomChuyenTrachSelected,
  ])

  useEffect(() => {
    const phanCong = listPhanCongThanhVienTrongNhom.reduce((acc, curr) => {
      acc[curr.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDTieuChi] = curr

      return acc
    }, {})

    setPhanCongThanhVien(isEmpty(phanCong) ? null : phanCong)
    setPhanCongThanhVienConst(isEmpty(phanCong) ? null : phanCong)
  }, [listPhanCongThanhVienTrongNhom])

  const parsePhanCongThanhVienObjectToPostData = useCallback(
    (list, IDPhanCongThucHien) => {
      return Object.entries(list || {}).map(([IDTieuChi, thanhVien]) => {
        return {
          KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_ID:
            thanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_ID,
          KT_KDCL_CTDT_PhanCongThucHien_IDPCTH: IDPhanCongThucHien,
          KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDTieuChi:
            toNumber(IDTieuChi),
          KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_MaNhanSu:
            thanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_MaNhanSu,
          KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_HoanThanh:
            thanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_HoanThanh ??
            stepStatusEnum.ChuaThucHien,
          KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_GhiChu:
            thanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_GhiChu ?? '',
          KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong:
            thanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong,
        }
      })
    },
    [listPhanCongThanhVienTrongNhom],
  )

  const listTieuChiByTieuChuan = useMemo(() => {
    return listTieuChi.filter(
      (tieuChi) =>
        tieuChi.KT_KDCL_TieuChi_IDTieuChuan ==
        phanCongTieuChuan?.KT_KDCL_TieuChuan_ID,
    )
  }, [listTieuChi, phanCongTieuChuan])

  // Find new or updated records
  const danhSachPhanCongUpdated = useMemo(() => {
    const IDPhanCongThucHien =
      phanCongTieuChuan?.KT_KDCL_CTDT_PhanCongThucHien_ID

    const parsedCurrentData = parsePhanCongThanhVienObjectToPostData(
      phanCongThanhVien,
      IDPhanCongThucHien,
    )
    const parsedOldData = parsePhanCongThanhVienObjectToPostData(
      phanCongThanhVienConst,
      IDPhanCongThucHien,
    )

    return differenceWith(parsedCurrentData, parsedOldData, isEqual)
  }, [phanCongTieuChuan, phanCongThanhVien, phanCongThanhVienConst])
  const onCancel = () => {
    dialogRef.current?.close()
  }
  const postPhanCongThanhVien = async (listThanhVien) => {
    const _post = []
    listThanhVien.forEach((thanhVien) => {
      _post.push(retries(() => postPhanCongThucHienThanhVien(thanhVien)))
    })
    await Promise.all(_post)
  }
  const postPhanCongMoi = async () => {
    //  Post phan cong nhom, post phan cong thanh vien
    const res = await postPhanCongThucHien({
      KT_KDCL_CTDT_PhanCongThucHien_IDTieuChuan:
        phanCongTieuChuan.KT_KDCL_TieuChuan_ID,
      KT_KDCL_CTDT_PhanCongThucHien_IDNhomChuyenTrach:
        IDNhomChuyenTrachSelected,
      KT_KDCL_CTDT_PhanCongThucHien_IDThanhLapHoiDong:
        hoSoKiemDinhCtx.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      KT_KDCL_CTDT_PhanCongThucHien_GhiChu: '',
    })

    await refetchListPhanCongThucHien()

    const phanCongThucHien = res.data.body[0]

    setIDTieuChuanSelected(
      phanCongThucHien.KT_KDCL_CTDT_PhanCongThucHien_IDTieuChuan,
    )

    await postPhanCongThanhVien(
      parsePhanCongThanhVienObjectToPostData(
        phanCongThanhVien,
        phanCongThucHien.KT_KDCL_CTDT_PhanCongThucHien_ID,
      ),
    )
  }
  const xoaPhanCongThanhVien = async (danhSachThanhVienCanXoa) => {
    const posting = []
    for (let thanhVien of danhSachThanhVienCanXoa) {
      posting.push(
        retries(() =>
          delPhanCongThucHienThanhVien(
            thanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_ID,
          ),
        ),
      )
    }

    await Promise.all(posting)
  }
  const updatePhanCongThanhVien = async (danhSachThanhVien) => {
    const posting = []
    for (let thanhVien of danhSachThanhVien) {
      posting.push(retries(() => putPhanCongThucHienThanhVien(thanhVien)))
    }

    await Promise.all(posting)
  }
  const xoaPhanCongThanhVienNhomChuyenTrach = async (IDNhom, IDPCTH) => {
    const danhSachThanhVien = listNhomChuyenTrachThanhVien.filter(
      (thanhVien) =>
        thanhVien.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDNhomChuyenTrach ===
        IDNhom,
    )

    const danhSachThanhVienCanXoa = listPhanCongThucHienThanhVien.filter(
      (phanCongThanhVien) =>
        phanCongThanhVien.KT_KDCL_CTDT_PhanCongThucHien_IDPCTH == IDPCTH &&
        danhSachThanhVien.find(
          (thanhVien) =>
            thanhVien.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDThanhPhanHoiDong ===
            phanCongThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong,
        ),
    )

    await xoaPhanCongThanhVien(danhSachThanhVienCanXoa)
  }

  const onSubmit = async () => {
    if (isPosting) return
    try {
      setIsPosting(true)
      let phanCongThucHienID =
        phanCongTieuChuan.KT_KDCL_CTDT_PhanCongThucHien_ID
      let phanCongThucHienIDNhomChuyenTrach =
        phanCongTieuChuan.KT_KDCL_CTDT_PhanCongThucHien_IDNhomChuyenTrach

      if (!phanCongThucHienID) {
        await postPhanCongMoi()
      } else {
        // Update Nhom chuyen trach
        if (phanCongThucHienIDNhomChuyenTrach != IDNhomChuyenTrachSelected) {
          await retries(() =>
            putPhanCongThucHien({
              KT_KDCL_CTDT_PhanCongThucHien_ID: phanCongThucHienID,
              KT_KDCL_CTDT_PhanCongThucHien_IDTieuChuan:
                phanCongTieuChuan.KT_KDCL_TieuChuan_ID,
              KT_KDCL_CTDT_PhanCongThucHien_IDThanhLapHoiDong:
                phanCongTieuChuan.KT_KDCL_CTDT_PhanCongThucHien_IDThanhLapHoiDong,
              KT_KDCL_CTDT_PhanCongThucHien_GhiChu:
                phanCongTieuChuan.KT_KDCL_CTDT_PhanCongThucHien_GhiChu,
              KT_KDCL_CTDT_PhanCongThucHien_IDNhomChuyenTrach:
                IDNhomChuyenTrachSelected,
            }),
          )
          await xoaPhanCongThanhVienNhomChuyenTrach(
            phanCongThucHienIDNhomChuyenTrach,
            phanCongThucHienID,
          )
          await postPhanCongThanhVien(
            parsePhanCongThanhVienObjectToPostData(
              phanCongThanhVien,
              phanCongThucHienID,
            ),
          )
          await refetchListPhanCongThucHien()
        } else {
          const danhSachThanhVienUpdate = [],
            danhSachThanhVienDelete = [],
            danhSachThanhVienThemMoi = []

          for (let thanhVien of danhSachPhanCongUpdated) {
            if (isNil(thanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_ID)) {
              danhSachThanhVienThemMoi.push(thanhVien)
            } else if (
              thanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong
            ) {
              danhSachThanhVienUpdate.push(thanhVien)
            } else {
              danhSachThanhVienDelete.push(thanhVien)
            }
          }

          await Promise.all([
            xoaPhanCongThanhVien(danhSachThanhVienDelete),
            updatePhanCongThanhVien(danhSachThanhVienUpdate),
            postPhanCongThanhVien(danhSachThanhVienThemMoi),
          ])
        }
      }

      await refetchListPhanCongThucHienThanhVien()
    } catch (e) {
      console.log(e)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Dialog
      ref={dialogRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      preventClose={isPosting}
      notClose={isPosting}
      header={
        <div className="text-uneti-primary font-medium text-base">
          Phân công chi tiết công việc
        </div>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} color="danger" disabled={isPosting}>
            Hủy
          </Button>
          <Button
            onClick={onSubmit}
            color="primary"
            isLoading={isPosting}
            disabled={
              !danhSachPhanCongUpdated.length &&
              phanCongTieuChuan?.KT_KDCL_CTDT_PhanCongThucHien_IDNhomChuyenTrach ==
                IDNhomChuyenTrachSelected
            }
          >
            Cập nhật
          </Button>
        </div>
      }
    >
      <div className="ml-auto z-10 relative mb-3 flex justify-end items-center gap-2">
        Nhóm phân công:
        <Select
          data={hoSoKiemDinhCtx.nhomChuyenTrach}
          modelValue={IDNhomChuyenTrachSelected}
          onChange={(ID) => {
            setIDNhomChuyenTrachSelected(ID)
          }}
          labelKey="KT_KDCL_CTDT_NhomChuyenTrach_TenNhom"
          valueKey="KT_KDCL_CTDT_NhomChuyenTrach_ID"
          clearable={false}
          disabled={isPosting}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="uneti-u-table">
          <thead>
            <tr>
              <th>STT</th>
              <th style={{ minWidth: 140 }}>Tiêu chí</th>
              <th>Chọn thành viên</th>
            </tr>
          </thead>

          <tbody>
            {!listTieuChiByTieuChuan.length && (
              <tr>
                <td colSpan={3}>
                  <p className="text-center font-medium">Không có dữ liệu</p>
                </td>
              </tr>
            )}
            {listTieuChiByTieuChuan.map((row, key) => (
              <tr key={key}>
                <td className="text-center">{key + 1}</td>
                <td>
                  <div
                    dangerouslySetInnerHTML={{ __html: row.KT_KDCL_TieuChi_Ma }}
                    className="min-w-32"
                  />
                </td>
                <td className="!pr-0">
                  <Select
                    modelValue={
                      phanCongThanhVien?.[row.KT_KDCL_TieuChi_ID]
                        ?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong
                    }
                    onChange={(value) => {
                      setPhanCongThanhVien(
                        phanCongThanhVien
                          ? {
                              ...phanCongThanhVien,
                              [row.KT_KDCL_TieuChi_ID]: {
                                ...phanCongThanhVien[row.KT_KDCL_TieuChi_ID],
                                KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong:
                                  value,
                              },
                            }
                          : {
                              [row.KT_KDCL_TieuChi_ID]: {
                                KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong:
                                  value,
                              },
                            },
                      )
                    }}
                    key={row.KT_KDCL_TieuChi_ID}
                    data={thanhVien}
                    labelKey="KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_HoTen_ChucDanh"
                    valueKey="KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDThanhPhanHoiDong"
                    disabled={isPosting}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dialog>
  )
})
