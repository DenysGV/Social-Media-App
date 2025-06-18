import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../types/types";

const initialState: {
   user: IUser | null
} = {
   user: null
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      signIn: (state, action: PayloadAction<IUser>) => {
         state.user = action.payload
      },
      logOut: (state) => {
         state.user = null
      }
   }
})

export const { signIn, logOut } = userSlice.actions
export default userSlice.reducer