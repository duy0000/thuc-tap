import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useNamespace } from '@/Services/Hooks'
import PropTypes from 'prop-types'

import './Sidebar.scss'
import { useEffect, useState } from 'react'
import { getDataMenu } from '@/Apis/HoTroSuDungPhanMem/apiHoTroSuDungPhanMem'
import clsx from 'clsx'
import { FaAngleRight } from 'react-icons/fa6'
import { changeSlug } from '@/Services/Utils/stringUtils'
import { useSearchParams } from 'react-router-dom'
import useQueryParams from '@/Services/Hooks/useQueryParams'

export const Sidebar = ({
  category,
  onCategoryChange,
  setSearch,
  showSidebar,
  setShowSidebar,
}) => {
  const bem = useNamespace('htsdpm-sidebar')

  const [categories, setCategories] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = useQueryParams()

  const handleSidebarItemClick = (categoryParent, categoryChild) => {
    onCategoryChange({
      ...category,
      categoryParent: {
        label: categoryParent,
        path: changeSlug(categoryParent),
        value: categoryParent,
      },
      categoryChild: {
        label: categoryChild ?? '',
        path: categoryChild ? changeSlug(categoryChild) : '',
        value: categoryChild ?? '',
      },
    })

    if (categoryParent && categoryChild) {
      setSearchParams({
        [changeSlug(categoryParent)]: categoryChild
          ? changeSlug(categoryChild)
          : '',
      })
    } else {
      setSearchParams({})
    }

    setSearch('')
    setShowSidebar(false)
  }

  useEffect(() => {
    getDataMenu().then((res) => {
      setCategories(res.data.data)
    })
  }, [])

  return (
    <div className={`${bem.b()} ${bem.is('active', showSidebar)}`}>
      <h3 className={bem.e('title')}>Danh mục</h3>
      <SidebarItem name={'Tất cả tài liệu'}>
        <p
          onClick={() => handleSidebarItemClick('all', '')}
          className={clsx(
            'font-bold text-sm text-uneti-primary-lighter cursor-pointer hover:bg-uneti-primary-lighter hover:text-white p-2 rounded-md uppercase',
            category?.categoryParent.value === 'all' &&
              'bg-uneti-primary-lighter p-2 rounded-md text-white',
          )}
        >
          Tất cả tài liệu
        </p>
      </SidebarItem>
      {categories?.map((e, index) => {
        const isActive =
          category?.categoryParent.value === e.parentMenu ||
          Object.keys(queryParams)[0] === changeSlug(e.parentMenu)
        return (
          <SidebarItem key={index} name={e.parentMenu} active={isActive}>
            <p
              onClick={() => handleSidebarItemClick(e.parentMenu)}
              className={clsx(
                'font-semibold text-xs cursor-pointer hover:bg-uneti-primary-lighter hover:text-white p-2 rounded-md flex items-center justify-between uppercase',
                isActive &&
                  'bg-uneti-primary-lighter p-2 rounded-md text-white',
              )}
            >
              {e?.parentMenu ?? 'Không xác định'}
              {e.parentMenu !== 'VIDEO HƯỚNG DẪN' &&
                e?.childrenMenu?.length > 0 && (
                  <FaAngleRight
                    className={clsx(
                      'w-4 h-4',
                      e.parentMenu !== 'VIDEO HƯỚNG DẪN' &&
                        isActive &&
                        'rotate-90',
                    )}
                  />
                )}
            </p>
            {isActive &&
              e.parentMenu !== 'VIDEO HƯỚNG DẪN' &&
              e?.childrenMenu && (
                <ul className="pl-4 py-2">
                  {e?.childrenMenu?.map((childrenItem, index) => {
                    const isActiveChildren =
                      category?.categoryChild.value === childrenItem ||
                      Object.values(queryParams)[0] === changeSlug(childrenItem)
                    return (
                      <li
                        key={index}
                        className={clsx(
                          'text-sm mb-2 hover:bg-blue-50 hover:text-blue-500 hover:font-semibold rounded-md p-1 cursor-pointer',
                          isActiveChildren &&
                            'bg-blue-50 text-blue-500 font-semibold',
                        )}
                        onClick={() => {
                          handleSidebarItemClick(e.parentMenu, childrenItem)
                        }}
                      >
                        {childrenItem}
                      </li>
                    )
                  })}
                </ul>
              )}
          </SidebarItem>
        )
      })}
    </div>
  )
}

Sidebar.props = {
  category: PropTypes.string,
  onCategoryChange: PropTypes.func,
  setSearch: PropTypes.func,
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
}
