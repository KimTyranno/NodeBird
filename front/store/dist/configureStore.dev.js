"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nextReduxWrapper = require("next-redux-wrapper");

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("../reducers"));

var _sagas = _interopRequireDefault(require("../sagas"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configureStore = function configureStore() {
  var sagaMiddleware = (0, _reduxSaga["default"])(); // 미들웨어는 redux에 없던 기능을 추가해주는역할임
  // saga는 redux가 비동기액션을 dispatch 할 수 있도록 도와줌

  var middlewares = [sagaMiddleware];
  var enhancer = process.env.NODE_ENV === "production" ? (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, middlewares)) : (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(void 0, middlewares));
  var store = (0, _redux.createStore)(_reducers["default"], enhancer);
  store.dispatch({
    type: "CHANGE_NAME",
    data: "boogi"
  });
  store.sagaTask = sagaMiddleware.run(_sagas["default"]);
  return store;
};

var wrapper = (0, _nextReduxWrapper.createWrapper)(configureStore, {
  debug: process.env.NODE_ENV === "development"
});
var _default = wrapper;
exports["default"] = _default;