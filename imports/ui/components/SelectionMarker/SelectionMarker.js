import React from "react";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import PropTypes from "prop-types";

const SContainer = styled.span`
  height: ${props => props.height};
  width: ${props => props.width};
  border-radius: 50%;
  background-color: ${props => props.backgroudColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the SelectionMarker
 * @return {null}
 */
const SelectionMarker = function(props) {
  return props.isActive ? (
    <SContainer {...props}>
      <MaterialIcon type={"check"} />
    </SContainer>
  ) : null;
};

SelectionMarker.defaultProps = {
  backgroudColor: "#F92672",
  width: "23px",
  height: "23px",
  isActive: false
};

SelectionMarker.propTypes = {
  isActive: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  backgroudColor: PropTypes.string
};

export default SelectionMarker;
