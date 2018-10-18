import React from "react";
import styled from "styled-components";
import { Layout } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const HeaderMainLayout = styled(Layout)`
  border-bottom: ${props => "1px solid " + props.theme.color.grey};
  background-color: ${props => props.theme.color.innerBackground};
`;

export default HeaderMainLayout;
