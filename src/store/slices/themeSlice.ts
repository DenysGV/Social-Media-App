import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
   theme: string,
} = {
   theme: "dark"
}

export const themeSlie = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      switchTheme: (state, action: PayloadAction<string>) => {
         state.theme = action.payload
      }
   }
})

export const { switchTheme } = themeSlie.actions
export default themeSlie.reducer