import { PostsData } from "../@types";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { getPostList, setPostList } from "../reducers/postSlice";
import API from "../../utils/api";

function* postWorker() {
  const response: ApiResponse<PostsData> = yield call(API.getPosts);
  if (response.ok && response.data) {
    yield put(setPostList(response.data.results));
  } else {
    console.log("Sign Up User error", response.problem);
  }
}

export default function* postSagaWatcher() {
  yield all([takeLatest(getPostList, postWorker)]);
}
