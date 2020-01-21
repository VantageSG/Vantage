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
import FormActionButtons from "../FormActionButtons"
import { Animated } from "react-animated-css";

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

  nextStepWApiReq = () => {
    this.props.nextStep()
    console.log("Sending back end: ")
    console.log(this.state.workExperiences)
    //Call post backend api /api/v1/education...
  }


  render() {
    return (
      <Card centered fluid>
        {
          this.state.workExperiences.map((workExperience, index)=>{
            return(
              <Segment>
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
