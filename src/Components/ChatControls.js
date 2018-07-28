import React, { Component } from "react";
import glamorous, { Div } from "glamorous";
import { Text } from "./Text";
import { COLORS } from "../Utils/Constants";
import Heart from "../Images/heartbutton.png";
import Send from "../Images/airplane.png";

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
  render() {
    return (
      <MessageInputContainer>
        <MessageInputBox />
        <ButtonContainer>
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
