import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { BsEye } from 'react-icons/bs'
import DialogXemLichSuChinhSua from './DialogXemLichSuChinhSua'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { loadDanhGiaTieuChi_LichSu_Graft } from '@/Apis/KDCL'

export default function LichSuChinhSua({
  countUpdated,
  danhGiaTieuChiChiTiet,
}) {
  const [isOpendialogXemLichSu, setIsOpenDialogXemLichSu] = useState(false)

  const [paginate, setPaginate] = useState({
    SoTrang: 1,
    SoBanGhiTrenTrang: 10,
  })

  const {
    data: { ListDanhGia_LichSu, TotalPage } = {
      ListDanhGia_LichSu: [],
      TotalPage: 0,
    },
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      'getLichSuChinhSua',
      danhGiaTieuChiChiTiet.KT_KDCL_CTDT_DanhGiaTieuChi_ID,
      paginate,
    ],
    queryFn: async () => {
      if (!danhGiaTieuChiChiTiet.KT_KDCL_CTDT_DanhGiaTieuChi_ID)
        return {
          ListDanhGia_LichSu: [],
          TotalPage: 0,
        }

      const res = await loadDanhGiaTieuChi_LichSu_Graft({
        KT_KDCL_CTDT_DanhGiaTieuChi_ID:
          danhGiaTieuChiChiTiet.KT_KDCL_CTDT_DanhGiaTieuChi_ID,
        SoTrang: paginate.SoTrang,
        SoBanGhiTrenTrang: paginate.SoBanGhiTrenTrang,
      })

      return res.data
    },
    enabled: false,
  })

  useEffect(() => {
    refetch()
  }, [isOpendialogXemLichSu])

  useEffect(() => {
    refetch()
  }, [paginate, countUpdated])

  return (
    <>
      {TotalPage ? (
        <Button type="border" onClick={() => setIsOpenDialogXemLichSu(true)}>
          <Icon>
            <BsEye />
          </Icon>
          Xem lịch sử
        </Button>
      ) : null}

      <DialogXemLichSuChinhSua
        isOpen={isOpendialogXemLichSu}
        setIsOpen={setIsOpenDialogXemLichSu}
        DanhGiaTieuChi={danhGiaTieuChiChiTiet}
        ListDanhGia_LichSu={ListDanhGia_LichSu}
        TotalPage={TotalPage}
        paginate={paginate}
        setPaginate={setPaginate}
        isFetching={isFetching}
      />
    </>
  )
}
