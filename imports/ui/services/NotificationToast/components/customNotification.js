import React from "react";
import PropTypes from "prop-types";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";
import { Container, Layout } from "btech-layout";
import { types, iconTypes, colorsTypes, messages } from "./types";

const STitleNotify = styled.span`
  color: #2b2b2b;
  font-family: "Helvetica Neue LT Std";
  font-size: 16px;
`;

const SMessageNotify = styled.span`
  color: #959595;
  font-family: "Roboto Mono";
  font-size: 12px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SNotifyIcon = styled.span`
  font-size: 18px;
  display: flex;
  margin-top: -2px;
  ${props =>
    props.type === "success"
      ? `background-image: linear-gradient(#E826F9 0%,#F92672 100%),linear-gradient(180deg,#E826F9 0%,#F92672 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-flex;`
      : `color: ${props.color};`};
`;

const SNotifyCustom = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 14px;
`;

const SCloseNotify = styled.span`
  display: flex;
  opacity: 0.5;
  color: #3e4148;
  font-size: 16px;
`;

export const CloseButton = ({ iconType, closeToast }) => (
  <SCloseNotify onClick={closeToast}>
    <MaterialIcon type={iconType} />
  </SCloseNotify>
);

export const Toast = props => (
  <Container margin={"10px"}>
    <Layout customTemplateColumns={"auto 1fr"} colGap={"14px"}>
      <SNotifyIcon
        type={props.type}
        color={props.color || colorsTypes[props.type]}
      >
        <MaterialIcon type={props.iconType || iconTypes[props.type || ""]} />
      </SNotifyIcon>
      <SNotifyCustom>
        <STitleNotify>{props.title || types[props.type] || ""}</STitleNotify>
        <SMessageNotify title={props.message || messages[props.type] || ""}>
          {props.message || messages[props.type] || ""}
        </SMessageNotify>
      </SNotifyCustom>
    </Layout>
  </Container>
);

Toast.propTypes = {
  iconType: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string
};
