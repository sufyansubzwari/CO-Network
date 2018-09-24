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
import { UpdateSignUpStatus } from "../../../../apollo-client/user";
import {
  SIGNUP_TEXT,
  SIGNUP_TEXT_2,
  SIGNUP_TEXT_3,
  SIGNUP_OPTIONS
} from "../../../../constants";
import { theme } from "./../../../../theme";
import links from "./links.constant";

const Description = styled.p`
  font-size: ${props =>
    props.theme ? props.theme.signup.descriptionSize : "12px"};
  font-family: ${props =>
    props.theme ? props.theme.signup.family : "Roboto Mono"};
  color: ${props => (props.theme ? props.theme.signup.fontcolor : "black")};
`;

class SignUp extends React.Component {
  constructor(props) {

    let act = SIGNUP_OPTIONS.map(item => false)
    let opt = SIGNUP_OPTIONS.map(item => ({label: item.label, active: false}))

    super(props);
    this.links = links;
    this.state = {
      agreeTerms: false,
      actives:  act && act.length ? act : [],
      options: opt,
      disabled: false
    };

    this.handleCheckBoxes = this.handleCheckBoxes.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (
      !this.props.curUser ||
      (this.props.curUser && this.props.curUser.profile.isSignUp)
    )
      this.props.history.push("/");
  }

  handleContinue(updateStatus) {
    let checkboxesActives = this.state.options.some(function(element) {
      return element.active === false;
    });
    const active = this.state.agreeTerms && !checkboxesActives;
    if (active) {
      updateStatus({
        variables: {
          id: this.props.curUser._id,
          status: true
        }
      });
    }
  }

  handleCheckBoxes(actives) {
    let checkboxesActives = actives.some(function(element) {
      return element === false || element === undefined;
    });
    const active = this.state.agreeTerms && !checkboxesActives;
    this.setState({
      actives: actives,
      disabled: active
    });
  }

  onChange(actives){
    if(actives.length){
      let newOptions =  actives.map( (value,index) => ({label: this.state.options[index].label, active: value}) );
      this.setState({
          options: newOptions
      })
    }

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
              options={this.state.options}
              getValue={this.onChange}
              checkboxVerticalSeparation={"15px"}
            />
            <CheckBox
              active={this.state.agreeTerms}
              onSelected={this.handleCheckBox}
            >
              <p>
                I agree to uphold the values, culture and ethics outlined in the
                CO Network’s{" "}
                <a
                  href={this.links.termsConditions.link}
                  target={this.links.termsConditions.target}
                  style={{ color: this.links.termsConditions.target }}
                >
                  Terms and Conditions
                </a>
                , GDPR Compliant{" "}
                <a
                  href={this.links.privacyPolicy.link}
                  target={this.links.privacyPolicy.target}
                  style={{ color: this.links.privacyPolicy.target }}
                >
                  Privacy Policy
                </a>
                ,{" "}
                <a
                  href={this.links.spamPolicy.link}
                  target={this.links.spamPolicy.target}
                  style={{ color: this.links.spamPolicy.target }}
                >
                  Anti-Spam Policy
                </a>{" "}
                agreement.
              </p>
            </CheckBox>
          </Container>
          <Layout customTemplateColumns={"1fr auto"}>
            <div />
            <Mutation
              mutation={UpdateSignUpStatus}
              onError={() => alert(`error`)}
              onCompleted={() => this.props.history.push(`/profile`)}
            >
              {(updateStatus, { userCreated }) => {
                return (
                  <Button
                    disabled={this.state.disabled}
                    onClick={() => this.handleContinue(updateStatus)}
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
