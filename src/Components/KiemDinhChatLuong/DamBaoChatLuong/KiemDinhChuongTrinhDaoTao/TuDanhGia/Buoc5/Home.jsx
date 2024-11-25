import DanhGiaTieuChi from './DanhGiaTieuChi'
import Actions from './Actions'

export default function Home() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <div className="flex flex-col gap-3 flex-1">
        <DanhGiaTieuChi />

        <div className="mt-3 px-4 py-3 rounded-xl bg-orange-200/20 border-l-orange-500 border-l-2">
          <b className="text-orange-700">Chú thích</b>

          <p className="whitespace-break-spaces my-2">
            Các tiêu chí có màu trắng{' '}
            <button className="inline-flex mx-[2px] shrink-0 icon-btn bg-gray-50 hover:bg-gray-100" />{' '}
            là các tiêu chí <b>Chưa được phân công</b> nhiệm vụ cho thành viên
            nào.
          </p>
          <p className="whitespace-break-spaces my-2">
            Các tiêu chí có màu{' '}
            <button className="inline-flex mx-[2px] shrink-0 bg-uneti-primary-lighter icon-btn text-white hover:bg-uneti-primary" />
            là các tiêu chí đã được giao nhiệm vụ và có trạng thái là{' '}
            <b>Đang thực hiện</b>.
          </p>
          <p className="whitespace-break-spaces my-2">
            Các tiêu chí có màu{' '}
            <button className="inline-flex mx-[2px] shrink-0 bg-uneti-primary icon-btn text-white hover:bg-uneti-primary" />
            là các tiêu chí đã được đánh dấu là <b>Đã hoàn thành</b>.
          </p>
          <p className="whitespace-break-spaces my-2">
            Các tiêu chí có màu{' '}
            <button className="inline-flex mx-[2px] shrink-0 bg-vs-warn icon-btn text-white hover:bg-vs-warn" />
            là các tiêu chí đã được đánh dấu là <b>Đã gửi phê duyệt</b> và đang
            chờ phê duyệt.
          </p>
          <p className="whitespace-break-spaces my-2">
            Các tiêu chí có màu{' '}
            <button className="inline-flex mx-[2px] shrink-0 bg-vs-danger icon-btn text-white hover:bg-vs-danger" />
            là các tiêu chí đã được đánh dấu là <b>Đã từ chối</b> phê duyệt.
          </p>
        </div>
      </div>

      <Actions />
    </div>
  )
}
