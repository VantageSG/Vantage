import { FETCH_POSTS, NEW_POST } from "../actions/types";

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_POST:
      // should create new post here but example only using json placeholder so return new post
      return {
        ...state,
        item: action.payload
      };
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload // we call it payload inside the action (postActions.js)
      };
    default:
      return state;
  }
}
