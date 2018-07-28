import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import glamorous from "glamorous";
require("dotenv").config();

const POI = glamorous.div({
  borderRadius: "50px",
  width: "50px",
  height: "50px",
  backgroundColor: "red"
});

class App extends Component {
  state = {
    viewport: {
      width: 1000,
      height: 500,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <div className="App">
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/khtin/cjk46q8hh4fen2sqz98wylqrd"
          mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          <Marker
            latitude={37.78}
            longitude={-122.41}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <POI>TRENDDDING!!!🔥🔥🔥🔥🔥🔥🔥🔥</POI>
          </Marker>
        </MapGL>
      </div>
    );
  }
}

export default App;
