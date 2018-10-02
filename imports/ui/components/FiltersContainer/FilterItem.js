import React from "react";
import styled from "styled-components";
import { Container } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const FilterItem = styled(Container)`
  padding: 20px 10px;
  margin-right: 10px;
  zoom: 100%;

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

export default FilterItem;
