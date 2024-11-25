import { useNamespace } from '@/Services/Hooks'
import { memo, useEffect, useState } from 'react'
import { SidebarBMSItem } from './SidebarBMSItem'
import './LayoutQuanLyBMS.scss'
import { pathModuleBoDieuKhienBMS } from '@/Services/Static/PathStatic'
import Swal from 'sweetalert2'

const SidebarBMS = memo(function SidebarBMS({ showSidebar, setShowSidebar }) {
  const bem = useNamespace('bms-sidebar')

  const [currentIndex, setCurrrentIndex] = useState(null)
  const [currentChildIndex, setCurrentChildIndex] = useState(null)
  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('sidebarState'))

    if (savedState) {
      setCurrrentIndex(savedState.currentIndex)
      setCurrentChildIndex(savedState.currentChildIndex)
      setOpenItems(savedState.openItems)
    } else {
      setCurrrentIndex(0)
      if (pathModuleBoDieuKhienBMS[0]?.chilrenPath) {
        setOpenItems({ 0: true })
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'sidebarState',
      JSON.stringify({ currentIndex, currentChildIndex, openItems }),
    )
  }, [currentIndex, currentChildIndex, openItems])

  const toggleItemOpen = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const handleSidebarItemClick = (index) => {
    setCurrrentIndex(index)
    setShowSidebar(false)
    setCurrentChildIndex(null)
  }

  const handleChildItemClick = (parentIndex, childIndex) => {
    setCurrrentIndex(parentIndex) // Mark parent as active
    setCurrentChildIndex(childIndex) // Mark child as active
    setShowSidebar(false)
  }

  return (
    <div className={`${bem.b()} ${bem.is('active', showSidebar)}`}>
      <h3 className={bem.e('title')}>UNETI</h3>

      {pathModuleBoDieuKhienBMS?.map((e, index) => {
        const isActive = index === currentIndex
        const isOpen = openItems[index] || false // Check if this item is open

        if (!e.chilrenPath) {
          return (
            <SidebarBMSItem
              key={index}
              name={e.label}
              onClick={() => {
                if (!e.isActive) {
                  Swal.fire({
                    icon: 'info',
                    title: 'Chức năng này đang trong quá trình phát triển!',
                    text: 'Vui lòng quay lại sau khi có thông báo chức năng hoàn thiện.',
                  })
                } else {
                  handleSidebarItemClick(index)
                }
              }}
              path={e.path}
              parentActive={e.isActive}
              active={isActive}
            />
          )
        } else {
          return (
            <div key={index} className="flex flex-col">
              <SidebarBMSItem
                name={e.label}
                onClick={() => {
                  handleSidebarItemClick(index)
                  toggleItemOpen(index)
                }}
                active={isActive}
                hasChild={true}
                isOpen={isOpen}
              />
              {isOpen && (
                <div className="px-4 flex flex-col">
                  {e.chilrenPath.map((child, childIndex) => {
                    const isChildActive =
                      currentIndex === index && currentChildIndex === childIndex

                    return (
                      <SidebarBMSItem
                        key={child.id}
                        name={child.label}
                        onClick={() => {
                          if (!child.isActive) {
                            Swal.fire({
                              icon: 'info',
                              title:
                                'Chức năng này đang trong quá trình phát triển!',
                              text: 'Vui lòng quay lại sau khi có thông báo chức năng hoàn thiện.',
                            })
                          } else {
                            handleChildItemClick(index, childIndex)
                          }
                        }}
                        path={`${e.path}/${child.path}`}
                        active={isChildActive}
                        childActive={child.isActive}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          )
        }
      })}
    </div>
  )
})

export default SidebarBMS
