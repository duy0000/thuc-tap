import { useRef, useState } from 'react'
import Button from '@/Components/Base/Button/Button'
import Dialog from '@/Components/Base/Dialog/Dialog'
import TableLichSu from './TableLichSu'
import LichSuThayDoiChiTiet from './LichSuThayDoiChiTiet'
import Loading from '@/Components/Base/Icons/Loading'
import Icon from '@/Components/Base/Icon/Icon'

export default function DialogXemLichSuChinhSua({
  isOpen,
  setIsOpen,
  DanhGiaTieuChi,
  isFetching,
  TotalPage,
  paginate,
  setPaginate,
  ListDanhGia_LichSu,
}) {
  const dialogRef = useRef()

  const [danhGiaTieuChiHienTai, setDanhGiaTieuChiHienTai] =
    useState(DanhGiaTieuChi)
  const [danhGiaTieuChiChinhSua, setDanhGiaTieuChiChinhSua] = useState()
  const [isOpenChiTiet, setIsOpenChiTiet] = useState(false)

  const showDiff = (item, prevItem) => {
    if (!prevItem) {
      setDanhGiaTieuChiChinhSua(DanhGiaTieuChi)
    } else {
      setDanhGiaTieuChiChinhSua(prevItem)
    }
    setDanhGiaTieuChiHienTai(item)
    setIsOpenChiTiet(true)
  }

  return (
    <Dialog
      ref={dialogRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={
        <div>
          <h2 className="text-lg font-semibold">Lịch sử chỉnh sửa</h2>
        </div>
      }
      footer={
        <div className="flex justify-end">
          <Button
            type="transparent"
            onClick={() => {
              dialogRef.current.close()
            }}
          >
            Đóng
          </Button>
        </div>
      }
    >
      {isFetching && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Icon size={30} className="loading">
            <Loading />
          </Icon>
        </div>
      )}

      <div className={isFetching ? 'blur-sm' : ''}>
        {isOpenChiTiet ? (
          <LichSuThayDoiChiTiet
            DanhGiaTieuChi_ChinhSua={danhGiaTieuChiChinhSua}
            DanhGiaTieuChi_HienTai={danhGiaTieuChiHienTai}
            setIsOpenChiTiet={setIsOpenChiTiet}
          />
        ) : (
          <TableLichSu
            TotalPage={TotalPage}
            paginate={paginate}
            setPaginate={setPaginate}
            ListDanhGia_LichSu={ListDanhGia_LichSu}
            showDiff={showDiff}
          />
        )}
      </div>
    </Dialog>
  )
}
