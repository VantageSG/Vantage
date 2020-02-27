import UserContext from '../../../../contexts/UserContext'
import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Card,
  Modal,
  Header,
  Image,
  TextArea
} from "semantic-ui-react";
import FormActionButtons from "../frontEndUtil/FormActionButtons"
import { Animated } from "react-animated-css";
import axios from "axios";
import {postForm, getEndPoint} from "./formApi"
import LoadingSpinner from "../../../util/LoadingSpinner";
import { isEmpty } from "../../../util/Props"
import camelcaseKeysDeep from 'camelcase-keys-deep';
import decamelizeKeysDeep from 'decamelize-keys-deep';

const educationSchema = {
  program: "",
  institution: "",
  start: "",
  end: "",
  grade: "",
}

export default class Education extends Component {
  constructor(props) {
    super(props);
    var cloneEducationSchema = Object.assign({}, educationSchema)
    this.state = {
      educations: [cloneEducationSchema],
      user: {},
      dataLoaded: false,
      isLoading: false
    }
  }

  getEducations() {
    if (!this.state.dataLoaded && this.context.isLoggedIn) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true });
      }
      axios
        .get(getEndPoint('educations', this.context.user.id), { 
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.educations);
          this.setState({
            user: this.context.user,
            isLoading: false
          })
          if (responseData.length!=0) {
            this.setState({
              educations: responseData
            })
          }
        })
        .catch(error => {
        }).then(()=>{
          this.setState({
            dataLoaded: true
          })
        })
    }
  }

  componentDidUpdate() {
    this.getEducations();
  }

  componentDidMount() {
    this.getEducations();
  }

  stepApiReq = (callback) => {
    let educations = decamelizeKeysDeep(this.state.educations);
    postForm('educations', 
    educations, 
    this.context.user.id, callback);
  }

  handleFormChange(event, index){
    const { name, value } = event.target
    const { educations } = this.state;
    educations[index][name] = value;
    this.setState({
      educations
    });
  }

  handleAddForm = () => {
    var cloneEducationSchema = Object.assign({}, educationSchema)
    this.setState({educations:[...this.state.educations, cloneEducationSchema]})
  }

  handleRemoveForm(index) {
    this.state.educations.splice(index, 1)
    this.setState({educations: this.state.educations})
  }
  
  render() {
    return this.state.isLoading ? (
      <LoadingSpinner></LoadingSpinner>
     ) : (
      <Card centered fluid>
        {
          this.state.educations.map((education, index)=>{
            return (
              <Segment key={index}>
                <Animated animationIn="fadeInRight" animationOut="fadeOutRight">
                  {
                    this.state.educations.length > 1 &&
                    <Button
                      icon="x"
                      floated="right"
                      onClick={()=>this.handleRemoveForm(index)}
                    />
                  }
                  <Header as="h3">Where did you study?</Header>
                  <Form>
                    <Form.Input
                      fluid
                      icon="address card"
                      iconPosition="left"
                      label="Institution Name"
                      placeholder="Institution Name"
                      name="institution"
                      value={education.institution}
                      onChange={(event) => this.handleFormChange(event, index)}
                    />
                    <Form.Input
                      fluid
                      icon="book"
                      iconPosition="left"
                      label="Program"
                      placeholder="Program"
                      name="program"
                      value={education.program}
                      onChange={(event) => this.handleFormChange(event, index)}
                    />
                    <Form.Group widths="equal">
                      {" "}
                      <Form.Input
                        fluid
                        icon="calendar"
                        iconPosition="left"
                        label="Start date"
                        placeholder="Start date"
                        name="start"
                        value={education.start}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                      <Form.Input
                        fluid
                        icon="calendar"
                        iconPosition="left"
                        placeholder="End date"
                        label="End date"
                        name="end"
                        value={education.end}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                    </Form.Group>
                  </Form>
                </Animated>
              </Segment>
            )
          })
        }
        <Segment>
          <Button
          icon="add"
          onClick={this.handleAddForm}
          />
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
    );
  }
}

Education.contextType = UserContext;