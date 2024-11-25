import { Select } from '@/Components/Base'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function KetQuaKiemDinh() {
  const listKetQuaKiemDinh = [
    {
      id: 1,
      label: 'Kiểm định chất lượng cơ sở giáo dục (14/06/2023)',
      url: '/doc/KetQuaKiemDinh_14-06-2023.pdf',
      aspect: '1.41/1',
    },
    {
      id: 2,
      label: 'Kiểm định chất lượng cơ sở giáo dục (29/06/2018)',
      url: '/doc/KetQuaKiemDinh_29-06-2018.pdf',
      aspect: '1/1.41',
    },
    {
      id: 3,
      label: 'Ngành quản trị kinh doanh',
      url: '/doc/QTKD.pdf',
      aspect: '1.41/1',
    },
    {
      id: 4,
      label: 'Ngành kế toán',
      url: '/doc/KETOAN.pdf',
      aspect: '1.41/1',
    },
    {
      id: 5,
      label: 'Ngành công nghệ kỹ thuật cơ khí',
      url: '/doc/CNKTCOKHI.pdf',
      aspect: '1.41/1',
    },
    {
      id: 6,
      label: 'Ngành công nghệ thực phẩm - trình độ đại học',
      url: '/doc/CN-THUCPHAM-DH.pdf',
      aspect: '1.41/1',
    },
    {
      id: 7,
      label: 'Ngành tài chính - ngân hàng',
      url: '/doc/TAICHINHNGANHANG.pdf',
      aspect: '1.41/1',
    },
    {
      id: 8,
      label: 'Ngành công nghệ kỹ thuật điện, điện tử',
      url: '/doc/CNKT-DIEN-DIENTU.pdf',
      aspect: '1.41/1',
    },
    {
      id: 9,
      label: 'Ngành công nghệ thông tin',
      url: '/doc/Cong-nghe-Thong-tin.pdf',
      aspect: '1.41/1',
    },
    {
      id: 10,
      label: 'Ngành công nghệ dệt, may',
      url: '/CN-Det-may.pdf',
      aspect: '1.41/1',
    },
    {
      id: 11,
      label: 'Ngành công nghệ kỹ thuật điện tử - viễn thông',
      url: '/doc/Cong-nghe-Ky-thuat-Dien-tu-Vien-thong.pdf',
      aspect: '1.41/1',
    },
    {
      id: 12,
      label: 'Ngành kinh doanh thương mại',
      url: '/doc/KDTM.pdf',
      aspect: '1.41/1',
    },
    {
      id: 13,
      label: 'Ngành công nghệ kỹ thuật điều khiển và tự động hóa',
      url: '/doc/CN-KTDK-TDH.pdf',
      aspect: '1.41/1',
    },
    {
      id: 14,
      label: 'Ngành công nghệ sợi, dệt',
      url: '/doc/CN-SOI-DET.pdf',
      aspect: '1.41/1',
    },
    {
      id: 15,
      label: 'Ngành ngôn ngữ anh',
      url: '/doc/NN-ANH.pdf',
      aspect: '1.41/1',
    },
    {
      id: 16,
      label: 'Ngành công nghệ kỹ thuật cơ điện tử',
      url: '/doc/CNKT-CO-DIEN-TU.pdf',
      aspect: '1.41/1',
    },
    {
      id: 17,
      label: 'Ngành mạng máy tính và truyền thông dữ liệu',
      url: '/doc/MANG-MAY-TINH-TTDL.pdf',
      aspect: '1.41/1',
    },
    {
      id: 18,
      label: 'Ngành công nghệ thực phẩm - trình độ thạc sĩ',
      url: '/doc/CN-THUC-PHAM-TRINH-DO-ThS.pdf',
      aspect: '1.41/1',
    },
  ]

  const [selectedId, setSelectedId] = useState(1)

  return (
    <>
      <div className="w-full bg-white p-4 rounded-xl">
        <span className="block h-[1px] w-full bg-uneti-primary-lighter rounded-full"></span>
        <h3 className="text-uneti-primary font-semibold text-xl pt-4 pb-2">
          III. KẾT QUẢ KIỂM ĐỊNH
        </h3>
        <div className="pt-2 flex flex-col justify-center items-center gap-4 p-4">
          <div className="w-[80%]">
            <Select
              clearable={false}
              modelValue={selectedId}
              onChange={(val) => setSelectedId(val)}
              data={listKetQuaKiemDinh}
              valueKey="id"
              labelKey="label"
              filterable={false}
              triggerClass="w-full"
            />
          </div>
          {/* scan here */}
          <div
            className={`w-full max-w-[80%] bg-white transition-all duration-200`}
          >
            <iframe
              style={{
                aspectRatio: listKetQuaKiemDinh.find((e) => e.id == selectedId)
                  .aspect,
              }}
              className={`w-full h-full`}
              src={listKetQuaKiemDinh.find((e) => e.id == selectedId).url}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}
