import http from '@/Configs/http'

export const getAllCanBoChuChot = ({
  SoTrang = 1,
  SoBanGhiTrenTrang = 5,
  MaNhanSu = '',
}) =>
  http.get(`SP_KT_KDCL/CanBoChuChot_Load`, {
    params: {
      SoTrang,
      SoBanGhiTrenTrang,
      KT_KDCL_CanBoChuChot_MaNhanSu: MaNhanSu,
      KT_KDCL_CanBoChuChot_HoTen: MaNhanSu,
    },
  })

export const getAllCanBo = () => http.get(`SP_KT_KDCL/CanBo_Load_Para`)

export const getCanBoChuChotKiemTraTrung = ({ MaNhanSu = `` }) =>
  http.get(`SP_KT_KDCL/CanBoChuChot_Add_Para_KiemTraTrung`, {
    params: {
      KT_KDCL_CanBoChuChot_MaNhanSu: MaNhanSu,
    },
  })

export const postCanBoChuChot = (
  data = {
    ThuTu: '',
    HoDem: '',
    Ten: '',
    Email: '',
    SoDienThoai: '',
  },
) =>
  http.post(`SP_KT_KDCL/CanBoChuChot_Add_Para`, {
    KT_KDCL_CanBoChuChot_ThuTu: data.ThuTu,
    KT_KDCL_CanBoChuChot_MaNhanSu: data.MaNhanSu,
    KT_KDCL_CanBoChuChot_HoDem: data.HoDem,
    KT_KDCL_CanBoChuChot_Ten: data.Ten,
    KT_KDCL_CanBoChuChot_Email: data.Email,
    KT_KDCL_CanBoChuChot_DienThoai: data.SoDienThoai,
  })

export const postCanBoChuChotChucVu = (
  data = {
    CanBoID: ``,
    ThuTu: ``,
    DonVi: ``,
    ChucVu: ``,
  },
) =>
  http.post(`SP_KT_KDCL/CanBoChuChot_ChucVu_Add_Para`, {
    KT_KDCL_CanBoChuChot_ChucVu_IDCanBo: data.CanBoID,
    KT_KDCL_CanBoChuChot_ChucVu_ThuTu: data.ThuTu,
    KT_KDCL_CanBoChuChot_ChucVu_DonVi: data.DonVi,
    KT_KDCL_CanBoChuChot_ChucVu_ChucVu: data.ChucVu,
  })

export const getTongSoTrangCanBoChuChot = ({ SoBanGhiTrenTrang }) =>
  http.get(`SP_KT_KDCL/CanBoChuChot_TongSoTrang_Load_Graft`, {
    params: {
      SoTrang: 1,
      SoBanGhiTrenTrang: SoBanGhiTrenTrang,
    },
  })
