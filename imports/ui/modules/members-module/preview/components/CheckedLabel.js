import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";

const Span = styled.span`
    height: 14px;   
    color: #2B2B2B;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    
    i {
        margin-right: 5px;
        font-size: 15px;
    }
`

CheckedLabel = (props) => {

    return props.seeking ? (
      <Span>
          <MaterialIcon type={"check"}/>
          {"Seeking Employment"}
      </Span>
    ): null
}

export default CheckedLabel;

CheckedLabel.propTypes = {
    seeking : PropsTypes.bool
}