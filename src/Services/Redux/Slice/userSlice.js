import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userStart: (state) => {
      state.isFetching = true
    },
    userSuccess: (state, action) => {
      state.isFetching = false
      const user = action.payload
      state.currentUser = user
      state.error = false
    },
    userFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const { userStart, userSuccess, userFailure } = userSlice.actions
export default userSlice.reducer
