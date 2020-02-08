import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Card,
  Icon,
  Modal,
  Header,
  Popup,
  Image,
  TextArea
} from "semantic-ui-react";
import FormActionButtons from "../frontEndUtil/FormActionButtons"
import { Animated } from "react-animated-css";
import axios from "axios";
import {postForm, getEndPoint} from "./formApi"
import LoadingSpinner from "../../../util/LoadingSpinner";
import UserContext from '../../../../contexts/UserContext'
import { isEmpty } from "../../../util/Props"
import camelcaseKeysDeep from 'camelcase-keys-deep';
import decamelizeKeysDeep from 'decamelize-keys-deep';

const workExperienceSchema = {
  title: "",
  company: "",
  start: "",
  end: "",
  achievements: "",
  referees: [],
}

export default class WorkExperience extends Component {
  constructor(props) {
    super(props);
    var cloneWorkExperienceSchema = Object.assign({}, workExperienceSchema)
    this.state = {
      workExperiences: [cloneWorkExperienceSchema],
      user: {},
      isLoading: false,
      dataLoaded: false,
    };
  }

  getWorkExperiences() {
    if (isEmpty(this.state.user) && !isEmpty(this.context.user)) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true });
      }
      axios
        .get(getEndPoint('workExperiences', this.context.user.id), { 
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.workExperiences);
          this.setState({
            user: this.context.user,
            isLoading: false
          })        
          if (responseData.length != 0) {
            this.setState({
              workExperiences: responseData,
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
    this.getWorkExperiences();
  }

  componentDidMount() {
    this.getWorkExperiences();
  }

  nextStepWApiReq = () => {
    let workExperiences = decamelizeKeysDeep(this.state.workExperiences);
    postForm('workExperiences', 
    workExperiences, 
    this.context.user.id, 
    this.props.nextStep)
  }

  handleFormChange(event, index){
    const { name, value } = event.target;
    const { workExperiences } = this.state;
    workExperiences[index][name] = value;
    this.setState({
      workExperiences
    });
  }

  handleAddForm = () => {
    var cloneWorkExperienceSchema = Object.assign({}, workExperienceSchema)
    this.setState({workExperiences:[...this.state.workExperiences, cloneWorkExperienceSchema]})
  }

  handleRemoveForm(index) {
    this.state.workExperiences.splice(index, 1)
    this.setState({workExperiences: this.state.workExperiences})
  }

  render() {
    return this.state.isLoading ? (
      <LoadingSpinner></LoadingSpinner>
      ) : (
      <Card centered fluid>
        {
          this.state.workExperiences.map((workExperience, index)=>{
            return(
              <Segment key={index}>
                <Animated animationIn="fadeInLeft" animationOut="fadeOutDown">
                {
                    this.state.workExperiences.length > 1 &&
                    <Button
                      icon="x"
                      floated="right"
                      onClick={()=>this.handleRemoveForm(index)}
                    />
                  }
                  <Header as='h3'>Where have you worked before?</Header>
                    <Form>
                    <Form.Input
                      fluid
                      icon="address card"
                      label="Name of Position"
                      iconPosition="left"
                      placeholder="Name of Position"
                      name="title"
                      value={workExperience.title}
                      onChange={(event) => this.handleFormChange(event, index)}
                    />
                    <Form.Input
                      fluid
                      icon="book"
                      label="Company"
                      iconPosition="left"
                      placeholder="Company"
                      name="company"
                      value={workExperience.company}
                      onChange={(event) => this.handleFormChange(event, index)}
                    />
                    <Form.Group widths="equal">
                      {" "}
                      <Form.Input
                        fluid
                        icon="calendar"
                        label="Start Date"
                        iconPosition="left"
                        placeholder="Start date"
                        name="start"
                        value={workExperience.start.toString()}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                      <Form.Input
                        fluid
                        icon="calendar"
                        iconPosition="left"
                        label="End date"
                        placeholder="End date"
                        name="end"
                        value={workExperience.end.toString()}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                    </Form.Group>
                    <Header as="h4" style={{display:"inline-block", paddingRight:"0.5em"}}>
                      Achievements</Header>
                    <Popup content="Tell us about any challenges, big or small, that you faced
                      at work and how you overcomed them! Were there any tangible outcomes achieved?
                      [e.g. Decreased cost expenditure by 65% through elimination of low priority projects.]"
                      trigger={<Icon name="question circle" />} />
                    <TextArea
                      placeholder="Achievements"
                      name="achievements"
                      value={workExperience.achievements}
                      onChange={(event) => this.handleFormChange(event, index)}
                    />
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
            nextStep={this.nextStepWApiReq}
            previousStep={this.props.previousStep}
          />
        </Card.Content>
      </Card>
    );
  }
}

WorkExperience.contextType = UserContext