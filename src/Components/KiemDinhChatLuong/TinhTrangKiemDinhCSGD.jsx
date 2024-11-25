import { useNamespace } from '@/Services/Hooks'

export default function TinhTrangKiemDinhCSGD() {
  const ns = useNamespace('tt-kiemdinh-csgd')
  return (
    <>
      <div
        className={[
          ns.b('header'),
          'flex items-center rounded-md mt-6 mb-3 justify-between bg-uneti-primary p-2 text-white',
        ]}
      >
        <p className="font-bold uppercase">
          Tình trạng kiểm định cơ sở giáo dục
        </p>
      </div>
    </>
  )
}
