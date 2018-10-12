import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/**
 * @module Data
 * @category SignUpListener
 */
class SignUpListener extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.curUser &&
      !this.props.isSignUp &&
      !/sign-up/.test(this.props.location.pathname)
    )
      this.props.history.push("/sign-up");
  }

  render() {
    return false;
  }
}
export default withRouter(SignUpListener);
