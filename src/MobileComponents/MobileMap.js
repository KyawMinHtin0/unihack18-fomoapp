import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import { MELB_LAT, MELB_LONG, MODAL_HEIGHT } from "../Utils/Constants";
import { FadeOverlay } from "../Components/FadeOverlay";
import { TrendingMarker } from "../Components/Marker";
import { Link } from "react-router-dom";

import { Data } from "../Utils/LocationV1";

export default class MobileMap extends Component {
  state = {
    viewport: {
      width: 2000,
      height: 700,
      latitude: MELB_LAT,
      longitude: MELB_LONG,
      zoom: 15
    },
    mobViewport: {
      width: 1080,
      height: 1920,
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
        <Link to={{ pathname: "/view/" + index }}>
          <TrendingMarker onClick={() => this.toggleModal(index)} />
        </Link>

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
    const { interactive } = this.state;
    const allMarkers = this.renderAllMarkers();

    return (
      <MapGL
        {...this.state.mobViewport}
        mapStyle="mapbox://styles/khtin/cjk47b0i254wq2rnwa42zv48d" //"mapbox://styles/khtin/cjk46q8hh4fen2sqz98wylqrd"
        mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
        onViewportChange={viewport => this.setState({ mobViewport: viewport })}
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
    );
  }
}
