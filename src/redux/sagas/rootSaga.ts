import { all } from "redux-saga/effects";
import authSagaWatcher from "./authSaga";
import postSagaWatcher from "./postSaga";

export default function* rootSaga() {
  yield all([authSagaWatcher(), postSagaWatcher()]);
}
