import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Icon,
  Sidebar,
} from "semantic-ui-react";
import VantageLogo from "../../../assets/images/VantageLogo.png";
import "./ResponsiveContainer.css";


class MobileNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpened: false
    };
  }

  render() {
    return (
      <Sidebar.Pushable>
        <Sidebar          
          position="left"
          animation="push"
          onHide={() => this.setState({ sidebarOpened: false })}
          vertical="true"
          visible={this.state.sidebarOpened}       
        >
          <ul className="mobile-navbar-menu">
            <li>
              <Link to="/" as="a">Home</Link>
            </li>
            <li>
              <Link to="/resume-builder" as="a">Build Resume</Link>
            </li>
            <li>
              <Link to="/" as="a">Contact Us</Link>
            </li>
            {this.props.renderRegistrationButton()}
          </ul>          
        </Sidebar>
        <div className="mobile-header" onClick={() => this.setState({ sidebarOpened: true })}>
          <div className="logo">
            <img src={VantageLogo} alt="logo"/>
          </div>
          <div>
            <Icon as="i" size="big" name="sidebar"/>
          </div>
        </div>
        <Container fluid={true}>
          {this.props.children}
        </Container>
      </Sidebar.Pushable>
    );
  }
}


export default MobileNavBar;
