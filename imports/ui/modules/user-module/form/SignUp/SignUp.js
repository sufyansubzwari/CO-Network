import React from "react";
import { Input, CheckBoxList, CheckBox } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";

import styled, { ThemeProvider } from "styled-components";

import { SIGNUP_TEXT, SIGNUP_OPTIONS } from "../constants/constants";
import { theme } from "./../../../../theme";

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

    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout
          customTemplateRows={"187px 1fr"}
          marginX={"-41px"}
          mt={"-54px"}
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
            <Description>{SIGNUP_TEXT}</Description>
            <Container>
              <CheckBoxList
                options={SIGNUP_OPTIONS}
                getValue={this.props.getSignUpChecked}
              />
              <CheckBox active={this.state.agreeTerms} onSelected={() => this.setState({agreeTerms: !this.state.agreeTerms}, () => this.props.getAgree && this.props.getAgree(this.state.agreeTerms))} >
                  <p>I agree to uphold the values, culture and ethics outlined in the CO Network’s <a style={{color:"blue", }}>Terms and Conditions</a>, GDPR Compliant <a style={{color:"blue"}}>Privacy Policy</a>, <a style={{color:"blue"}}>Anti-Spam Policy</a> agreement.</p>
              </CheckBox>
            </Container>
          </Layout>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default SignUp;
