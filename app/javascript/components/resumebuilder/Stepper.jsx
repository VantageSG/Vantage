import React from 'react';

import Stepper, { Step } from "react-material-stepper";
import Step1 from "./Step1";

const StepperExample = () => (
  <Stepper>
    <Step
      stepId="1"
      data="Step 1 initial state"
      title="Step One"
      description="This step is optional"
    >
      <Step1 vertical={true} />
    </Step>
    
  
  </Stepper>
);

export default StepperExample;