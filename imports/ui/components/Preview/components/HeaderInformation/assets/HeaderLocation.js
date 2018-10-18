import React from "react";
import styled from "styled-components";
import { mixins } from "btech-layout";
import Location from "../../Location";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const HeaderLocation = styled(Location)`
  font-size: 12px;

  ${mixins.media.desktop`
      font-size: ${props =>
        props.size ? props.size : props.theme.preview.locations.size};
  `};
`;

export default HeaderLocation;
