import React, { Component } from "react";
import MapGL from "react-map-gl";
require("dotenv").config();

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapGL
          width={1000}
          height={500}
          latitude={37.768}
          longitude={-122.331}
          zoom={9.017}
          mapStyle="mapbox://styles/khtin/cjk46r5ap15nm2smtyidxl1hb"
          mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
        />
      </div>
    );
  }
}

export default App;
