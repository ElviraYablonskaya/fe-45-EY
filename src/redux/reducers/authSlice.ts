import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  SignUpUserPayload,
  ActivateUserPayload,
  SignInUserPayload,
  UserInfoResponse,
  RefreshTokenPayload,
} from "../@types";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";
import { RootState } from "../store";

type InitialState = {
  accessToken: string;
  userData: UserInfoResponse | null;
  refreshToken: string;
};

const initialState: InitialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
  userData: null,
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || "",
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
    refreshToken:(_,__:PayloadAction<RefreshTokenPayload>) => {},
    setRefreshToken: (state, action:PayloadAction<string>) => {
      state.refreshToken = action.payload
    }
  },
});

export const {
  signUpUser,
  activateUser,
  signInUser,
  setAccessToken,
  getUserData,
  setUserData,
  refreshToken,
  setRefreshToken
} = authSlice.actions;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
  getUserData: (state: RootState) => state.authReducer.userData,
  refreshToken:(state:RootState) => state.authReducer.refreshToken
};

export default authSlice.reducer;
