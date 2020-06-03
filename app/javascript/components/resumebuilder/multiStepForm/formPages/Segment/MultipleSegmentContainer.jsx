import UserContext from "../../../../../contexts/UserContext";
import React, { Component } from "react";
import {
  Form,
  Segment,
  Card,
  Header,
  Icon,
  Popup,
  TextArea,
  Button
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

export default class MultipleSegmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      mainQuestions: [],
      dynamicQuestions: [],
      segmentCount: 1,
      dataLoaded: false,
      segmentData: [],
      aboutQnStep: 0,
      dynamicAnswers: [],
      isLoading: false
    };
  }
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
            isLoading: false
          });
          if (
            responseData != null &&
            responseData != undefined &&
            responseData.length > 0
          ) {
            this.setState({
              segmentData: responseData
            });
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

  updateConcatQn() {
    var currSegmentData;
    if (this.state.segmentData.length > 0) {
      currSegmentData = this.state.segmentData[this.state.segmentCount - 1];
    }
    if (
      currSegmentData != undefined &&
      this.props.concatQn.name in currSegmentData &&
      currSegmentData[this.props.concatQn.name].length > 0 &&
      this.state.dynamicQuestions.length > 0
    ) {
      this.setState({
        mainQuestions: [...this.state.mainQuestions, this.props.concatQn],
        dynamicQuestions: []
      });
    } else if (
      (currSegmentData == undefined ||
        (this.props.concatQn.name in currSegmentData &&
          currSegmentData[this.props.concatQn.name].length == 0)) &&
      this.state.dynamicQuestions.length != this.props.dynamicQuestions.length
    ) {
      this.setState({
        mainQuestions: this.props.mainQuestions,
        dynamicQuestions: this.props.dynamicQuestions
      });
    }
  }

  componentDidUpdate() {
    this.updateConcatQn();
    this.getSegmentData();
  }

  componentDidMount() {
    this.setState(
      {
        mainQuestions: this.props.mainQuestions,
        dynamicQuestions: this.props.dynamicQuestions,
        segmentData: [...this.state.segmentData, this.props.mainAttribute]
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
    const concatDynamicAnswer = this.concatDynamicAnswer();
    if (concatDynamicAnswer.length > 0) {
      let currSegmentData = this.state.segmentData;
      currSegmentData[this.state.segmentCount - 1][
        this.props.concatQn.name
      ] = concatDynamicAnswer;
      return decamelizeKeysDeep(currSegmentData);
    } else {
      return decamelizeKeysDeep(this.state.segmentData);
    }
  }

  stepApiReq = callback => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        postForm(
          this.props.segmentName,
          this.getCompleteSegmentData(),
          this.context.user.id,
          callback
        ).then(status => {
          if (status == 200) {
            this.setState({
              isLoading: false
            });
            callback();
          } else {
            this.setState({
              isLoading: false,
              isComplete: false,
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
    const currSegmentData = this.state.segmentData;
    currSegmentData[this.state.segmentCount - 1] = {
      ...currSegmentData[this.state.segmentCount - 1],
      [name]: value
    };
    this.setState({
      segmentData: currSegmentData
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
      isComplete: false,
      aboutQnStep: index
    });
  };

  addAnotherSegment = () => {
    this.getSegmentData();
    this.setState(
      {
        segmentCount: this.state.segmentCount + 1,
        aboutQnStep: 0,
        dynamicAnswers: []
      },
      () => {
        if (this.state.segmentCount > this.state.segmentData.length) {
          this.setState({
            segmentData: [...this.state.segmentData, this.props.mainAttribute]
          });
        }
      }
    );
  };

  addAnotherSegment = () => {
    this.getSegmentData();
    this.setState(
      {
        segmentCount: this.state.segmentCount + 1,
        aboutQnStep: 0,
        dynamicAnswers: []
      },
      () => {
        if (this.state.segmentCount > this.state.segmentData.length) {
          this.setState({
            segmentData: [...this.state.segmentData, this.props.mainAttribute]
          });
        }
      }
    );
  };

  prevSegment = () => {
    this.getSegmentData();
    if (this.state.segmentCount > 1) {
      this.setState({
        segmentCount: this.state.segmentCount - 1,
        aboutQnStep: 0,
        dynamicAnswers: []
      });
    }
  };

  confirmAllSegment = () => {
    this.setState({
      isComplete: true
    });
  };

  unConfirmAllSegment = () => {
    this.setState({
      isComplete: false
    });
  };

  onClickDynamicQn = index => {
    this.setState({
      isComplete: false,
      aboutQnStep: index + this.state.mainQuestions.length
    });
  };

  render() {
    var segmentValues;
    if (this.state.segmentData.length > 0) {
      segmentValues = this.state.segmentData[this.state.segmentCount - 1];
    }

    return this.state.isLoading || segmentValues == undefined ? (
      <LoadingSpinner></LoadingSpinner>
    ) : (
      <>
        {this.state.aboutQnStep <
          this.state.mainQuestions.length +
            this.state.dynamicQuestions.length && (
          <Card centered fluid style={{
            minWidth: 400
          }}>
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
            <h1>
              {this.state.segmentCount} . {this.props.segmentLabel} Summary{" "}
            </h1>
            {this.state.mainQuestions.map((question, index) => {
              const label = question.label;
              const name = question.name;
              const segmentData = this.state.segmentData[
                this.state.segmentCount - 1
              ];
              const answer = segmentData[name];

              return (
                <Card
                  centered
                  key={index}
                  onClick={() => this.onClickMainQn(index)}
                  style={{
                    minWidth: 400
                  }}
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
            {this.state.isComplete ? (
              <FormActionButtons
                previousStep={this.props.previousStep}
                maxStep={this.props.maxStep}
                step={this.props.step}
                nextStep={() => this.stepApiReq(this.props.nextStep)}
              />
            ) : (
              <Button.Group>
                {this.state.segmentCount > 1 && (
                  <>
                    <Button
                      color="red"
                      onClick={this.prevSegment}
                      content={"Previous " + this.props.segmentLabel}
                    ></Button>
                    <Button.Or />
                  </>
                )}

                <Button
                  color="blue"
                  onClick={() => this.stepApiReq(this.addAnotherSegment)}
                  content={
                    this.state.segmentCount < this.state.segmentData.length
                      ? "Next " + this.props.segmentLabel
                      : " Add " + this.props.segmentLabel
                  }
                ></Button>

                <Button.Or />

                <Button
                  color="green"
                  onClick={this.confirmAllSegment}
                  content={"Confirm all " + this.props.segmentLabel}
                ></Button>
              </Button.Group>
            )}
          </Segment>
        )}
      </>
    );
  }
}

MultipleSegmentContainer.contextType = UserContext;
