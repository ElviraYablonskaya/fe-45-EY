import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  SignUpUserPayload,
  ActivateUserPayload,
  SignInUserPayload,
  UserInfoResponse,
} from "../@types";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { RootState } from "../store";

type InitialState = {
  accessToken: string;
  userData: UserInfoResponse | null;
};

const initialState: InitialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
  userData: null,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    getUserData: (_, __: PayloadAction<undefined>) => {},
    setUserData: (state, action: PayloadAction<UserInfoResponse | null>) => {
      state.userData = action.payload;
    },
    logoutUser:(_, __: PayloadAction<undefined>) => {},
  },
});

export const {
  signUpUser,
  activateUser,
  signInUser,
  setAccessToken,
  getUserData,
  setUserData,
  logoutUser
} = authSlice.actions;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
  getUserData: (state: RootState) => state.authReducer.userData,
};

export default authSlice.reducer;
