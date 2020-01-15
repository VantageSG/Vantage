import React,{Component} from 'react';
import {
  StepperAction,
  StepperContent,
  StepperContext
} from "react-material-stepper";


const Step1 = (vertical) => {

  const {resolve, getData } = React.useContext(StepperContext);
  const data = getData("step-one");

  const onSubmit = (event) => {
    event.preventDefault();
    resolve("step1 resolved data");
  }
  


  return (
    <StepperContent
      onSubmit={onSubmit}
      actions={
        <React.Fragment>
          {!vertical && <StepperAction disabled={true}>Back</StepperAction>}
          {!vertical && (
            <StepperAction align="right" type="reset" disabled={true}>
              Reset
            </StepperAction>
          )}
          <StepperAction align={vertical ? "left" : "right"} type="submit">
            Continue
          </StepperAction>
        </React.Fragment>
      }
    >
      Step1 resolved:
      <pre>{data}</pre>
    </StepperContent>
  );
}

export default Step1;