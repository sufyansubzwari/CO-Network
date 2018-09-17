import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import styled from "styled-components";
import { Query } from "react-apollo";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { GetLocations } from "../../apollo-client/location";

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
      <SMapContainer center={position} maxZoom={18} zoom={this.state.zoom}>
        <TileLayer
          attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
          subdomains="abcd"
          maxZoom={18}
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup
          showCoverageOnHover={false}
          spiderfyDistanceMultiplier={2}
        >
          <Query query={GetLocations} pollInterval={5000}>
            {({ loading, error, data }) => {
              console.log(data);
              return data && data.places
                ? data.places.map((element, index) => {
                    const location = element.location;
                    const coordinates = element.location.location;
                    return (
                      <Marker
                        key={index}
                        position={[coordinates.lat, coordinates.lng]}
                      >
                        <Tooltip>
                          <span>{location.address}</span>
                        </Tooltip>
                      </Marker>
                    );
                  })
                : null;
            }}
          </Query>
        </MarkerClusterGroup>
      </SMapContainer>
    );
  }
}

export default MapBackGround;
