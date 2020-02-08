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
  TextArea,
  Loader,
  Dimmer
} from "semantic-ui-react";
import axios from "axios";
import UserContext from '../../../../contexts/UserContext'
import FormActionButtons from "../frontEndUtil/FormActionButtons";
import { Animated } from "react-animated-css";
import { postForm, getEndPoint } from "./formApi";
import { isEmpty } from "../../../util/Props";
import LoadingSpinner from "../../../util/LoadingSpinner";
import camelcaseKeysDeep from "camelcase-keys-deep";
import decamelizeKeysDeep from "decamelize-keys-deep";

const aboutSchema = {
  name: "",
  email: "",
  contactNumber: "",
  aboutMe: ""
};
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      about: aboutSchema,
      isLoading: false
    };
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      about: {
        ...this.state.about,
        [name]: value
      }
    });
  };

  getDbAbout() {

    if (!this.state.dataLoaded && this.context.isLoggedIn) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true });
      }
      axios
        .get(getEndPoint("about", this.context.user.id), {
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.about);
          this.setState({ 
            isLoading: false
          });
          if (responseData != null || responseData != undefined ) {
            this.setState({
              about: responseData
            });
          }
        })
        .catch(error => {
          console.log(error.response);
        }).then(()=>{
          this.setState({
            dataLoaded: true
          })
        }
        );
    }
  }

  componentDidUpdate() {
    this.getDbAbout();
  
  }

  componentDidMount() {
    this.getDbAbout();
  }
 
  

  nextStepWApiReq = () => {
    let about = decamelizeKeysDeep(this.state.about);
    postForm("about", about, this.context.user.id, this.props.nextStep);  
  };

  render() {
    const aboutValues = this.state.about;
    return this.state.isLoading ? (
     <LoadingSpinner></LoadingSpinner>
    ) : (
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
                <Header
                  as="h4"
                  style={{ display: "inline-block", paddingRight: "0.5em" }}
                >
                  Describe yourself
                </Header>
                <Popup
                  content="Tell us about your what you like to do for fun and 
                  any interesting things you notice about the world around you"
                  trigger={<Icon name="question circle" />}
                />
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

About.contextType = UserContext;
