import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SLabel = styled.div`
    font-family: "Roboto Mono";
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
`;

const Label = (props) => {
return(
  <SLabel onClick={props.onClick}>
    <span>
      {props.text}
    </span>
  </SLabel>
)
};

export default Label;