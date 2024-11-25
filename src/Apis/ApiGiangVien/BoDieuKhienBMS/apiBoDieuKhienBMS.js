import http from '@/Configs/http'

/**
 * API Bộ điều khiển BMS
 */

/**
 * 1. Lấy danh sách tất cả bộ điều khiển BMS
 * @param {string} DT_QLP_Phong_CoSo
 * @param {string} DT_QLP_Phong_DiaDiem
 * @param {string} DT_QLP_Phong_ToaNha
 * @param {string} DT_QLP_Phong_Tang
 * @param {string} DT_QLP_Phong_TenPhong
 * @param {string} syn_service
 * @returns
 */
export const getAllRemoteControllBMS = async ({
  DT_QLP_Phong_CoSo = '',
  DT_QLP_Phong_DiaDiem = '',
  DT_QLP_Phong_ToaNha = '',
  DT_QLP_Phong_Tang = '',
  DT_QLP_Phong_TenPhong = '',
  syn_service = '',
}) => {
  const res = await http.get('SP_BMS_BangDieuKhien/Get_controller_By_Phong', {
    params: {
      DT_QLP_Phong_CoSo,
      DT_QLP_Phong_DiaDiem,
      DT_QLP_Phong_ToaNha,
      DT_QLP_Phong_Tang,
      DT_QLP_Phong_TenPhong,
      syn_service,
    },
    timeout: 60 * 10 * 1000,
  })
  if (res.status === 200) {
    const data = await res.data?.body

    return data
  } else {
    return {
      error: true,
      errorMsg: res.statusText,
    }
  }
}

/**
 * 2. Lấy danh sách đầu ra output chung của thiết bị BMS
 *
 * @returns
 */
export const getListOutputOfBMS = async () => {
  const res = await http.get('SP_BMS_BangDieuKhien/output_Load_Para_Chung')
  const data = await res.data?.body
  return data
}
/**
 * 3. Bật chế độ hoạt động của thiết bị BMS: AUTO/MANUAL
 * @param {string} idcmd default 'set_mode'
 * @param {string} ipadd
 * @param {string} syn_status default '0'
 * @param {string} syn_service
 * @param {string} mode auto/manual
 * @returns {boolean}
 */

export const postOperatingModeBMS = async (data = [], timeout) =>
  http.post(`SP_BMS_BangDieuKhien/Add_Para_All`, data, {
    timeout,
  })

/**
 * 4. Đồng bộ thời gian thiết bị BMS
 *
 * @param {string} idcmd default 'set_time'
 * @param {string} ipadd
 * @param {string} syn_status default '0'
 * @param {string} syn_service
 * @returns {boolean}
 */
/*
{
  idcmd = 'set_time',
  ipadd = '',
  syn_status = '0',
}
 */
export const postSyncTimeRemoteBMS = async (data = []) =>
  http.post(`SP_BMS_BangDieuKhien/Add_Para_All`, data)

/**
 * 5. Bật tất cả 8 output của thiết bị BMS
 *
 * @param {string} idcmd default 'set_on'
 * @param {string} ipadd
 * @param {string} syn_status default '0'
 * @param {string} syn_service
 * @param {string} output default 'all'
 * @returns {boolean}
 */
export const postTurnOnAllOutputRemoteBMS = async (data = [], timeout) =>
  http.post(`SP_BMS_BangDieuKhien/Add_Para_All`, data, {
    timeout,
  })

/**
 * 6. Tắt tất cả 8 output của thiết bị BMS
 *
 * @param {string} idcmd default 'set_off'
 * @param {string} ipadd
 * @param {string} syn_status default '0'
 * @param {string} syn_service
 * @param {string} output default 'all'
 * @returns {boolean}
 */
export const postTurnOffAllOutputRemoteBMS = async (data = [], timeout) =>
  http.post(`SP_BMS_BangDieuKhien/Add_Para_All`, data, {
    timeout,
  })

/**
 * 7. Bật/Tắt 1 - 8 output của thiết bị BMS
 *
 * @param {string} ipadd
 * @param {string} idout
 * @param {string} ten
 * @param {string} trang_thai
 * @returns
 */
export const putOutputOfRemoteControllBMS = async (
  data = { idcmd: '', ipadd: '', syn_service: '', output: '', syn_status: '0' },
  timeout,
) =>
  http.post('SP_BMS_BangDieuKhien/Add_Para_All', data, {
    timeout,
  })

/**
 * 8. Lệnh đổi IP cho BĐK
 *
 * @param {string} idcmd default 'set_ipadd'
 * @param {string} ipaddnew
 * @param {string} subnet
 * @param {string} gateway
 * @param {string} dns
 * @param {string} username
 * @param {string} password
 * @param {string} syn_service
 */
export const updateIPAddressBMS = async (data = []) =>
  http.post('SP_BMS_BangDieuKhien/Add_Para_All', data)

/**
 * 9. Lệnh thiết lập lịch (lập mới hoặc sửa) cho BĐK
 *
 * @param {string} idcmd default 'set_schedule'
 * @param {string} ipadd
 * @param {string} syn_status default '0'
 * @param {string} syn_service
 * @param {string} date1
 * @param {string} number_schedule value 1 -> 12
 * @param {string} output value 1 -> 8
 * @param {string} on1
 * @param {string} off1
 * @param {string} on2
 * @param {string} off2
 * @param {string} on3
 * @param {string} off3
 * @param {string} on4
 * @param {string} off4
 * @param {string} on5
 * @param {string} off5
 * @param {string} on6
 * @param {string} off6
 * @param {string} on7
 * @param {string} off7
 * @param {string} on8
 * @param {string} off8
 * @param {string} on9
 * @param {string} off9
 * @param {string} on10
 * @param {string} off10
 * @param {string} on11
 * @param {string} off11
 * @param {string} on12
 * @param {string} off12
 * @returns {boolean}
 */
export const setupScheduleBMS = async (data = [], timeout = 10000) => {
  return http.post('SP_BMS_BangDieuKhien/Add_Para_All', data, {
    timeout,
  })
}

/**
 * 10. Thiết lập nhiệt độ để bật cụ thể cho từng cổng trên BMS
 * @param {string} idcmd default 'set_temperature'
 * @param {string} ipadd
 * @param {string} syn_status default '0'
 * @param {string} syn_service
 * @param {string} min_temp
 * @param {string} max_temp
 * @param {string} output
 */

export const setupTemperatureBMS = (data = []) =>
  http.post('SP_BMS_BangDieuKhien/Add_Para_All', data)
