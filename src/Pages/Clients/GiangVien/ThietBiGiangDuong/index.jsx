import React from 'react'
import { homeHTTBGD } from '@/Services/Static/GiangVien'
import ModuleItem from '@/Components/ModuleItem/ModuleItem.jsx'

function HomeTBGD() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 -mt-16">
        {homeHTTBGD.map((itemHTTBGD, index) => {
          return (
            itemHTTBGD.moduleActive && (
              <React.Fragment key={index}>
                <ModuleItem item={itemHTTBGD} />
              </React.Fragment>
            )
          )
        })}
      </div>
    </>
  )
}

export default HomeTBGD
