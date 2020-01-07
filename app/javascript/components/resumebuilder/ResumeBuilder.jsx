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
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu borderless fixed={menuFixed ? "top" : undefined}>
            <Container text>
              <Menu.Item header>Project Name</Menu.Item>
              <Menu.Item as="a">Blog</Menu.Item>
              <Menu.Item as="a">Articles</Menu.Item>

              <Menu.Menu position="right">
                <Dropdown text="Dropdown" pointing className="link item">
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Header Item</Dropdown.Header>
                    <Dropdown.Item>
                      <i className="dropdown icon" />
                      <span className="text">Submenu</span>
                      <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
        <Container text style={{ minHeight: "200vh" }}>
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
