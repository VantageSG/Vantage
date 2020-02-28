import React, { Component } from "react";
import {
  
  Button,
  
  Modal,
 
  Loader,
} from "semantic-ui-react";

const FormActionButtons = props => {
  return (
    <div className="ui two buttons">
      <Button
        color="red"
        onClick={props.previousStep}
        content="previous"
      ></Button>
      <Button.Or />

      {props.step === props.maxStep ? (
        <ModalConfirm
          props={props}
          color="green"
          onClick={props.nextStep}
          content="Confirm and Submit"
        ></ModalConfirm>
      ) : (
        <Button color="green" onClick={props.nextStep} content="next"></Button>
      )}
    </div>
  );
};

const ModalConfirm = props => {
  return (
    <Modal
      trigger={
        <Button
          color={props.color}
          onClick={props.submitAndContinue}
          content={props.content}
        ></Button>
      }
      centered={false}
    >
      <Modal.Header>We are submitting your resume..</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        <Loader indeterminate>Preparing</Loader>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default FormActionButtons;