import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dayjs } from '@/Services/Utils'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { DatepickerV2 } from '@/Components/Base'
import Tag from '@/Components/Base/Tag/Tag.jsx'
import Button from '@/Components/Base/Button/Button.jsx'
import { postKeHoach_TDG, putKeHoach_TDG } from '@/Apis/KDCL'
import { required } from '@/Services/Validators/required'
import { useKeHoachTDGStore } from '@/Services/Store'
import Swal from 'sweetalert2'
import { isTrue } from '@/Services/Validators'

export default function KeHoachForm({ keHoach }) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const {
    isLoading: isLoadingKeHoachTDG,
    refetch: refetchListKeHoachTuDanhGia,
  } = useKeHoachTDGStore()
  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    KT_KDCL_CTDT_KeHoach_TDG_SoKH: '',
    KT_KDCL_CTDT_KeHoach_TDG_NgayBatDau: '',
    KT_KDCL_CTDT_KeHoach_TDG_MucDich: '',
    KT_KDCL_CTDT_KeHoach_TDG_PhamVi: '',
    KT_KDCL_CTDT_KeHoach_TDG_CongCu: '',
    KT_KDCL_CTDT_KeHoach_TDG_TapHuanNV: '',
    KT_KDCL_CTDT_KeHoach_TDG_DK_TTTT_Ngoai: '',
    KT_KDCL_CTDT_KeHoach_TDG_DK_Thue_CGTV: '',
    KT_KDCL_CTDT_KeHoach_TDG_GhiChu: '',
    KT_KDCL_CTDT_KeHoach_TDG_HienThi: 1,
    KT_KDCL_CTDT_KeHoach_TDG_TrangThai: 1,
  })

  const onChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    })
  }

  const validate = () =>
    [
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_SoKH,
          'Vui lòng nhập số kế hoạch',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_NgayBatDau,
          'Vui lòng chọn ngày',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_MucDich,
          'Vui lòng nhập mục đích tự đánh giá',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_PhamVi,
          'Vui lòng nhập phạm vi tự đánh giá',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_CongCu,
          'Vui lòng nhập công cụ tự đánh giá',
        ),
    ].every(isTrue)

  const handleSubmitForm = async () => {
    if (isPosting || !validate()) return

    if (!hoSoKiemDinh.isBanThuKy) {
      Swal.fire({
        icon: 'error',
        title: 'Cảnh báo',
        text: 'Chỉ ban thư ký mới có thể thực hiện chức năng này!',
      })
      return
    }

    try {
      setIsPosting(true)
      if (!form.KT_KDCL_CTDT_KeHoach_TDG_ID) {
        await postKeHoach_TDG({
          ...form,
          KT_KDCL_CTDT_KeHoach_TDG_IDHoSoKiemDinh:
            hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
        })
      } else {
        await putKeHoach_TDG({
          ...form,
          KT_KDCL_CTDT_KeHoach_TDG_IDHoSoKiemDinh:
            hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
        })
      }
      await refetchListKeHoachTuDanhGia()
      Swal.fire({
        icon: 'success',
        text: 'Cập nhật thành công!',
      })
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Cập nhật kế hoạch không thành công, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  useEffect(() => {
    if (keHoach) {
      setForm(keHoach)
    }
  }, [keHoach])

  return (
    <div className="z-[2] mt-4">
      <div className="my-6 flex items-center justify-between">
        <Link
          to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2`}
        >
          <Button type="border">Quay lại</Button>
        </Link>
        <p className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          kế hoạch tự đánh giá
        </p>
      </div>

      <div className="p-4 bg-white rounded-lg">
        <Button
          disabled={isPosting || isLoadingKeHoachTDG}
          isLoading={isPosting}
          onClick={handleSubmitForm}
          className="w-max ml-auto"
        >
          Lưu
        </Button>
        <div className="mt-2 flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <p className="w-[40px]">Số:</p>
            <input
              className="base-input !w-full"
              value={form.KT_KDCL_CTDT_KeHoach_TDG_SoKH}
              onChange={(event) =>
                onChangeForm(
                  'KT_KDCL_CTDT_KeHoach_TDG_SoKH',
                  event.target.value,
                )
              }
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <p className="w-[40px]">Ngày:</p>
            <DatepickerV2
              modelValue={form.KT_KDCL_CTDT_KeHoach_TDG_NgayBatDau}
              onChange={(date) =>
                onChangeForm('KT_KDCL_CTDT_KeHoach_TDG_NgayBatDau', date)
              }
              valueFormat="YYYY-MM-DD HH:mm:ss"
              triggerClass="w-full md:w-[200px]"
            />
          </div>
        </div>
        <div>
          <div className="mt-5">
            <h3 className="uppercase text-uneti-primary">
              <b>I. mục đích tự đánh giá</b>
            </h3>
            <textarea
              rows={3}
              className="base-input h-auto w-full mt-2"
              placeholder="Mục đích tự đánh giá"
              value={form.KT_KDCL_CTDT_KeHoach_TDG_MucDich}
              onChange={(event) =>
                onChangeForm(
                  'KT_KDCL_CTDT_KeHoach_TDG_MucDich',
                  event.target.value,
                )
              }
            />
          </div>
          <div className="mt-5">
            <h3 className="uppercase text-uneti-primary">
              <b>II. phạm vi tự đánh giá</b>
            </h3>
            <textarea
              rows={3}
              className="base-input h-auto w-full mt-2"
              placeholder="Phạm vi tự đánh giá"
              value={form.KT_KDCL_CTDT_KeHoach_TDG_PhamVi}
              onChange={(event) =>
                onChangeForm(
                  'KT_KDCL_CTDT_KeHoach_TDG_PhamVi',
                  event.target.value,
                )
              }
            />
          </div>
          <div className="mt-5">
            <h3 className="uppercase text-uneti-primary">
              <b>III. công cụ tự đánh giá</b>
            </h3>
            <textarea
              rows={3}
              className="base-input h-auto w-full mt-2"
              placeholder="Công cụ tự đánh giá"
              value={form.KT_KDCL_CTDT_KeHoach_TDG_CongCu}
              onChange={(event) =>
                onChangeForm(
                  'KT_KDCL_CTDT_KeHoach_TDG_CongCu',
                  event.target.value,
                )
              }
            />
          </div>
          <div className="mt-5">
            <h3 className="uppercase text-uneti-primary">
              <b>IV. hội đồng tự đánh giá</b>
            </h3>
            <div>
              <div className="mt-2">
                <b>1. Thành phần hội đồng tự đánh giá</b>
                <div className="ml-4">
                  Hội đồng tự đánh giá{' '}
                  <Tag>
                    {
                      hoSoKiemDinh.hoSoKiemDinh
                        ?.KT_KDCL_CTDT_HoSoKiemDinh_TenNganh
                    }
                  </Tag>
                  được thành lập theo Quyết định số{' '}
                  <Tag>
                    {
                      hoSoKiemDinh.hoiDong
                        ?.KT_KDCL_CTDT_ThanhLapHoiDong_SoQuyetDinh
                    }
                    -
                    {dayjs(
                      hoSoKiemDinh.hoiDong
                        ?.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap,
                    ).format('DD/MM/YYYY')}
                  </Tag>
                  . Hội đồng gồm có{' '}
                  <Tag>{hoSoKiemDinh.danhSachThanhPhanHoiDong.length}</Tag>{' '}
                  thành viên{' '}
                  <Link
                    to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=thanh-phan-hoi-dong`}
                  >
                    <span className="underline text-uneti-primary-lighter cursor-pointer hover:text-uneti-primary">
                      [Danh sách kèm theo]
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div>
                <b>2. Ban thư ký và các nhóm công tác chuyên trách </b>
                <div className="ml-4">
                  Ban thư ký gồm có{' '}
                  <Tag>{hoSoKiemDinh.danhSachBanThuKy.length}</Tag> thành viên{' '}
                  <Link
                    to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=ban-thu-ky`}
                  >
                    <span className="underline text-uneti-primary-lighter cursor-pointer hover:text-uneti-primary">
                      [Danh sách kèm theo]
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <b>3. Phân công thực hiện nhiệm vụ</b>
              <div className="ml-4">
                <p>a. Nhóm thư ký</p>
                <p>
                  b. Các nhóm công tác cá nhân (Có thể bao gồm các thành viên
                  trong hội đồng TĐG, cán bộ quản lý, giảng viên, nhân viên...)
                </p>
              </div>
            </div>
            <Link
              to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=nhom-cong-tac`}
            >
              <Button>Danh sách các nhóm công tác</Button>
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="uppercase text-uneti-primary">
            <b>V. Tập huấn nghiệp vụ tự đánh giá (Nếu có)</b>
          </h3>
          <textarea
            rows={3}
            className="base-input h-auto w-full mt-2"
            placeholder="Tập huấn nghiệp vụ tự đánh giá (Nếu có)"
            value={form.KT_KDCL_CTDT_KeHoach_TDG_TapHuanNV}
            onChange={(event) =>
              onChangeForm(
                'KT_KDCL_CTDT_KeHoach_TDG_TapHuanNV',
                event.target.value,
              )
            }
          />
        </div>
        <div className="mt-5">
          <h3 className="uppercase text-uneti-primary">
            <b>VI. Dự kiến nguồn lực</b>
          </h3>
          <Link
            to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=dk-nguon-luc`}
          >
            <Button>Bảng dự kiến các nguồn lực</Button>
          </Link>
        </div>
        <div className="mt-5">
          <h3 className="uppercase text-uneti-primary">
            <b>
              VII. Dự kiến thu thập thông tin từ nguồn ngoài cơ sở giáo dục và
              đơn vị thực hiện chương trình đào tạo (Nếu có)
            </b>
          </h3>
          <textarea
            rows={3}
            className="base-input h-auto w-full mt-2"
            placeholder="Dự kiến thu thập thông tin từ nguồn ngoài cơ sở giáo dục và đơn vị thực hiện chương trình đào tạo (Nếu có)"
            value={form.KT_KDCL_CTDT_KeHoach_TDG_DK_TTTT_Ngoai}
            onChange={(event) =>
              onChangeForm(
                'KT_KDCL_CTDT_KeHoach_TDG_DK_TTTT_Ngoai',
                event.target.value,
              )
            }
          />
        </div>
        <div className="mt-5">
          <h3 className="uppercase text-uneti-primary">
            <b>
              VIII. Dự kiến thuê chuyên gia tư vấn để giúp Hội đồng triển khai
              TĐG (Nếu có)
            </b>
          </h3>
          <textarea
            rows={3}
            className="base-input h-auto w-full mt-2"
            placeholder="Dự kiến thuê chuyên gia tư vấn để giúp Hội đồng triển khai TĐG (Nếu có)"
            value={form.KT_KDCL_CTDT_KeHoach_TDG_DK_Thue_CGTV}
            onChange={(event) =>
              onChangeForm(
                'KT_KDCL_CTDT_KeHoach_TDG_DK_Thue_CGTV',
                event.target.value,
              )
            }
          />
        </div>
        <div className="mt-5">
          <h3 className="uppercase text-uneti-primary">
            <b>IX. Thời gian và nội dung hoạt động</b>
          </h3>
          <Link
            to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2?q=thoi-gian-hoat-dong`}
          >
            <Button className="mt-2">
              Bảng thời gian và nội dung hoạt động
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
