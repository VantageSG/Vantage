import UserContext from "../../../../../contexts/UserContext";
import React, { Component } from "react";
import {
  Form,
  Segment,
  Card,
  Header,
  Icon,
  Popup,
  TextArea
} from "semantic-ui-react";
import Question from "../Question";
import axios from "axios";
import FormActionButtons from "../../frontEndUtil/FormActionButtons";
import { Animated } from "react-animated-css";
import { postForm, getEndPoint } from "../formApi";
import LoadingSpinner from "../../../../util/LoadingSpinner";
import camelcaseKeysDeep from "camelcase-keys-deep";
import decamelizeKeysDeep from "decamelize-keys-deep";
import QuestionActionButton from "../QuestionActionButton";
import { tsCallSignatureDeclaration } from "@babel/types";

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

var mainQuestions = [
  {
    label: "Name",
    type: "text",
    name: "name",
    placeholder: "Enter your name here."
  },
  {
    label: "Email",
    type: "text",
    name: "email",
    placeholder: "Enter your email here."
  },
  {
    label: "Contact Number",
    type: "text",
    name: "contactNumber",
    placeholder: "Enter your Contact number here."
  }
];

const concatQn = {
  label: "Describe Yourself",
  type: "text",
  name: "aboutMe",
  placeholder: "Describe yourself in a few words"
}

var dynamicQuestions = [
  {
    label: "How would you describe your personality in a few words?",
    type: "text",
    placeholder: "I am a hard worker who takes pride in my work."
  },
  {
    label: "What are you most passionate about?",
    type: "text",
    placeholder: "I am passionate about social media."
  },
  {
    label: "What drives you?",
    type: "text",
    placeholder: "I like to make people happy.."
  },
  {
    label: "What makes you different from other candidates?",
    type: "text",
    placeholder: "I am willing to go the extra mile to get job done."
  }
];

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      about: {
        name: "",
        email: "",
        contactNumber: "",
        aboutMe: "",
        concatAnswer: ""
      },
      aboutQnStep: 0,
      dynamicAnswers: [],
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
          if (responseData != null && responseData != undefined) {
            this.setState({
              about: responseData
            });

            if (responseData[concatQn.name] != null && responseData[concatQn.name] && undefined || responseData[concatQn.name].length > 0  ) {
              this.setState({
                concatAnswer: responseData[concatQn.name]
              })
              if (dynamicQuestions.length>1) {
                mainQuestions.push(concatQn)
                dynamicQuestions=[]
              }
            }
          }
        })
        .catch(error => {
          console.log(error.response);
        })
        .then(() => {
          this.setState({
            dataLoaded: true
          });
        });
    }
  }

  componentDidUpdate() {
    this.getDbAbout();
  }

  componentDidMount() {
    this.getDbAbout();
  }

  concatDynamicAnswer = () => {
    let aboutMe = "";

    this.state.dynamicAnswers.map(answer => {
      aboutMe += answer + " ";
    });

    return aboutMe

  };

  getCompleteAbout() {

    let aboutMe = this.concatDynamicAnswer()
    if (aboutMe.length > 0) {
      this.setState({
        about: {
          ...this.state.about,
          aboutMe: aboutMe
        }
      }, 
      () => {
        return decamelizeKeysDeep(this.state.about)
      });
    }
    
    return decamelizeKeysDeep(this.state.about);
  }

  stepApiReq = callback => {
    postForm("about", this.getCompleteAbout(), this.context.user.id, callback);
  };

  // New

  nextAboutQn = () => {
    this.setState({
      aboutQnStep: this.state.aboutQnStep + 1
    });
  };

  prevAboutQn = () => {
    this.setState({
      aboutQnStep: this.state.aboutQnStep - 1
    });
  };

  getCurrQn = () => {
    if (this.state.aboutQnStep < mainQuestions.length) {
      return mainQuestions[this.state.aboutQnStep];
    } else {
      return dynamicQuestions[this.state.aboutQnStep - mainQuestions.length];
    }
  };

  submitSegment = () => {
    postForm(
      "about",
      decamelizeKeysDeep(this.state.about),
      this.context.user.id
    );
  };

  onMainQuestionChange = e => {
    const { name, value } = e.target;
    this.setState({
      about: {
        ...this.state.about,
        [name]: value
      }
    });
  };

  onDynamicQuestionChange = e => {
    const { name, value } = e.target;
    let currDynamicAnswers = [...this.state.dynamicAnswers];
    currDynamicAnswers[name] = value;
    this.setState({
      dynamicAnswers: currDynamicAnswers
    });
  };

  onClickMainQn = index => {
    this.setState({
      aboutQnStep: index
    });
  };

  onClickDynamicQn = index => {
    this.setState({
      aboutQnStep: index + mainQuestions.length
    });
  };

  render() {
    const aboutValues = this.state.about;
    return this.state.isLoading ? (
      <LoadingSpinner></LoadingSpinner>
    ) : (
      <>
        {this.state.aboutQnStep <
          mainQuestions.length + dynamicQuestions.length && (
          <Card centered fluid>
            {this.state.aboutQnStep < mainQuestions.length && (
              <>
                <Question
                  label={this.getCurrQn().label}
                  type={this.getCurrQn().type}
                  validator={this.getCurrQn().validator}
                  name={this.getCurrQn().name}
                  onChange={this.onMainQuestionChange}
                  value={aboutValues[this.getCurrQn().name] || ""}
                  placeholder={this.getCurrQn().placeholder}
                />
                <QuestionActionButton
                  maxStep={mainQuestions.length + dynamicQuestions.length}
                  qnStep={this.state.aboutQnStep}
                  nextFn={this.nextAboutQn}
                  prevFn={this.prevAboutQn}
                />
              </>
            )}
            {this.state.aboutQnStep >= mainQuestions.length &&
              this.state.aboutQnStep <
                mainQuestions.length + dynamicQuestions.length && (
                <>
                  <Question
                    label={this.getCurrQn().label}
                    type={this.getCurrQn().type}
                    name={this.state.aboutQnStep - mainQuestions.length}
                    validator={this.getCurrQn().validator}
                    onChange={this.onDynamicQuestionChange}
                    value={
                      this.state.dynamicAnswers[
                        this.state.aboutQnStep - mainQuestions.length
                      ] || ""
                    }
                    placeholder={this.getCurrQn().placeholder}
                  />

                  <QuestionActionButton
                    maxStep={mainQuestions.length + dynamicQuestions.length}
                    qnStep={this.state.aboutQnStep}
                    nextFn={this.nextAboutQn}
                    prevFn={this.prevAboutQn}
                  />
                </>
              )}
          </Card>
        )}

        {this.state.aboutQnStep ==
          mainQuestions.length + dynamicQuestions.length && (
          <Segment
          textAlign="center"
          >
            <h1> About Summary </h1>
            {mainQuestions.map((question, index) => {
              const label = question.label;
              const name = question.name;
              const about = this.state.about;
              const answer = about[name];

              return (
                <Card centered key={index} onClick={() => this.onClickMainQn(index)}>
                  <Card.Content>
                    <Card.Header>{label}</Card.Header>
                    <Card.Description>{answer}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })}

            {dynamicQuestions.map((question, index) => {
              return (
                <Card key={index} centered onClick={() => this.onClickDynamicQn(index)}>
                  <Card.Content>
                    <Card.Header>{question.label}</Card.Header>
                    <Card.Description>
                      {this.state.dynamicAnswers[index]}
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
            <FormActionButtons
              previousStep={this.prevAboutQn}
              maxStep={this.props.maxStep}
              step={this.props.step}
              nextStep={() => this.stepApiReq(this.props.nextStep)}
            />
          </Segment>
        )}
      </>
    );
  }
}

About.contextType = UserContext;
