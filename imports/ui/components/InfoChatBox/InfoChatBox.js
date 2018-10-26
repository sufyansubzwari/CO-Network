import React from "react";
import styled from "styled-components";
import { Container } from "btech-layout";
import PropTypes from "prop-types";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const InfoChatBox = styled(Container)`
  min-height: ${props => (props.height ? props.height : "65px")};
  background: ${props =>
    props.isActive ? props.backgroudActiveColor : props.backgroudColor};
  color: ${props => (props.isActive ? props.textActiveColor : props.textColor)};
  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    props.useBorder
      ? `border: ${props => `1px ${props.borderType} ${props.borderColor}`}`
      : "none"};
  border-radius: ${props => props.borderRadius};
  border-top-left-radius: ${props => props.borderTopLeftRadius};
  cursor: ${props => (props.pointer ? "pointer" : "default")};
  padding: 15px 20px;
`;

InfoChatBox.defaultProps = {
  backgroudColor: "#EDEDED",
  borderColor: "#BEBEBE",
  borderType: "solid",
  useBorder: false,
  borderRadius: "15px",
  borderTopLeftRadius: "3px",
  textColor: "#000",
  textActiveColor: "#FFF",
  backgroudActiveColor: "linear-gradient(90deg, #E826F9 0%, #F92672 100%)"
};

InfoChatBox.propTypes = {
  height: PropTypes.string,
  pointer: PropTypes.bool,
  useBorder: PropTypes.bool,
  backgroudColor: PropTypes.string,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  borderType: PropTypes.string,
  backgroudActiveColor: PropTypes.string,
  textColor: PropTypes.string,
  textActiveColor: PropTypes.string,
  isActive: PropTypes.bool
};

export default InfoChatBox;
