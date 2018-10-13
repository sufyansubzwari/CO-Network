import React from "react";
import PropTypes from "prop-types";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";

const SMainLayout = styled(Layout)`
  z-index: -1;
  align-items: center;
  position: absolute;
  background: ${props =>
    props.background ? props.background : props.theme.color.primary};
`;

const SIconContainer = styled(Container)`
  display: flex;
  justify-content: center;
  color: white;
  
  i {
    font-size: 25px;
  }
`;

const STextContainer = styled(Container)`
  display: flex;
  align-items: center;
  color: white;
  font-size: 12px;
  font-family: Helvetica Neue LT Std;
`;
/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the NotificationBack2
 */
const NotificationBack = function(props) {
  return (
    <SMainLayout {...props} fullY fullX customTemplateColumns={"35px 1fr"}>
      <SIconContainer>
        <MaterialIcon type={"delete"} size={1.5} />
      </SIconContainer>
      <STextContainer>You will delete this item</STextContainer>
    </SMainLayout>
  );
};

NotificationBack.propTypes = {
  background: PropTypes.string
};

export default NotificationBack;
