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

const interestSchema = {
  interestName: ""
}

export default class Interests extends Component {
  constructor(props) {
    super(props);
    var cloneInterestSchema = Object.assign({}, interestSchema)
    this.state = {
      interests: [cloneInterestSchema]
    };
    
  }

  handleFormChange(event,index) {
    const { name, value } = event.target;
    const { interests } = this.state
    interests[index][name] = value;
    this.setState({
      interests
    });
  }

  handleAddForm = () => {
    var cloneInterestSchema = Object.assign({}, interestSchema)
    this.setState({interests:[...this.state.interests, cloneInterestSchema]})
  }

  handleRemoveForm(index) {
    this.state.interests.splice(index, 1)
    this.setState({interests: this.state.interests})
  }

  nextStepWApiReq = () => {
    this.props.nextStep()
    console.log("Sending back end: ")
    console.log(this.state.interests)
    //Call post backend api /api/v1/education...
  }


  render() {

    return (
      <Card centered fluid>
        {
          this.state.interests.map((interest, index)=>{
            return(
              <Segment key={index}>
                <Animated animationIn="fadeInUp" animationOut="fadeOutDown">
                  {
                    this.state.interests.length > 1 &&
                    <Button
                      icon="x"
                      floated="right"
                      onClick={()=>this.handleRemoveForm(index)}
                    />
                  }
                  <Header as="h3">What are some interests you have?</Header>
                  <Form>
                    <Form.Input
                      fluid
                      placeholder="Enter Interest"
                      label="Interest"
                      name="interestName"
                      value={interest.interestsName}
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
