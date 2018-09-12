import React from "react";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";

const SIconContainer = styled.span`
  > i {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.color.primary};
    }
  }
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the AuthServiceButton
 */
const AuthServiceButton = function(props) {
  return (
    <SIconContainer
      onClick={() => props.onSelected && props.onSelected(props.service)}
    >
      <MaterialIcon type={props.service} size={4} />
    </SIconContainer>
  );
};

AuthServiceButton.propTypes = {
  service: PropTypes.string,
  onSelected: PropTypes.func
};

export default AuthServiceButton;
