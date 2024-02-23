import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    isSeller: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeEmail: (state, action) => {
            state.email = action.payload
        },
        updateSeller: (state, action) => {
            const isUUID = /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(action.payload);
            state.isSeller = isUUID;
        }
    }

})

export const { changeEmail, updateSeller } = userSlice.actions

export default userSlice.reducer