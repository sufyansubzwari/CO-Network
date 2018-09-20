import React, { Component } from "react";
import { Container } from "btech-layout";
import SignUp from "./../modules/user-module/form/SignUp/SignUp";
import InternalLayout from "../components/InternalLayout/InternalLayout";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InternalLayout>
        <SignUp fullY key={"leftSide"} {...this.props} />
        {/*<Container fullY key={"rightSide"} />*/}
      </InternalLayout>
    );
  }
}

SignUpPage.propTypes = {};

export default SignUpPage;
