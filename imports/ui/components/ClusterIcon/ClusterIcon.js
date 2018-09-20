import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";

const CLusterIconContainer = styled.div`
  height: ${props => (props.height ? props.height : "40px")};
  width: ${props => (props.width ? props.width : "40px")};
  background: ${props => (props.background ? props.background : "#f92672")};
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => (props.fontSize ? props.fontSize : "12px")};
  background-image: url(${props =>
    props.image ? props.image : "/images/circle.png"});
  background-size: cover;
  padding: 3px;
  background-origin: content-box;
  background-repeat: no-repeat;
`;
/**
 * @module Data
 * @category ClusterIcon
 * @description This component is a wrapper for the ClusterIcon
 */
const ClusterIcon = function(props) {
  return <CLusterIconContainer>{props.number}</CLusterIconContainer>;
};

ClusterIcon.defaultProps = {
  number: "0"
};

ClusterIcon.proptypes = {
  number: PropsTypes.string.isRequired
};

export default ClusterIcon;
