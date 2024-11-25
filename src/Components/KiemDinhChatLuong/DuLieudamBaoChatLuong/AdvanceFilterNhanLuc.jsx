import { useEffect } from 'react'
import { useState } from 'react'
import { LOAI_THONG_KE, getThongKeCanBo } from '@/Apis/KDCL/CSDLDonVi/apiCanBo'
import { Popper, PopperContent, PopperTrigger } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import FilterAdd from '@/Components/Base/Icons/FilterAdd'
import { Select } from '@/Components/Base/Select'
import { retries } from '@/Services/Utils/requestUtils'

export const loaiThongKeList = [
  {
    ID: LOAI_THONG_KE.HocHamHocVi,
    ten: 'Học hàm, học vị',
  },
  {
    ID: LOAI_THONG_KE.Tuoi,
    ten: 'Độ tuổi',
  },
  {
    ID: LOAI_THONG_KE.GioiTinh,
    ten: 'Giới tính',
  },
]

export default function AdvanceFilterNhanLuc({
  setThongKe,
  children,
  filters,
  setFilters = () => {},
}) {
  const loadThongKe = async () => {
    const res = await getThongKeCanBo(filters)
    setThongKe?.(res.data.body)
  }

  const updateFilter = (val) => {
    setFilters(val, loaiThongKeList.find(({ ID }) => ID === val)?.ten)
  }

  useEffect(() => {
    retries(loadThongKe)
  }, [filters])

  return (
    <Popper placement="bottom-end" persistent>
      <PopperTrigger>
        {children ? (
          children
        ) : (
          <button className="h-[32px] py-2 px-4 rounded-lg bg-white flex items-center gap-2 hover:bg-slate-50 border border-solid hover:border-uneti-primary">
            <Icon size={18}>
              <FilterAdd />
            </Icon>
            Lọc
          </button>
        )}
      </PopperTrigger>

      <PopperContent className="rounded-xl">
        <div className="px-3 py-4 flex flex-col gap-2">
          {/*  */}
          <div>
            <p className="ml-1 font-medium">Thống kê theo</p>

            <Select
              modelValue={filters}
              onChange={updateFilter}
              data={loaiThongKeList}
              valueKey="ID"
              labelKey="ten"
              defaultFirstOption
              valueOnClear={LOAI_THONG_KE.HocHamHocVi}
            />
          </div>
        </div>
      </PopperContent>
    </Popper>
  )
}
