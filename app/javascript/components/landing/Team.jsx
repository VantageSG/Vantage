// React Basic and Bootstrap
import React, { Component } from "react";
import {
  Grid,
  Image,
  Responsive,
  Form,
  Icon,
  GridRow,
  Card
} from "semantic-ui-react";
// import images
import klement from "../../../assets/images/team/Klement.jpg";
import eugene from "../../../assets/images/team/eugene.jpeg";
import anisha from "../../../assets/images/team/anisha.jpeg";
import peirong from "../../../assets/images/team/peirong.jpeg";
import sherman from "../../../assets/images/team/sherman.jpeg";

import johanna from "../../../assets/images/team/johanna.jpeg";
import amelia from "../../../assets/images/team/amelia.jpeg";
import colin from "../../../assets/images/team/colin.jpeg";
import rachel from "../../../assets/images/team/rachel.jpeg";

class PageTeam extends Component {
  render() {
    return (
      <Grid
      centered
      textAlign="center"
      
      >
        <Grid.Row centered

        >
          <Grid.Column computer={8} tablet={8} mobile={8} textAlign="center">
            <h1 className="landingMessage">OUR TEAM</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
        centered
        textAlign="center"
        columns={12}
        style={{
          margin:"auto"
        }}
        >
          <Grid.Column
          style={{
            margin:"auto"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={klement} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Klement Tan</Card.Header>
                <Card.Meta>
                  <span className="date">Project Head (Technology)</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column
          style={{
            margin: "auto",
            marginBottom: "1px"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={johanna} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Johanna Dy Juanco</Card.Header>
                <Card.Meta>
                  <span className="date">Project Head (Business)</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column
          style={{
            margin: "auto"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={eugene} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Eugene Teu</Card.Header>
                <Card.Meta>
                  <span className="date">Fullstack Software Engineer</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          
        </Grid.Row>
        <Grid.Row
        columns={12}
        >
          <Grid.Column
          style={{
            margin: "auto"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={anisha} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Anisha Joseph</Card.Header>
                <Card.Meta>
                  <span className="date">Fullstack Software Engineer</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column
          style={{
            margin: "auto",
            marginBottom: "1px"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={amelia} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Amelia Yamato Leow</Card.Header>
                <Card.Meta>
                  <span className="date">Partnerships Executive</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column
          style={{
            margin: "auto"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={peirong} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Peirong Wu</Card.Header>
                <Card.Meta>
                  <span className="date">Fullstack Software Engineer</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          
        </Grid.Row>
        <Grid.Row
        centered
        textAlign="center"
        columns={12}
        style={{
          margin:"auto"
        }}
        >
          <Grid.Column
          style={{
            margin: "auto"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={sherman} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Sherman Lim Jun Hong</Card.Header>
                <Card.Meta>
                  <span className="date">Fullstack Software Engineer</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column
          style={{
            margin: "auto"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={rachel} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Rachel Lo</Card.Header>
                <Card.Meta>
                  <span className="date">Partnerships Executive</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column
          style={{
            margin: "auto"
          }}
          computer={4} tablet={6} mobile={12} textAlign="center">
            <Card >
              <Image src={colin} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Ng Kwok Lun Colin</Card.Header>
                <Card.Meta>
                  <span className="date">UI/UX Designer</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        
      </Grid>
    );
  }
}
export default PageTeam;
