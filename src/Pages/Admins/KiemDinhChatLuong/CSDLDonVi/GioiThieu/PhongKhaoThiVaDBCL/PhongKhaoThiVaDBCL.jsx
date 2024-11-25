export default function PhongKhaoThiVaDBCL() {
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
      <div className="bg-white p-4 rounded-xl  w-full">
        <span className="block h-[1px] w-full bg-uneti-primary-lighter rounded-full"></span>
        <h3 className="text-uneti-primary font-semibold text-xl pt-4">
          II. PHÒNG KHẢO THÍ VÀ ĐẢM BẢO CHẤT LƯỢNG
        </h3>
        <div className="pt-2 flex justify-center items-center flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold indent-5">
              1. Quá trình hình thành và phát triển:
            </span>
            <span className="indent-5">
              Phòng Khảo thí và Đảm bảo chất lượng được điều chuyển chức năng
              nhiệm vụ và đổi tên theo quyết định số 666 ngày 02 tháng 12 năm
              2019 của Hiệu trưởng trường Đại học Kinh tế - Kỹ thuật Công
              nghiệp. Tiền thân của Phòng là Trung tâm Khảo thí và bộ phận Đảm
              bảo chất lượng của phòng Thanh tra và Đảm bảo chất lượng
            </span>
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold indent-5">
              2. Những thành tích đã đạt được:
            </span>
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold indent-5">3. Cơ cấu tổ chức:</span>

            <span className="font-semibold indent-5">- Lãnh đạo đơn vị:</span>
            <table>
              <thead>
                <tr>
                  <th className="border border-black p-1">STT</th>
                  <th className="border border-black p-1">Họ và tên</th>
                  <th className="border border-black p-1">Chức vụ</th>
                  <th className="border border-black p-1">Email</th>
                  <th className="border border-black p-1">Điện thoại</th>
                </tr>
              </thead>
              <tbody>
                {listLanhDaoDonVi.map((e) => (
                  <tr key={e.stt}>
                    <td className="border border-black p-1 text-center">
                      {e.stt}
                    </td>
                    <td className="border border-black p-1">{e.hoTen}</td>
                    <td className="border border-black p-1">{e.chucVu}</td>
                    <td className="border border-black p-1">{e.email}</td>
                    <td className="border border-black p-1 text-center">
                      {e.sdt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <span className="font-semibold indent-5">
              - Cán bộ, giảng viên tại đơn vị:
            </span>
            <table>
              <thead>
                <tr>
                  <th className="border border-black p-1">STT</th>
                  <th className="border border-black p-1">Họ và tên</th>
                  <th className="border border-black p-1">Chức vụ</th>
                  <th className="border border-black p-1">Email</th>
                  <th className="border border-black p-1">Điện thoại</th>
                </tr>
              </thead>
              <tbody>
                {listCanBoGiangVien.map((e) => (
                  <tr key={e.stt}>
                    <td className="border border-black p-1 text-center">
                      {e.stt}
                    </td>
                    <td className="border border-black p-1">{e.hoTen}</td>
                    <td className="border border-black p-1">{e.chucVu}</td>
                    <td className="border border-black p-1">{e.email}</td>
                    <td className="border border-black p-1 text-center">
                      {e.sdt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold indent-5">
              4. Chức năng, nhiệm vụ:
            </span>
            <span className="font-semibold indent-5">- Chức năng:</span>
            <span className="indent-5">
              + Phòng Khảo thí và Đảm bảo chất lượng là một đơn vị chức năng
              trực thuộc Trường Đại học Kinh tế - Kỹ thuật Công nghiệp;
            </span>
            <span className="indent-5">
              + Phòng Khảo thí và Đảm bảo chất lượng có chức năng tham mưu cho
              Hiệu trưởng về việc tổ chức công tác khảo thí, công tác kiểm định,
              đảm bảo chất lượng của Nhà trường.
            </span>
            <span className="font-semibold indent-5">
              - Nhiệm vụ và quyền hạn:
            </span>
            <span className="indent-5">
              Tổ chức thực hiện công tác khảo thí các kỳ thi của trường;
            </span>
            <span className="indent-5">
              Tổ chức xây dựng và trình Hiệu trưởng ban hành các văn bản liên
              quan đến công tác khảo thí. Hướng dẫn và theo dõi việc thực hiện
              các văn bản này tại các đơn vị trong nhà trường; Phối hợp với các
              khoa, bộ môn cải tiến phương pháp thi cho phù hợp với yêu cầu của
              các ngành, bậc và hệ đào tạo nhằm nâng cao hiệu quả đánh giá chất
              lượng đào tạo;
            </span>
            <span className="indent-5">
              Phối hợp với các khoa, bộ môn tổ chức triển khai xây dựng, quản lý
              và khai thác sử dụng ngân hàng đề thi kết thúc học phần đối với
              các bậc, các hệ đảm bảo đúng mục tiêu môn học và chuẩn đầu ra của
              ngành/chuyên ngành đào tạo;
            </span>
            <span className="indent-5">
              Phối hợp với các đơn vị liên quan thực hiện công tác tổ chức thi,
              tổ chức tiếp nhận giải quyết các khiếu nại, các yêu cầu phúc khảo
              của người học;
            </span>
            <span className="indent-5">
              Tổ chức thẩm định kết quả chấm thi của giảng viên, thực hiện thống
              kê, phân tích dữ liệu điểm thi và báo cáo theo yêu cầu của nhà
              trường về kết quả thực hiện công tác khảo thí.
            </span>
            <span className="indent-5">
              Tổ chức thực hiện công tác đảm bảo chất lượng Xây dựng và trình
              Hiệu trưởng ký ban hành các văn bản quy định và hướng dẫn về công
              tác đảm bảo chất lượng của Nhà trường;
            </span>
            <span className="indent-5">
              Tham mưu cho Ban Giám Hiệu kiểm tra, đánh giá việc thực hiện các
              văn bản về đảm bảo chất lượng tại các đơn vị trong Nhà trường;
            </span>
            <span className="indent-5">
              Tham mưu cho Ban Giám Hiệu tổ chức hoạt động tự đánh giá và đánh
              giá ngoài về kiểm định chất lượng giáo dục theo qui định của Bộ
              Giáo dục và Đào tạo;
            </span>
            <span className="indent-5">
              Xây dựng qui trình khảo sát, hướng dẫn đánh giá, xây dựng bộ công
              cụ cho công tác tự đánh giá;
            </span>
            <span className="indent-5">
              Hướng dẫn và hỗ trợ các đơn vị thực hiện công tác tự đánh giá và
              triển khai thực hiện công tác đảm bảo chất lượng tại các phòng,
              khoa, bộ môn, trung tâm trong Nhà tường;
            </span>
            <span className="indent-5">
              Quản lý, lưu trữ hồ sơ tự đánh giá. Phối hợp với các đơn vị liên
              quan thường xuyên cập nhật các minh chứng theo các tiêu chuẩn đảm
              bảo chất lượng của Nhà trường;
            </span>
            <span className="indent-5">
              Đề xuất các giải pháp cải tiến chất lượng dựa trên kết quả tự đánh
              giá và đánh giá ngoài.
            </span>
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold indent-5">
              5. Quy mô và năng lực hoạt động:….
            </span>
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold indent-5">
              6. Định hướng phát triển:….
            </span>
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="font-semibold indent-5">7. Địa chỉ liên hệ:</span>
            <span className="indent-5">
              - Cơ sở Hà Nội: Tầng 5 HA11 khu giảng đường Trường Đại học Kinh tế
              - Kỹ thuật Công nghiệp
            </span>
            <span className="indent-5">
              - Ngõ 218 Đường Lĩnh Nam, Q.Hoàng Mai, TP.Hà Nội.
            </span>
            <span className="indent-5">
              - Cơ sở Nam Định: Phòng Khảo thí và Đảm bảo chất lượng, tầng 2 nhà
              NA2 353 Trần Hưng Đạo, TP Nam Định
            </span>
            <span className="indent-5">- Email: phongqlcl@uneti.edu.vn</span>
          </div>
        </div>
      </div>
    </>
  )
}
