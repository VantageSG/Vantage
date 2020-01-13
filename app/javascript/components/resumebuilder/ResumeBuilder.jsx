import React, { Component, Fragment } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Placeholder
} from "semantic-ui-react";
import Stepper from './Stepper';

export default class ResumeBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFixed: false,
      overlayFixed: false
    };
  }

  stickOverlay = () => this.setState({ overlayFixed: true });

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickOverlay = () => this.setState({ overlayFixed: false });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed } = this.state;

    return (
      <div>
        <Container text style={{ marginTop: "5vh" }}>
          <Header as="h1">Resume builder resources</Header>
        </Container>
        <Container text style={{ marginTop: "2em" }}>
          <Header as="h1">Sticky Example</Header>
          <p>
            This example shows how to use lazy loaded images, a sticky menu, and
            a simple text container
          </p>
        </Container>

        
    
     
        <Container text style={{ minHeight: "200vh" }}>
          <Stepper/>
          <Placeholder fluid>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Line length="full" />
            <Placeholder.Line length="very long" />
            <Placeholder.Line length="long" />
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="short" />
            <Placeholder.Line length="very short" />
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Container>
        <Visibility
          offset={80}
          once={false}
          onTopPassed={this.stickOverlay}
          onTopVisible={this.unStickOverlay}
        ></Visibility>
      </div>
    );
  }
}
