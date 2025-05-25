import { createSlice } from '@reduxjs/toolkit'


export const userSclice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    avatar:null
  },
  reducers: {
    set: (state, action) => {
      return { ...action.payload }
    },
    reset: (state, action) => {
      return {
        id: null,
        name: null,
        avatar: null
      }
    }
  }

})


export const { reset, set }  = userSclice.actions

export default userSclice.reducer
