import { useEffect, useState } from 'react'
import DuKienKetQuaHocTapView from './DuKienKetQuaHocTapView'
import {
  getALLDiemTrungBinhDuKienKetQuaHocTap,
  getAllMonHocDuKienKetQuaHocTap,
} from '@/Apis/TraCuu/apiDuKienKetQuaHocTap'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'

const DuKienKetQuaHocTap = () => {
  const home = {
    path: '/uneti',
    title: 'Trang chủ',
  }

  const breadcrumbs = [
    {
      path: '/tra-cuu',
      title: 'Tra cứu',
    },
    {
      path: '/tra-cuu/du-kien-ket-qua-hoc-tap',
      title: 'Dự kiến kết quả học tập',
    },
  ]

  const [loading, setLoading] = useState(false)
  const [listMonHoc, setListMonHoc] = useState([])
  const [listHocKy, setListHocKy] = useState([])
  const [listDiemDuKien, setListDiemDuKien] = useState([])
  const [listDiemThucTe, setListDiemThucTe] = useState([])
  const [diemTichLuyThucTe, setDiemTichLuyThucTe] = useState({})
  const [diemTichLuyDuKien, setDiemTichLuyDuKien] = useState({})

  const dataSV = DataSinhVien()

  useEffect(() => {
    setLoading(true)
    getAllMonHocDuKienKetQuaHocTap(dataSV.MaSinhVien).then((res) => {
      setListMonHoc(res?.data?.body)
      setLoading(false)
    })

    getALLDiemTrungBinhDuKienKetQuaHocTap(dataSV.MaSinhVien).then((res) => {
      setListDiemThucTe(res?.data?.body)
      setDiemTichLuyThucTe(res?.data?.body[0] || {})
      setLoading(false)
    })

    return () => {
      setListMonHoc([])
      setDiemTichLuyThucTe({})
      setListDiemThucTe([])
    }
  }, [])

  useEffect(() => {
    setListHocKy(
      listMonHoc
        .map((e) => e.TC_SV_KetQuaHocTap_HocKy)
        .filter((v, i, s) => s.indexOf(v) === i),
    )

    setListDiemDuKien([
      ...listMonHoc.map((e, i) => ({
        STT: i,
        hocKy: e.TC_SV_KetQuaHocTap_HocKy,
        tenMonHoc: e.TC_SV_KetQuaHocTap_TenMonHoc,
        maHocPhan: e.TC_SV_KetQuaHocTap_MaHocPhan,
        soTinChi: e.TC_SV_KetQuaHocTap_SoTinChi,
        tinhDiemTBC: e.TC_SV_KetQuaHocTap_KhongTinhDiemTBC == 0,
        diemTongKetHe10:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemDuKienHe10:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemTongKetHe4:
          e.TC_SV_KetQuaHocTap_DiemTinChi != null
            ? e.TC_SV_KetQuaHocTap_DiemTinChi
            : '',
        diemDuKienHe4:
          e.TC_SV_KetQuaHocTap_DiemTinChi != null
            ? e.TC_SV_KetQuaHocTap_DiemTinChi
            : '',
      })),
    ])
    return () => {
      setListHocKy([])
      setListDiemDuKien([])
    }
  }, [listMonHoc])

  const handleChangeScore = (maHocPhan, newDiemDuKienHe10) => {
    setListDiemDuKien((_listDiemDuKien) =>
      _listDiemDuKien.map((e) => {
        if (e.maHocPhan != maHocPhan) return e

        e.diemDuKienHe10 = newDiemDuKienHe10
        return e
      }),
    )
  }

  const checkScoreValue = (maHocPhan, newDiemDuKienHe10) => {
    if (isNaN(+newDiemDuKienHe10)) {
      setListDiemDuKien((_listDiemDuKien) =>
        _listDiemDuKien.map((e) => {
          if (e.maHocPhan != maHocPhan) return e

          e.diemDuKienHe10 = ''
          return e
        }),
      )
    }

    if (+newDiemDuKienHe10 < 0 || +newDiemDuKienHe10 > 10) {
      setListDiemDuKien((_listDiemDuKien) =>
        _listDiemDuKien.map((e) => {
          if (e.maHocPhan != maHocPhan) return e

          e.diemDuKienHe10 =
            +newDiemDuKienHe10 < 0 ? '0' : +newDiemDuKienHe10 > 10 ? '10' : ''
          return e
        }),
      )
    }
  }

  const handleTinhDiemDuDoan = () => {
    let SumDiemTongKetHe10NhanSoTinChi = 0
    let SumDiemTongKetHe4NhanSoTinChi = 0
    let SumSoTinChi = 0
    let XepLoai = ''
    const maHocPhanMap = new Map()

    for (let i = 0; i < listDiemDuKien.length; i++) {
      if (!listDiemDuKien[i].tinhDiemTBC) continue
      if (
        listDiemDuKien[i].diemTongKetHe10 == '' &&
        listDiemDuKien[i].diemDuKienHe10 == ''
      ) {
        continue
      }

      if (
        listDiemDuKien[i].diemDuKienHe10 != '' &&
        listDiemDuKien[i].diemDuKienHe4 != ''
      ) {
        SumDiemTongKetHe10NhanSoTinChi +=
          +listDiemDuKien[i].diemDuKienHe10 * +listDiemDuKien[i].soTinChi
        SumDiemTongKetHe4NhanSoTinChi +=
          +listDiemDuKien[i].diemDuKienHe4 * +listDiemDuKien[i].soTinChi
      } else {
        SumDiemTongKetHe10NhanSoTinChi +=
          +listDiemDuKien[i].diemTongKetHe10 * +listDiemDuKien[i].soTinChi
        SumDiemTongKetHe4NhanSoTinChi +=
          +listDiemDuKien[i].diemTongKetHe4 * +listDiemDuKien[i].soTinChi
      }
    }

    /**
     * Tính tổng số tín chỉ tích lũy
     * Điều kiện:
     * 1 - Môn học đấy phải được tính điêm trung bình chung
     * 2 - Điểm hệ số 10 phải >= 4 (Trên loại D)
     * 3 - Điểm hệ số 10 phải luôn là lớn nhất (Trong trường hợp môn đấy học lại, học cải thiện)
     */
    listDiemDuKien.forEach((item) => {
      let currentMax = maHocPhanMap.get(item.maHocPhan) || 0
      if (
        item.tinhDiemTBC !== false &&
        item.diemDuKienHe10 >= 4 &&
        item.diemDuKienHe10 >= currentMax
      ) {
        if (maHocPhanMap.has(item.maHocPhan)) {
          if (item.diemDuKienHe10 > currentMax) {
            maHocPhanMap.set(item.maHocPhan, item.diemDuKienHe10)
          }
          SumSoTinChi = SumSoTinChi + 0
        } else {
          maHocPhanMap.set(item.maHocPhan, item.diemDuKienHe10)
          SumSoTinChi += +item.soTinChi
        }
      }
    })

    const DiemTichLuyDuKienHe10 = (
      SumDiemTongKetHe10NhanSoTinChi / SumSoTinChi
    ).toFixed(2)

    const DiemTichLuyDuKienHe4 = (
      SumDiemTongKetHe4NhanSoTinChi / SumSoTinChi
    ).toFixed(2)

    if (+DiemTichLuyDuKienHe4 >= 3.6) {
      XepLoai = 'Xuất sắc'
    } else if (+DiemTichLuyDuKienHe4 >= 3.2) {
      XepLoai = 'Giỏi'
    } else if (+DiemTichLuyDuKienHe4 >= 2.5) {
      XepLoai = 'Khá'
    } else if (+DiemTichLuyDuKienHe4 >= 2.2) {
      XepLoai = 'Trung bình khá'
    } else if (+DiemTichLuyDuKienHe4 >= 2) {
      XepLoai = 'Trung bình'
    } else {
      XepLoai = 'Không đủ điểm tốt nghiệp'
    }

    setDiemTichLuyDuKien({
      diemTichLuyHe10: DiemTichLuyDuKienHe10,
      diemTichLuyHe4: DiemTichLuyDuKienHe4,
      tongSoTinChiTichLuy: SumSoTinChi,
      xepLoai: XepLoai,
    })
  }

  const handleLamMoi = () => {
    setListDiemDuKien([
      ...listMonHoc.map((e, i) => ({
        STT: i,
        hocKy: e.TC_SV_KetQuaHocTap_HocKy,
        tenMonHoc: e.TC_SV_KetQuaHocTap_TenMonHoc,
        maHocPhan: e.TC_SV_KetQuaHocTap_MaHocPhan,
        soTinChi: e.TC_SV_KetQuaHocTap_SoTinChi,
        tinhDiemTBC: e.TC_SV_KetQuaHocTap_KhongTinhDiemTBC == 0,
        diemTongKetHe10:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemDuKienHe10:
          e.TC_SV_KetQuaHocTap_DiemTongKet != null
            ? e.TC_SV_KetQuaHocTap_DiemTongKet
            : '',
        diemTongKetHe4:
          e.TC_SV_KetQuaHocTap_DiemTinChi != null
            ? e.TC_SV_KetQuaHocTap_DiemTinChi
            : '',
        diemDuKienHe4:
          e.TC_SV_KetQuaHocTap_DiemTinChi != null
            ? e.TC_SV_KetQuaHocTap_DiemTinChi
            : '',
      })),
    ])

    setDiemTichLuyDuKien({})
  }

  const handleConvertHe10ToHe4 = (maHocPhan) => {
    setListDiemDuKien((_listDiemDuKien) =>
      _listDiemDuKien.map((e) => {
        if (e.maHocPhan != maHocPhan) return e

        if (e.diemDuKienHe10 == '') e.diemDuKienHe4 = ''
        else {
          if (+e.diemDuKienHe10 >= 8.5) {
            e.diemDuKienHe4 = '4'
          } else if (+e.diemDuKienHe10 >= 7.8) {
            e.diemDuKienHe4 = '3.5'
          } else if (+e.diemDuKienHe10 >= 7) {
            e.diemDuKienHe4 = '3'
          } else if (+e.diemDuKienHe10 >= 6.3) {
            e.diemDuKienHe4 = '2.5'
          } else if (+e.diemDuKienHe10 >= 5.5) {
            e.diemDuKienHe4 = '2'
          } else if (+e.diemDuKienHe10 >= 4.8) {
            e.diemDuKienHe4 = '1.5'
          } else if (+e.diemDuKienHe10 >= 4) {
            e.diemDuKienHe4 = '1'
          } else if (+e.diemDuKienHe10 >= 3) {
            e.diemDuKienHe4 = '0.5'
          } else {
            e.diemDuKienHe4 = '0'
          }
        }
        return e
      }),
    )
  }

  return (
    <DuKienKetQuaHocTapView
      loading={loading}
      home={home}
      breadcrumbs={breadcrumbs}
      listMonHoc={listMonHoc}
      listDiemThucTe={listDiemThucTe}
      listDiemDuKien={listDiemDuKien}
      listHocKy={listHocKy}
      handleChangeScore={handleChangeScore}
      checkScoreValue={checkScoreValue}
      handleTinhDiemDuDoan={handleTinhDiemDuDoan}
      diemTichLuyThucTe={diemTichLuyThucTe}
      diemTichLuyDuKien={diemTichLuyDuKien}
      handleLamMoi={handleLamMoi}
      handleConvertHe10ToHe4={handleConvertHe10ToHe4}
    />
  )
}

export default DuKienKetQuaHocTap
