import { SignUpResponseData, SignUpUserPayload } from "./../@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { signUpUser } from "../reducers/authSlice";
import { all, takeLatest, call } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";

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

export default function* authSagaWatcher() {
  yield all([takeLatest(signUpUser, signUpUserWorker)]);
}
