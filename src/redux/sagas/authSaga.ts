import {
  SignUpResponseData,
  SignUpUserPayload,
  ActivateUserPayload,
  SignInUserPayload,
  SignInResponseData,
  UserInfoResponse,
  RefreshTokenPayload,
} from "./../@types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  signUpUser,
  activateUser,
  signInUser,
  setAccessToken,
  setUserData,
  getUserData,
  refreshToken,
} from "../reducers/authSlice";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignUpResponseData> = yield call(
    API.signUpUser,
    data
  );
  if (response.ok && response.data) {
    callback();
  } else {
    console.log("Sign Up User error", response.problem);
  }
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield call(API.activateUser, data);
  if (response.ok) {
    callback();
  } else {
    console.error("Activate User error", response.problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignInResponseData> = yield call(
    API.createToken,
    data
  );
  if (response.ok && response.data) {
    yield put(setAccessToken(response.data.access));
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access),
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh),
      callback();
  } else {
    console.error("Sign In User error", response.problem);
  }
}

function* userDataWorker() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    const response: ApiResponse<UserInfoResponse> = yield call(
      API.getUserInfo,
      accessToken
    );
    if (response.ok && response.data) {
      yield put(setUserData(response.data));
    } else {
      console.error("User data error", response.problem);
    }
  }
}

function* refreshTokenWorker() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (refreshToken) {
    const response: ApiResponse<RefreshTokenPayload> = yield call(
      API.refreshToken,
      refreshToken
    );
    if (response.ok && response.data) {
      // новый access token в хранилище и обновит его в Redux-состоянии
      const accessToken = response.data.access;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      yield put(setAccessToken(accessToken));
    } else {
      console.error("Refresh token error", response.problem);
    }
  }
}

export default function* authSagaWatcher() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(getUserData, userDataWorker),
    takeLatest(refreshToken, refreshTokenWorker),
  ]);
}
