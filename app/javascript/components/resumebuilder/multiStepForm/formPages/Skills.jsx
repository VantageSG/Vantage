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
      user: {}
    };
  }

  getSkills() {
    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      axios
        .get(getEndPoint('skills', this.props.user.id), { 
          withCredentials: true
        })
        .then(response => {
          const responseData = camelcaseKeysDeep(response.data.skills);
          console.log(responseData);
          this.setState({
            user: this.props.user,
            skills: sanitizeResponse(responseData, ["resumeId"]),
          })
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
    this.props.nextStep()
    let skills = decamelizeKeysDeep(this.state.skills);
    postForm('skills', 
    skills, 
    this.state.user.id)
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
    return (
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
                    <Header as="h4">Describe your skill</Header>
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
