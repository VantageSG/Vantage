import React, { Component } from "react";
import {
  Grid,
  Image,
  Responsive,
  Form,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Team from "./Team"
import Clipboard from "../../../assets/images/resumeClipboard.svg";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, email, message } = this.state;
    alert("Your message has been sent.");
    this.setState({name: "", email: "", message: ""})
  }

  render() {
    return (
      <div className="container">
        <Grid>
          <Grid.Row>
            <Grid.Column computer={1}></Grid.Column>
            <Grid.Column computer={10} tablet={11} mobile={12}>
              <div className="landingMessageBox">
                <h1 className="landingMessage" >CLIMB HIGHER<br></br> WITH VANTAGE SG</h1>
                <h2 className="landingMessage">Transform your story to a professional resume <br/>Try our Speech-to-Text function now</h2>
                <Link to="/resume-builder">
                  <button className="landingButton landingMessage">Build Your Resume Now</button>
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column computer={5} tablet={1} mobile={1}>
              <Responsive {...Responsive.onlyComputer}>
                <Image
                  src={Clipboard}
                  className="clipboardImage"
                ></Image>
              </Responsive>
            </Grid.Column>
          </Grid.Row>

          
        </Grid>
        <Team
            style={{
              marginLeft:"10px"
            }}
          />
      </div>
    );
  }
}

export default LandingPage;
