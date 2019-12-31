//root reducer
import { combineReducers } from "redux";
import postReducer from "./postReducer";
import userProfile from "./userProfile";
import userReducer from "./userReducer";

// combining multiple reduces
export default combineReducers({
  userReducer // root reducer
});
