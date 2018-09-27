import React, { Component } from "react";
import { HButtom } from "btech-horizantal-navbar";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { connect } from "react-redux";
import UserRedux from "../../redux/user";
import styled from "styled-components";
import MaterialIcon from "react-material-iconic-font";

const SInitialsContainer = styled.span`
  font-family: "Helvetica Neue Light";
  font-weight: bold;
  letter-spacing: 1px;
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
    let { user } = this.props;
    const initials = user
      ? this.getUserInitials(
          `${user.profile.name} ${user.profile.lastName}` || user.profile.email
        )
      : null;
    this.props.setUser(user || null);
    return (
      <HButtom
        image={!!user ? user.profile.image : ""}
        size={this.props.size}
        primary={!user}
      >
        {!user ? (
          <span style={{ fontSize: 20 }}>
            <MaterialIcon type={"square-right"} />
          </span>
        ) : !user.profile.image ? (
          <SInitialsContainer>{initials}</SInitialsContainer>
        ) : null}
      </HButtom>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  setUser: status => dispatch(UserRedux.Actions.setUser(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTracker(() => {
    return {
      user: Meteor.user()
    };
  })(NavbarUserButton)
);
