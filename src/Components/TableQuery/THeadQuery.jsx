import PropTypes from 'prop-types'
import THeadFilterQuery from './THeadFilterQuery'
import { flexRender } from '@tanstack/react-table'
import clsx from 'clsx'
import { Popper, PopperTrigger, PopperContent } from '@/Components/Base'
import { BsPin, BsThreeDotsVertical } from 'react-icons/bs'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'
import { useRef } from 'react'
import { getCommonPinningStyles } from './constants'

function THeadQuery({ heads }) {
  const popperRef = useRef(null)
  return (
    <thead>
      {heads &&
        heads?.map((headerGroup, index) => {
          // console.log(headerGroup)
          return (
            <tr key={index} className="bg-cyan-700">
              {headerGroup.headers.map((header, index) => {
                let rowSpan = 1
                const leafs = header.getLeafHeaders()
                if (header.isPlaceholder) {
                  rowSpan = leafs[leafs.length - 1].depth - header.depth
                }

                /**
                 * 4THeadQuery.jsx:27 1
15THeadQuery.jsx:27 2
28THeadQuery.jsx:27 3
38THeadQuery.jsx:27 4
41THeadQuery.jsx:27 5
                 */

                console.log(header.headerGroup.headers.length)
                // console.log(header.getLeafHeaders())
                // console.log(header.column.getIsLastColumn())

                return (
                  <th
                    key={index}
                    colSpan={header.colSpan}
                    rowSpan={header.isPlaceholder ? 1 : rowSpan}
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'medium',
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderRight: `${header.colSpan === index ? '' : '1px solid #fff'}`,
                      borderTop: '1px solid #fff',
                      width: `${header.getSize()}px`,
                      whiteSpace: `${header.getSize() > 120 ? 'normal' : 'nowrap'}`,
                      ...getCommonPinningStyles(header.column),
                    }}
                  >
                    <div className="flex items-center justify-around">
                      <p>
                        {header.isPlaceholder
                          ? ''
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </p>
                      <div
                        className={clsx(
                          header.isPlaceholder || header.colSpan > 1
                            ? 'hidden'
                            : 'relative z-50',
                        )}
                      >
                        {/* START: Action (Pin, Sort) */}
                        <Popper
                          ref={popperRef}
                          placement={'bottom'}
                          fit
                          persistent
                        >
                          <PopperTrigger>
                            <button>
                              <BsThreeDotsVertical
                                id="popup-menu"
                                size={16}
                                className="cursor-pointer"
                                aria-controls={'customized-menu'}
                              />
                            </button>
                          </PopperTrigger>

                          <PopperContent className="rounded-xl bg-white border border-gray-200 slide-down min-w-[200px] min-h-[100px] z-[900] py-2 px-0">
                            <div className="flex flex-col font-normal">
                              <button
                                type="button"
                                onClick={() => {
                                  header.column.pin(
                                    header.column.getIsPinned()
                                      ? false
                                      : 'left',
                                  )
                                }}
                                className="text-gray-900 font-semibold hover:font-semibold hover:bg-cyan-700 hover:text-white px-6 py-2 flex items-center gap-4"
                              >
                                <BsPin size={16} />
                                {header.column.getIsPinned()
                                  ? 'Bỏ ghim'
                                  : 'Ghim cột'}
                              </button>
                              <button className="text-gray-900 font-semibold hover:font-semibold hover:bg-cyan-700 hover:text-white px-6 py-2 flex items-center gap-4">
                                <FiArrowUp />
                                Sắp xếp tăng dần
                              </button>
                              <button className="text-gray-900 font-semibold hover:font-semibold hover:bg-cyan-700 hover:text-white px-6 py-2 flex items-center gap-4">
                                <FiArrowDown />
                                Sắp xếp giảm dần
                              </button>
                            </div>
                          </PopperContent>
                        </Popper>
                        {/* END: Action (Pin, Sort) */}
                      </div>
                    </div>
                  </th>
                )
              })}
            </tr>
          )
        })}
      <tr>
        {heads?.at(-1).headers.map((header, index) => {
          const isFilter = header.column.getCanFilter()
          return (
            isFilter && (
              <td key={index}>
                <THeadFilterQuery column={header.column} />
              </td>
            )
          )
        })}
      </tr>
    </thead>
  )
}

THeadQuery.propTypes = {
  heads: PropTypes.array.isRequired,
}

THeadQuery.displayName = 'THeadQuery'

export default THeadQuery
