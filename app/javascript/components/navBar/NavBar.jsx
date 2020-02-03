import React, { Component } from "react";
import {
  Responsive,

} from "semantic-ui-react";
import MobileNavBar from "./mobileNavBar";
import DesktopNavBar from "./desktopNavBar";
import "./layout.css";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class ResponsiveContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //document.getElementById("pageLoader").style.display = "block";
    //setTimeout(function () { document.getElementById("pageLoader").style.display = "none"; }, 1000);
  }


  render() {
    return (
      <div>
        <DesktopNavBar
        className="site"
          loggedInStatus={this.props.loggedInStatus}
          user={this.props.user}
        >
          {this.props.children}
        </DesktopNavBar>
        <MobileNavBar
         className="site"
          loggedInStatus={this.props.loggedInStatus}
          user={this.props.user}
        >
          {this.props.children}
        </MobileNavBar>
      </div>
    );
  }
}

export default ResponsiveContainer;
