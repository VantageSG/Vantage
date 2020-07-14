import React, { Component } from "react";
import "semantic-ui-css/semantic.css"; //Import the css only once in your project
import {
  Form,
  Segment,
  Card,
  Header,
  Icon,
  Popup,
  TextArea,
  Input,
  Label,
  FormButton,
  Button
} from "semantic-ui-react";
import QuestionActionButton from "./QuestionActionButton";
let recognition = null;

if (process.env.NODE_ENV == "test" || !("webkitSpeechRecognition" in window)) {
} else {
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
}

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      listening: false
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  toggleListen() {
    this.setState(
      {
        listening: !this.state.listening
      },
      this.handleListen
    );
  }

  componentWillUnmount() {
    if (process.env.NODE_ENV == "test" || !("webkitSpeechRecognition" in window)) {
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click");
      };
    }
    
  }

  handleListen() {
    console.log("listening?", this.state.listening);

    if (this.state.listening) {
      recognition.start();
      recognition.onend = () => {
        console.log("...continue listening...");
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click");
      };
    }

    recognition.onstart = () => {
      console.log("Listening!");
    };

    let finalTranscript = "";
    recognition.onresult = event => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        else interimTranscript += transcript;
      }

      this.props.onChange(this.props.name, interimTranscript);
      this.props.onChange(this.props.name, finalTranscript);
      //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(" ");
      const stopCmd = transcriptArr.slice(-3, -1);
      console.log("stopCmd", stopCmd);

      if (stopCmd[0] === "stop" && stopCmd[1] === "listening") {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per command");
          const finalText = transcriptArr.slice(0, -3).join(" ");
          document.getElementById("final").innerHTML = finalText;
        };
      }
    };

    //-----------------------------------------------------------------------

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error);
    };
  }

  onTypingChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.props.onChange(name, value);
  };

  renderMicroPhoneColor = () => {
    if (this.state.listening) {
      return "green";
    } else {
      return "grey";
    }
  };

  render() {
    return (
      <React.Fragment>
        <Segment>
          <Form>
            <Form.Group>
              <Form.Field icon="microphone" width={12}>
                <label>{this.props.label}</label>

                <Input
                  name={this.props.name}
                  placeholder={this.props.placeholder}
                  value={this.props.value}
                  onChange={this.onTypingChange}
                />
                {!("webkitSpeechRecognition" in window) && (
                  <label>
                    Open in Google Chrome Desktop to use text to speech function
                  </label>
                )}
              </Form.Field>
              {"webkitSpeechRecognition" in window && (
                <Form.Field>
                  <>
                    <label>Use Voice to Text</label>
                    <Button
                      color={this.renderMicroPhoneColor()}
                      onClick={this.toggleListen}
                    >
                      <Icon name="microphone"></Icon>
                    </Button>
                  </>
                </Form.Field>
              )}
            </Form.Group>
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}
