/* eslint-disable no-unused-vars */
import SET_USER from "../actions/types";

function userProfile(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}

export default userProfile;
