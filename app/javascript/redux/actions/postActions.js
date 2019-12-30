import { FETCH_POSTS, NEW_POST } from "./types";
import axios from "axios";

//each action creator is a function

export const fetchPosts = () => dispatch => {
  console.log("fetching");
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(response => dispatch({ type: FETCH_POSTS, payload: response.data }));
};

export const createPost = postData => dispatch => {
  console.log("creating");

  const headers = {
    "content-type": "application/json"
  };

  

  axios
    .post(
      "https://jsonplaceholder.typicode.com/posts",
      JSON.stringify(postData),
      {
        headers: headers
      }
    )
    .then(response => dispatch({ type: NEW_POST, payload: response.data }));
};
