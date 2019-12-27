import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./registrations/Login";
import Signup from "./registrations/Signup";
import NavBar from "./navbar/NavBar";
import ResponsiveContainer from "../components/navbar/NavBar";
import UserPage from "./userprofiles/UserPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }
  componentDidMount() {
    this.loginStatus();
  }
  loginStatus = () => {
    axios
      .get("http://localhost:3000/api/v1/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response);
        } else {
          this.handleLogout();
        }
      })
      .catch(error => console.log("api errors:", error));
  };
  handleLogin = data => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    });
  };
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <ResponsiveContainer>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    handleLogout={this.handleLogout}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                )}
              />
              <Route
                exact
                path="/login"
                render={props => (
                  <Login
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                )}
              />
              <Route
                exact
                path="/signup"
                render={props => (
                  <Signup
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                )}
              />
              <Route exact path="/UserProfiles" render={props => <UserPage />} />
            </Switch>
          </ResponsiveContainer>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
