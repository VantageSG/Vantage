import UserContext from '../../../../contexts/UserContext'
import React, { Component } from "react";
import {
  Form,
  Segment,
  Card,
  Header,
  Icon,
  Popup,
  TextArea,
} from "semantic-ui-react";
import axios from "axios";
import FormActionButtons from "../frontEndUtil/FormActionButtons";
import { Animated } from "react-animated-css";
import { postForm, getEndPoint } from "./formApi";
import LoadingSpinner from "../../../util/LoadingSpinner";
import camelcaseKeysDeep from "camelcase-keys-deep";
import decamelizeKeysDeep from "decamelize-keys-deep";

const aboutSchemaWQns = {
  name: "",
  email: "",
  contactNumber: "",
  aboutMe1: "",
  aboutMe2: "",
  aboutMe3: "",
  aboutMe4: ""
};

// Create new object with only 1 aboutMe field
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
      about: aboutSchemaWQns,
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

  populateAboutState =() => {
    let aboutMe = "";

    // Populate newAbout and concatenate aboutMe1 to aboutMe4
    Object.entries(this.state.about).map(([name, value]) => {
      if (name.includes("aboutMe")) {
        aboutMe += value + " ";
      } else {
        aboutSchema[name] = value;
      }
    })

    // Populate aboutSchema with concatenated aboutMe
    aboutSchema.aboutMe = aboutMe;
    return decamelizeKeysDeep(aboutSchema);
  }

  stepApiReq = (callback) => {
    let about = this.populateAboutState();
    postForm("about", about, this.context.user.id, callback);  
  };


  renderAboutMeQns = (aboutValues) => {
    return ( 
      <React.Fragment>
        <Header as="h4">
          How would you describe your personality in a few words?
        </Header>
        <TextArea
          placeholder=""
          name="aboutMe1"
          value={aboutValues.aboutMe1}
          onChange={this.handleFormChange}
        />
        <Header as="h4">
          What’s the most important thing you would
            want the recruiter to know about you?
        </Header>
        <TextArea
          placeholder=""
          name="aboutMe2"
          value={aboutValues.aboutMe2}
          onChange={this.handleFormChange}
        />
        <Header as="h4">
          What are you doing now and what 
            is it that you want to achieve with the opportunity?
        </Header>
        <TextArea
          placeholder=""
          name="aboutMe3"
          value={aboutValues.aboutMe3}
          onChange={this.handleFormChange}
        />
        <Header as="h4">
          How can you help the employer achieve their goals?
        </Header>
        <TextArea
          placeholder=""
          name="aboutMe4"
          value={aboutValues.aboutMe4}
          onChange={this.handleFormChange}
        />
      </React.Fragment>
    )
  }

  renderAboutMePara = (aboutValues) => {
    return (
      <TextArea
        placeholder="About Me"
        name="aboutMe"
        value={aboutValues.aboutMe}
        onChange={this.handleFormChange}
      />
    )
  }

  render() {
    const aboutValues = this.state.about;
    
    return this.state.isLoading ? (
     <LoadingSpinner>
     </LoadingSpinner>
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
                  as="h3"
                  style={{ display: "inline-block", paddingRight: "0.5em" }}
                >
                  Describe yourself
                </Header>
                <Popup
                  content="Tell us about your what you like to do for fun and 
                  any interesting things you notice about the world around you"
                  trigger={<Icon name="question circle" />}
                />
                {
                  aboutValues != undefined && aboutValues.aboutMe != null && aboutValues != ""?
                  this.renderAboutMePara(aboutValues) : this.renderAboutMeQns(aboutValues)
                }
              </Form>
            </Animated>
          </Segment>
          <Card.Content extra>
            <FormActionButtons
              step={this.props.step}
              maxStep={this.props.maxStep}
              nextStep={() => this.stepApiReq(this.props.nextStep)}
              previousStep={() => this.stepApiReq(this.props.previousStep)}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

About.contextType = UserContext;
