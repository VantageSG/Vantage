import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./registrations/Login";
import Signup from "./registrations/Signup";
import ResponsiveContainer from "./navBar/NavBar";
import Error404Page from "../components/error/Error404Page";
import ResumeBuilder from "../components/resumebuilder/ResumeBuilder";
import ResumeGeneration from "../components/resumeGeneration/ResumeGeneration";
import UserContext from '../contexts/UserContext';


// App implements routing and login/logout logic
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };    
  }

  componentDidMount() {
    this.getLoginStatus();
  }

  // sets the login status as App state: user is either logged in or not
  getLoginStatus = () => {
    axios
      .get(process.env.BACKEND_PORT + "/api/v1/logged_in", {
        withCredentials: true,
        validateStatus: status => {
          return (status === 200) || status === 401; //error status 401 is expected for user not logged in
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({isLoggedIn: true, user: response.data.user});
        } else if (response.status === 401) {
          this.setState({isLoggedIn: true, user: {}});
        } else { }
      })
      .catch(error => console.log(error));
  };

  // logs the user in. calls either success/error callback function depending on response
  login = (user, successCallback, errorCallBack) => {
    axios
      .post(process.env.BACKEND_PORT + "/api/v1/login/", { user }, {
          withCredentials: true,
          validateStatus: status => status === 200 || status === 401
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({isLoggedIn: true, user: response.data.user});
          successCallback();
        } else if (response.status === 401) {
          errorCallBack(response.data.error);
        } else { }        
      })
      .catch(error => console.log(error));
  }

  render() {

    return (
        <BrowserRouter>
          <UserContext.Provider value={{
            isLoggedIn: this.state.isLoggedIn,
            user: this.state.user,
            login: this.login,
            logout: this.logout
          }}>
            <ResponsiveContainer          
            loggedInStatus={this.state.isLoggedIn}
            handleLogout={this.handleLogout}
            user={this.state.user}
            >
              <Switch>              
                <Route exact path="/">
                  <Home
                    handleLogout={this.handleLogout}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                </Route>
                <Route exact path="/login">
                  <Login
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                </Route>
                <Route exact path="/sign-up" >
                  <Signup
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                </Route>                            
                {/* <Route exact path="/resume-builder">
                  <ResumeBuilder 
                    handleLogin={this.handleLogin}
                    user={this.state.user}
                  />
                </Route>
                <Route exact path="/resume-generation/:userId">
                  <ResumeGeneration
                    user={this.state.user}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                </Route> */}
                <Route component={Error404Page} />
              </Switch>
            </ResponsiveContainer>
          </UserContext.Provider>
        </BrowserRouter>
    );
  }
}
export default App;
