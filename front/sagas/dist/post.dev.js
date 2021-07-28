"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = postSaga;

var _effects = require("@redux-saga/core/effects");

var _axios = _interopRequireDefault(require("axios"));

var _shortid = _interopRequireDefault(require("shortid"));

var _post = require("../reducers/post");

var _user = require("../reducers/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(addPost),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(removePost),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(addComment),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(watchAddPost),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(watchReovePost),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(watchAddComment),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(postSaga);

function addPostAPI(data) {
  return _axios["default"].post("/api/post", data);
}

function addPost(action) {
  var id;
  return regeneratorRuntime.wrap(function addPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.delay)(1000);

        case 3:
          // const result = yield call(addPostAPI, action.data); //아직 서버없어서 delay로 더미데이터 처리함
          id = _shortid["default"].generate();
          _context.next = 6;
          return (0, _effects.put)({
            type: _post.ADD_POST_SUCCESS,
            data: {
              id: id,
              content: action.data
            }
          });

        case 6:
          _context.next = 8;
          return (0, _effects.put)({
            type: _user.ADD_POST_TO_ME,
            data: id
          });

        case 8:
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          _context.next = 14;
          return (0, _effects.put)({
            type: _post.ADD_POST_FAILURE,
            data: _context.t0.response.data
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 10]]);
}

function removePostAPI(data) {
  return _axios["default"]["delete"]("/api/post", data);
}

function removePost(action) {
  return regeneratorRuntime.wrap(function removePost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.delay)(1000);

        case 3:
          _context2.next = 5;
          return (0, _effects.put)({
            type: _post.REMOVE_POST_SUCCESS,
            data: action.data
          });

        case 5:
          _context2.next = 7;
          return (0, _effects.put)({
            type: _user.REMOVE_POST_OF_ME,
            data: action.data
          });

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 13;
          return (0, _effects.put)({
            type: _post.REMOVE_POST_FAILURE,
            data: _context2.t0.response.data
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 9]]);
}

function addCommentAPI(data) {
  return _axios["default"].post("/api/post/".concat(data.postid, "/comment"), data);
}

function addComment(action) {
  return regeneratorRuntime.wrap(function addComment$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _effects.delay)(1000);

        case 3:
          _context3.next = 5;
          return (0, _effects.put)({
            type: _post.ADD_COMMENT_SUCCESS,
            data: action.data
          });

        case 5:
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 11;
          return (0, _effects.put)({
            type: ADD_COMMENT_FAILUREE,
            data: _context3.t0.response.data
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 7]]);
}

function watchAddPost() {
  return regeneratorRuntime.wrap(function watchAddPost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeLatest)(_post.ADD_POST_REQUEST, addPost);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function watchReovePost() {
  return regeneratorRuntime.wrap(function watchReovePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.takeLatest)(_post.REMOVE_POST_REQUEST, removePost);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}

function watchAddComment() {
  return regeneratorRuntime.wrap(function watchAddComment$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.takeLatest)(_post.ADD_COMMENT_REQUEST, addComment);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}

function postSaga() {
  return regeneratorRuntime.wrap(function postSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(watchAddPost), (0, _effects.fork)(watchReovePost), (0, _effects.fork)(watchAddComment)]);

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}