import React, { Component } from "react";
import { HButtom } from "btech-horizantal-navbar";
import { connect } from "react-redux";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";

const SInitialsContainer = styled.span`
  font-family: "Helvetica Neue Light";
  font-weight: bold;
  letter-spacing: 1px;
`;

const SStartText = styled.span`
  font-family: "Helvetica Neue LT Std";
  font-size: "14px";
`;

/**
 * @module Data
 * @category Component
 * @description This component is a wrapper for the react-table
 */
class NavbarUserButton extends Component {
  constructor(props) {
    super(props);
  }

  getUserInitials(namespace) {
    const result = [];
    if (typeof namespace === "string") {
      const word = namespace.split(" ");
      for (let i = word.length - 1; i >= 0; i--) {
        result[i] = word[i][0];
      }
      return result.join("");
    } else return "";
  }

  render() {
    let { user, isMobile } = this.props;
    const initials = user
      ? this.getUserInitials(
          `${user.profile.name} ${user.profile.lastName}` || user.profile.email
        )
      : null;
    return (
      <HButtom
        image={!!user ? user.profile.image : ""}
        size={this.props.size}
        // primary={!user && !isMobile}
      >
        {!user ? (
          // isMobile ? (
            <span style={{ fontSize: 24 }}>
              <MaterialIcon type={"account-o"} />
            </span>
          // ) : (
          //   <SStartText>Start</SStartText>
          // )
        ) : !user.profile.image ? (
          <SInitialsContainer>{initials}</SInitialsContainer>
        ) : null}
      </HButtom>
    );
  }
}

const mapStateToProps = state => {
  const { userState } = state;
  return { user: userState };
};

export default connect(mapStateToProps)(NavbarUserButton);
