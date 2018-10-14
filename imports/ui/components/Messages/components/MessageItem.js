import React from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { Container, Layout, mixins } from "btech-layout";
import ChatUserInfo from "./ChatUserInfo";
import { SReplyButton, SText, SUser } from "./styledComponents";
import MaterialIcon from "react-material-iconic-font";
import styled from "styled-components";

export const SMessageItem = styled(Container)`
  line-height: 15px;

  ${mixins.media.desktop`
    line-height: initial;
  `};
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the MessageItem
 */
const MessageItem = function(props) {
  return (
    <Layout
      customTemplateColumns={"auto 1fr"}
      mb={"15px"}
      isActive={props.isActive}
      onClick={event => props.onSelect && props.onSelect()}
    >
      <ChatUserInfo owner={props.owner} />
      <SMessageItem ml={"10px"}>
        <SUser>
          <span id={"user-name"}>
            {props.owner && props.owner.profile && props.owner.profile.name}
          </span>
          <span id={"time"}>
            {moment(props.message && props.message.createdAt).format("h:mm a")}
          </span>
          {props.message && props.message.canReply ? (
            <SReplyButton
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                props.onReplyAction && props.onReplyAction(props.message);
              }}
            >
              <MaterialIcon type={"mail-reply"} />
              <span style={{ marginLeft: "5px" }}>Reply</span>
            </SReplyButton>
          ) : null}
        </SUser>
        <SText isActive={props.isActive}>{props.message.text}</SText>
      </SMessageItem>
    </Layout>
  );
};

MessageItem.propTypes = {
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
  onReplyAction: PropTypes.func
};

export default MessageItem;
