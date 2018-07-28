import React, { Component } from "react";
import glamorous, { Div } from "glamorous";
import { Text } from "./Text";
import { COLORS } from "../Utils/Constants";

const messages = [
  {
    user: "Jon",
    text: "Hi I love this place!"
  },
  {
    user: "Tom",
    text: "Hey whats up!"
  },
  {
    user: "Jane",
    text: "Best food in the CBD!"
  },
  {
    user: "Jane",
    text: "Best food in the CBD!"
  },
  {
    user: "Jane",
    text: "Best food in the CBD!"
  }
];

const ChatBoxContainer = glamorous.div({
  display: "flex",
  flex: 1,
  width: "fit-content",
  flexDirection: "column",
  height: "150px",
  overflow: "auto"
});

const MessageContainer = glamorous.div({
  display: "flex",
  borderRadius: "100px",
  backgroundColor: COLORS.BLUE,
  padding: "5px 10px",
  minHeight: "20px",
  width: "fit-content",
  marginBottom: "10px",
  transition: "0.2s",
  ":hover": {
    transform: "scale(1.02)"
  }
});

export default class ChatBox extends Component {
  getMessages = () => {
    return messages;
  };

  renderMessage = message => {
    console.log(message);
    return (
      <MessageContainer>
        <Text type="MESSAGE">
          <span>
            <b>{message.user}:</b> {message.text}
          </span>
        </Text>
      </MessageContainer>
    );
  };

  render() {
    const messagelist = this.getMessages();

    const Messages = messagelist.map(item => this.renderMessage(item));

    return <ChatBoxContainer>{Messages} </ChatBoxContainer>;
  }
}
