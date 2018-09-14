import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/**
 * @module Data
 * @category SignUpListener
 */
class SignUpListener extends Component {
  render() {
    if (this.props.curUser && !this.props.isSignUp)
      this.props.history.push("/sign-up");
    return false;
  }
}
export default withRouter(SignUpListener);
