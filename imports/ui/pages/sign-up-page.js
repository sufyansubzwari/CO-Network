import React, {Component} from "react";
import SignUp from "./../../ui/modules/user-module/form/SignUp/SignUp"
import {Layout, Container} from "btech-layout";

class SignUpPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  <Container fullWY style={{width: '47%'}}><SignUp {...this.props} /></Container>;
    }
}

SignUpPage.propTypes = {};

export default SignUpPage;
