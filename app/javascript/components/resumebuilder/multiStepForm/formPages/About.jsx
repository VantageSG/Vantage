import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Card,
  Grid,
  Modal,
  Header,
  Icon,
  Image,
  Popup,
  TextArea
} from "semantic-ui-react";
import axios from "axios";
import FormActionButtons from "../frontEndUtil/FormActionButtons"
import { Animated } from "react-animated-css";
import {postForm, getEndPoint, sanitizeResponse} from "./formApi"
import { isEmpty } from "../../../util/Props"
import camelcaseKeysDeep from 'camelcase-keys-deep';
import decamelizeKeysDeep from 'decamelize-keys-deep';

const aboutSchema = {
  name: "",
  email: "",
  contactNumber: "",
  aboutMe: ""
}
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: aboutSchema,
      user: {}
    };
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      about: {
        ...this.state.about,
        [name]: value,
      }
    });
  }

  getDbAbout() {
    console.log(this.props.user);
 
    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      axios
        .get(getEndPoint('about', this.props.user.id), { 
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.about);
          this.setState({user: this.props.user,})
          this.setState({
            about: sanitizeResponse(responseData, ["resumeId"]),
          })
        })
        .catch(error => {
          console.log(error);
          console.log("user error")
        })
    }
  }

  componentDidUpdate() {
    //this.getDbAbout();
  }

  componentDidMount() {
    this.getDbAbout();
  }

  nextStepWApiReq = () => {
    console.log(this.state.user);
    let about = decamelizeKeysDeep(this.state.about);
    postForm('about', 
    about, 
    this.state.user.id)
    this.props.nextStep()
  
  }

  render() {
    const aboutValues = this.state.about
    return (
      <div>
        <Card centered fluid>
          <Segment>
            <Animated animationIn={"fadeInDown"} animationOut="fadeOutUp">
              <Header as="h3">Introduce yourself</Header>
              <Form>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  label="Name"
                  placeholder="Name"
                  name="name"
                  value={aboutValues.name}
                  onChange={this.handleFormChange}
                />
                
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  label="Email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={aboutValues.email}
                  onChange={this.handleFormChange}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Contact Number (number only and optional)"
                  label="Contact Number"
                  name="contactNumber"
                  type="number"
                  value={aboutValues.contactNumber}
                  onChange={this.handleFormChange}
                />
              <Header as="h4" style={{display:"inline-block", paddingRight:"0.5em"}}>
                  Describe yourself</Header>
              <Popup content="Tell us about your what you like to do for fun and 
                  any interesting things you notice about the world around you"
                  trigger={<Icon name="question circle" />} />
                <TextArea
                  placeholder="About Me"
                  name="aboutMe"
                  value={aboutValues.aboutMe}
                  onChange={this.handleFormChange}
                />
              </Form>
            </Animated>
          </Segment>
          <Card.Content extra>
            <FormActionButtons
              submitAndContinue={this.props.submitAndContinue}
              step={this.props.step}
              maxStep={this.props.maxStep}
              nextStep={this.nextStepWApiReq}
              previousStep={this.props.previousStep}
            />
          </Card.Content> 
        </Card>
      </div>
    );
  }
}
