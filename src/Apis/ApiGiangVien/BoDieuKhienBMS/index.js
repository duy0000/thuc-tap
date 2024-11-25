import { MUTATE } from '@/Configs/constants'
import http from '@/Configs/http'

export const apiBMSController = {
  /**
   * 1. API Lấy danh sách tất cả bộ điều khiển BMS
   * @param {string} DT_QLP_Phong_CoSo
   * @param {string} DT_QLP_Phong_DiaDiem
   * @param {string} DT_QLP_Phong_ToaNha
   * @param {string} DT_QLP_Phong_Tang
   * @param {string} DT_QLP_Phong_TenPhong
   * @param {string} syn_service
   * @returns
   */
  getBMSControllerByPhong: (
    params = {
      ThongTinPhong: '',
      LichSuDungPhong: '',
      TrangThaiBMS: '',
      NguonDienDieuHoa: '',
      CheDoHoatDongBMS: '',
      NgayGioTrenBMS: '',
      NhietDoMin: '',
      NhietDoMax: '',
      ThongSoKyThuat: '',
    },
  ) =>
    http.get('SP_BMS_BangDieuKhien/Get_controller_By_Phong', {
      params,
    }),
  /**
   * 2. API Bật chế độ hoạt động của thiết bị BMS: AUTO/MANUAL
   * @param {string} idcmd default 'set_mode'
   * @param {string} ipadd
   * @param {string} syn_status default '0'
   * @param {string} syn_service
   * @param {string} mode auto/manual
   * @returns {boolean}
   */
  postChangeModeBMSController: (data = []) =>
    http.post('SP_BMS_BangDieuKhien/Add_Para_All', data, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
      timeout: 10 * MUTATE,
    }),
  /**
   * 3. API Bật/Tắt tất cả 8 output của thiết bị BMS
   *
   * @param {string} idcmd default 'set_on'
   * @param {string} ipadd
   * @param {string} syn_status default '0'
   * @param {string} syn_service
   * @param {string} output default 'all'
   * @returns {boolean}
   */
  postTurnAllOutputBMSController: (data = []) =>
    http.post('SP_BMS_BangDieuKhien/Add_Para_All', data),

  /**
   * 4. API Bật/Tắt output của nhiều thiết bị BMS
   *
   * @param {string} idcmd
   * @param {string} ipadd
   * @param {string} syn_status default '0'
   * @param {string} syn_service
   * @param {string} output 1-8
   * @returns {boolean}
   */
  postTurnSingleOutputBMSController: (data = []) =>
    http.post('SP_BMS_BangDieuKhien/Add_Para_All', data),

  /**
   * 5. API Đồng bộ thời gian thiết bị BMS
   *
   * @param {string} idcmd default 'set_time'
   * @param {string} ipadd
   * @param {string} syn_status default '0'
   * @param {string} syn_service
   * @returns {boolean}
   */
  postSyncTimeBMSController: (data = []) =>
    http.post('SP_BMS_BangDieuKhien/Add_Para_All', data),
  /**
   * 6. Thiết lập nhiệt độ để bật cụ thể cho từng cổng trên BMS
   * @param {string} idcmd default 'set_temperature'
   * @param {string} ipadd
   * @param {string} syn_status default '0'
   * @param {string} syn_service
   * @param {string} min_temp
   * @param {string} max_temp
   * @param {string} output
   */
  postSetupTemperatureBMSController: (data = []) =>
    http.post('SP_BMS_BangDieuKhien/Add_Para_All', data),
  /**
   * 7. Lệnh thiết lập lịch (lập mới hoặc sửa) cho BĐK
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
  postSetupScheduleBMSController: (data = []) =>
    http.post('SP_BMS_BangDieuKhien/Add_Para_All', data),
  /**
   * 9. Lấy danh sách lịch sử command BMS
   */
  getHistoryCommandBMSController: (
    params = {
      idcmd: '',
      ipadd: '',
      date_insert: '',
      manhansu: '',
      hoten: '',
      SoTrang: '1',
      SoBanGhiTrenTrang: '100',
    },
  ) =>
    http.get(
      'SP_BMS_BangDieuKhien/Command_History_TongSoTrang_Load_Para_Graft',
      {
        params,
      },
    ),
  /**
   * 10. Lấy danh sách lịch sử trạng thái BMS
   */
  getHistoryStateBMSController: (
    params = {
      ipadd: '',
      syn_service: '',
      DT_QLP_Phong_TenPhong: '',
      date_disconnect: '',
      date_connect: '',
      trang_thai: '',
      SoTrang: '1',
      SoBanGhiTrenTrang: '100',
    },
  ) =>
    http.get(
      'SP_BMS_BangDieuKhien/Command_History_TrangThai_Load_Para_TongSoTrang_Graft',
      {
        params,
      },
    ),
}
