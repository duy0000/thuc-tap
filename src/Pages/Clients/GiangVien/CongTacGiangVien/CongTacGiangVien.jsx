import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { moduleCTGVStatic } from '@/Services/Static/GiangVien/'
import React from 'react'

function CongTacGiangVien() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 -mt-16">
      {moduleCTGVStatic.homeCongTacGiangVien.map((itemCTGV, index) => {
        return (
          <React.Fragment key={index}>
            <ModuleItem item={itemCTGV} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default CongTacGiangVien
