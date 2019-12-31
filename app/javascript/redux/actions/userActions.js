import axios from "axios";
import { SET_USER, FETCH_USER } from "./types";

export default function fetchUsers() {
  return {
    type: FETCH_USER,
    payload: axios.get("https://randomuser.me/api/?results=10")
  };
}
