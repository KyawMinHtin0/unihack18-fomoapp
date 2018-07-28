import React, { Component } from "react";
import glamorous, { Div } from "glamorous";
import { Text } from "./Text";
import { COLORS } from "../Utils/Constants";
import { CSSTransition } from "react-transition-group";

// const firebase = require("firebase");
// // Required for side-effects
// // require("firebase/firestore");
// // var config = {
// //   apiKey: "AIzaSyAnlBdqeCk9h3Ny0MkpCbWbGU1bAliO_Ak",
// //   authDomain: "fomo-app-unihack.firebaseapp.com",
// //   databaseURL: "https://fomo-app-unihack.firebaseio.com",
// //   projectId: "fomo-app-unihack",
// //   storageBucket: "fomo-app-unihack.appspot.com",
// //   messagingSenderId: "921653242032"
// // };
// // firebase.initializeApp(config);
// // var db = firebase.firestore();

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
      show: false
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.setState({ show: true });
  }

  componentDidUpdate() {}

  // componentDidMount() {
  //   db.collection("Melbourne4-chat")
  //     .doc("locations")
  //     .collection(this.props.name)
  //     .doc("chat")
  //     .onSnapshot(
  //       function(doc) {
  //         console.log("Current data: ", doc.data());
  //         let messageArray = [];
  //         let data = doc.data();
  //         for (const message in data) {
  //           messageArray.push({
  //             user: message.split("|")[0],
  //             text: data[message]["message"],
  //             time: data[message]["time"]
  //           });
  //         }
  //         messageArray.sort(function(a, b) {
  //           return a.time - b.time;
  //         });
  //         this.setState({ messages: messageArray });
  //       }.bind(this)
  //     );
  //   this.scrollToBottom();
  // }

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
    const Message = this.renderMessage({
      time: 0,
      id: 0,
      user: "haz",
      text: "Hello!"
    });

    return Message;
  }
}
