import React from "react";

const UserContext = React.createContext({
  isLoggedIn: false,
  user: {},
  login: () => {},
  logout: () => {}
})

export default UserContext;
  