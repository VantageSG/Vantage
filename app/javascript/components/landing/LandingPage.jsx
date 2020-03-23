import React, { Component } from "react";
import {
  Grid,
  Image,
  Responsive,
  Form,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

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
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={1}></Grid.Column>
            <Grid.Column computer={10} tablet={11} mobile={12}>
              <div className="landingMessageBox">
                <h1 className="landingMessage" >CLIMB HIGHER<br></br> WITH VANTAGE SG</h1>
                <h2 className="landingMessage">Build your <span className="landingMessage">PERSONALISED RESUME</span><br></br> with guidance from us now</h2>
                <Link to="/resume-builder">
                  <button className="landingButton landingMessage">Resume Builder</button>
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
          <Grid.Row>
            <Grid.Column computer={1}></Grid.Column>
            <Grid.Column computer={10} tablet={12} mobile={14}>
              <div className="contactUsBox">
                <Grid>
                <Grid.Row>
                  <Grid.Column computer={8} tablet={8} mobile={16}>
                    <h2 className="contactUsContent">CONTACT</h2>
                    <h3 className="contactUsContent">ADDRESS</h3>
                    <p className="contactUsContent">70 Pasir Panjang Rd<br/> Singapore 117371</p>
                    <h3 className="contactUsContent">CONTACT US</h3>
                    <p className="contactUsContent">
                      <Icon name="phone"></Icon> 91210991 <br/>
                      <Icon name="envelope outline"></Icon> vantage@gmail.com
                    </p>
                  </Grid.Column>
                  <Grid.Column computer={8} tablet={8} mobile={16}>
                    <div className="contactUsForm">
                      <Form onSubmit={this.handleFormSubmit}>
                          <Form.Input
                            fluid
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleFormChange}
                          />
                          <Form.Input
                            fluid
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleFormChange}
                          />
                          <Form.TextArea
                            fluid
                            placeholder="Message"
                            name="message"
                            value={this.state.message}
                            onChange={this.handleFormChange}
                            rows={6}
                          />
                          <button className="formSubmitButton">Send</button>
                      </Form>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                </Grid>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LandingPage;
