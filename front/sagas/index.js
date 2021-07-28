import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import userSaga from "./user";
// function* 은 generator함수임 yield를 써서 중간중간에 함수를 빠져나올 수 있음
// all,fork, put,call등은 saga의 effects들임
// fork, call은 generator함수를 실행시켜줌 (fork는 비동기, call은 동기)
// all은 fork,call등을 동시에 실행시켜줌
export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
