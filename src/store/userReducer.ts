import { RootState } from 'store'
import { loadUser } from './../utils/localStorage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import user from 'pages/api/v1/auth/user'
import { removeCookie } from 'components/Storage/cookies'

export type userType = {
  _id?: string
  name?: string
  email?: string
  password?: string
  products?: string[]
}

const initialUserState: userType = {}

const persistedUser = loadUser()
console.log(persistedUser)

const userSlice = createSlice({
  name: 'user',
  initialState: persistedUser ? persistedUser : initialUserState,
  reducers: {
    addUser: (state, action: PayloadAction<userType>) => {
      console.log(action)
      state = action.payload
      return state
    },
    removeUser: (state, action: PayloadAction<{}>) => {
      state = {}
      removeCookie('user')
      return state
    },
  },
})
export const selectUser = (state: RootState): userType => state.user
export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer
