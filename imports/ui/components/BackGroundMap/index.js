import React, { Component } from "react";
import { Map, Marker, TileLayer, Tooltip, Popup } from "react-leaflet";
import styled from "styled-components";
import { graphql } from "react-apollo";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import ClusterIcon from "../ClusterIcon/ClusterIcon";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { GetLocations } from "../../apollo-client/location";
import PropsTypes from "prop-types";
import EntityInf from "./components/EntityInf";

const SMapContainer = styled(Map)`
  .leaflet-popup.entityPopup {
    .leaflet-popup-content-wrapper {
      border-radius: 3px;
      .leaflet-popup-content {
        margin: 10px 5px;
      }
    }
  }
`;

class MapBackGround extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 24,
      lng: 0,
      minZoom: 3,
      maxZoom: 18,
      needOpenSidebar: true,
      zoomMap: props.zoomMap
    };
    this.whenReady = this.whenReady.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zoomMap && nextProps.zoomMap !== this.state.zoomMap)
      this.setState({ zoomMap: nextProps.zoomMap });
  }

  createClusterCustomIcon(cluster) {
    return L.divIcon({
      html: ReactDOMServer.renderToString(
        <ClusterIcon number={cluster.getChildCount()} />
      ),
      className: "marker-cluster-custom"
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
    if (this.props.isMobile) {
      this.map && this.map.flyTo([40, -100], this.props.zoomMap);
    }
  }

  whenReady(target) {
    // console.log("whenReady");
  }

  reFetchQuery() {
    return this.props.data.refetch();
  }

  renderPlaces() {
    return this.props.data && this.props.data.places
      ? this.props.data.places.map((element, index) => {
          const { location } = element.location;
          return location ? (
            <Marker key={index} position={[location.lat, location.lng]}>
              <Popup closeButton={false} className={"entityPopup"}>
                <EntityInf location={element} />
              </Popup>
            </Marker>
          ) : null;
        })
      : null;
  }

  openSidebar() {
    if (this.state.needOpenSidebar) {
      this.setState(
        { needOpenSidebar: false },
        () => this.props.onClusterClick && this.props.onClusterClick()
      );
    }
  }

  render() {
    return (
      <SMapContainer
        style={{
          position: "absolute",
          zIndex: "1",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0"
        }}
        ref={e => {
          this.mapInstance = e;
        }}
        zoomControl={false}
        attributionControl={false}
        center={[this.state.lat, this.state.lng]}
        detectRetina
        minZoom={this.state.minZoom}
        maxZoom={this.state.maxZoom}
        onZoomEnd={() => this.openSidebar()}
        whenReady={this.whenReady}
        zoom={this.state.zoomMap}
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
      </SMapContainer>
    );
  }
}

MapBackGround.defaultProps = {
  zoomMap: 3
};

MapBackGround.propTypes = {
  onClusterClick: PropsTypes.func,
  zoomMap: PropsTypes.number
};

export default graphql(GetLocations, {
  options: () => ({
    fetchPolicy: "cache-and-network"
  })
})(MapBackGround);
