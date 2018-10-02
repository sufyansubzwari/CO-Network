import React from "react";
import styled from "styled-components";
import {Layout, Container} from "btech-layout";
import {TextArea, Button} from "btech-base-forms-component";

export const SChat = styled.div`
  background-color: ${props => props.backgroundColor || "#FFFFFF"};
  height: ${props => props.height || "100%"};
  min-height: 350px;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
`;

export const SReplyBox = styled.div`
  background-color: ${props => props.backgroundColor || "#F9F9FB"};
  width: 100%;
`;

export const VSeparator = styled.div`
    width: 4px;
    height: auto;
    background-color: lightgrey;
    margin-right: 20px;
`;

export const SLineTime = styled.div`
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  > p {
    width: auto;
    margin: 0 8px;
    white-space: nowrap;
  }
  > hr {
    width: 100%;
    border-top: solid 1px #454545;
    margin-top: 10px;
  }
`;

export const SImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
`;

export const SUser = styled.div`
  display: flex;
  flex-direction: row;
  > #user-name {
    color: #2e2d2d;
    font-family: "Helvetica Neue LT Std";
    font-size: 14px;
    align-items: center;
    display: flex;
  }
  > #time {
    color: #2b2b2b;
    font-family: "Roboto Mono";
    font-size: 14px;
    font-weight: 300;
    line-height: 24px;
  }
  > span {
    margin-right: 10px;
  }
`;

export const SText = styled.span`
  color: #2b2b2b;
  font-family: "Roboto Mono";
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
`;

export const SReplyButton = styled.span`
  height: 30px;
  width: 30px;
  margin-left: auto;
`;

export const SReplyMessage = styled.div`
  color: #2b2b2b;
  font-family: "Roboto Mono";
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  margin-bottom: 10px;
`;

export const ReplyBox = (props) => (
  <SReplyBox>
    <Layout
      customTemplateRows={"1fr auto"}
      rowGap={"10px"}
      padding={"10px"}
    >
            <TextArea
              placeholderText={props.placeholder || "Type Something"}
              name={props.name}
              model={props.model}
              onKeyPress={props.onKeyPress}
            />
      <Layout customTemplateColumns={"1fr auto"} mb={"10px"}>
        <Container/>
        <Button width={"62px"} height={"30px"} onClick={props.onClick}>
          {props.buttonText || "Send"}
        </Button>
      </Layout>
    </Layout>
  </SReplyBox>
);