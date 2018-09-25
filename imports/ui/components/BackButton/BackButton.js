import React from "react";
import styled from "styled-components";
import { Button } from "btech-base-forms-component";
import MaterialIcon from "react-material-iconic-font";
/**
 * @module Data
 * @category Component
 * @description This component is a style wrapper for the react-table
 * -----------------------------
 * Mobile first approach
 * Using "theme" to define our style
 */
const BackButtonStyled = styled(Button)`
  margin-top: 20px;
  margin-right: 12px;
  width: 34px;
`;

const Icon = styled.span`
  font-size: 18px;
  width: 34px;
  height: 34px;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
const BackButton = function(props) {
    // some logic
    return (
      <BackButtonStyled
        secondary={true}
        onClick={() => props.onClick && props.onClick()}
        color={"black"}
      >
        <Icon>
          <MaterialIcon type={"chevron-left"} />
        </Icon>
      </BackButtonStyled>
    );
};


export default BackButton;