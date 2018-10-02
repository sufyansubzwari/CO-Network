import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SLabel = styled.div`
  font-family: "Roboto Mono";
  font-size: ${props => props.fontSize ? props.fontSize : "14px"};
  margin-top: ${props => props.marginTop ? props.marginTop : "0px"};
  font-weight: normal;
  cursor: pointer;
`;

const Label = props => {
  return (
    <SLabel onClick={props.onClick} {...props}>
      <span>{props.text}</span>
    </SLabel>
  );
};

export default Label;
