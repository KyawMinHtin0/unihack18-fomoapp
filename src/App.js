import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import glamorous, { Div } from "glamorous";
import { MELB_LAT, MELB_LONG, MODAL_HEIGHT } from "./Utils/Constants";
import { TrendingMarker } from "./Components/Marker";
import { FadeOverlay } from "./Components/FadeOverlay";

require("dotenv").config();

const DebugText = glamorous.div({
  borderRadius: "50px",
  maxWidth: "500px",
  wordWrap: "break-word"
});

const Modal = glamorous.div(
  {
    width: "300px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px lightgrey",
    margin: "30px"
  },
  props => {
    const height = props.height;
    return {
      height: height
    };
  }
);

class App extends Component {
  state = {
    viewport: {
      width: 1000,
      height: 500,
      latitude: MELB_LAT,
      longitude: MELB_LONG,
      zoom: 13
    },
    interactive: true
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
    const { interactive } = this.state;
    return (
      <div className="App">
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/khtin/cjk46q8hh4fen2sqz98wylqrd"
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
        <TrendingMarker onClick={this.gotoMelb} />
        <DebugText>{JSON.stringify(this.state)}</DebugText>
        <Modal height={MODAL_HEIGHT.SMALL} />
        <Modal height={MODAL_HEIGHT.MEDIUM} />
        <Modal height={MODAL_HEIGHT.LARGE} />
      </div>
    );
  }
}

export default App;
