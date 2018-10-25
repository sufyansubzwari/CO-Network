import React from "react";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import { theme } from "../../theme";

const SContainer = styled.span`
  margin-left: 5px;
  
  i {
    color: ${props => theme.color[props.color]};
  }
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the OrgStatusIcon
 * @return {null}
 */
const OrgStatusIcon = function(props) {
  const iconToShow = () => {
    switch (props.status) {
      case "pending":
        return {};
      case "working":
        return {};
      case "approved":
        return { icon: "shield-check", color: "primary" };
      case "denied":
        return {};
      default:
        return {};
    }
  };
  const { icon, color } = iconToShow();
  return icon ? (
    <SContainer color={color}>
      <MaterialIcon type={icon} />
    </SContainer>
  ) : null;
};

OrgStatusIcon.propTypes = {
  status: PropTypes.string
};

export default OrgStatusIcon;
