import PropTypes from 'prop-types'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { dayjs } from '@/Services/Utils/dayjs'
import { memo, useCallback, useMemo, useState } from 'react'
import Button from '@/Components/Base/Button/Button'
import clsx from 'clsx'
import {
  checkStatusInititial,
  colorStatusWithModule,
  MODULE_DE_NGHI,
} from '../constants'
import { useNavigate } from 'react-router-dom'
import TheoDoiDeNghiHTTBGD from '../TheoDoiDeNghiHTTBGD'
import {
  handleCancelRequest_HTTBGD_DKSDTB,
  handleCancelRequest_TTHCGV,
} from './constants'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { useQueryClient } from '@tanstack/react-query'
import { THEO_DOI_DE_NGHI_GV } from '@/Services/QueryStores/QueryKeyStores/TheoDoiDeNghiGV.querykey'

const TableBodyDSDNGV = memo(function TableBodyDSDNGV({
  listTheoDoiDeNghi,
  dangKySelected,
  itemPerPage,
  currentPage,
}) {
  const navigate = useNavigate()
  const DataCBGV = DataCanBoGV()
  const queryClient = useQueryClient()

  const [showModalTBGD, setShowModalTBGD] = useState({
    idYeuCau: null,
    show: false,
  })

  const handleViewDetail = useCallback(({ module, idYeuCau }) => {
    switch (module) {
      case MODULE_DE_NGHI.DT_CVNB_TBGD_GuiYeuCau: {
        setShowModalTBGD({
          idYeuCau,
          show: true,
        })
        // ;<TheoDoiDeNghiHTTBGD DT_CVNB_TBGD_GuiYeuCau_ID={idYeuCau} />
        break
      }
      case MODULE_DE_NGHI.MC_TTHC_GV_GuiYeuCau: {
        navigate('/tthc-giang-vien/theo-doi-quy-trinh/chi-tiet/tamtest2/5')
        break
      }
      default:
        break
    }
  }, [])

  const _refreshTheoDoiDeNghi = () => {
    queryClient.invalidateQueries({
      queryKey: [THEO_DOI_DE_NGHI_GV.SP_HT_USER_Load_YeuCau_ByMaNhanSu],
    })
  }
  const handleCancelRequest = useCallback(({ module, idYeuCau }) => {
    setShowModalTBGD({ idYeuCau: null, show: false })
    switch (module) {
      case MODULE_DE_NGHI.DT_CVNB_TBGD_GuiYeuCau: {
        handleCancelRequest_HTTBGD_DKSDTB({
          idYeuCau,
          DataCBGV,
          onRefresh: _refreshTheoDoiDeNghi,
        })
        break
      }
      case MODULE_DE_NGHI.MC_TTHC_GV_GuiYeuCau: {
        handleCancelRequest_TTHCGV({
          idYeuCau,
          onRefresh: _refreshTheoDoiDeNghi,
        })
        break
      }
      default:
        break
    }
  }, [])

  const renderBody = useMemo(
    () =>
      listTheoDoiDeNghi?.map((ld, index) => {
        return (
          <TableRow key={index} style={{ borderBottom: '1px solid #000' }}>
            <TableCell
              component="th"
              scope="row"
              sx={{
                width: 20,
                textAlign: 'center',
                borderRight: '1px solid #ccc',
              }}
            >
              {itemPerPage * currentPage + index + 1}
            </TableCell>
            {/* END: STT */}
            <TableCell
              sx={{
                padding: '0 10px',
                margin: 0,
                color: 'black',
                textAlign: 'left',
                borderRight: '1px solid #ccc',
                width: 142,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.TenThuTuc ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Tên yêu cầu */}
            <TableCell
              sx={{
                margin: 0,
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 60,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.NgayGui
                  ? dayjs(ld.NgayGui).utc().format('DD/MM/YYYY HH:mm')
                  : 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Ngày gửi */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 80,
              }}
            >
              <p
                className={clsx(
                  'whitespace-nowrap font-semibold',
                  colorStatusWithModule(ld.TenBang, ld.TenTrangThai),
                )}
              >
                {ld.TenTrangThai ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Trạng thái */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 80,
              }}
            >
              <div className="flex flex-col gap-1">
                <Button
                  onClick={() =>
                    handleViewDetail({
                      module: ld.TenBang,
                      idYeuCau: ld.IDBang,
                    })
                  }
                >
                  Xem chi tiết
                </Button>
                {ld.TenTrangThai &&
                  checkStatusInititial(ld.TenBang, ld.TenTrangThai) && (
                    <Button
                      onClick={() =>
                        handleCancelRequest({
                          module: ld.TenBang,
                          idYeuCau: ld.IDBang,
                        })
                      }
                      color="danger"
                    >
                      Hủy yêu cầu
                    </Button>
                  )}
              </div>
            </TableCell>
            {/* END: Tác vụ */}
          </TableRow>
        )
      }),
    [listTheoDoiDeNghi, dangKySelected],
  )

  return (
    <>
      <TableBody>
        {listTheoDoiDeNghi && listTheoDoiDeNghi?.length > 0 ? (
          renderBody
        ) : (
          <TableRow>
            <TableCell colSpan={11}>
              <p className="text-center text-red-600 font-semibold">
                Không có dữ liệu!
              </p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TheoDoiDeNghiHTTBGD
        DT_CVNB_TBGD_GuiYeuCau_ID={showModalTBGD.idYeuCau}
        showModal={showModalTBGD.show}
        onHideModal={() => {
          setShowModalTBGD({
            idYeuCau: null,
            show: false,
          })
        }}
      />
    </>
  )
})

TableBodyDSDNGV.propTypes = {
  listTheoDoiDeNghi: PropTypes.array,
  onSelected: PropTypes.func,
  isLichDaySelected: PropTypes.func,
  itemPerPage: PropTypes.number,
  currentPage: PropTypes.number,
}

export default TableBodyDSDNGV
