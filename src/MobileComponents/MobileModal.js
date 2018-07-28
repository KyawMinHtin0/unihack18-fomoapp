import React, { Component } from "react";
import glamorous, { Div } from "glamorous";
import { COLORS } from "../Utils/Constants";
import { Data } from "../Utils/LocationV1";
import ChatBox from "../Components/ChatBox";
import ChatControls from "../Components/ChatControls";

const Cover = glamorous.div(
  {
    display: "flex",
    height: "150px",
    width: "auto",
    backgroundImage: `linear-gradient(to bottom, ${COLORS.NAVY}20, ${
      COLORS.NAVY
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center "
  },
  props => {
    const imgUrl = props.imgUrl;
    return {
      backgroundImage: `linear-gradient(to bottom, ${COLORS.NAVY}20, ${
        COLORS.NAVY
      }), url(${imgUrl})`
    };
  }
);

const CoverTitle = glamorous.div({
  color: "white",
  fontSize: "28pt",
  fontWeight: "600",

  display: "flex",
  alignSelf: "flex-end",
  padding: "20px"
});

export default class MobileModal extends Component {
  getDescription = () => {
    return "Bigsound is not just a music festival, it’s an ideas conference where local and international experts gather to talk about developments, ideas and opportunities in the music industry";
  };

  getLocation = () => {
    return Data[this.props.match.params.number];
  };

  getName = () => {
    const location = this.getLocation();
    return location.meta_data.name;
  };

  getImageUrl = () => {
    const location = this.getLocation();
    const { activeLocationId } = this.props;
    if (activeLocationId === 0) return location.insta10[1].url;
    else return location.insta10[0].url;
  };

  render() {
    const { show, activeLocationId } = this.props;
    const imgUrl = this.getImageUrl();
    const name = this.getName();

    return (
      <div>
        <Cover imgUrl={imgUrl}>
          <CoverTitle>{name}</CoverTitle>
        </Cover>
        <ChatBox />
        <ChatControls />
        Empty {this.props.match.params.number}
      </div>
    );
  }
}
