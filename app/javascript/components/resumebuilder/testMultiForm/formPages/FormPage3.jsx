import React, { Component } from "react";
import { Form, Segment, Button, Container, Header, TextArea } from "semantic-ui-react";

export default class FormPage3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question3: ""
    };
  }
  render() {
 
    return (
      <div>
        <Form>
        <Header as='h3'>Is Eugene the most handsome engineer</Header>
          <TextArea
            placeholder="Tell us more"
            name="question3"
            value={this.props.question3}
            onChange={this.props.handleChange}
          />
        </Form>
      </div>
    );
  }
}
