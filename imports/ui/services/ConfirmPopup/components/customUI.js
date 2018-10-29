import React from "react";
import PropTypes from "prop-types";
import { Container, Layout, mixins } from "btech-layout";

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the customUI
 */
const customUI = function(props) {
  return (
    <Container>
      <button
        onClick={() => {
          props.onAccept && props.onAccept();
          props.onClose && props.onClose();
        }}
      >
        yes
      </button>
      <button onClick={props.onClose}>No</button>
    </Container>
  );
};

customUI.defaultProps = {
  title: "Confirm to continue",
  message: "Are you sure to do this."
};

customUI.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  onAccept: PropTypes.func
};

export default customUI;
