import React from "react";
import { Layout, mixins } from "btech-layout";
import styled from "styled-components";

const SLayout = styled(Layout)`
  grid-row-gap: ${props => props.theme.forms.mobileRowSpace};

  ${mixins.media.desktop`
     grid-row-gap: ${props => props.theme.forms.rowSpace};
  `};
`;
/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the FormMainLayout
 */
const FormMainLayout = function(props) {
  return <SLayout>{props.children}</SLayout>;
};
export default FormMainLayout;
