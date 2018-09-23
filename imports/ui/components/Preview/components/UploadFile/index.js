import React from "react";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";

const SImageAction = styled.span`
  font-size: ${props =>
    props.theme ? props.theme.preview.photo.fontsize : "14px"};
  font-family: ${props =>
    props.theme ? props.theme.preview.photo.fontfamily : "Roboto Mono"};
  color: ${props =>
    props.theme ? props.theme.preview.photo.fontcolor : "white"};
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 30px;
  i {
    padding-right: 5px;
  }
  :hover {
    text-decoration: underline;
  }
`;
/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the UploadFile
 */
const UploadFile = function(props) {
  let inputRef = null;
  return (
    <SImageAction onClick={() => inputRef.click()}>
      <MaterialIcon type={props.iconClass} />
      {props.text}
      <input
        style={{ display: "none" }}
        type={"file"}
        ref={ref => {
          inputRef = ref;
        }}
        onChange={e => props.onSelect && props.onSelect(e.target.files)}
      />
    </SImageAction>
  );
};

UploadFile.propTypes = {
  iconClass: PropTypes.string,
  text: PropTypes.string,
  example: PropTypes.bool,
  onSelect: PropTypes.func
};

export default UploadFile;
