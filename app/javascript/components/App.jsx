import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
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
      user: {},
      loading: true
    };    
  }

  componentDidMount() {
    this.getLoginStatus();
  }

  // sets the login status as App state: user is either logged in or not
  getLoginStatus = () => {
    this.setState({loading: true})
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
          this.setState({isLoggedIn: false, user: {}});
        } else { }
        this.setState({loading: false})
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
        this.setState({loading: false})
      })
      .catch(error => console.log(error));
    this.setState({loading: true})
  }

  signup = (user, successCallback, errorCallBack) => {
    axios
      .post(process.env.BACKEND_PORT + "/api/v1/users/", { user }, {
        withCredentials: true,
        validateStatus: status => status === 201 || status === 400
      })
      .then(response => {
        if (response.status === 201) {
          // if sign up successful, login          
          this.login({
            username: user.username,
            email: user.email,
            password: user.password
          }, successCallback, errorCallBack)          
        } else if (response.status === 400) {
          errorCallBack(response.data.errors);
          this.setState({loading: false})
        } else { }        
      })
      .catch(error => console.log(error));
    this.setState({loading: true});
  }

  continueAsGuest=(successCallback)=>{    
    axios
      .post(process.env.BACKEND_PORT + "/api/v1/users/guest_user",
      {withCredentials: true}
      )
      .then(response => {                
        axios.post(process.env.BACKEND_PORT + "/api/v1/login/" + response.data.user.id,
        {withCredentials: true}
        )
        .then(response => {
          console.log(response)
          this.setState({isLoggedIn: true, user: response.data.user})
          this.setState({loading: false})
          successCallback();
        })
        .catch(error=> console.log(error.response))
      })
      .catch(error => console.log(error.response));
  }

  logout = () => {        
    axios
      .delete(process.env.BACKEND_PORT + "/api/v1/logout/", {
          withCredentials: true,
          validateStatus: status => status === 200
      })
      .then(response => {
        this.setState({isLoggedIn: false, user: {}})
        this.setState({loading: false})        
      })
      .catch(error => console.log(error))
    this.setState({loading: true})    
  }

  render() {

    return (
        <BrowserRouter>
          <UserContext.Provider value={{
            isLoggedIn: this.state.isLoggedIn,
            user: this.state.user,
            login: this.login,
            logout: this.logout,
            signup: this.signup,
            continueAsGuest: this.continueAsGuest
          }}>
            <ResponsiveContainer                      
            >
              {this.state.loading
              ? (
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              )
              :(              
              <Switch>              
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/sign-up" >
                  <Signup />
                </Route>                            
                <Route exact path="/resume-builder">
                  <ResumeBuilder />
                </Route>
                <Route exact path="/resume-generation">
                  <ResumeGeneration/>
                </Route>
                <Route component={Error404Page} />
              </Switch>
              )}
            </ResponsiveContainer>
          </UserContext.Provider>
        </BrowserRouter>
    );
  }
}
export default App;
