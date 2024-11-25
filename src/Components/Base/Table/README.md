## Table props

| prop               | desciption                          | type                 | default value |
| ------------------ | ----------------------------------- | -------------------- | ------------- |
| data               | Mảng dữ liệu cần hiển thị           | Array Object         | []            |
| modelValue         | Dữ liệu binding                     | Array Object         | null          |
| onUpdateModelValue | Hàm cập nhật dữ liệu cho modelValue | (row:Object) => void | () => {}      |
| height             | Chiều cao của table                 | Number               | 0             |
| maxHeight          | Chiều cao tối đa của table          | Number               | 0             |
| displayNumberOrder | Hiển thị số thứ tự ở đầu hàng       | Boolean              | true          |

## TableColumn props

| prop     | desciption                       | type                         | default value |
| -------- | -------------------------------- | ---------------------------- | ------------- |
| width    | Độ rộng của cột (0 là không set) | Number                       | 0             |
| maxWidth | Độ rộng tối đa của cột           | Number                       | 0             |
| minWidth | Độ rộng tối thiểu của cột        | Number                       | 0             |
| align    | Căn chỉnh theo chiều ngang       | CSSProperties.JustifyContent | `left`        |
| valign   | Căn chỉnh theo chiều dọc         | CSSProperties.AlignItems     | `center`      |

```jsx
const [tableModel, setTableModel] = useState([])
const data = [{
  ID: 1,
  HoTen: 'A',
  NgaySinh: 'xxxxxxxT000x',
}]

<Table
  data={danhSachNhanLuc}
  modelValue={tableModel}
  onUpdateModelValue={setTableModel}
  maxHeight={600}
>
  <TableColumn
    label="Chọn"
    minWidth={50}
    align="center"
    checkable
    fixed
  />
  <TableColumn
    label="Mã"
    prop="ID"
    minWidth={100}
    fixed
    align="center"
  />
  <TableColumn label="Họ tên" prop="HoTen" minWidth={100} />
  <TableColumn label="Ngày sinh" minWidth={100}>
    {(row) => dayjs(row.NgaySinh).format('DD/MM/YYYY')}
  </TableColumn>
</Table>
```
