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

export default class SingleSegmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      segmentData: {
        concatAnswer: ""
      },
      aboutQnStep: 0,
      dynamicAnswers: [],
      isLoading: true
    };
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      segmentData: {
        ...this.state.segmentData,
        [name]: value
      }
    });
  };

  getSegmentData() {
    if (!this.state.dataLoaded && this.context.isLoggedIn) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true });
      }
      axios
        .get(getEndPoint(this.props.segmentName, this.context.user.id), {
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data[this.props.segmentName]);
          this.setState({
            isLoading: false
          });
          if (responseData != null && responseData != undefined) {
            this.setState({
              segmentData: responseData
            });

            if (responseData[concatQn.name] != null && responseData[concatQn.name] && undefined || responseData[concatQn.name].length > 0  ) {
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
    this.getSegmentData();
  }

  componentDidMount() {
    this.setState({
      segmentData: {
        ...this.state.dasegmentDatata,
        ...this.props.mainAttribute
      }
    }, () => {
      this.getSegmentData();
    })
    
  }

  concatDynamicAnswer = () => {
    let concatDynamicAnswer = "";

    this.state.dynamicAnswers.map(answer => {
      concatDynamicAnswer += answer + " ";
    });

    return concatDynamicAnswer

  };

  getCompleteSegmentData() {

    let concatDynamicAnswer = this.concatDynamicAnswer()
    if (concatDynamicAnswer.length > 0) {
      this.setState({
        segmentData: {
          ...this.state.segmentData,
          [concatQn.name]: concatDynamicAnswer
        }
      }, 
      () => {
        console.log(this.state)
        return decamelizeKeysDeep(this.state.segmentData)
      });
    }
    
    return decamelizeKeysDeep(this.state.segmentData);
  }

  stepApiReq = callback => {
    postForm(this.props.segmentName, this.getCompleteSegmentData(), this.context.user.id, callback);
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

  onMainQuestionChange = e => {
    const { name, value } = e.target;
    this.setState({
      segmentData: {
        ...this.state.segmentData,
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
    const segmentValues = this.state.segmentData;
    console.log(this.state)
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
                  value={segmentValues[this.getCurrQn().name] || ""}
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
            <h1> {this.props.segmentName} Summary </h1>
            {mainQuestions.map((question, index) => {
              const label = question.label;
              const name = question.name;
              const segmentData = this.state.segmentData;
              const answer = segmentData[name];

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

SingleSegmentContainer.contextType = UserContext;
