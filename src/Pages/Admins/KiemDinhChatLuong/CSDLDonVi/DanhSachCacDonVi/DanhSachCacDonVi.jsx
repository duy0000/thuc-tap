import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableColumn } from '@/Components/Base'
import SoDoCoCauToChucDanhSachCacDonVi from '/images/SoDoCoCauToChucDanhSachCacDonVi.jpg'

export default function DanhSachCacDonVi() {
  const [danhSachDonVi] = useState([
    {
      tenDonVi: 'Phòng Tổ chức cán bộ',
      link: 'https://uneti.edu.vn/4473/',
    },
    {
      tenDonVi: 'Phòng Khoa học - Công nghệ',
      link: 'https://uneti.edu.vn/phong-quan-ly-khoa-hoc/',
    },
    {
      tenDonVi: 'Phòng Hành chính quản trị',
      link: 'https://uneti.edu.vn/phong-hanh-chinh-quan-tri/',
    },
    {
      tenDonVi: 'Phòng Thanh tra - pháp chế',
      link: 'https://uneti.edu.vn/phong-thanh-tra-phap-che/',
    },
    {
      tenDonVi: 'Phòng Đào tạo',
      link: 'https://uneti.edu.vn/1620/',
    },
    {
      tenDonVi: 'Phòng Tuyển sinh và Truyền thông',
      link: 'https://uneti.edu.vn/phong-tuyen-sinh-va-truyen-thong/',
    },
    {
      tenDonVi: 'Phòng Tài chính kế toán',
      link: 'https://uneti.edu.vn/phong-tai-chinh-ke-toan/',
    },
    {
      tenDonVi: 'Phòng Chính trị và công tác sinh viên',
      link: 'https://uneti.edu.vn/1604/',
    },
    {
      tenDonVi: 'Phòng Khảo thí và đảm bảo chất lượng',
      link: 'https://uneti.edu.vn/phong-quan-ly-chat-luong/',
    },
  ])

  return (
    <>
      <div className="box">
        <div className="flex justify-between items-center">
          <Link to="/csdl-don-vi/tong-quan">
            <button className="base-button bg-uneti-primary">Quay lại</button>
          </Link>

          <h3>
            Danh sách các đơn vị -{' '}
            <span className="font-semibold">
              Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
            </span>
          </h3>
        </div>

        <div className="uneti-divider" />

        <div className="my-4">
          <div className="flex items-center justify-between mb-3 relative z-[3]">
            <h3 className="uppercase font-semibold line-clamp-1">
              Danh sách các đơn vị đào tạo
            </h3>
          </div>

          <div className="w-[75%] mx-auto">
            <img src={SoDoCoCauToChucDanhSachCacDonVi} />
          </div>

          <Table data={danhSachDonVi} maxHeight={600}>
            <TableColumn label="Tên đơn vị" prop="tenDonVi" />
            <TableColumn label="" align="center">
              {(item) => (
                <a
                  className="hover:text-uneti-primary hover:underline"
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Xem chi tiết
                </a>
              )}
            </TableColumn>
          </Table>
        </div>
      </div>
    </>
  )
}
