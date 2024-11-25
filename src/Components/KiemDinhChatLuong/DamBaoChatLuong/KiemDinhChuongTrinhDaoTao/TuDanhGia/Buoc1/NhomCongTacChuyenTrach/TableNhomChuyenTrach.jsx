import {
  Popper,
  PopperContent,
  PopperTrigger,
  Table,
  TableColumn,
} from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import { Trash } from '@/Components/Base/Icons/Trash'
import { BiPlus } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'

export default function TableData({
  nhomChuyenTrach,
  handleViewUsers,
  handleAddUsers,
  handleUpdate,
  handleDelete,
}) {
  return (
    <Table data={nhomChuyenTrach}>
      <TableColumn
        label="Tên nhóm"
        minWidth={200}
        prop="KT_KDCL_CTDT_NhomChuyenTrach_TenNhom"
      />
      <TableColumn label="Trưởng nhóm" minWidth={200}>
        {(row) => {
          return (
            row.KT_KDCL_CTDT_NhomChuyenTrach_TruongNhom || (
              <i className="text-red-500">Chưa chọn</i>
            )
          )
        }}
      </TableColumn>
      <TableColumn
        label="Số thành viên"
        minWidth={200}
        prop="KT_KDCL_CTDT_NhomChuyenTrach_SoThanhVien"
      />
      <TableColumn label="Tác vụ" align="center" width={200}>
        {(row) => (
          <div className="flex items-center justify-center gap-2">
            <Popper trigger="hover" interactive={false}>
              <PopperTrigger>
                <button
                  onClick={() => handleViewUsers(row)}
                  className="icon-btn"
                >
                  <Icon>
                    <BsEye />
                  </Icon>
                </button>
              </PopperTrigger>

              <PopperContent>Danh sách thành viên</PopperContent>
            </Popper>
            <Popper trigger="hover" interactive={false}>
              <PopperTrigger>
                <button
                  onClick={() => handleAddUsers(row)}
                  className="icon-btn"
                >
                  <Icon>
                    <BiPlus />
                  </Icon>
                </button>
              </PopperTrigger>

              <PopperContent>Thêm thành viên</PopperContent>
            </Popper>
            <button onClick={() => handleUpdate(row)} className="icon-btn">
              <Icon>
                <Brush />
              </Icon>
            </button>
            <button onClick={() => handleDelete(row)} className="icon-btn">
              <Icon>
                <Trash />
              </Icon>
            </button>
          </div>
        )}
      </TableColumn>
    </Table>
  )
}
