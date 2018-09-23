import React, { Component } from "react";
import SignUp from "./../modules/user-module/form/SignUp/SignUp";
import InternalLayout from "../layouts/InternalLayout/InternalLayout";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InternalLayout>
        <SignUp fullY key={"leftSide"} {...this.props} />
      </InternalLayout>
    );
  }
}

SignUpPage.propTypes = {};

export default SignUpPage;
