import React from "react";
import { Input, SocialButton } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import { GeoInputLocation } from "btech-location";
import styled from "styled-components";
import services from "../../../../../components/LoginModal/service.constant";
import { EMAIL_REGEX } from "../../../../../constants";
import Authorization from "../../../../../services/authorization";
import { UpdateIdentities } from "../../../../../apollo-client/user";
import { Mutation } from "react-apollo";

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
    this.state = { user: data };
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

  handleLinkAccount(service, updateProfileFunction) {
    Authorization.initLink(service, (userId, profile) => {
      updateProfileFunction({
        variables: {
          id: userId,
          identities: profile.identities
        }
      });
    });
  }

  handleUnLinkAccount(service, data, updateProfileFunction) {
    Authorization.unlinkAccount(service, data, (userId, profile) => {
      updateProfileFunction({
        variables: {
          id: userId,
          identities: profile.identities
        }
      });
    });
  }

  getIdentitiesLinked(provider) {
    return this.state.user && this.state.user.identities
      ? this.state.user.identities.filter(element => {
          return (
            // todo: check if is necesary show the default account
            // `${provider}|${element.user_id}` !== this.state.user.user_id &&
            provider === element.provider
          );
        })
      : [];
  }

  isTheMainAccount(provider, id) {
    return this.state.user
      ? `${provider}|${id}` === this.state.user.user_id
      : false;
  }

  handleDataToShow(element) {
    let data = {};
    if (element && !element.profileData)
      data = this.state.user ? this.state.user : {};
    else data = element.profileData || {};
    if (data.email) {
      const gettingNick = data.email.split("@");
      data.nickName = gettingNick[0];
    } else if (data.name) {
      const gettingNick = data.name.split(" ");
      data.nickName = gettingNick[0];
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

  handleLinkSuccess(result) {
    const { updateIdentities } = result;
    const { _id, profile } = updateIdentities;
    const user = this.state.user;
    user.identities = profile.identities;
    this.setState(
      { user: user },
      () => this.props.onChange && this.props.onChange(this.state.user)
    );
  }

  handleLinkError(error) {
    console.log("Error: ", error);
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
        <Mutation
          mutation={UpdateIdentities}
          onCompleted={profile => this.handleLinkSuccess(profile)}
          onError={error => this.handleLinkError(error)}
        >
          {(updateIdentities, { profile }) => (
            <Container>
              <Label>Connect Networks</Label>
              <Layout
                templateColumns={this.services.length}
                colGap={"10px"}
                minH={"90px"}
              >
                {this.services.map((authService, position) => {
                  const service = authService.label || authService.service;
                  const identities = this.getIdentitiesLinked(
                    authService.service
                  );
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
                          hideCloseButton={this.isTheMainAccount(
                            authService.service,
                            element.user_id
                          )}
                          onPlus={() =>
                            this.handleLinkAccount(
                              authService.service,
                              updateIdentities
                            )
                          }
                          onClose={() =>
                            this.handleUnLinkAccount(
                              authService.service,
                              element,
                              updateIdentities
                            )
                          }
                        />
                      );
                    });
                  } else
                    return (
                      <SocialButton
                        key={position}
                        social={service}
                        onClick={() =>
                          this.handleLinkAccount(
                            authService.service,
                            updateIdentities
                          )
                        }
                      />
                    );
                })}
              </Layout>
            </Container>
          )}
        </Mutation>
      </Layout>
    );
  }
}

export default FirstStep;
