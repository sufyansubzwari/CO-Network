import React from 'react'
import styled from 'styled-components';

export const SChat = styled.div`
    background-color: ${props => props.backgroundColor || '#FFFFFF'};
    height: ${props => props.height || '515px'};
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
`;

export const SReplyBox = styled.div`
    background-color: ${props => props.backgroundColor || '#F9F9FB'};
    height: ${props => props.height || '140px'};
    width: 100%;
    padding: 0 90px;
`;

export const SLineTime = styled.div`
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    > p {
      width: auto;
      margin-right: 8px;
      white-space: nowrap;
    }
    > hr {
      width: 100%;
      border-top: solid 1px #454545;
      margin-top: 8px;
    }
`;

export const SContainerMessages = styled.div`
  padding: 0 90px;
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
    > #user-name{
      color: #2E2D2D;
      font-family: "Helvetica Neue LT Std";
      font-size: 14px;
      line-height: 0;
    }
    > #time{
      color: #2B2B2B;
      font-family: "Roboto Mono";
      font-size: 14px;
      font-weight: 300;
      line-height: 24px;
    }
    > span {
      margin-right: 10px
    }
`;

export const SText = styled.span`
	color: #2B2B2B;
	font-family: "Roboto Mono";
	font-size: 14px;
	font-weight: 300;
	line-height: 24px;
`;

export const SReplyButton = styled.span`
	height: 30px;
	width: 30px;
`;

export const SReplyMessage = styled.div`
	color: #2B2B2B;
	font-family: "Roboto Mono";
	font-size: 16px;
	font-weight: 300;
	line-height: 24px;
	margin-bottom: 10px;
`;