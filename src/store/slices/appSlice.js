import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  footerPosition: 'fixed',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFooterPosition: (state, action) => {
      state.footerPosition = action.payload
    },
  },
})

export const { setFooterPosition } = appSlice.actions

export default appSlice.reducer
