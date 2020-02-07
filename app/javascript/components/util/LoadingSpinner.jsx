import React, { Component } from "react";
import { Container, Grid, Loader } from "semantic-ui-react";

const LoadingSpinner = () => {
  return (
    <React.Fragment>
      <Container style={{ marginTop: "5vh", marginBottom: "5vh" }}>
        <Grid
          centered
          verticalAlign="middle"
          columns={1}
          style={{ minHeight: "50vh" }}
        >
          <Grid.Row>
            <Grid.Column>
              <Loader active inline="centered" size="huge">
                Loading
              </Loader>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default LoadingSpinner;
