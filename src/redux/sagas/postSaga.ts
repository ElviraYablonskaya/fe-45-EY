import { GetPostsPayload, GetSearchedPostsPayload, PostsData } from "../@types";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import {
  getPostList,
  setPostList,
  getSinglePost,
  setSinglePost,
  setMyPosts,
  getMyPosts,
  setSearchedPosts,
  getSearchedPosts,
  setPostsListLoading,
} from "../reducers/postSlice";
import API from "../../utils/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../@types";
import callCheckingAuth from "./helpers/callCheckingAuth";

function* getPostsWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setPostsListLoading(true));
  const { offset, isOverwrite, ordering } = action.payload;
  const response: ApiResponse<PostsData> = yield call(API.getPosts, offset, ordering);
  if (response.ok && response.data) {
    const { count, results } = response.data;
    yield put(
      setPostList({
        total: count,
        postsList: results,
        isOverwrite,
      })
    );
  } else {
    console.error("Get Posts List error", response.problem);
  }
  yield put(setPostsListLoading(false));
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

function* getSearchedPostWorker(
  action: PayloadAction<GetSearchedPostsPayload>
) {
  const { offset, search } = action.payload;
  const response: ApiResponse<PostsData> = yield call(
    API.getPosts,
    offset,
    search
  );
  if (response.ok && response.data) {
    const { results, count } = response.data;
    yield put(
      setSearchedPosts({
        postsList: results,
        total: count,
      })
    );
  } else {
    console.error("Searched posts error", response.problem);
  }
}

export default function* postSagaWatcher() {
  yield all([
    takeLatest(getPostList, getPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostWorker),
  ]);
}
