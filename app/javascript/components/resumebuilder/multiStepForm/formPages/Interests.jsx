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

const interestSchema = {
  name: ""
}

export default class Interests extends Component {
  constructor(props) {
    super(props);
    var cloneInterestSchema = Object.assign({}, interestSchema)
    this.state = {
      interests: [cloneInterestSchema],
      user: {},
      isLoading: false,
      dataLoaded: false
    };
    
  }


  getInterests() {
    if (!this.state.dataLoaded && this.context.isLoggedIn) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true });
      }
      axios
        .get(getEndPoint('interests', this.context.user.id), { 
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.interests);
          this.setState({
            user: this.context.user,
            isLoading: false
          })
          if (responseData.length != 0) {
            this.setState({
              interests: responseData,
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
    this.getInterests();
  }

  componentDidMount() {
    this.getInterests();
  }

  nextStepWApiReq = () => {
    let interests = decamelizeKeysDeep(this.state.interests);
    postForm('interests', 
    interests, 
    this.context.user.id, this.props.nextStep);
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

    return this.state.isLoading ? (
      <LoadingSpinner></LoadingSpinner>
      ) : (
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

Interests.contextType = UserContext;
