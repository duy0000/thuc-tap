import THeadQuery from './THeadQuery'
import TBodyQuery from './TBodyQuery'
import TPaginationQuery from './TPaginationQuery'
import { useMemo } from 'react'
import clsx from 'clsx'

function TableQuery({ dataReactTable, classNameTable, children }) {
  const columnSizeVars = useMemo(() => {
    const headers = dataReactTable?.getFlatHeaders()
    const colSizes = {}
    for (let i = 0; i < headers?.length; i++) {
      const header = headers[i]
      colSizes[`--header-${header?.id}-size`] = header?.getSize()
      colSizes[`--col-${header?.column.id}-size`] = header?.column?.getSize()
    }
    return colSizes
  }, [
    dataReactTable?.getState()?.columnSizingInfo,
    dataReactTable?.getState()?.columnSizing,
  ])

  return (
    <div
      className={clsx(classNameTable ? classNameTable : '')}
      style={{
        ...columnSizeVars,
        // width: dataReactTable.getTotalSize(),
      }}
    >
      {children}
    </div>
  )
}
TableQuery.displayName = 'TableQuery'
TableQuery.Header = THeadQuery
TableQuery.Body = TBodyQuery
TableQuery.Pagination = TPaginationQuery

export default TableQuery
