export const KEY_STORE_BMS = {
  SP_BMS_Get_controller_By_Phong: 'SP_BMS_Get_controller_By_Phong',
  SP_BMS_tbl_Command_History_Load_Para: 'SP_BMS_tbl_Command_History_Load_Para',
  CHANGE_MODE_BMS_CONTROLLER: 'CHANGE_MODE_BMS_CONTROLLER',
  SETUP_SCHEDULE_BMS_CONTROLLER: 'SETUP_SCHEDULE_BMS_CONTROLLER',
}

export const GROUP_ACTION_NAME = {
  groupOperatingMode: 'operating-mode',
  groupActionMultiDevices: 'action-multi-devices',
  groupSetupTemperature: 'setup-temperature',
}

export const initialPagination = {
  itemPerPage: 60,
  currentPage: 0,
}

//export  const ROWS_ITEM_PERPAGE = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104]
export const ROWS_ITEM_PERPAGE = [10, 40, 60, 100, 120, 200]

export const SYNC_STATUS_DEFAULT = '0'

export const MODE_BMS = {
  MANUAL: 'manual',
  AUTO: 'auto',
}

export const BMS_OUTPUT_LABEL = {
  OUTPUT1: 'Bàn giảng viên & Ổ cắm',
  OUTPUT2: 'Quạt & Ánh sáng',
  OUTPUT3: 'Điều hòa',
}

export const BMS_OUTPUT_TYPE = {
  OUTPUT_BAN_GIANGVIEN_OCAM: '1',
  OUTPUT_QUAT_ANHSANG: '2',
  OUTPUT_DIEU_HOA: '3',
  OUTPUT_ALL: 'all',
}

export const BMS_OUTPUT_SYSTEM = {
  OUTPUT_1: {
    label: 'Bàn giảng viên & Ổ cắm',
    value: '1',
  },
  OUTPUT_2: {
    label: 'Quạt & Ánh sáng',
    value: '2',
  },
  OUTPUT_3: {
    label: 'Điều hòa',
    value: '3',
  },
  OUTPUT_ALL: {
    label: 'Tất cả',
    value: 'all',
  },
}

export const generateOutputLabel = (outputSystem) => {
  switch (outputSystem) {
    case '1': {
      return BMS_OUTPUT_LABEL.OUTPUT1
    }
    case '2': {
      return BMS_OUTPUT_LABEL.OUTPUT2
    }
    case '3': {
      return BMS_OUTPUT_LABEL.OUTPUT3
    }
    case 'all': {
      return 'Tất cả'
    }
    default:
      return 'Không xác định'
  }
}

export const BMS_CONTROLLER_CMD = {
  SET_MODE: 'set_mode',
  SET_TIME: 'set_time',
  SET_SCHEDULE: 'set_schedule',
  SET_TEMPERATURE: 'set_temperature',
  SET_ON: 'set_on',
  SET_OFF: 'set_off',
  SET_IP_ADDRESS: 'set_ipadd',
}

export const generateBMSActionList = (bms, cmdMode, outputSystem) => {
  const outputValue =
    outputSystem.value !== 'all' ? bms[`out${outputSystem.value}`] : 'all'

  if (cmdMode === BMS_CONTROLLER_CMD.SET_OFF && outputValue === 0) {
    return null
  }

  if (cmdMode === BMS_CONTROLLER_CMD.SET_ON && outputValue === 1) {
    return null
  }

  if (cmdMode === BMS_CONTROLLER_CMD.SET_TIME) {
    return {
      idcmd: cmdMode,
      ipadd: bms.ipadd,
      syn_status: SYNC_STATUS_DEFAULT,
      syn_service: Number(bms.syn_service),
    }
  } else {
    return {
      idcmd: cmdMode,
      ipadd: bms.ipadd,
      syn_status: SYNC_STATUS_DEFAULT,
      syn_service: Number(bms.syn_service),
      output: outputSystem.value,
    }
  }
}

// Table
export const initialColumnFiltersBMS = {
  ThongTinPhong: '',
  LichSuDungPhong: '',
  TrangThaiBMS: '',
  NguonDienDieuHoa: '',
  CheDoHoatDongBMS: '',
  NgayGioTrenBMS: '',
  NhietDoMin: '',
  NhietDoMax: '',
  ThongSoKyThuat: '',
}

export const _filterGroupViTriBMS = [
  'DT_QLP_Phong_CoSo',
  'DT_QLP_Phong_DiaDiem',
  'DT_QLP_Phong_ToaNha',
  'DT_QLP_Phong_Tang',
  'DT_QLP_Phong_TenPhong',
]
export const _filterGroupLichSDPhongBMS = [
  'lichhoc_tiet',
  'lichhoc_giangvien',
  'lichhoc_siso',
  'lichthi_tiet',
  'lichthi_giangvien',
  'lichthi_siso',
]
export const _filterGroupThongTinBMS = [
  'ten',
  'syn_service',
  'ipadd',
  'port',
  'serinumber',
]
export const searchFieldsGroupsBMS = [
  _filterGroupViTriBMS,
  _filterGroupLichSDPhongBMS,
  _filterGroupThongTinBMS,
  ['trang_thai'],
  ['in8'],
  ['mode'],
  ['date_connect'],
  ['temperature'],
  ['min_temp'],
  ['max_temp'],
]
