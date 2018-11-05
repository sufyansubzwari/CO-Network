import React from "react";
import PropTypes from "prop-types";
import {
  SBlackTitle,
  SBorderedTitle,
  SPageTitle,
  SSymbolTitle
} from "./assets/styles";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the HomeTitle
 */
const HomeTitle = function(props) {
  return (
    <SPageTitle onClick={() => props.onSelect && props.onSelect()}>
      <SBlackTitle>Connect</SBlackTitle>
      <SBorderedTitle>
        Physically
        <SSymbolTitle>,</SSymbolTitle>
      </SBorderedTitle>
      <SBlackTitle> Collaborate</SBlackTitle>
      <SBorderedTitle>Digitally</SBorderedTitle>
    </SPageTitle>
  );
};

export default HomeTitle;
