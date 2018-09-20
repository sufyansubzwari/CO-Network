import React from "react";
import {
  WizardStepForm,
  Input,
  SocialButton
} from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import styled from "styled-components";
import services from "../../../../../components/LoginModal/service.constant";
import { EMAIL_REGEX } from "../../constants/constants";

const Label = styled.label`
  font-size: 12px;
  font-family: Roboto Mono;
  color: #010101;
`;

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    let data = props.data ? props.data : {};
    this.services = services.filter(element => element.visible);
    this.state = {
      user: data,
      location: {
        address: "",
        location: { lat: "", lng: "" },
        fullLocation: {}
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.user)
      this.setState({ user: nextProps.data });
  }

  notifyParent(model, name, value) {
    if (model && name && value) {
      let user = this.state.user;
      user[name] = value;
      this.setState(
        { user: user },
        () => this.props.onChange && this.props.onChange(this.state.user)
      );
    } else this.props.onChange && this.props.onChange(this.state.user);
  }

  render() {
    return (
      <Layout rowGap={"25px"}>
        <Layout templateColumns={2} colGap={"20px"}>
          <Input
            name={"name"}
            model={this.state.user}
            placeholderText={"First Name"}
            getValue={this.notifyParent.bind(this)}
          />
          <Input
            name={"lastName"}
            model={this.state.user}
            placeholderText={"Last Name"}
            getValue={this.notifyParent.bind(this)}
          />
        </Layout>
        <GeoInputLocation
          model={this.state.user}
          name={"location"}
          placeholder={"Location"}
          onChange={this.notifyParent.bind(this)}
        />
        <Layout templateColumns={2} colGap={"20px"}>
          <Input
            name={"website"}
            model={this.state.user}
            placeholderText={"Website"}
            getValue={this.notifyParent.bind(this)}
          />
          <Input
            name={"email"}
            model={this.state.user}
            placeholderText={"Verification Email"}
            getValue={this.notifyParent.bind(this)}
            validate={EMAIL_REGEX}
          />
        </Layout>
        <Label>Connect Networks</Label>
        <Layout
          templateColumns={this.services.length}
          colGap={"10px"}
          height={"90px"}
        >
          {this.services.map((authService, index) => {
            const service = authService.label || authService.service;
            return (
              <SocialButton
                key={index}
                social={service}
                connected={this.state.user.social[service] !== ""}
                data={this.state.user.social[service]}
                onClick={() => console.log("trying to log for github")}
              />
            );
          })}
        </Layout>
      </Layout>
    );
  }
}

export default FirstStep;
