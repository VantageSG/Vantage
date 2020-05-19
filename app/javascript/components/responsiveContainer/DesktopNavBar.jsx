import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
} from "semantic-ui-react";
import VantageLogo from "../../../assets/images/VantageLogo.png";
import "./ResponsiveContainer.css";


const DesktopNavBar = (props) => {

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
            {props.renderRegistrationButton()}
          </ul>
        </nav>
      </div>
      <Container fluid={true}>
        {props.children}
      </Container>
    </div>
  );
}

export default DesktopNavBar;
