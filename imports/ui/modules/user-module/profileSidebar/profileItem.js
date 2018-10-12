import React from "react";
import styled from "styled-components";
import { Container, mixins, Layout } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const ProfileItem = styled(Container)`
  padding: 5px 10px 10px;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }

  ${mixins.media.desktop`
    padding: 20px;
  `};
`;

export default ProfileItem;
