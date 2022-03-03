import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { saveCart } from 'utils/localStorage'

import cartReducer from './CartSlice'
import uiReducer from './UISlice'
import userReducer from './userReducer'
import logger from 'redux-logger'
const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    user: userReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
})

store.subscribe(() => {
  saveCart(store.getState().cart)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
