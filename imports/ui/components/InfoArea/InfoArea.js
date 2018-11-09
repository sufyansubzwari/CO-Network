import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "btech-layout";
import styled from "styled-components";

const SContainer = styled(Container)`
  width: ${props => props.width || "100%"};
  ${props =>
    props.backgroundImage
      ? `background-image: ${props.backgroundImage};`
      : null}
  padding: ${props => props.padding || "20px"};
  border-radius: ${props => props.radius || "3px"};
  ${props =>
    props.backgroundColor ? `background: ${props.backgroundColor};` : null}
  margin-bottom: ${props => props.mb || "20px"};
  color: ${props => props.color || "#32363d"};
  ${props => (props.radiusBR ? "border-bottom-right-radius: 15px;" : "")} 
  ${props => (props.radiusBL ? "border-bottom-left-radius: 15px;" : "")};
  ${props => (props.radiusTR ? "border-top-right-radius: 15px;" : "")};
  ${props => (props.radiusTL ? "border-top-left-radius: 15px;" : "")};  
`;

const InfoArea = props => {
  return <SContainer {...props}>{props.children}</SContainer>;
};

InfoArea.propTypes = {
  radiusBR: PropTypes.string,
  radiusBL: PropTypes.string,
  radiusTR: PropTypes.string,
  radiusTL: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  radius: PropTypes.string,
  backgroundImage: PropTypes.string,
  padding: PropTypes.string,
  mb: PropTypes.string,
  width: PropTypes.string
};

export default InfoArea;
