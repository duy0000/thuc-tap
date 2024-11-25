import { useNamespace } from '@/Services/Hooks'

export default function GioiThieuNhanSu() {
  const ns = useNamespace('dbcl')

  const listLanhDaoDonVi = [
    {
      stt: 1,
      hoTen: 'Phạm Thị Minh Hoa',
      chucVu: 'Trưởng phòng',
      email: 'ptmhoa@uneti.edu.vn',
      sdt: '0912443507',
    },
    {
      stt: 2,
      hoTen: 'Dương Thế Việt',
      chucVu: 'Phó phòng',
      email: 'dtviet@uneti.edu.vn',
      sdt: '0974307177',
    },
    {
      stt: 3,
      hoTen: 'Vũ Minh Đức',
      chucVu: 'Phó phòng',
      email: 'vmduc@uneti.edu.vn',
      sdt: '0912842302',
    },
  ]

  const listCanBoGiangVien = [
    {
      stt: 1,
      hoTen: 'Phạm Hữu Mỹ Dục',
      chucVu: 'Tổ trưởng',
      email: 'phmduc@uneti.edu.vn',
      sdt: '0915363268',
    },
    {
      stt: 2,
      hoTen: 'Lưu Thị Mai Lan',
      chucVu: 'Chuyên viên',
      email: 'ltmlan@uneti.edu.vn',
      sdt: '0934596179',
    },
    {
      stt: 3,
      hoTen: 'Phan Trọng Đức',
      chucVu: 'Chuyên viên',
      email: 'ptduc@uneti.edu.vn',
      sdt: '0904511223',
    },
    {
      stt: 4,
      hoTen: 'Đặng Thị Phượng',
      chucVu: 'Chuyên viên',
      email: 'dtphuong@uneti.edu.vn',
      sdt: '0975799097',
    },
    {
      stt: 5,
      hoTen: 'Trần Thị Thanh Hương',
      chucVu: 'Giảng viên chính',
      email: 'ttthuong@uneti.edu.vn',
      sdt: '0915341854',
    },
  ]

  return (
    <>
      <div
        className={[
          ns.b('header'),
          'flex items-center rounded-md mb-3 justify-between bg-uneti-primary p-2 text-white',
        ]}
      >
        <p className="font-bold uppercase">Giới thiệu chung</p>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-5">
        <div>
          <h3 className="font-semibold text-base pl-2">I. Cơ cấu tổ chức</h3>
          <div className="w-full flex flex-col gap-1 bg-stone-100 rounded-lg p-3">
            <div className="mt-1">
              <h3 className="font-medium pl-4 text-[15px]">Lãnh đạo đơn vị</h3>
              <div className="overflow-x-auto">
                <table className="uneti-u-table">
                  <thead>
                    <tr>
                      <th className="w-[60px]">STT</th>
                      <th className="min-w-[160px] text-left">Họ và tên</th>
                      <th className="min-w-[120px]">Chức vụ</th>
                      <th className="min-w-[120px]">Email</th>
                      <th className="min-w-[120px]">Điện thoại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listLanhDaoDonVi.map((e) => (
                      <tr key={e.stt}>
                        <td className=" text-center">{e.stt}</td>
                        <td>{e.hoTen}</td>
                        <td>{e.chucVu}</td>
                        <td>{e.email}</td>
                        <td className=" text-center">{e.sdt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="font-medium pl-4 text-[15px]">
                Cán bộ, giảng viên tại đơn vị
              </h3>
              <div className="overflow-x-auto">
                <table className="uneti-u-table">
                  <thead>
                    <tr>
                      <th className="w-[60px]">STT</th>
                      <th className="min-w-[160px] text-left">Họ và tên</th>
                      <th className="min-w-[120px]">Chức vụ</th>
                      <th className="min-w-[120px]">Email</th>
                      <th className="min-w-[120px]">Điện thoại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCanBoGiangVien.map((e) => (
                      <tr key={e.stt}>
                        <td className=" text-center">{e.stt}</td>
                        <td>{e.hoTen}</td>
                        <td>{e.chucVu}</td>
                        <td>{e.email}</td>
                        <td className=" text-center">{e.sdt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <span className="font-semibold text-base pl-2">
            II. Chức năng, nhiệm vụ
          </span>
          <div className="bg-stone-100 p-3 rounded">
            <div>
              <span className="font-semibold">Chức năng:</span>
              <ul className="list-disc pl-8 flex flex-col gap-1">
                <li>
                  Phòng Khảo thí và Đảm bảo chất lượng là một đơn vị chức năng
                  trực thuộc Trường Đại học Kinh tế - Kỹ thuật Công nghiệp;
                </li>
                <li>
                  Phòng Khảo thí và Đảm bảo chất lượng có chức năng tham mưu cho
                  Hiệu trưởng về việc tổ chức công tác khảo thí, công tác kiểm
                  định, đảm bảo chất lượng của Nhà trường.
                </li>
              </ul>
            </div>

            <div className="mt-2 flex flex-col">
              <span className="font-semibold">Nhiệm vụ và quyền hạn:</span>
              <ul className="list-disc pl-8 flex flex-col gap-1">
                <li>
                  Tổ chức thực hiện công tác khảo thí các kỳ thi của trường;
                </li>
                <li>
                  Tổ chức xây dựng và trình Hiệu trưởng ban hành các văn bản
                  liên quan đến công tác khảo thí. Hướng dẫn và theo dõi việc
                  thực hiện các văn bản này tại các đơn vị trong nhà trường;
                  Phối hợp với các khoa, bộ môn cải tiến phương pháp thi cho phù
                  hợp với yêu cầu của các ngành, bậc và hệ đào tạo nhằm nâng cao
                  hiệu quả đánh giá chất lượng đào tạo;
                </li>
                <li>
                  Phối hợp với các khoa, bộ môn tổ chức triển khai xây dựng,
                  quản lý và khai thác sử dụng ngân hàng đề thi kết thúc học
                  phần đối với các bậc, các hệ đảm bảo đúng mục tiêu môn học và
                  chuẩn đầu ra của ngành/chuyên ngành đào tạo;
                </li>
                <li>
                  Phối hợp với các đơn vị liên quan thực hiện công tác tổ chức
                  thi, tổ chức tiếp nhận giải quyết các khiếu nại, các yêu cầu
                  phúc khảo của người học;
                </li>
                <li>
                  Tổ chức thẩm định kết quả chấm thi của giảng viên, thực hiện
                  thống kê, phân tích dữ liệu điểm thi và báo cáo theo yêu cầu
                  của nhà trường về kết quả thực hiện công tác khảo thí.
                </li>
                <li>
                  Tổ chức thực hiện công tác đảm bảo chất lượng Xây dựng và
                  trình Hiệu trưởng ký ban hành các văn bản quy định và hướng
                  dẫn về công tác đảm bảo chất lượng của Nhà trường;
                </li>
                <li>
                  Tham mưu cho Ban Giám Hiệu kiểm tra, đánh giá việc thực hiện
                  các văn bản về đảm bảo chất lượng tại các đơn vị trong Nhà
                  trường;
                </li>
                <li>
                  Tham mưu cho Ban Giám Hiệu tổ chức hoạt động tự đánh giá và
                  đánh giá ngoài về kiểm định chất lượng giáo dục theo qui định
                  của Bộ Giáo dục và Đào tạo;
                </li>
                <li>
                  Xây dựng qui trình khảo sát, hướng dẫn đánh giá, xây dựng bộ
                  công cụ cho công tác tự đánh giá;
                </li>
                <li>
                  Hướng dẫn và hỗ trợ các đơn vị thực hiện công tác tự đánh giá
                  và triển khai thực hiện công tác đảm bảo chất lượng tại các
                  phòng, khoa, bộ môn, trung tâm trong Nhà tường;
                </li>
                <li>
                  Quản lý, lưu trữ hồ sơ tự đánh giá. Phối hợp với các đơn vị
                  liên quan thường xuyên cập nhật các minh chứng theo các tiêu
                  chuẩn đảm bảo chất lượng của Nhà trường;
                </li>
                <li>
                  Đề xuất các giải pháp cải tiến chất lượng dựa trên kết quả tự
                  đánh giá và đánh giá ngoài.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
