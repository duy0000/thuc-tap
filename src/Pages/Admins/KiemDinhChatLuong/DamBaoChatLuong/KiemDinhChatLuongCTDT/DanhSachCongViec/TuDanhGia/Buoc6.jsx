import Actions from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc6/Actions'

export default function Buoc6() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <div className="flex flex-col gap-3 flex-1">
        <div className="p-5 rounded-lg shadow-sm bg-white">
          <div className="border">
            <div className="border-b p-2 uppercase text-uneti-primary-lighter font-semibold">
              danh mục từ viết tắt
            </div>
            <div className="border-b p-2 flex justify-between items-center">
              <p className="uppercase text-uneti-primary-lighter font-semibold">
                Phần 1: khái quát
              </p>
              <p className="text-right">Hoàn thành</p>
            </div>
            <div className="border-b p-2 flex justify-between items-center">
              <p className="uppercase text-uneti-primary-lighter font-semibold">
                Phần 2: tự đánh giá theo các tiêu chuẩn, tiêu chí
              </p>
            </div>
            <div className="border-b p-2 flex justify-between items-center">
              <p className="ml-6">Tiêu chuẩn 1 (Nhóm 1)</p>
              <p className="text-right">Hoàn thành</p>
            </div>
            <div className="border-b p-2 flex justify-between items-center">
              <p className="ml-6">Tiêu chuẩn 2 (Nhóm 2)</p>
              <p className="text-right">Hoàn thành</p>
            </div>
            <div className="p-2 flex justify-between items-center">
              <p className="uppercase text-uneti-primary-lighter font-semibold">
                Phần 3: kết luận
              </p>
              <p className="text-right">Hoàn thành</p>
            </div>
          </div>
        </div>
      </div>

      <Actions />
      {/* <div className="rounded-lg p-4 bg-white shadow-sm flex-1 h-max flex gap-3 flex-col max-w-[270px]">
        <button className="base-button bg-uneti-primary-light hover:bg-uneti-primary">
          <b>Phê duyệt</b>
        </button>
        <button className="border border-gray-300 p-2 rounded-md shadow-sm flex items-center gap-2">
          <span className="text-white h-8 w-8 flex items-center justify-center bg-uneti-primary rounded-md">
            <Icon size={20}>
              <BiExport />
            </Icon>
          </span>
          <b className="text-left">Xuất báo cáo TĐG</b>
        </button>
        <button className="border border-gray-300 p-2 rounded-md shadow-sm flex items-center gap-2">
          <span className="text-white h-8 w-8 flex items-center justify-center bg-uneti-primary rounded-md">
            <Icon size={20}>
              <BiExport />
            </Icon>
          </span>
          <b className="text-left">Xuất phụ lục minh chứng</b>
        </button>
        <button className="border border-gray-300 p-2 rounded-md shadow-sm flex items-center gap-2">
          <span className="text-white h-8 w-8 flex items-center justify-center bg-uneti-primary rounded-md">
            <Icon size={20}>
              <BiExport />
            </Icon>
          </span>
          <b className="text-left">Xuất CSDL KDCL</b>
        </button>

        <div className="border border-gray-300 p-2 rounded-md shadow-sm">
          <h4 className="text-uneti-primary">
            <b>Kế hoạch TĐG đã ký</b>
          </h4>
        </div>
      </div> */}
    </div>
  )
}
