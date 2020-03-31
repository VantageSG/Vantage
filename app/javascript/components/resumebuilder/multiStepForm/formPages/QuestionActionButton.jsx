import React, { Component } from "react";
import {
  
  Button,
  
  Modal,
 
  Loader,
} from "semantic-ui-react";

const QuestionActionButton = props => {
  return (
    <div className="ui two buttons">
    {
      props.qnStep > 0 &&
      <>
      <Button
        color="red"
        onClick={props.prevFn}
        content="previous"
      ></Button>


      <Button.Or />
      </>
    }


      {props.qnStep < props.maxStep - 1 ? <Button color="green" onClick={props.nextFn} content="next"></Button> : <Button color="green" onClick={props.nextFn} content="View current section summary"></Button> }

    </div>
  );
};

export default QuestionActionButton;