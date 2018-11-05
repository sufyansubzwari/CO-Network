import React from "react";
import styled from "styled-components";
import { Container, mixins } from "btech-layout";

const SPageTitle = styled(Container)`
  text-align: center;
  font-size: 20px;
  font-family: "Helvetica Neue LT Std";
  letter-spacing: 1px;
  color: #fff;
  text-transform: uppercase;
  zoom: 100%;

  ${mixins.media.desktop`
    text-align: initial;
  `};

  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

const SBlackTitle = styled.span`
  color: black;

  ${mixins.media.desktop`
    color: white;
  `};
`;

const SBorderedTitle = styled.span`
  color: black;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  display: block;

  ${mixins.media.desktop`
    color: white;
    -webkit-text-fill-color: initial;
    -webkit-text-stroke-width: initial;
    -webkit-text-stroke-color: initial;
  `};
`;

const SSymbolTitle = styled.span`
  display: none;

  ${mixins.media.desktop`
    display: initial;
  `};
`;

export { SPageTitle, SBlackTitle, SBorderedTitle, SSymbolTitle };
