import React, { Component } from "react";
import glamorous, { Div } from "glamorous";
import { CSSTransition } from "react-transition-group";
import { Text } from "./Text";

import ChatBox from "./ChatBox";
import { MODAL_HEIGHT, MODAL_WIDTH, COLORS } from "../Utils/Constants";
import InstaBadge from "../Images/insta.png";
import SkyBadge from "../Images/castle.png";
import NewsBadge from "../Images/news.png";
import DrinkBadge from "../Images/drink.png";
import FunBadge from "../Images/fun.png";

import ChatControls from "./ChatControls";

const ModalContainer = glamorous.div({
  position: "absolute",
  top: "10vh",
  left: "30vh",
  display: "flex"
});

const ModalVerticalContainer = glamorous.div({
  display: "flex",
  flexDirection: "column"
});

const Modal = glamorous.div(
  {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px #00000020",
    margin: "25px 0px 0 25px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "'Josefin Sans', sans-serif",
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
  },
  props => {
    const height = props.height;
    const width = props.width;
    const delay = props.delay;
    return {
      height: height,
      width: width,
      transitionDelay: delay
    };
  }
);

const Cover = glamorous.div(
  {
    display: "flex",
    height: "150px",
    width: "300px",
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

const Description = glamorous.div({
  color: "grey",
  fontSize: "12pt",
  fontWeight: "300",
  display: "flex",
  padding: "50px",
  flexDirection: "column"
});

const AllBadgesContainer = glamorous.div({
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center",
  paddingTop: "20px",
  paddingRight: "25px",
  paddingLeft: "25px",
  paddingBottom: "10px"
});

const Badge = glamorous.div({
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center",
  transition: "0.2s",
  ":hover": {
    transform: "scale(1.05)"
  }
});

const IconContainer = glamorous.div({
  display: "flex",
  height: "auto",
  width: "64px",
  maxHeight: "64px",
  maxWidth: "64px"
});

const ChatModalContainer = glamorous.div({
  display: "flex",
  height: "auto",
  padding: "20px 50px",
  flexDirection: "column",
  justifyContent: "space-between"
});

export default class MarkerModal extends Component {
  getDescription = () => {
    return "Bigsound is not just a music festival, it’s an ideas conference where local and international experts gather to talk about developments, ideas and opportunities in the music industry";
  };

  getLocation = () => {
    const { data, activeLocationId } = this.props;
    return data[activeLocationId];
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

  getBadges = () => {
    const photoBadges = [
      {
        label: "fun",
        badgeName: "fun",
        badgeText: "Fun!",
        badgeDescription:
          "Google Image Analysis identified that instagram posts about this place are fun!",
        imgUrl: FunBadge
      },
      {
        label: "sky",
        badgeName: "view",
        badgeText: "Beautiful views!",
        badgeDescription:
          "Google Image Analysis identified that instagram posts feature spectacular skylines!",
        imgUrl: SkyBadge
      },
      {
        label: "drink",
        badgeName: "drink",
        badgeText: "Great drinks!",
        badgeDescription:
          "Google Image Analysis identified that instagram posts feature cool drinks!",
        imgUrl: DrinkBadge
      }
    ];

    const instaBadge = {
      badgeName: "insta",
      badgeText: "Insta-famous!",
      badgeDescription: "Very high number of instagram posts about this place!",
      imgUrl: InstaBadge
    };

    const newsBadge = {
      badgeName: "news",
      badgeText: "In the news!",
      badgeDescription: "Featured in the news!",
      imgUrl: NewsBadge
    };
    var badges = [];
    const location = this.getLocation();
    const { labels, news, insta10 } = location;

    for (var i = 0; i < labels.length; i++) {
      for (var j = 0; j < photoBadges.length; j++) {
        if (photoBadges[j].label === labels[i]) {
          badges.push(photoBadges[j]);
        }
      }
    }

    if (news > 0) {
      badges.push(newsBadge);
    }

    if (insta10[0].points > 1000) {
      badges.push(instaBadge);
    }
    return badges;
  };

  renderBadge = badge => {
    return (
      <Badge>
        <IconContainer>
          <img
            src={badge.imgUrl}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </IconContainer>
        <Text type="TINY">{badge.badgeText}</Text>
      </Badge>
    );
  };

  renderBadges = () => {
    const badges = this.getBadges();
    const renders = badges.map(badge => this.renderBadge(badge));
    return renders;
  };

  render() {
    const { show, activeLocationId } = this.props;
    const desc = this.getDescription();
    const imgUrl = this.getImageUrl();
    const name = this.getName();
    const badges = this.getBadges();

    const badgesRender = this.renderBadges();

    return (
      <ModalContainer>
        <CSSTransition in={show} timeout={500} classNames="fade" unmountOnExit>
          <Modal height={MODAL_HEIGHT.LARGE} width={MODAL_WIDTH.SMALL}>
            <Cover imgUrl={imgUrl}>
              <CoverTitle>{name}</CoverTitle>
            </Cover>
            <Description>
              {desc}
              <Text type="EXPAND_BUTTON">more info</Text>
            </Description>
          </Modal>
        </CSSTransition>

        <ModalVerticalContainer>
          <CSSTransition
            in={show}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <Modal
              height={MODAL_HEIGHT.SMALL}
              width={MODAL_WIDTH.LARGE}
              delay="0.1s"
            >
              <AllBadgesContainer>
                {badgesRender}
                {/* <Badge>
                  <IconContainer>
                    <img
                      src={InstaBadge}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </IconContainer>
                  <Text type="TINY">Instafamous!</Text>
                </Badge>
                <Badge>
                  <IconContainer>
                    <img
                      src={TwitteBadge}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </IconContainer>
                  <Text type="TINY">Lots of Retweets!</Text>
                </Badge>
                <Badge>
                  <IconContainer>
                    <img
                      src={NewsBadge}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%"
                      }}
                    />
                  </IconContainer>
                  <Text type="TINY">In the news!</Text> 
                </Badge>*/}
              </AllBadgesContainer>
              <Text type="EXPAND_BUTTON">more info</Text>
            </Modal>
          </CSSTransition>
          <CSSTransition
            in={show}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <Modal
              height={MODAL_HEIGHT.MEDIUM}
              width={MODAL_WIDTH.LARGE}
              delay="0.1s"
            >
              <ChatModalContainer>
                <ChatBox name={name} />
                <ChatControls name={name} />
              </ChatModalContainer>
            </Modal>
          </CSSTransition>
        </ModalVerticalContainer>
      </ModalContainer>
    );
  }
}
