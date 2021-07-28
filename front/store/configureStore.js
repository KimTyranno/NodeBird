import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import reducer from "../reducers";
import rootSaga from "../sagas";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // 미들웨어는 redux에 없던 기능을 추가해주는역할임
  // saga는 redux가 비동기액션을 dispatch 할 수 있도록 도와줌
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.dispatch({
    type: "CHANGE_NAME",
    data: "boogi",
  });
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
