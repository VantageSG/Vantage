import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Container,
  Card,
  Modal,
  Header,
  Image
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
          onClick={props.submitAndContinue}
          content="Confirm and Submit"
        ></ModalConfirm>
      ) : (
        <Button color="orange" onClick={props.nextStep} content="next"></Button>
      )}
    </div>
  );
};

const ModalConfirm = props => {
  console.log(props);
  return (
    <Modal
      trigger={
        <Button
          color="green"
          onClick={props.submitAndContinue}
          content="Confirm and Submit"
        ></Button>
      }
      centered={false}
    >
      <Modal.Header>Please Confirm your details!</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
        />
        <Modal.Description>
          <Header>The following are your details!</Header>

          <p>Is it okay?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default FormActionButtons;