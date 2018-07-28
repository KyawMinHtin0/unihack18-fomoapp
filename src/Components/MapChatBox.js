import React, { Component } from "react";
import glamorous, { Div } from "glamorous";
import { Text } from "./Text";
import { COLORS } from "../Utils/Constants";
import { CSSTransition } from "react-transition-group";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var db = firebase.firestore();

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
  ":hover": {
    transform: "scale(1.02)"
  },
  transition: "opacity 300ms ease-in-out",
  opacity: 1,
  ".fade-enter": {
    opacity: 0
  },
  ".fade-enter-active": {
    opacity: 1
  },
  ".fade-exit": {
    opacity: 1
  },
  ".fade-exit-active": {
    opacity: 0
  }
});

export default class MapChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      show: false,
      first: true
    };
  }

  componentDidMount() {
    db.collection("Melbourne4-chat")
      .doc("locations")
      .collection(this.props.name)
      .doc("chat")
      .onSnapshot(
        function(doc) {
          console.log("Current data: ", doc.data());
          let messageArray = [];
          let data = doc.data();
          for (const message in data) {
            messageArray.push({
              user: message.split("|")[0],
              text: data[message]["message"],
              time: data[message]["time"]
            });
          }
          messageArray.sort(function(a, b) {
            return a.time - b.time;
          });
          setTimeout(this.flipShow, 1000);
          this.state.first ?
            this.setState({first: false, show: false, messages: [messageArray[messageArray.length-1]] }) :
            this.setState({show: false, messages: [messageArray[messageArray.length-1]] });
        }.bind(this)
      );
  }

  flipShow = () => {
    this.setState({show: false})
  }

  getMessages = () => {
    return this.state.messages;
  };

  renderMessage = message => {
    console.log(message);
    const { show } = this.state;
    return (
      <CSSTransition in={show} timeout={500} classNames="fade" unmountOnExit>
        <MessageContainer
          key={`${message.time}`}
          id={`${this.props.name}`}
          onClick={() => this.setState({ show: !show })}
        >
          <Text type="MESSAGE">
            <span>
              <b>{message.user}:</b> {message.text}
            </span>
          </Text>
        </MessageContainer>
      </CSSTransition>
    );
  };

  render() {
    const messagelist = this.getMessages();

    const Message = messagelist.map(item => this.renderMessage(item));

    return Message;
  }
}
