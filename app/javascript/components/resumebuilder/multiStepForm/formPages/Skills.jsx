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
import { isEmpty } from "../../../util/Props"
import camelcaseKeysDeep from 'camelcase-keys-deep';
import LoadingSpinner from "../../../util/LoadingSpinner";
import decamelizeKeysDeep from 'decamelize-keys-deep';

const skillSchema = {
  name: "",
  description: "",
  link: "",
}

export default class Skills extends Component {
  constructor(props) {
    super(props);
    var cloneSkillSchema = Object.assign({}, skillSchema)
    this.state = {
      skills: [cloneSkillSchema],
      user: {},
      isLoading: false
    };
  }

  getSkills() {
    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true });
      }
      axios
        .get(getEndPoint('skills', this.props.user.id), { 
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.skills);
          this.setState({
            user: this.props.user,
            isLoading: false
          })
          if (responseData.length != 0) {
            this.setState({
              skills: responseData,
            })
          }
          
          console.log(this.state);
          
        })
        .catch(error => {
        })
        
    }
  }

  componentDidUpdate() {
    this.getSkills();
  }

  componentDidMount() {
    this.getSkills();
  }

  nextStepWApiReq = () => {
    let skills = decamelizeKeysDeep(this.state.skills);
    postForm('skills', 
    skills, 
    this.state.user.id, this.props.nextStep());
  }


  handleFormChange(event, index) {
    const { name, value } = event.target;
    const { skills } = this.state;
    skills[index][name] = value;
    this.setState({
      skills
    });
  }

  handleAddForm = () => {
    var cloneSkillSchema = Object.assign({}, skillSchema)
    this.setState({skills:[...this.state.skills, cloneSkillSchema]})
  }

  handleRemoveForm(index) {
    this.state.skills.splice(index, 1)
    this.setState({skills: this.state.skills})
  }

  render() {
    return this.state.isLoading ? (
      <LoadingSpinner></LoadingSpinner>
      ) : (
      <Card centered fluid>
        {
          this.state.skills.map((skills, index)=>{
            return(
              <Segment key={index}>
                <Animated animationIn="fadeInRight" animationOut="fadeOutDown">
                  {
                    this.state.skills.length > 1 &&
                    <Button
                      icon="x"
                      floated="right"
                      onClick={()=>this.handleRemoveForm(index)}
                    />
                  }
                  <Header as="h3">What are some skills you have?</Header>
                  <Form>
                    <Form.Input
                      fluid
                      placeholder="Enter skill"
                      label="Skill"
                      name="name"
                      value={skills.name}
                      onChange={(event) => this.handleFormChange(event, index)}
                      />
                    <Header as="h4" style={{display:"inline-block", paddingRight:"0.5em"}}>
                      Describe your skill</Header>
                    <Popup content="Tell us how you picked up the skill and
                      what you love about being able to do this! 
                      [e.g. Volunteering experience/language proficiency/certifications/hobby]"
                      trigger={<Icon name="question circle" />} />
                    <TextArea
                      placeholder="Describe it"
                      name="description"
                      value={skills.description}
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
