import React, { Component } from 'react'
import 'semantic-ui-css/semantic.css'; //Import the css only once in your project
import {
  Form,
  Segment,
  Card,
  Header,
  Icon,
  Popup,
  TextArea,
} from "semantic-ui-react";
import QuestionActionButton from './QuestionActionButton'
export default class Question extends Component {

  render () {
    return (
      <React.Fragment>
        <Segment>
          <Form>
              <Form.Input
                fluid
                name={this.props.name}
                label={this.props.label}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
              />
            </Form>
        </Segment>
      </React.Fragment>     
    )}
}