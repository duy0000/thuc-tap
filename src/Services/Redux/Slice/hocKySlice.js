import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState = {
  listHocKy: [],
  isFetching: false,
  error: false,
}
const hocKySlice = createSlice({
  name: 'hocKy',
  initialState,
  reducers: {
    hocKyStart: (state) => {
      state.isFetching = true
    },
    hocKySuccess: (state, action) => {
      state.isFetching = false
      state.listHocKy = action.payload
      state.error = false
    },
    hocKyFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const { hocKyStart, hocKySuccess, hocKyFailure } = hocKySlice.actions
export const DataHocKy = () => {
  const state = useSelector((state) => state.hocKy)
  return {
    listHocKy: state.listHocKy,
    isFetching: state.isFetching,
    error: state.error,
  }
}
export default hocKySlice.reducer
