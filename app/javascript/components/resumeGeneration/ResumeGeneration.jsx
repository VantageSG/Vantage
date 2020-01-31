import React, { Component } from "react";
import {
  List,
  Segment,
  Button,
  Header,
  Container,
  Divider
} from "semantic-ui-react";
import { Animated } from "react-animated-css";
import {
  aboutSchema,
  educationSchema,
  interestSchema,
  skillSchema,
  workExperienceSchema
} from "../resumebuilder/multiStepForm/frontEndUtil/schema";
import axios from "axios";
import {getEndPoint, sanitizeResponse} from "../resumebuilder/multiStepForm/formPages/formApi"
import { isEmpty } from "../util/Props"
import camelcaseKeysDeep from 'camelcase-keys-deep';
export default class ResumeGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      about: aboutSchema,
      educations: [educationSchema, educationSchema],
      workExperiences: [workExperienceSchema, workExperienceSchema],
      interests: [interestSchema],
      skills: [skillSchema, skillSchema]
    };
  }

  componentDidMount(){
    this.getVrsAttributes()
  }

  componentDidUpdate() {
    this.getVrsAttributes()
  }

  getVrsAttributes() {
    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      this.setState({
        user: this.props.user,
      })
      axios.all([this.getAbout(), this.getEducations(), this.getWorkExperiences(), this.getSkills(), this.getInterests()])
      .then(axios.spread(function (acct, perms) {
        // Both requests are now complete
      }));

    }
  }

  getAbout() {
    return axios
    .get(getEndPoint('about', this.props.user.id), { 
      withCredentials: true
    })
    .then(response => {
      const responseData = camelcaseKeysDeep(response.data.about);
      this.setState({
        about: sanitizeResponse(responseData, ["resumeId"]),
      })
    })
    .catch(error => {
    })
  }

  getEducations() {
    return axios
    .get(getEndPoint('educations', this.props.user.id), { 
      withCredentials: true
    })
    .then(response => {
      const responseData = camelcaseKeysDeep(response.data.educations);
      this.setState({
        educations: sanitizeResponse(responseData, ["resumeId"]),
      })      
    })
    .catch(error => {
    })
  }

  getWorkExperiences() {
    return axios
    .get(getEndPoint('workExperiences', this.props.user.id), { 
      withCredentials: true
    })
    .then(response => {
      const responseData = camelcaseKeysDeep(response.data.workExperiences);
      this.setState({
        workExperiences: sanitizeResponse(responseData, ["resumeId"]),
      })          
    })
    .catch(error => {
    })
  }

  getSkills() {
    return axios
    .get(getEndPoint('skills', this.props.user.id), { 
      withCredentials: true
    })
    .then(response => {
      const responseData = camelcaseKeysDeep(response.data.skills);
      this.setState({
        skills: sanitizeResponse(responseData, ["resumeId"]),
      })      
    })
    .catch(error => {
    })
  }

  getInterests() {
    return axios
    .get(getEndPoint('interests', this.props.user.id), { 
      withCredentials: true
    })
    .then(response => {
      const responseData = camelcaseKeysDeep(response.data.interests);
      this.setState({
        interests: sanitizeResponse(responseData, ["resumeId"]),
      })      
    })
    .catch(error => {
    })
  }

  render() {
    // console.table(this.state);
    // console.table(this.state.education);
    const { about, educations, workExperiences, skills, interests } = this.state;

    return (
      <div>
       </div>
    );
  }
}
