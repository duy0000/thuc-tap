import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
const initialState = {
  currentVersion: null,
  isFetching: false,
  error: false,
}

const versionSlice = createSlice({
  name: 'version',
  initialState,
  reducers: {
    versionStart: (state) => {
      state.isFetching = true
    },
    versionSuccess: (state, action) => {
      state.isFetching = false
      state.currentVersion = action.payload
      state.error = false
    },
    versionFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const { versionStart, versionSuccess, versionFailure } =
  versionSlice.actions
export const DataVersionWEB = () => {
  const state = useSelector((state) => state.versionWeb)
  return {
    currentVersion: state.currentVersion,
    isFetching: state.isFetching,
    error: state.error,
  }
}
export default versionSlice.reducer
