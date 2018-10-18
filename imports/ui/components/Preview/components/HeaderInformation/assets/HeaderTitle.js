import React from "react";
import styled from "styled-components";
import { mixins } from "btech-layout";
import Title from "../../Title";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const HeaderTitle = styled(Title)`
  font-size: 16px;

  ${mixins.media.desktop`
      font-size: ${props =>
        props.size ? props.size : props.theme.preview.title.size};
  `};
`;

export default HeaderTitle;
