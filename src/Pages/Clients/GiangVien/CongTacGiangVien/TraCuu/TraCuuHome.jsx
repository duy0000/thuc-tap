import ModuleItem from '@/Components/ModuleItem/ModuleItem'
import { moduleCTGVStatic } from '@/Services/Static/GiangVien'
import React from 'react'

function TraCuuHome() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
      {moduleCTGVStatic.homeCTGV_TraCuu.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <ModuleItem item={item} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default TraCuuHome
