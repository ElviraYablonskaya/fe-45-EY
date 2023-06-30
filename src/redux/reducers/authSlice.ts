import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SignUpUserPayload } from "../@types";


type InitialState = {};

const initialState: InitialState = {};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
  },
});

export const { signUpUser } = authSlice.actions;

export const ThemeSelectors = {

};

export default authSlice.reducer;
