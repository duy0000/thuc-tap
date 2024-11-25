import { Link } from 'react-router-dom'
import Icon from '@/Components/Base/Icon/Icon'
import { TbDownload } from 'react-icons/tb'

export default function DanhSachVanBan() {
  const fakeDanhSachVanBan = [
    {
      id: '1',
      ngay: '04/03/2023',
      tieuDe: '1. QĐ thành lập HĐ ĐBCL',
      link: 'doc/1.QDthanhlapHDDBCL.pdf',
    },
    {
      id: '2',
      ngay: '04/05/2022',
      tieuDe: '2.1 NQ 04 2022 về Quy chế Tổ chức, hoạt động trường',
      link: 'doc/2.1NQ042022veQuycheTochcc,hoatdongtruong.pdf',
    },
    {
      id: '3',
      ngay: '01/08/2020',
      tieuDe: '1. Guide to AUN QA Assessment at Programme Level Version 4.0',
      link: 'doc/1.Guide-to-AUN-QA-Assessment-at-Programme-Level-Version-4.0.pdf',
    },
    {
      id: '4',
      ngay: '01/10/2020',
      tieuDe:
        '2. Bản dịch Guide to AUN QA Assessment at Programme Level Version 4.0',
      link: 'doc/2.BanDich-Guide-to-AUN-QA-Assessment-at-Programme-Level-Version-4.0.pdf',
    },
    {
      id: '5',
      ngay: '14/03/2016',
      tieuDe: '1. TT  04.2016 bộ tiêu chuẩn KĐ CTĐT (14.3.2016)',
      link: 'doc/1.TT04.2016botieuchuanKDCTDT(14.3.2016).pdf',
    },
    {
      id: '6',
      ngay: '14/03/2016',
      tieuDe: '2. TL hướng dẫn kèm CV 1669 thay thế CV 769 (31.12.2019)',
      link: 'doc/2.TLhuongdankemCV1669thaytheCV769(31.12.2019).docx',
    },
    {
      id: '7',
      ngay: '31/12/2020',
      tieuDe: '3. Công văn 2085 hướng dẫn TĐG va ĐGN CTĐT 31.12.2020',
      link: 'doc/3.Congvan2085huongdanTDGvaDGNCTDT31.12.2020.pdf',
    },
    {
      id: '8',
      ngay: '31/12/2019',
      tieuDe: '1a- CV1668 thay thế CV 768 (31.12.2019)',
      link: 'doc/1a-CV1668thaytheCV768(31.12.2019).docx',
    },
    {
      id: '9',
      ngay: '31/12/2019',
      tieuDe: '1b. Bảng hướng dẫn kèm CV 1668 thay thế CV 768 (31.12.2019)',
      link: 'doc/1b.BanghuongdankemCV1668thaytheCV768(31.12.2019).docx',
    },
    {
      id: '10',
      ngay: '12/2017',
      tieuDe: '12-2017-TT-BGDÐT',
      link: 'doc/12-2017-TT-BGDDT.docx',
    },
  ]

  return (
    <>
      <div className="bg-white p-4 rounded-xl w-full">
        <span className="block h-[1px] w-full bg-uneti-primary-lighter rounded-full"></span>
        <h3 className="text-uneti-primary font-semibold text-xl pt-4 pb-2">
          IV. DANH SÁCH VĂN BẢN
        </h3>
        <div className="pt-2 flex justify-center items-center">
          <table className="w-full">
            <thead>
              <tr className="bg-uneti-primary-lighter text-white">
                <th className="p-2 border border-uneti-primary w-[50px]">
                  STT
                </th>
                <th className="p-2 border border-uneti-primary w-[150px]">
                  Ngày
                </th>
                <th className="p-2 border border-uneti-primary">Tiêu đề</th>
                <th className="p-2 border border-uneti-primary w-[100px]">
                  File
                </th>
              </tr>
            </thead>
            <tbody>
              {fakeDanhSachVanBan.map((e, i) => (
                <tr key={i} className="hover:bg-slate-100">
                  <td className="p-2 border border-uneti-primary text-center">
                    {i + 1}
                  </td>
                  <td className="p-2 border border-uneti-primary text-center">
                    {e.ngay}
                  </td>
                  <td className="p-2 border border-uneti-primary">
                    {e.tieuDe}
                  </td>
                  <td className="p-2 border border-uneti-primary text-center">
                    <a href={`/${e.link}`} download>
                      <Icon size={32}>
                        <TbDownload />
                      </Icon>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
