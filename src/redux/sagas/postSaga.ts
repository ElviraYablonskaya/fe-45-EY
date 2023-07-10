import { PostsData } from "../@types";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import {
  getPostList,
  setPostList,
  getSinglePost,
  setSinglePost,
  setMyPosts,
  getMyPosts,
} from "../reducers/postSlice";
import API from "../../utils/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../@types";
import callCheckingAuth from "./helpers/callCheckingAuth";

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

function* getMyPostsWorker() {
  const response: ApiResponse<PostsData> = yield callCheckingAuth(
    API.getMyPosts
  );
  if (response.status === 404) {
    yield put(setMyPosts([]));
  } else {
    if (response.data && response.ok) {
      yield put(setMyPosts(response.data.results));
    } else {
      console.error("My posts error", response.problem);
    }
  }
}

export default function* postSagaWatcher() {
  yield all([
    takeLatest(getPostList, postWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
  ]);
}
