import React from "react";
import styled from "styled-components";
import { mixins } from "btech-layout";
import Text from "../../Text";

/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */

const HeaderDescription = styled(Text)`
  line-height: 16px;
  opacity: 0.5;

  ${mixins.media.desktop`
      line-height: ${props =>
        props.textLineHeight
          ? props.textLineHeight
          : props.theme.preview.text.textLineHeight};
  `};
`;

export default HeaderDescription;
