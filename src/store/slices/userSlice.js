import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeEmail: (state, action) => {
            state.email = action.payload
        }
    }

})

export const { changeEmail } = userSlice.actions

export default userSlice.reducer