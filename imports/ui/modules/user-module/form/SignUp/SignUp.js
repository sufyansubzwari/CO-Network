import React from "react";
import {
  Input,
  CheckBoxList,
  CheckBox,
  Button
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { CreateUser } from "../../../../apollo-client/user";

import {
  SIGNUP_TEXT,
  SIGNUP_TEXT_2,
  SIGNUP_TEXT_3,
  SIGNUP_OPTIONS
} from "../constants/constants";
import { theme } from "./../../../../theme";
import { Accounts } from "meteor/accounts-base";

const Description = styled.p`
  font-size: ${props =>
    props.theme ? props.theme.signup.descriptionSize : "12px"};
  font-family: ${props =>
    props.theme ? props.theme.signup.family : "Roboto Mono"};
  color: ${props => (props.theme ? props.theme.signup.fontcolor : "black")};
`;

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agreeTerms: false,
      actives: [],
      disabled: false
    };

    this.handleCheckBoxes = this.handleCheckBoxes.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  componentWillMount() {
    if (
      !this.props.curUser ||
      (this.props.curUser && this.props.curUser.isSignUp)
    )
      this.props.history.push("/");
  }

  handleContinue(createUser) {
    let checkboxesActives = this.state.actives.some(function(element) {
      return element === false;
    });
    const active = this.state.agreeTerms && !checkboxesActives;
    if (active) {
      let user = {
        _id: this.props.curUser._id,
        isSignUp: true
      };
      createUser({ variables: { entity: user } });
    }
  }

  handleCheckBoxes(actives) {
    let checkboxesActives = actives.some(function(element) {
      return element === false;
    });
    const active = this.state.agreeTerms && checkboxesActives;
    this.setState({
      actives: actives,
      disabled: active
    });
  }

  handleCheckBox() {
    let checkboxesActives = this.state.actives.some(function(element) {
      return element === false;
    });
    const active = this.state.agreeTerms && checkboxesActives;
    this.setState({
      agreeTerms: !this.state.agreeTerms,
      disabled: active
    });
  }

  render() {
    return (
      <Layout
        fullY
        customTemplateRows={"187px 1fr"}
        style={{ background: theme.signup.headerBackground }}
      >
        <Container style={{ margin: "auto" }}>
          <img style={{ width: 130 }} src={"/favicon.png"} />
        </Container>
        <Layout
          paddingY={"70px"}
          paddingX={"20%"}
          rowGap={"25px"}
          style={{
            background: theme.signup.descriptionBackground,
            borderTop: `1px solid ${theme.signup.borderColor}`
          }}
        >
          <Container>
            <Description>
              {SIGNUP_TEXT}
              <p style={{ display: "inline", fontWeight: "bold" }}>
                Science, Technology, Culture.
              </p>
            </Description>
            <Description>{SIGNUP_TEXT_2}</Description>
            <Description>{SIGNUP_TEXT_3}</Description>
          </Container>
          <Container>
            <CheckBoxList
              options={SIGNUP_OPTIONS}
              getValue={actives => this.setState({ actives: actives })}
              checkboxVerticalSeparation={"15px"}
            />
            <CheckBox
              active={this.state.agreeTerms}
              onSelected={this.handleCheckBox}
            >
              <p>
                I agree to uphold the values, culture and ethics outlined in the
                CO Network’s{" "}
                <a href={"www.google.com"} style={{ color: "blue" }}>
                  Terms and Conditions
                </a>
                , GDPR Compliant <a style={{ color: "blue" }}>Privacy Policy</a>
                , <a style={{ color: "blue" }}>Anti-Spam Policy</a> agreement.
              </p>
            </CheckBox>
          </Container>
          <Layout customTemplateColumns={"1fr auto"}>
            <div />
            <Mutation
              mutation={CreateUser}
              onCompleted={() => this.props.history.push(`/profile`)}
            >
              {(createUser, { userCreated }) => {
                return (
                  <Button
                    disabled={this.state.disabled}
                    onClick={() => this.handleContinue(createUser)}
                  >
                    Continue
                  </Button>
                );
              }}
            </Mutation>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(SignUp);
