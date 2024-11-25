import {
  getAllRemoteControllBMS,
  postOperatingModeBMS,
  postTurnOffAllOutputRemoteBMS,
  postTurnOnAllOutputRemoteBMS,
  putOutputOfRemoteControllBMS,
  setupScheduleBMS,
  setupTemperatureBMS,
} from '@/Apis/ApiGiangVien/BoDieuKhienBMS/apiBoDieuKhienBMS'
import { createApi } from '@reduxjs/toolkit/query/react'

export const bmsApi = createApi({
  reducerPath: 'bmsApi',
  tagTypes: ['BMSList'],
  refetchOnMountOrArgChange: true,
  endpoints: (build) => {
    return {
      getAllBMS: build.query({
        queryFn: async ({
          DT_QLP_Phong_CoSo,
          DT_QLP_Phong_DiaDiem,
          DT_QLP_Phong_ToaNha,
          DT_QLP_Phong_Tang,
          DT_QLP_Phong_TenPhong,
          syn_service,
        }) => {
          const result = await getAllRemoteControllBMS({
            DT_QLP_Phong_CoSo,
            DT_QLP_Phong_DiaDiem,
            DT_QLP_Phong_ToaNha,
            DT_QLP_Phong_Tang,
            DT_QLP_Phong_TenPhong,
            syn_service,
          })
          if (result.error) {
            return { error: result }
          }

          return { data: result.data }
        },
        keepUnusedDataFor: 0.5,
        providesTags: ['BMSList'],
        condition: (arg, { getState }) => {
          const state = getState()
          console.log('Condition state:', state)
          console.log('Condition args:', arg)

          // Example condition, modify as needed
          if (state.user.isLoggedIn) {
            return true
          }

          console.log('Condition not met, returning false')
          return false
        },
      }),
      updateModeBMS: build.mutation({
        queryFn: async (data = [], timeout) => {
          const response = await postOperatingModeBMS(data, timeout)
          return { data: response }
        },
        // eslint-disable-next-line no-unused-vars
        invalidatesTags: ['BMSList'],
      }),
      turnOnAllBMS: build.mutation({
        queryFn: async (data = [], timeout) => {
          const response = await postTurnOnAllOutputRemoteBMS(data, timeout)
          return { data: response }
        },
        invalidatesTags: ['BMSList'],
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled
            // Gọi lại query `getAllBMS` sau khi mutation hoàn tất
            dispatch(
              bmsApi.endpoints.getAllBMS.initiate({
                DT_QLP_Phong_CoSo: '',
                DT_QLP_Phong_DiaDiem: '',
                DT_QLP_Phong_ToaNha: '',
                DT_QLP_Phong_Tang: '',
                DT_QLP_Phong_TenPhong: '',
                syn_service: '',
              }),
            )
          } catch (err) {
            console.error('Error in onQueryStarted:', err)
          }
        },
      }),
      turnOffAllBMS: build.mutation({
        queryFn: async (data = [], timeout) => {
          const response = await postTurnOffAllOutputRemoteBMS(data, timeout)
          return { data: response }
        },
        // eslint-disable-next-line no-unused-vars
        invalidatesTags: ['BMSList'],
      }),
      updateOutputBMS: build.mutation({
        queryFn: async (
          { idcmd, ipadd, syn_service, output, syn_status },
          timeout,
        ) => {
          const data = await putOutputOfRemoteControllBMS(
            { idcmd, ipadd, syn_service, output, syn_status },
            timeout,
          )
          return { data }
        },
        // eslint-disable-next-line no-unused-vars
        invalidatesTags: ['BMSList'],
      }),
      setupScheduleBMS: build.mutation({
        queryFn: async (data = [], timeout) => {
          const dataSetting = await setupScheduleBMS(data, timeout)
          return { data: dataSetting }
        },
        invalidatesTags: ['BMSList'],
      }),
      setupTemperatureBMS: build.mutation({
        queryFn: async (data = []) => {
          const response = await setupTemperatureBMS(data)
          return { data: response }
        },
        invalidatesTags: ['BMSList'],
      }),
    }
  },
})

export const {
  useGetAllBMSQuery,
  useGetListOutputBMSQuery,
  useUpdateModeBMSMutation,
  useTurnOnAllBMSMutation,
  useTurnOffAllBMSMutation,
  useUpdateOutputBMSMutation,
  useSetupScheduleBMSMutation,
  useSetupTemperatureBMSMutation,
} = bmsApi
