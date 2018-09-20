import React from "react";
import PropTypes from "prop-types";
import { Container } from "btech-layout";
import styled from "styled-components";

const SLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${props => (props.color ? props.color : "#DBDBDB")};
`;

const SContainer = styled(Container)`
  display: flex;
  align-items: center;
`;
/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the LineSeparator
 */
const LineSeparator = function(props) {
  return (
    <SContainer {...props} minH={"34px"}>
      <SLine {...props} />
    </SContainer>
  );
};

LineSeparator.propTypes = {
  color: PropTypes.string
};

export default LineSeparator;
