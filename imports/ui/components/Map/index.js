import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import { Container } from "btech-layout";

const SMapContainer = styled(Map)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

class MapBackGround extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 3
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <SMapContainer center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
          subdomains="abcd"
          maxZoom={19}
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </SMapContainer>
    );
  }
}

export default MapBackGround;
