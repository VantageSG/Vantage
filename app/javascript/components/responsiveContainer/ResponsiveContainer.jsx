import React from "react";
import { Link } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";
import UserContext from '../../contexts/UserContext';
import "./ResponsiveContainer.css";
import { Responsive } from "semantic-ui-react";
import PadLockIcon from "../../../assets/images/padLockIcon.png";


// Provides responsive navbar and footer of App
class ResponsiveContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRegistrationButton = () => {
    return this.context.isLoggedIn ? (
      <li
        className="blue-button"
        onClick={this.context.logout}
      >
        <a>{this.context.user.guest ? "Clear Session" : "Logout"}</a>
      </li>
    ) : (
      <React.Fragment>
        <li className="blue-button">
          <Link to="/sign-up" as="a">Sign Up</Link>
        </li>
        <li>
          <Link to="/login" as="a">
            Login
            <img className="padlock" src={PadLockIcon} alt="pad lock icon" />
          </Link>
        </li>
      </React.Fragment>
      );
  };

  render() {
    return (
      <div className="container">
        <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
          <DesktopNavBar renderRegistrationButton={this.renderRegistrationButton}>
            {this.props.children}
          </DesktopNavBar>
        </Responsive>
        <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
          <MobileNavBar renderRegistrationButton={this.renderRegistrationButton}>
            {this.props.children}
          </MobileNavBar>
        </Responsive>
      </div>
    );
  }
}
ResponsiveContainer.contextType = UserContext;

export default ResponsiveContainer;
