export const MODULE_DE_NGHI = {
  MC_TTHC_GV_GuiYeuCau: 'MC_TTHC_GV_GuiYeuCau',
  DT_CVNB_TBGD_GuiYeuCau: 'DT_CVNB_TBGD_GuiYeuCau',
}

export const statusHTTBGD_DKSDTB = (idStatus) => {
  switch (idStatus) {
    case 0:
      return STATUS_COLOR_TBGD.ChoXuLy.statusLabel
    case 1:
      return STATUS_COLOR_TBGD.DaXacNhan.statusLabel
    case -1:
      return STATUS_COLOR_TBGD.HuyTra.statusLabel
    default:
      return STATUS_COLOR_TBGD.ChoXuLy.statusLabel
  }
}

export const STATUS_COLOR_TBGD = {
  ChoXuLy: {
    statusLabel: 'Chờ xử lý',
    textColor: 'text-cyan-800',
  },
  DaXacNhan: {
    statusLabel: 'Đã xác nhận',
    textColor: 'text-green-600',
  },
  HuyTra: {
    statusLabel: 'Hủy trả',
    textColor: 'text-red-600',
  },
}

export const STATUS_COLOR_TTHCGV = {
  HuyTraHoSo: {
    statusLabel: 'Hủy trả hồ sơ',
    textColor: 'text-red-600',
  },
  ChuaTiepNhan: {
    statusLabel: 'Chưa tiếp nhận',
    textColor: 'text-cyan-800',
  },
  TiepNhanHoSo: {
    statusLabel: 'Tiếp nhận hồ sơ',
    textColor: 'text-cyan-800',
  },
  XuLyHoSo: {
    statusLabel: 'Xử lý hồ sơ',
    textColor: 'text-cyan-800',
  },
  TPDV: {
    statusLabel: 'Trưởng/Phó đơn vị',
    textColor: 'text-cyan-800',
  },
  BGH: {
    statusLabel: 'Ban giám hiệu',
    textColor: 'text-cyan-800',
  },
  TraKetQua: {
    statusLabel: 'Trả kết quả',
    textColor: 'text-cyan-800',
  },
  TraKQVaHT: {
    statusLabel: 'Trả kết quả, hoàn thành',
    textColor: 'text-green-600',
  },
  XacNhanHoanThanh: {
    statusLabel: 'Xác nhận hoàn thành',
    textColor: 'text-green-600',
  },
}

export const colorStatusWithModule = (module, status) => {
  switch (module) {
    case MODULE_DE_NGHI.DT_CVNB_TBGD_GuiYeuCau: {
      if (status === STATUS_COLOR_TBGD.ChoXuLy.statusLabel) {
        return STATUS_COLOR_TBGD.ChoXuLy.textColor
      } else if (status === STATUS_COLOR_TBGD.DaXacNhan.statusLabel) {
        return STATUS_COLOR_TBGD.DaXacNhan.textColor
      } else if (status === STATUS_COLOR_TBGD.HuyTra.statusLabel) {
        return STATUS_COLOR_TBGD.HuyTra.textColor
      }
      break
    }
    case MODULE_DE_NGHI.MC_TTHC_GV_GuiYeuCau: {
      if (status === STATUS_COLOR_TTHCGV.HuyTraHoSo.statusLabel) {
        return STATUS_COLOR_TTHCGV.HuyTraHoSo.textColor
      } else if (status === STATUS_COLOR_TTHCGV.ChuaTiepNhan.statusLabel) {
        return STATUS_COLOR_TTHCGV.ChuaTiepNhan.textColor
      } else if (status === STATUS_COLOR_TTHCGV.TiepNhanHoSo.statusLabel) {
        return STATUS_COLOR_TTHCGV.TiepNhanHoSo.textColor
      } else if (status === STATUS_COLOR_TTHCGV.XuLyHoSo.statusLabel) {
        return STATUS_COLOR_TTHCGV.XuLyHoSo.textColor
      } else if (status === STATUS_COLOR_TTHCGV.TPDV.statusLabel) {
        return STATUS_COLOR_TTHCGV.TPDV.textColor
      } else if (status === STATUS_COLOR_TTHCGV.BGH.statusLabel) {
        return STATUS_COLOR_TTHCGV.BGH.textColor
      } else if (status === STATUS_COLOR_TTHCGV.TraKetQua.statusLabel) {
        return STATUS_COLOR_TTHCGV.TraKetQua.textColor
      } else if (status === STATUS_COLOR_TTHCGV.TraKQVaHT.statusLabel) {
        return STATUS_COLOR_TTHCGV.TraKQVaHT.textColor
      } else if (status === STATUS_COLOR_TTHCGV.XacNhanHoanThanh.statusLabel) {
        return STATUS_COLOR_TTHCGV.XacNhanHoanThanh.textColor
      }
      break
    }
    default:
      return 'text-cyan-800'
  }
}

export const checkStatusInititial = (module, statusLabel) => {
  switch (module) {
    case MODULE_DE_NGHI.DT_CVNB_TBGD_GuiYeuCau: {
      if (statusLabel === STATUS_COLOR_TBGD.ChoXuLy.statusLabel) {
        return true
      }
      break
    }
    case MODULE_DE_NGHI.MC_TTHC_GV_GuiYeuCau: {
      if (statusLabel === STATUS_COLOR_TTHCGV.ChuaTiepNhan.statusLabel) {
        return true
      }
      break
    }
    default:
      return false
  }
}
