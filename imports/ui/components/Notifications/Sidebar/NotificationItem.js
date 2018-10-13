import React from "react";
import styled from "styled-components";
import { Container, mixins } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const NotificationItem = styled(Container)`
  padding: 10px;
  zoom: 100%;

  ${mixins.media.desktop`
    padding: 20px 10px;
    margin-right: 10px;
  `}
  
  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

export default NotificationItem;
