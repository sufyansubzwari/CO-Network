import React from "react";
import PropTypes from "prop-types";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import ClusterIcon from "../../../ClusterIcon/ClusterIcon";
import MarkerClusterGroup from "react-leaflet-markercluster";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the Map
 */
const MapSection = function(props) {
  const createClusterCustomIcon = cluster => {
    return L.divIcon({
      html: ReactDOMServer.renderToString(
        <ClusterIcon number={cluster.getChildCount()} />
      ),
      className: "marker-cluster-custom",
      iconSize: L.point(40, 40, true)
    });
  };

  const renderPlaces = () => {
    return props.locations && props.locations.length
      ? props.locations.map((element, index) => {
          return element ? (
            <Marker key={index} position={element}>
              {element.address ? <Popup>{element.address}</Popup> : null}
            </Marker>
          ) : null;
        })
      : null;
  };

  return (
    <Map
      style={{ height: "100%", zIndex: 0 }}
      center={props.centerAt || []}
      zoom={props.zoom}
      maxZoom={props.maxZoom}
      minZoom={props.minZoom}
      zoomControl={false}
      attributionControl={false}
      detectRetina
    >
      <TileLayer
        detectRetina
        attribution={props.attribution}
        subdomains={props.subomains}
        maxZoom={props.maxZoom}
        minZoom={props.minZoom}
        url={props.url}
      />
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        showCoverageOnHover={false}
        spiderfyDistanceMultiplier={2}
      >
        {renderPlaces()}
      </MarkerClusterGroup>
    </Map>
  );
};

MapSection.defaultProps = {
  maxZoom: 18,
  minZoom: 0,
  zoom: 15,
  locations: [],
  subomains: "abcd",
  url:
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png",
  attribution:
    "&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
};

MapSection.propTypes = {
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  centerAt: PropTypes.any,
  locations: PropTypes.array,
  url: PropTypes.string,
  attribution: PropTypes.string,
  subdomains: PropTypes.string
};

export default MapSection;
