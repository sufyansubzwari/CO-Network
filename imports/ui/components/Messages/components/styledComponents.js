import React from "react";
import styled from "styled-components";
import { Container } from "btech-layout";

export const SChat = styled(Container)`
  background-color: ${props => props.backgroundColor || "#FFFFFF"};
  height: ${props => props.height || "100%"};
  zoom: 100%;
  
  @media (min-width: 62em) {
    zoom: 80%;
  }

  @media (min-width: 86em) {
    zoom: 100%;
  }
`;

export const SReplyBox = styled(Container)`
  background-color: ${props => props.backgroundColor || "#F9F9FB"};
  width: 100%;
`;

export const VSeparator = styled(Container)`
  width: 4px;
  height: auto;
  background-color: lightgrey;
  margin-right: 20px;
`;

export const SLineTime = styled(Container)`
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  > p {
    font-size: 12px;
    line-height: 20px;
    width: auto;
    margin: 0 8px;
    white-space: nowrap;
  }
  > hr {
    width: 100%;
    border-top: solid 1px #f9f9fb;
    margin-top: 10px;
  }
`;

export const SImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
`;

export const SUser = styled(Container)`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  
  > #user-name {
    font-family: "Helvetica Neue LT Std";
    line-height: 25px;
  }
  > #time {
    font-size: 13px;
    font-family: "Roboto Mono";
  }
  > span {
    margin-right: 10px;
  }
`;

export const SText = styled.span`
  font-size: 14px;
`;

export const SReplyButton = styled.span`
  margin-left: auto;
`;

export const SReplyMessage = styled(Container)`
  color: #2b2b2b;
  font-family: "Roboto Mono";
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  margin-bottom: 10px;
`;
