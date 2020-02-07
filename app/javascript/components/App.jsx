import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./registrations/Login";
import Signup from "./registrations/Signup";
import ResponsiveContainer from "./navBar/NavBar";
import Users from "../components/userprofiles/Users";
import UserProfile from "../components/userprofiles/UserProfile";
import Error404Page from "../components/error/Error404Page";
import ResumeBuilder from "../components/resumebuilder/ResumeBuilder";
import ResumeGeneration from "../components/resumeGeneration/ResumeGeneration";





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
      .get(process.env.BACKEND_PORT + "/api/v1/logged_in", {
        withCredentials: true,
        validateStatus: function(status) {
          return (status >= 200 && status < 300) || status === 401; //error status 401 is expected for user not logged in
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.handleLogin(response);
        } else if (
          response.status === 401 &&
          response.data.error === "User not logged in"
        ) {
          this.handleLogout();
        } else {
          console.log("unknown error");
        }
      })
      .catch(error => {});
  };

  handleLogin = data => {
    console.log(data)
    this.setState({
      isLoggedIn: true,
      user: data.data.user
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
         
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <ResponsiveContainer
                  loggedInStatus={this.state.isLoggedIn}
                  handleLogout={this.handleLogout}
                  user={this.state.user}
                  >
                  <Home
                    {...props}
                    handleLogout={this.handleLogout}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                  </ResponsiveContainer>
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
                path="/sign-up"
                render={props => (
                  <Signup
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                )}
              />
              <Route
                exact
                path="/user-profiles"
                render={props => <Users {...props} />}
              />
              <Route
                exact
                path="/Resume-builder"
                render={props => 
                  <ResponsiveContainer
                
                  loggedInStatus={this.state.isLoggedIn}
                  handleLogout={this.handleLogout}
                  user={this.state.user}
                  >
                <ResumeBuilder 
                  {...props} 
                  handleLogin={this.handleLogin}
                  user={this.state.user}
                />
                </ResponsiveContainer>}
              />
           
              <Route
                exact
                path="/resume-generation/:userId"
                render={props => (
                  <ResponsiveContainer
                  loggedInStatus={this.state.isLoggedIn}
                  handleLogout={this.handleLogout}
                  user={this.state.user}
                  >
                  <ResumeGeneration  
                  {...props}
                  user={this.state.user}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn} />
                  </ResponsiveContainer>
                )}
              />
              <Route component={Error404Page} />
            </Switch>
  
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
