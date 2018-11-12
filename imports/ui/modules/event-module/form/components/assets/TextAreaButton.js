import React from "react";
import styled from "styled-components";
import { Container, mixins } from "btech-layout";
import PropTypes from "prop-types";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const TextAreaButton = styled(Container)`
  min-height: ${props => (props.height ? props.height : "67px")};
  background-color: ${props =>
    props.isActive ? props.backgroudActiveColor : props.backgroudColor};
  color: ${props => (props.isActive ? props.textActiveColor : props.textColor)};
  ${props =>
    props.boxShadow
      ? `
  box-shadow: 1px 1px 12px 0px rgba(49, 56, 76, 0.2);`
      : null}
  ${props =>
    props.center
      ? `
  display: flex;
  align-items: center;
  justify-content: center;
  `
      : null}
  border: ${props => `1px ${props.borderType} ${props.borderColor}`};
  border-radius: ${props => props.borderRadius};
  cursor: ${props =>
    props.pointer && !props.disabled
      ? "pointer"
      : props.disabled
        ? "not-allowed"
        : "default"};
  transition: all 300ms;
  width: 100%;
  height: ${props =>
    props.isExpanded
      ? `calc(${props.heightToExpand} + ${props.gapToExpand})`
      : "100%"};
      
  ${mixins.media.desktop`
    width: ${props =>
      props.isExpanded
        ? `calc(${props.widthToExpand} + ${props.gapToExpand})`
        : "100%"};
  `}
`;

TextAreaButton.defaultProps = {
  backgroudColor: "#FFFFFF",
  borderColor: "#BEBEBE",
  boxShadow: false,
  disabled: false,
  borderType: "solid",
  borderRadius: "3px",
  center: true,
  gapToExpand: "0px",
  widthToExpand: "200%",
  heightToExpand: "auto",
  isExpanded: false,
  textColor: "#000",
  textActiveColor: "#FFF",
  backgroudActiveColor: "#32363d"
};

TextAreaButton.propTypes = {
  height: PropTypes.string,
  boxShadow: PropTypes.bool,
  disabled: PropTypes.bool,
  isExpanded: PropTypes.bool,
  widthToExpand: PropTypes.string,
  pointer: PropTypes.bool,
  center: PropTypes.bool,
  backgroudColor: PropTypes.string,
  gapToExpand: PropTypes.string,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  borderType: PropTypes.string,
  backgroudActiveColor: PropTypes.string,
  textColor: PropTypes.string,
  textActiveColor: PropTypes.string,
  isActive: PropTypes.bool
};

export default TextAreaButton;
