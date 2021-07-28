import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

// combineReducers : 함수를 합쳐준다.
const rootReducer = combineReducers({
  // redux의 SSR을 위해 index로 HYDRATE를 넣어줌 (꼭 index을 필요는 없는듯?)
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("뭐임?", action);
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
