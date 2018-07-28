import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import glamorous from "glamorous";
import { CSSTransition } from "react-transition-group";

import { MELB_LAT, MELB_LONG, MODAL_HEIGHT } from "./Utils/Constants";
import { TrendingMarker } from "./Components/Marker";
import { FadeOverlay } from "./Components/FadeOverlay";
import MarkerModal from "./Components/MarkerModal";
import ChatBox from "./Components/ChatBox";
import ChatControls from "./Components/ChatControls";

require("dotenv").config();

const DebugText = glamorous.div({
  borderRadius: "50px",
  maxWidth: "500px",
  wordWrap: "break-word"
});

// const ModalContainer = glamorous.div({
//   display: "flex",
//   backgroundColor: "GhostWhite"
// });

// const ModalVerticalContainer = glamorous.div({
//   display: "flex",
//   flexDirection: "column",
//   backgroundColor: "GhostWhite "
// });

// const Modal = glamorous.div(
//   {
//     width: "300px",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     boxShadow: "2px 2px 2px lightgrey",
//     margin: "25px 0px 0 25px",
//     display: "flex"
//   },
//   props => {
//     const height = props.height;
//     return {
//       height: height
//     };
//   }
// );

const Box = glamorous.div({});

class App extends Component {
  state = {
    viewport: {
      width: 2000,
      height: 700,
      latitude: MELB_LAT,
      longitude: MELB_LONG,
      zoom: 15
    },
    interactive: true,
    show: false
  };

  toggleDrag = () => {
    const { interactive } = this.state;
    console.log("here");
    const viewport = {
      interactive: !interactive
    };
    this.setState(viewport);
  };

  render() {
    const { interactive, show } = this.state;
    return (
      <div className="App">
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/khtin/cjk47b0i254wq2rnwa42zv48d" //"mapbox://styles/khtin/cjk46q8hh4fen2sqz98wylqrd"
          mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
          onViewportChange={viewport => this.setState({ viewport })}
          dragPan={interactive}
        >
          <Marker
            latitude={MELB_LAT}
            longitude={MELB_LONG}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <TrendingMarker onClick={this.toggleDrag} />
            <FadeOverlay display={!interactive} onClick={this.toggleDrag} />
          </Marker>
        </MapGL>
        <TrendingMarker onClick={() => this.setState({ show: !show })} />
        <DebugText>{JSON.stringify(this.state)}</DebugText>
        {/* <ModalContainer>
          <Modal height={MODAL_HEIGHT.LARGE}>
            <h1>BIG SOUND</h1>
          </Modal>
          <ModalVerticalContainer>
            <Modal height={MODAL_HEIGHT.SMALL} />
            <Modal height={MODAL_HEIGHT.MEDIUM} />
          </ModalVerticalContainer>
        </ModalContainer> */}
        <MarkerModal show={!interactive} />
        <MarkerModal show={true} />

        <ChatBox />
        <ChatControls />
      </div>
    );
  }
}

export default App;
