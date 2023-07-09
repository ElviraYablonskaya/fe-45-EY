import {
  SignUpResponseData,
  SignUpUserPayload,
  ActivateUserPayload,
  SignInUserPayload,
  SignInResponseData,
  UserInfoResponse,
} from "./../@types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  signUpUser,
  activateUser,
  signInUser,
  setAccessToken,
  setUserData,
  getUserData,
  logoutUser,
} from "../reducers/authSlice";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";
import callCheckingAuth from "./helpers/callCheckingAuth";

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
  const response: ApiResponse<UserInfoResponse> | undefined =
    yield callCheckingAuth(API.getUserInfo);
  if (response && response?.ok && response?.data) {
    yield put(setUserData(response.data));
  } else {
    console.error("User data error", response?.problem);
  }
}

function* logoutWorker() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  yield put(setAccessToken(""));
}

export default function* authSagaWatcher() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(getUserData, userDataWorker),
    takeLatest(logoutUser, logoutWorker),
  ]);
}
