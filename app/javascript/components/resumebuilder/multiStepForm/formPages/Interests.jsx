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

const interestSchema = {
  name: ""
}

export default class Interests extends Component {
  constructor(props) {
    super(props);
    var cloneInterestSchema = Object.assign({}, interestSchema)
    this.state = {
      interests: [cloneInterestSchema],
      user: {}
    };
    
  }


  getInterests() {
    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      axios
        .get(getEndPoint('interests', this.props.user.id), { 
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.interests);
          console.log(responseData);
          this.setState({
            user: this.props.user,
            interests: sanitizeResponse(responseData, ["resumeId"]),
          })
          console.log(this.state);
          
        })
        .catch(error => {
        })
        
    }
  }

  componentDidUpdate() {
    this.getInterests();
  }

  componentDidMount() {
    this.getInterests();
  }

  nextStepWApiReq = () => {
    this.props.nextStep()
    let interests = decamelizeKeysDeep(this.state.interests);
    postForm('interests', 
    interests, 
    this.state.user.id)
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
                      name="name"
                      value={interest.name}
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
