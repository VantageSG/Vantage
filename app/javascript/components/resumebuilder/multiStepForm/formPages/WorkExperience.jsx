import UserContext from '../../../../contexts/UserContext'
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
import { isEmpty } from "../../../util/Props"
import camelcaseKeysDeep from 'camelcase-keys-deep';
import decamelizeKeysDeep from 'decamelize-keys-deep';

const workExperienceSchemaWQns = {
  title: "",
  company: "",
  start: "",
  end: "",
  achievements1: "",
  achievements2:"",
  referees: [],
};

// Create object with only 1 achievement field
const workExperienceSchema = {
  title: "",
  company: "",
  start: "",
  end: "",
  achievements: "",
  referees: [],
};

export default class WorkExperience extends Component {
  constructor(props) {
    super(props);
    var cloneWorkExperienceSchema = Object.assign({}, workExperienceSchemaWQns)
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

  populateEducationState =() => {
    let achievements = "";

    // Populate newWorkExperiences and concatenate achievements1 to 2
    Object.entries(this.state.workExperiences[0]).map(([name, value]) => {
      if (name.includes("achievements")) {
        achievements += value + " ";
      } else {
        workExperienceSchema[name] = value;
      }
    })

    // Populate workExperienceSchema with concatenated achievements
    workExperienceSchema.achievements = achievements;

    return decamelizeKeysDeep([Object.assign({}, workExperienceSchema)]);
  }

  stepApiReq = (callback) => {
    let workExperiences = this.populateEducationState();
    postForm('workExperiences', 
    workExperiences, 
    this.context.user.id, 
    callback)
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

  renderAchievementsQns = (workExperience, index) => {
    return(
      <React.Fragment>
         <Header as="h4">
            Briefly share key issues you faced and how you overcame this challenge.
          </Header>
          <TextArea
            placeholder=""
            name="achievements1"
            value={workExperience.achievements1}
            onChange={(event) => this.handleFormChange(event, index)}
          />
          <Header as="h4">
            Were there any significant outcomes of your experience?
          </Header>
          <TextArea
            placeholder=""
            name="achievements2"
            value={workExperience.achievements2}
            onChange={(event) => this.handleFormChange(event, index)}
          />
      </React.Fragment>
    )
  }

  renderAchievementsPara = (workExperience, index) => {
    return (
      <React.Fragment>
        <TextArea
          placeholder="Achievements"
          name="achievements"
          value={workExperience.achievements}
          onChange={(event) => this.handleFormChange(event, index)}
        />
      </React.Fragment>
    )
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
                        placeholder="Start Date"
                        name="start"
                        value={workExperience.start.toString()}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                      <Form.Input
                        fluid
                        icon="calendar"
                        iconPosition="left"
                        label="End Date"
                        placeholder="End Date"
                        name="end"
                        value={workExperience.end.toString()}
                        onChange={(event) => this.handleFormChange(event, index)}
                      />
                    </Form.Group>
                    <Header as="h3" style={{display:"inline-block", paddingRight:"0.5em"}}>
                      Achievements</Header>
                    <Popup content="It's better to start with verbs! e.g. Decreased cost 
                    expenditure by 65% through elimination of low priority projects."
                      trigger={<Icon name="question circle" />} />
                    {
                      workExperience != undefined && workExperience.achievements != null && workExperience.achievements != "" ?
                      this.renderAchievementsPara(workExperience, index) : this.renderAchievementsQns(workExperience, index)
                    }
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

WorkExperience.contextType = UserContext