"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logoutRequestAction = exports.loginRequestAction = exports.REMOVE_POST_OF_ME = exports.ADD_POST_TO_ME = exports.UNFOLLOW_FAILURE = exports.UNFOLLOW_SUCCESS = exports.UNFOLLOW_REQUEST = exports.FOLLOW_FAILURE = exports.FOLLOW_SUCCESS = exports.FOLLOW_REQUEST = exports.CHANGE_NICKNAME_FAILURE = exports.CHANGE_NICKNAME_SUCCESS = exports.CHANGE_NICKNAME_REQUEST = exports.SIGN_UP_FAILURE = exports.SIGN_UP_SUCCESS = exports.SIGN_UP_REQUEST = exports.LOG_OUT_FAILURE = exports.LOG_OUT_SUCCESS = exports.LOG_OUT_REQUEST = exports.LOG_IN_FAILURE = exports.LOG_IN_SUCCESS = exports.LOG_IN_REQUEST = exports.initialState = void 0;

var _immer = _interopRequireDefault(require("immer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loginLoading: false,
  // 로그인 시도중 (로딩창 띄우기위함)
  loginDone: false,
  loginError: null,
  logOutLoading: false,
  // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  // 회원가입
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false,
  //
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {}
};
exports.initialState = initialState;
var LOG_IN_REQUEST = "LOG_IN_REQUEST";
exports.LOG_IN_REQUEST = LOG_IN_REQUEST;
var LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
exports.LOG_IN_SUCCESS = LOG_IN_SUCCESS;
var LOG_IN_FAILURE = "LOG_IN_FAILURE";
exports.LOG_IN_FAILURE = LOG_IN_FAILURE;
var LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
exports.LOG_OUT_REQUEST = LOG_OUT_REQUEST;
var LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
exports.LOG_OUT_SUCCESS = LOG_OUT_SUCCESS;
var LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
exports.LOG_OUT_FAILURE = LOG_OUT_FAILURE;
var SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
exports.SIGN_UP_REQUEST = SIGN_UP_REQUEST;
var SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
exports.SIGN_UP_SUCCESS = SIGN_UP_SUCCESS;
var SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
exports.SIGN_UP_FAILURE = SIGN_UP_FAILURE;
var CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
exports.CHANGE_NICKNAME_REQUEST = CHANGE_NICKNAME_REQUEST;
var CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
exports.CHANGE_NICKNAME_SUCCESS = CHANGE_NICKNAME_SUCCESS;
var CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";
exports.CHANGE_NICKNAME_FAILURE = CHANGE_NICKNAME_FAILURE;
var FOLLOW_REQUEST = "FOLLOW_REQUEST";
exports.FOLLOW_REQUEST = FOLLOW_REQUEST;
var FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
exports.FOLLOW_SUCCESS = FOLLOW_SUCCESS;
var FOLLOW_FAILURE = "FOLLOW_FAILURE";
exports.FOLLOW_FAILURE = FOLLOW_FAILURE;
var UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
exports.UNFOLLOW_REQUEST = UNFOLLOW_REQUEST;
var UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
exports.UNFOLLOW_SUCCESS = UNFOLLOW_SUCCESS;
var UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";
exports.UNFOLLOW_FAILURE = UNFOLLOW_FAILURE;
var ADD_POST_TO_ME = "ADD_POST_TO_ME";
exports.ADD_POST_TO_ME = ADD_POST_TO_ME;
var REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";
exports.REMOVE_POST_OF_ME = REMOVE_POST_OF_ME;

var dummyUser = function dummyUser(data) {
  return _objectSpread({}, data, {
    nickname: "Tyranno닉네임임",
    id: 1,
    Posts: [{
      id: 1,
      nickname: "티라노"
    }],
    Followings: [{
      nickname: "팔로잉 티라노1"
    }, {
      nickname: "팔로잉 티라노2"
    }, {
      nickname: "팔로잉 티라노3"
    }],
    Followers: [{
      nickname: "팔로워 티라노1"
    }, {
      nickname: "팔로워 티라노2"
    }]
  });
};

var loginRequestAction = function loginRequestAction(data) {
  return {
    type: LOG_IN_REQUEST,
    data: data
  };
}; // loginSuccessAction, loginFailureAction, logoutSuccessAction, logoutFailureAction은 saga에서 호출하므로 안써도됨


exports.loginRequestAction = loginRequestAction;

var logoutRequestAction = function logoutRequestAction(data) {
  return {
    type: LOG_OUT_REQUEST
  };
};

exports.logoutRequestAction = logoutRequestAction;

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return (0, _immer["default"])(state, function (draft) {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.loginLoading = true;
        draft.loginError = null;
        draft.loginDone = false;
        break;

      case LOG_IN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.me = dummyUser(action.data);
        break;

      case LOG_IN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;

      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.me = null;
        break;

      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;

      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.me = null;

      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({
          id: action.data
        });
        break;

      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter(function (y) {
          return y.id !== action.data;
        });
        break;

      default:
        break;
    }
  });
};

var _default = reducer;
exports["default"] = _default;