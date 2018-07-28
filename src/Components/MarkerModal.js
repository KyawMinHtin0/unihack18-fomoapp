import React, { Component } from "react";
import glamorous from "glamorous";
import { MODAL_HEIGHT, MODAL_WIDTH, COLORS } from "../Utils/Constants";
import CoverImage from "../Images/crowd.jpeg";
import BadgeImage from "../Images/badge.png";

const ModalContainer = glamorous.div({
  display: "flex",
  backgroundColor: "GhostWhite"
});

const ModalVerticalContainer = glamorous.div({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "GhostWhite "
});

const Modal = glamorous.div(
  {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px lightgrey",
    margin: "25px 0px 0 25px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  props => {
    const height = props.height;
    const width = props.width;

    return {
      height: height,
      width: width
    };
  }
);

const Cover = glamorous.div({
  display: "flex",
  height: "150px",
  width: "300px",
  backgroundImage: `linear-gradient(to bottom, ${COLORS.NAVY}20, ${
    COLORS.NAVY
  }), url(${CoverImage})`,
  backgroundSize: "cover"
});

const CoverTitle = glamorous.div({
  color: "white",
  fontSize: "28pt",
  display: "flex",
  alignSelf: "flex-end",
  padding: "20px"
});

const Description = glamorous.div({
  color: "grey",
  fontSize: "12pt",
  display: "flex",
  padding: "50px"
});

const AllBadgesContainer = glamorous.div({
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center",
  padding: "25px"
});

const IconContainer = glamorous.div({
  display: "flex",
  height: "60px",
  width: "60px",
  maxHeight: "60px",
  maxWidth: "60px",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center"
});

export default class MarkerModal extends Component {
  render() {
    return (
      <ModalContainer>
        <Modal height={MODAL_HEIGHT.LARGE} width={MODAL_WIDTH.SMALL}>
          <Cover>
            <CoverTitle>Big Sound 2018</CoverTitle>
          </Cover>
          <Description>
            {" "}
            Bigsound is not just a music festival, it’s an ideas conference,
            where local and international experts gather to talk about
            developments, ideas and opportunities in the music industry.{" "}
          </Description>
        </Modal>

        <ModalVerticalContainer>
          <Modal height={MODAL_HEIGHT.SMALL} width={MODAL_WIDTH.LARGE}>
            <AllBadgesContainer>
              <IconContainer>
                <img
                  src={BadgeImage}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                Instafamous!
              </IconContainer>
              <IconContainer>
                <img
                  src={BadgeImage}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                Lots of retweets!
              </IconContainer>
              <IconContainer>
                <img
                  src={BadgeImage}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                In the news!
              </IconContainer>
            </AllBadgesContainer>
          </Modal>
          <Modal height={MODAL_HEIGHT.MEDIUM} width={MODAL_WIDTH.LARGE} />
        </ModalVerticalContainer>
      </ModalContainer>
    );
  }
}
