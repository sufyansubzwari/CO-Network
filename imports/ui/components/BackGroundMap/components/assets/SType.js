import React from "react";
import styled from "styled-components";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const SType = styled.div`
  font-family: Helvetica Neue Light;
  font-size: 12px;
  text-transform: ${props => (props.uppercase ? "uppercase" : "none")};
`;

export default SType;
