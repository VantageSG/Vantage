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
import {postForm, getEndPoint, sanitizeResponse} from "./formApi"
import { isEmpty } from "../../../util/Props"
import camelcaseKeysDeep from 'camelcase-keys-deep';
import decamelizeKeysDeep from 'decamelize-keys-deep';

const workExperienceSchema = {
  title: "",
  company: "",
  start: "",
  end: "",
  achievements: "",
}

export default class WorkExperience extends Component {
  constructor(props) {
    super(props);
    var cloneWorkExperienceSchema = Object.assign({}, workExperienceSchema)
    this.state = {
      workExperiences: [cloneWorkExperienceSchema]
    };
  }

  getWorkExperiences() {
    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      axios
        .get(getEndPoint('workExperiences', this.props.user.id), { 
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.workExperiences);
          for(var j = 0; j < 1; j++) {
            for (var i = 0; i < 1; i++) {
              delete responseData[j].referees[i].createdAt
              delete responseData[j].referees[i].updatedAt
              delete responseData[j].referees[i].workExperienceId
              delete responseData[j].referees[i].id
            }
          }
          console.log(response);
          this.setState({
            user: this.props.user,
            workExperiences: sanitizeResponse(responseData, ["resumeId"]),
          })          
        })
        .catch(error => {
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
    console.log(this.state.workExperiences);
    this.props.nextStep()
    let workExperiences = decamelizeKeysDeep(this.state.workExperiences);
    postForm('workExperiences', 
    workExperiences, 
    this.state.user.id)
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
    return (
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
                        value={workExperience.start}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                      <Form.Input
                        fluid
                        icon="calendar"
                        iconPosition="left"
                        label="End date"
                        placeholder="End date"
                        name="end"
                        value={workExperience.end}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                    </Form.Group>
                    <Header as="h4">Achievements</Header>
                    <TextArea
                      placeholder="Achievements"
                      name="achievements"
                      value={workExperience.achievements}
                      onChange={this.handleFormChange}
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
            submitAndContinue={this.props.submitAndContinue}
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
