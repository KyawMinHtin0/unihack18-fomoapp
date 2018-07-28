import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import glamorous from "glamorous";
import { CSSTransition } from "react-transition-group";

import { MELB_LAT, MELB_LONG, MODAL_HEIGHT } from "./Utils/Constants";
import { Data } from "./Utils/LocationV1";

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
    show: false,
    activeLocationId: 0
  };

  toggleDrag = () => {
    const { interactive } = this.state;
    console.log("here");
    const viewport = {
      interactive: !interactive
    };
    this.setState(viewport);
  };

  toggleModal = id => {
    this.setState({ activeLocationId: id });
    this.toggleDrag();
  };

  getData = () => {
    return Data;
  };

  renderMarker = (location, index) => {
    const { lat, lng, name } = location.meta_data;
    return (
      <Marker latitude={lat} longitude={lng} offsetLeft={-20} offsetTop={-10}>
        <TrendingMarker onClick={() => this.toggleModal(index)} />
        {name}
      </Marker>
    );
  };

  renderAllMarkers = () => {
    const data = this.getData();
    const markers = data.map((x, i) => this.renderMarker(x, i));
    return markers;
  };

  render() {
    const { interactive, show, activeLocationId } = this.state;
    const allMarkers = this.renderAllMarkers();
    console.log(Data);
    return (
      <div className="App">
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/khtin/cjk47b0i254wq2rnwa42zv48d" //"mapbox://styles/khtin/cjk46q8hh4fen2sqz98wylqrd"
          mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
          onViewportChange={viewport => this.setState({ viewport })}
          dragPan={interactive}
        >
          {/* <Marker
            latitude={MELB_LAT}
            longitude={MELB_LONG}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <TrendingMarker onClick={this.toggleDrag} />
          </Marker> */}
          <FadeOverlay display={!interactive} onClick={this.toggleDrag} />

          {allMarkers}
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
        <MarkerModal
          activeLocationId={activeLocationId}
          data={Data}
          show={!interactive}
        />
        {/* //<MarkerModal show={true} /> */}

        <ChatBox name="ACMI"/>
        <ChatControls name="ACMI"/>
      </div>
    );
  }
}

export default App;
