import { Meteor } from "meteor/meteor";
import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import MaterialIcon from "react-material-iconic-font";
import Button from "../../Navbar/SideBarLink";
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LogoutBtn = ({ client, btnType, disabled, onLogoutHook }) => (
  <Button
    pointer
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
    Log out
  </Button>
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
