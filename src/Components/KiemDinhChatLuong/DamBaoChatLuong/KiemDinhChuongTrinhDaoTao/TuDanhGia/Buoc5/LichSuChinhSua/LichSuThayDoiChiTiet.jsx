import DiffMatchPatch from 'diff-match-patch'
import Button from '@/Components/Base/Button/Button'
import { useState } from 'react'

export default function LichSuThayDoiChiTiet({
  DanhGiaTieuChi_HienTai,
  DanhGiaTieuChi_ChinhSua,
  setIsOpenChiTiet,
}) {
  const [dmp] = useState(new DiffMatchPatch())

  const checkHasTagOpen = (text) => {
    const tags = []

    for (let i = text.length - 1; i >= 0; i--) {
      if (text[i] === '>' || text[i] === '<') {
        tags.push(text[i])
        break
      }
    }

    if (tags.length === 0 || tags[0] === '>') {
      return false
    }

    return true
  }

  const generateHtml = (diffs) => {
    return diffs.reduce((acc, [DiffLevel, Text]) => {
      if (DiffLevel === DiffMatchPatch.DIFF_EQUAL) {
        return acc + Text
      }

      const hasTagOpen = checkHasTagOpen(acc)
      if (DiffLevel === DiffMatchPatch.DIFF_INSERT) {
        // thay đổi các thuộc tính của thẻ, không phải thay đổi content
        if (hasTagOpen) return acc + Text

        return (
          acc +
          `<span style="color: #44BD87; text-decoration: underline;">${Text}</span>`
        )
      }

      if (DiffLevel === DiffMatchPatch.DIFF_DELETE) {
        // check before insert tag span, if has any tag open, dont insert span
        if (hasTagOpen) return acc + Text

        return (
          acc +
          `<span style="color: red; text-decoration: line-through;">${Text}</span>`
        )
      }
    }, '')
  }

  return (
    <div className="flex flex-col">
      <Button
        type="border"
        onClick={() => setIsOpenChiTiet(false)}
        className="w-max"
      >
        Quay lại
      </Button>

      <div className="mt-2 flex flex-wrap md:flex-nowrap gap-3 md:gap-8">
        <table className="uneti-u-table">
          <thead>
            <tr>
              <th>Cột</th>
              <th>Bản cũ</th>
              <th>Bản cập nhật</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1. Mô tả hiện trạng</td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_MoTa,
                  }}
                ></div>
              </td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: generateHtml(
                      dmp.diff_main(
                        DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_MoTa,
                        DanhGiaTieuChi_HienTai.KT_KDCL_CTDT_DanhGiaTieuChi_MoTa,
                      ),
                    ),
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td>2. Điểm mạnh</td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_DiemManh,
                  }}
                ></div>
              </td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: generateHtml(
                      dmp.diff_main(
                        DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_DiemManh,
                        DanhGiaTieuChi_HienTai.KT_KDCL_CTDT_DanhGiaTieuChi_DiemManh,
                      ),
                    ),
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td>3. Điểm tồn tại</td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_DiemTonTai,
                  }}
                ></div>
              </td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: generateHtml(
                      dmp.diff_main(
                        DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_DiemTonTai,
                        DanhGiaTieuChi_HienTai.KT_KDCL_CTDT_DanhGiaTieuChi_DiemTonTai,
                      ),
                    ),
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td>4. Kế hoạch hành động</td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_KeHoachHanhDong,
                  }}
                ></div>
              </td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: generateHtml(
                      dmp.diff_main(
                        DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_KeHoachHanhDong,
                        DanhGiaTieuChi_HienTai.KT_KDCL_CTDT_DanhGiaTieuChi_KeHoachHanhDong,
                      ),
                    ),
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td>5. Điểm đánh giá</td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia,
                  }}
                ></div>
              </td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: generateHtml(
                      dmp.diff_main(
                        `${DanhGiaTieuChi_ChinhSua.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia}`,
                        `${DanhGiaTieuChi_HienTai.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia}`,
                      ),
                    ),
                  }}
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
