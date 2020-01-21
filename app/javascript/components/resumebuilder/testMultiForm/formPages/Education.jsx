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

export default class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educations: [{
        program: "",
        institution: "",
        startEdu: "",
        endEdu: "",
        grade: "",
      }]
    }
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
    this.setState({educations:[...this.state.educations, {
      program: "",
      institution: "",
      startEdu: "",
      endEdu: "",
      grade: "",
    }]})
  }

  handleRemoveForm(index) {
    this.state.educations.splice(index, 1)
    this.setState({educations: this.state.educations})
  }

  nextStepWApiReq = () => {
    this.props.nextStep()
    //Call post backend api /api/v1/education...
  }
  



  render() {
    console.log(this.state.educations)
    return (
      <Card centered fluid>
        {
          this.state.educations.map((education, index)=>{
            return (
              <Segment key={index}>
                <Animated animationIn="fadeInRight" animationOut="fadeOutRight">
                  <Button
                    icon="x"
                    floated="right"
                    onClick={()=>this.handleRemoveForm(index)}
                  />
                  <Header as="h3">Where did u study?</Header>
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
                        name="startEdu"
                        value={education.startEdu}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                      <Form.Input
                        fluid
                        icon="calendar"
                        iconPosition="left"
                        placeholder="End date"
                        label="End date"
                        name="endEdu"
                        value={education.endEdu}
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
