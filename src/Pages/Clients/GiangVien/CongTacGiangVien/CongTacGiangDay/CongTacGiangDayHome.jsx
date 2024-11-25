import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import React from 'react'
import ModuleCTGV from '@/Services/Static/GiangVien/ModuleCongTacGiangVienStatic'

function CongTacGiangDayHome() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
      {ModuleCTGV.homeCTGV_CongTacGiangDay.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <ModuleItem item={item} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default CongTacGiangDayHome
