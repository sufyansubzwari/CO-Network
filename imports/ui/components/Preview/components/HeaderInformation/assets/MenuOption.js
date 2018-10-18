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

const MenuOption = styled(Container)`
  font-size: 14px;
  
  i {
    padding-right: 5px;
  }
`;

export default MenuOption;
