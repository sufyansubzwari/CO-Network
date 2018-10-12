import { Meteor } from "meteor/meteor";
import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import MaterialIcon from "react-material-iconic-font";
import { Button } from "btech-base-forms-component";
import styled from "styled-components";
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------

const SLogout = styled(Button)`
  opacity: 0.5;

  :hover {
    opacity: 1;
  }
`;

const LogoutBtn = ({ client, btnType, disabled, onLogoutHook }) => (
  <SLogout
    secondary
    pointer
    height={"28px"}
    onClick={evt => {
      if (evt) {
        evt.preventDefault();
      }
      Meteor.logout(() => {
        // Clear apollo store.
        client.resetStore();
        // Pass event up to parent component.
        onLogoutHook();
      });
    }}
  >
    <span style={{ fontSize: 16 }}>
      <MaterialIcon type={"square-right"} rotate={180} />
    </span>{" "}
    Log Out
  </SLogout>
);

LogoutBtn.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired
  }).isRequired,
  btnType: PropTypes.oneOf(["button", "link", "submit"]),
  disabled: PropTypes.bool,
  onLogoutHook: PropTypes.func
};

LogoutBtn.defaultProps = {
  btnType: "button",
  disabled: false,
  onLogoutHook: () => {}
};

export default withApollo(LogoutBtn);
