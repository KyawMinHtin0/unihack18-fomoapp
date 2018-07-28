import React, { Component } from "react";
import glamorous, { Div } from "glamorous";
import { Text } from "./Text";
import { COLORS } from "../Utils/Constants";
import Heart from "../Images/heartbutton.png";
import Send from "../Images/airplane.png";
const uuidv4 = require('uuid/v4');
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
  width: "150px",
  borderColor: COLORS.NAVY,
  borderRadius: "5px",
  borderWidth: "2px",
  fontFamily: "'Josefin Sans', sans-serif",
  fontSize: "12pt",
  fontColor: "black",
  alignSelf: "flex-end",
  ":focus": {
    outlineWidth: 0
  }
});

const ButtonContainer = glamorous.div({
  display: "flex",
  height: "auto",
  width: "50px",
  maxHeight: "50px",
  maxWidth: "50px",
  ":hover": {
    transform: "scale(1.1)"
  }
});

export default class ChatControls extends Component {
  constructor(props){
    super(props);
    this.user = `unihack-${uuidv4().split("-")[0]}`;
    this.state = {
      message: ""
    }
  }

  onSend = () => {
    console.log(this.user, this.state.message)
    var chatRef = db.collection("Melbourne4-chat").doc("locations").collection("ACMI").doc("chat");
    // Set the "capital" field of the city 'DC'
    let timestamp = Math.round((new Date()).getTime() / 1000)
    return chatRef.update({
        [`${this.user}|${timestamp}`]: {
          "message": this.state.message,
          "time": timestamp
        }
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }

  render() {
    return (
      <MessageInputContainer>
        <MessageInputBox value={this.state.message} onChange={(event) => this.setState({message:event.target.value})}/>
        <ButtonContainer onClick={this.onSend}>
          <img
            src={Send}
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
        </ButtonContainer>
        <ButtonContainer>
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
