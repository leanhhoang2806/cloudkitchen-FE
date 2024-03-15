import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  buyerId: '',
  email: '',
  isSeller: false,
  sellerId: '',
  cart: [],
  searchResults: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeEmail: (state, action) => {
      state.email = action.payload.email
      state.buyerId = action.payload.id
    },
    updateSeller: (state, action) => {
      const isUUID = /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(
        action.payload,
      )
      state.isSeller = isUUID
      state.sellerId = action.payload
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload]
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter((order, index) => index !== action.payload)
    },
    clearCart: (state, action) => {
      state.cart = action.payload
    },
    updateSearchResult: (state, action) => {
      state.searchResults = [...action.payload]
    },
  },
})

export const {
  changeEmail,
  updateSeller,
  addToCart,
  removeItemFromCart,
  clearCart,
  updateSearchResult,
} = userSlice.actions

export default userSlice.reducer
