import { FETCH_POSTS, NEW_POST } from "./types";
import axios from "axios";

//each action creator is a function

export const fetchPosts = () => dispatch => {
  console.log("fetching");
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(response => dispatch({ type: FETCH_POSTS, payload: response.data }));
};
