import TableDanhSachBDKBMSDungChung from './Table'

export default function DanhSachBDKBMSDungChung(props) {
  const {
    listDieuKhienBMS,
    numSelected,
    rowCount,
    onSelectAllClick,
    onSelected,
    isSelected,
  } = props
  return (
    <div className="w-full">
      <TableDanhSachBDKBMSDungChung
        listDieuKhienBMS={listDieuKhienBMS}
        numSelected={numSelected}
        rowCount={rowCount}
        onSelectAllClick={onSelectAllClick}
        onSelected={onSelected}
        isSelected={isSelected}
      />
    </div>
  )
}
