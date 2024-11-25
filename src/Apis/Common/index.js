import {
  versionFailure,
  versionStart,
  versionSuccess,
} from '@/Services/Redux/Slice/versionSlice'
import {
  weatherFailure,
  weatherStart,
  weatherSuccess,
} from '@/Services/Redux/Slice/weatherSlice'
import axios from 'axios'
const HT_TTPB_LoaiPhanMem = 'Web'
export const apiCommon = {
  apiVersion: async (
    params = {
      HT_TTPB_LoaiPhanMem: HT_TTPB_LoaiPhanMem,
      HT_TTPB_Loai: '',
    },
    dispatch,
  ) => {
    dispatch(versionStart())
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/version/Load_PhienBan_Full`,
        {
          params,
        },
      )
      if (response?.data?.code === 200) {
        dispatch(versionSuccess(response.data?.body[0]))
      }
      return response.data
    } catch (error) {
      dispatch(versionFailure(error))
    }
  },
  apiWeather: async (dispatch) => {
    dispatch(weatherStart())
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Information_News/News_Weather`,
      )

      if (response?.data?.code === 200) {
        dispatch(weatherSuccess(response.data?.data))
      }
      return response.data
    } catch (error) {
      dispatch(weatherFailure(error))
    }
  },
}
