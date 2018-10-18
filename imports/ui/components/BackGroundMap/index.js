import React, { Component } from "react";
import { Map, Marker, TileLayer, Tooltip } from "react-leaflet";
import styled from "styled-components";
import { graphql } from "react-apollo";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import ClusterIcon from "../ClusterIcon/ClusterIcon";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { GetLocations } from "../../apollo-client/location";
import PropsTypes from "prop-types";

const SMapContainer = styled(Map)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

class MapBackGround extends Component {
  state = {
    lat: 24,
    lng: 0,
    minZoom: 3,
    maxZoom: 18
  };

  createClusterCustomIcon(cluster) {
    return L.divIcon({
      html: ReactDOMServer.renderToString(
        <ClusterIcon number={cluster.getChildCount()} />
      ),
      className: "marker-cluster-custom",
      iconSize: L.point(40, 40, true)
    });
  }

  createMarkerIcon() {
    return L.icon({
      iconUrl: "my-icon.png",
      iconSize: [38, 95],
      iconAnchor: [22, 94]
    });
  }

  componentWillMount() {
    this.reFetchQuery();

  }

  componentDidMount() {
      this.map = this.mapInstance.leafletElement;
      if(this.props.isMobile) {
          this.map.flyTo([40, -100], this.props.zoomMap);
      }

  }

  reFetchQuery() {
    return this.props.data.refetch();
  }

  renderPlaces() {
    return this.props.data && this.props.data.places
      ? this.props.data.places.map((element, index) => {
          const location = element.location;
          const coordinates = element.location.location;
          return (
            <Marker key={index} position={[coordinates.lat, coordinates.lng]}>
              <Tooltip>
                <span>{location.address}</span>
              </Tooltip>
            </Marker>
          );
        })
      : null;
  }

  render() {
    return (
      <Map
        style={{position: 'absolute', zIndex: '1', top: '0', bottom: '0', left: '0', right: '0'}}
        ref={e => { this.mapInstance = e }}
        zoomControl={false}
        attributionControl={false}
        center={[this.state.lat, this.state.lng]}
        detectRetina
        minZoom={this.state.minZoom}
        maxZoom={this.state.maxZoom}
        onZoomEnd={() =>
          this.props.onClusterClick && this.props.onClusterClick()
        }
        zoom={this.props.zoomMap || 3}
      >
        <TileLayer
          detectRetina
          attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
          subdomains="abcd"
          maxZoom={18}
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup
          iconCreateFunction={this.createClusterCustomIcon}
          showCoverageOnHover={false}
          spiderfyDistanceMultiplier={2}
        >
          {this.renderPlaces()}
        </MarkerClusterGroup>
      </Map>
    );
  }
}

MapBackGround.propTypes = {
  onClusterClick: PropsTypes.func
};

export default graphql(GetLocations, {
  options: () => ({
    fetchPolicy: "cache-and-network"
  })
})(MapBackGround);
