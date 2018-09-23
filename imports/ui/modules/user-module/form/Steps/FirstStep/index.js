import React from "react";
import { Input, SocialButton } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import styled from "styled-components";
import services from "../../../../../components/LoginModal/service.constant";
import { EMAIL_REGEX } from "../../constants/constants";
import Authorization from "../../../../../services/authorization";

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
      user: data
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

  handleLinkAccount(service) {
    Authorization.initLink(service);
  }

  handleUnLinkAccount(service, data) {
    Authorization.unlinkAccount(service, data);
  }

  getIdentitiesLinked(provider) {
    return this.state.user && this.state.user.identities
      ? this.state.user.identities.filter(element => {
          return (
            `${provider}|${element.user_id}` !== this.state.user.user_id &&
            provider === element.provider
          );
        })
      : [];
  }

  handleDataToShow(element) {
    const data = element ? element.profileData : {};
    data.nickName = data.screen_name || data.given_name;
    if (!data.nickName) {
      if (data.email) {
        const gettingNick = data.email.split("@");
        data.nickName = gettingNick[0];
      }
    }
    return data;
  }

  notifyParentLocation(model, name, value) {
    if (model && name && value) {
      let user = this.state.user;
      user.place[name] = value;
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
          model={this.state.user.place}
          name={"location"}
          placeholder={"Location"}
          onChange={this.notifyParentLocation.bind(this)}
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
          minH={"90px"}
        >
          {this.services.map((authService, position) => {
            const service = authService.label || authService.service;
            const identities = this.getIdentitiesLinked(authService.service);
            if (identities.length) {
              return identities.map((element, index) => {
                const data = this.handleDataToShow(element);
                return (
                  <SocialButton
                    key={index}
                    social={service}
                    connected={!!element}
                    data={data}
                    fields={["nickName"]}
                    onPlus={() => this.handleLinkAccount(authService.service)}
                    onClose={() =>
                      this.handleUnLinkAccount(authService.service, element)
                    }
                  />
                );
              });
            } else
              return (
                <SocialButton
                  key={position}
                  social={service}
                  onClick={() => this.handleLinkAccount(authService.service)}
                />
              );
          })}
        </Layout>
      </Layout>
    );
  }
}

export default FirstStep;
