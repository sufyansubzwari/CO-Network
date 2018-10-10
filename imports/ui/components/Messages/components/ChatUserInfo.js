import React from "react";
import PropTypes from "prop-types";
import { HButtom } from "btech-horizantal-navbar";
import styled from "styled-components";

const SInitialsContainer = styled.span`
  font-family: "Helvetica Neue Light";
  font-weight: bold;
  letter-spacing: 1px;
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the ChatUserInfo
 */
const ChatUserInfo = function(props) {
  const size = { width: 46, height: 53 };
  const getUserInitials = namespace => {
    const result = [];
    if (typeof namespace === "string") {
      const word = namespace.split(" ");
      for (let i = word.length - 1; i >= 0; i--) {
        result[i] = word[i][0];
      }
      return result.join("");
    } else return "";
  };
  const initials = props.owner
    ? getUserInitials(
        `${props.owner.profile.name} ${props.owner.profile.lastName}` ||
          props.owner.profile.email
      )
    : null;
  return (
    <HButtom
      image={
        !!props.owner
          ? props.owner.profile
            ? props.owner.profile.image
            : ""
          : ""
      }
    >
      {props.owner.profile && !props.owner.profile.image ? (
        <SInitialsContainer>{initials}</SInitialsContainer>
      ) : null}
    </HButtom>
  );
};

ChatUserInfo.propTypes = {
  owner: PropTypes.object
};

export default ChatUserInfo;
