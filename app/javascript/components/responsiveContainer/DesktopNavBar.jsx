import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
} from "semantic-ui-react";
import VantageLogo from "../../../assets/images/VantageLogo.png";
import "./ResponsiveContainer.css";


class DesktopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="logo">
            <Link to="/">
              <img src={VantageLogo} alt="logo"/>
            </Link>
          </div>
          <nav className="navbar">
            <ul className="navbar-menu">
              <li>
                <Link to="/resume-builder" as="a">Build Resume</Link>
              </li>
              <li>
                <Link to="/" as="a">Contact Us</Link>
              </li>
              {this.props.renderRegistrationButton()}
            </ul>
          </nav>
        </div>
        <Container fluid>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default DesktopNavBar;
