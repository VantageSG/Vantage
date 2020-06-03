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

export default class SingleSegmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      mainQuestions: [],
      dynamicQuestions: [],
      segmentData: {},
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
          const responseData = camelcaseKeysDeep(
            response.data[this.props.segmentName]
          );
          this.setState({
          });
          if (responseData != null && responseData != undefined) {
            this.setState({
              segmentData: responseData
            });

            if (
              (responseData[this.props.concatQn.name] != null &&
                responseData[this.props.concatQn.name] &&
                undefined) ||
              responseData[this.props.concatQn.name].length > 0
            ) {
              if (this.state.dynamicQuestions.length > 1) {
                this.setState({
                  mainQuestions: [
                    ...this.state.mainQuestions,
                    this.props.concatQn
                  ],
                  dynamicQuestions: []
                });
              }
            }
          }
        })
        .catch(error => {
          console.log(error.response);
        })
        .then(() => {
          this.setState({
            isLoading: false,
            dataLoaded: true
          });
        });
    }
  }

  componentDidUpdate() {
    this.getSegmentData();
  }

  componentDidMount() {
    this.setState(
      {
        segmentData: {
          ...this.state.dasegmentDatata,
          ...this.props.mainAttribute
        },
        mainQuestions: this.props.mainQuestions,
        dynamicQuestions: this.props.dynamicQuestions
      },
      () => {
        this.getSegmentData();
      }
    );
  }

  concatDynamicAnswer = () => {
    let concatDynamicAnswer = "";

    this.state.dynamicAnswers.map(answer => {
      concatDynamicAnswer += answer + " ";
    });

    return concatDynamicAnswer;
  };

  getCompleteSegmentData() {
    let concatDynamicAnswer = this.concatDynamicAnswer();
    if (concatDynamicAnswer.length > 0) {
      return decamelizeKeysDeep(concatDynamicAnswer);
    } else {
      return decamelizeKeysDeep(
        this.state.segmentData[this.props.concatQn.name]
      );
    }
  }

  stepApiReq = callback => {
    const segmentData = this.state.segmentData;
    segmentData[this.props.concatQn.name] = this.getCompleteSegmentData();
    this.setState(
      {
        isLoading: true
      },
      () => {
        postForm(
          this.props.segmentName,
          segmentData,
          this.context.user.id,
          callback
        ).then(status => {
          if (status == 200) {
            callback();
          } else {
            this.setState({
              isLoading: false,
              segmentCount: 1,
              aboutQnStep: 0
            });
          }
        });
      }
    );
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
    if (this.state.aboutQnStep < this.state.mainQuestions.length) {
      return this.state.mainQuestions[this.state.aboutQnStep];
    } else {
      return this.state.dynamicQuestions[
        this.state.aboutQnStep - this.state.mainQuestions.length
      ];
    }
  };

  onMainQuestionChange = (name, value) => {
    this.setState({
      segmentData: {
        ...this.state.segmentData,
        [name]: value
      }
    });
  };

  onDynamicQuestionChange = (name, value) => {
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
      aboutQnStep: index + this.state.mainQuestions.length
    });
  };

  render() {
    const segmentValues = this.state.segmentData;
    return this.state.isLoading ? (
      <LoadingSpinner></LoadingSpinner>
    ) : (
      <>
        {this.state.aboutQnStep <
          this.state.mainQuestions.length +
            this.state.dynamicQuestions.length && (
          <Card 
          style={{
            minWidth: 400
          }}
          
          centered fluid>
            {this.state.aboutQnStep < this.state.mainQuestions.length && (
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
                  maxStep={
                    this.state.mainQuestions.length +
                    this.state.dynamicQuestions.length
                  }
                  qnStep={this.state.aboutQnStep}
                  nextFn={this.nextAboutQn}
                  prevFn={this.prevAboutQn}
                />
              </>
            )}
            {this.state.aboutQnStep >= this.state.mainQuestions.length &&
              this.state.aboutQnStep <
                this.state.mainQuestions.length +
                  this.state.dynamicQuestions.length && (
                <>
                  <Question
                    label={this.getCurrQn().label}
                    type={this.getCurrQn().type}
                    name={
                      this.state.aboutQnStep - this.state.mainQuestions.length
                    }
                    validator={this.getCurrQn().validator}
                    onChange={this.onDynamicQuestionChange}
                    value={
                      this.state.dynamicAnswers[
                        this.state.aboutQnStep - this.state.mainQuestions.length
                      ] || ""
                    }
                    placeholder={this.getCurrQn().placeholder}
                  />

                  <QuestionActionButton
                    maxStep={
                      this.state.mainQuestions.length +
                      this.state.dynamicQuestions.length
                    }
                    qnStep={this.state.aboutQnStep}
                    nextFn={this.nextAboutQn}
                    prevFn={this.prevAboutQn}
                  />
                </>
              )}
          </Card>
        )}

        {this.state.aboutQnStep ==
          this.state.mainQuestions.length +
            this.state.dynamicQuestions.length && (
          <Segment textAlign="center">
            <h1> {this.props.segmentLabel} Summary </h1>
            {this.state.mainQuestions.map((question, index) => {
              const label = question.label;
              const name = question.name;
              const segmentData = this.state.segmentData;
              const answer = segmentData[name];

              return (
                <Card
                  centered
                  key={index}
                  onClick={() => this.onClickMainQn(index)}
                >
                  <Card.Content>
                    <Card.Header>{label}</Card.Header>
                    <Card.Description>{answer}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })}

            {this.state.dynamicQuestions.map((question, index) => {
              return (
                <Card
                  key={index}
                  centered
                  onClick={() => this.onClickDynamicQn(index)}
                >
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
