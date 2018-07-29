import React, { Component } from "react";
import glamorous, { Div } from "glamorous";
import { Text } from "./Text";
import { COLORS } from "../Utils/Constants";
import Heart from "../Images/heartbutton.png";
import Send from "../Images/airplane.png";
const uuidv4 = require("uuid/v4");
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var db = firebase.firestore();

const MessageInputContainer = glamorous.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});

const MessageInputBox = glamorous.input({
  display: "flex",
  height: "25px",
  padding: "5px",
  width: "200px",
  borderColor: COLORS.NAVY,
  borderRadius: "5px",
  borderWidth: "2px",
  fontFamily: "'Josefin Sans', sans-serif",
  fontSize: "12pt",
  fontColor: "black",
  alignSelf: "flex-end",
  flexgrow: "1",

  ":focus": {
    outlineWidth: 0
  }
});

const ButtonContainer = glamorous.div({
  display: "flex",
  height: "auto",
  width: "40px",
  maxHeight: "40px",
  maxWidth: "40px",
  ":hover": {
    transform: "scale(1.1)"
  }
});

export default class ChatControls extends Component {
  constructor(props) {
    super(props);
    this.user = `unihack-${uuidv4().split("-")[0]}`;
    this.state = {
      message: ""
    };
  }

  onSend = () => {
    if (!this.state.message) return null;
    console.log(this.user, this.state.message);
    var chatRef = db
      .collection("Melbourne4-chat")
      .doc("locations")
      .collection(this.props.name)
      .doc("chat");
    // Set the "capital" field of the city 'DC'
    let timestamp = Math.round(new Date().getTime() / 1000);
    this.setState({ message: "" });

    return chatRef
      .update({
        [`${this.user}|${timestamp}`]: {
          message: this.state.message,
          time: timestamp
        }
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  onHeart = () => {
    console.log(this.user, this.state.message);
    var chatRef = db
      .collection("Melbourne4-chat")
      .doc("locations")
      .collection(this.props.name)
      .doc("chat");
    // Set the "capital" field of the city 'DC'
    let timestamp = Math.round(new Date().getTime() / 1000);
    return chatRef
      .update({
        [`${this.user}|${timestamp}`]: {
          message: "♥️",
          time: timestamp
        }
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  keyPress = e => {
    if (e.keyCode == 13) {
      console.log("value", e.target.value);
      // put the login here
      this.onSend(e);
      this.setState({ message: "" });
    }
  };

  render() {
    return (
      <MessageInputContainer>
        <MessageInputBox
          value={this.state.message}
          onChange={event => this.setState({ message: event.target.value })}
          onKeyDown={this.keyPress}
        />
        <ButtonContainer onClick={this.onSend}>
          <img
            src={Send}
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
        </ButtonContainer>
        <ButtonContainer onClick={this.onHeart}>
          <img
            src={Heart}
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
        </ButtonContainer>
      </MessageInputContainer>
    );
  }
}
