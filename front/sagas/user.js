import { all, fork, delay, takeLatest, put } from "@redux-saga/core/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
} from "../reducers/user";

function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* login(action) {
  try {
    // fork, call로 매개변수를 넘길때 call(loginAPI(매개변수1,매개변수2..)) 가 아니라
    // call(loginAPI, 매개변수1, 매개변수2...) 처럼 넣어줘야한다.
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}
function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}
function signUpAPI() {
  return axios.post("/api/logout");
}
function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_REQUEST,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response.data,
    });
  }
}

// 이벤트 리스너같은 친구들임
function* watchLogin() {
  // take는 LOG_IN이란 액션이 실행될때까지 기다림
  // LOG_IN이란 액션이 실행되면 login을 실행시킴
  // 1. 아래 코드는 한번밖에 실행안됨, 한번 실행하면 없어진다보면됨
  // yield take("LOG_IN_REQUEST", login);
  // 2. while(true)를 해줌으로써 계속 실행시킬 수 있음
  //   while(true){
  //       yield take("LOG_IN_REQUEST", login);
  //   }
  // 3. takeEvery로 while을 대체할 수 있다 (반복문은 좀 거시기하니깐..)
  // 4. takeLatest는 클릭실수로 여러번 실행시켜도 마지막 실행시킨것만 실행함(앞에꺼 다 무시함)
  // takeEvery는 몇번 눌리던 다 실행시켜버림
  // takeLatest와 반대로 첫번째것만 실행시키는것은 takeLeading이다.
  // 근데 takeLatest던 takeLeading이던 백엔드에 요청하는횟수는 같고, 응답이 온것만 그렇게 처리해주는것이므로 백엔드에서도 따로 처리해줘야함
  // throttle은 시간을 지정해서 그 시간동안 요청을 제한시키는것도 있다.
  // throttle("ADD_POST_REQUEST", addPost, 2000)
  yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(LOG_OUT_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchSignUp)]);
}
