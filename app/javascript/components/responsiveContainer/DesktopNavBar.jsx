import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import VantageLogo from "../../../assets/images/VantageLogo.png";
import "./ResponsiveContainer.css";

const DesktopNavBar = props => {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src={VantageLogo} alt="logo" />
          </Link>
        </div>
        <nav className="navbar">
          <ul className="navbar-menu">
            <li>
              <Link to="/resume-builder" as="a">
                Build Resume
              </Link>
            </li>
            {props.renderRegistrationButton()}
          </ul>
        </nav>
      </div>
      <Container fluid={true}>{props.children}</Container>
      <nav className="navbar">
        <Grid>
          <Grid.Row centered>
            <Grid.Column computer={8} tablet={8} mobile={8} textAlign="center">
              <span className="landingMessage">
                Contact Us: ext.head.biz.c.dscnus@gmail.com
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </nav>
    </div>
  );
};

export default DesktopNavBar;
