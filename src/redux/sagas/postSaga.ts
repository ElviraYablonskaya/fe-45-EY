import { PostsData } from "../@types";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import {
  getPostList,
  setPostList,
  getSinglePost,
  setSinglePost,
} from "../reducers/postSlice";
import API from "../../utils/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../@types";

function* postWorker() {
  const response: ApiResponse<PostsData> = yield call(API.getPosts);
  if (response.ok && response.data) {
    yield put(setPostList(response.data.results));
  } else {
    console.log("Sign Up User error", response.problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  const response: ApiResponse<Post> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
  } else {
    console.log("Single Post error", response.problem);
  }
}

export default function* postSagaWatcher() {
  yield all([
    takeLatest(getPostList, postWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
  ]);
}
