import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { homeCTGV } from '@/Services/Static/dataStatic'
import React from 'react'

export default function CongTacGiangVienView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 -mt-16">
      {homeCTGV.map((itemCTGV, index) => {
        return (
          <React.Fragment key={index}>
            <ModuleItem item={itemCTGV} />
          </React.Fragment>
        )
      })}
    </div>
  )
}
