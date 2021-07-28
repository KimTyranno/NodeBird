import shortId from "shortid";
import produce from "immer";

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: { id: 1, nickname: "티라노" },
      content: "첫글임 #해시태그임 #언제배우냐",
      Images: [
        {
          id: shortId.generate(),
          src:
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80",
        },
        {
          id: shortId.generate(),
          src: "https://static.toiimg.com/photo/72975551.cms",
        },
        {
          id: shortId.generate(),
          src:
            "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "네로",
          },
          content: "개정판나옴",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "히어로",
          },
          content: "자고싶다.",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});
const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "티란오",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "티란오",
  },
});
const reducer = (state = initialState, action) => {
  // immer 도입
  // state가 draft라는 이름으로 바뀜
  // 이렇게하면 개발자는 불변성 상관없이 막 바꿔도 immer가 알아서 불변성을 지키면서 리턴시켜줌
  return produce(state, (draft) => {
    switch (action.type) {
      // 기존의 코드 (immer 도입전)
      // case ADD_POST_REQUEST:
      //   return {
      //     ...state,
      //     addPostLoading: true,
      //     addPostDone: false,
      //     addPostError: null,
      //   };
      // immer 도입후
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;

      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        // 불변성을 지키면서 지울때 보통 filter를 많이 사용한다함
        // draft.mainPosts = state.mainPosts.filter((y) => y.id !== action.data)
        draft.mainPosts = draft.mainPosts.filter((y) => y.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((y) => y.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        // immer 도입전
        // const postIndex = state.mainPosts.findIndex(
        //   (y) => y.id === action.data.postId
        // );
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
