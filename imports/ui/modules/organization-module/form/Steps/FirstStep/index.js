import React from "react";
import {CheckBoxList, Input, SocialButton} from "btech-base-forms-component";
import {GeoInputLocation} from "btech-location";
import {Layout, Container} from "btech-layout";
import {FormMainLayout} from "../../../../../components";
import {
    EMAIL_REGEX,
    ORGANIZATION_TYPE,
    PHONE_REGEX
} from "../../../../../constants";
import styled from "styled-components";
import services from "../../../../../components/LoginModal/service.constant";
import Authorization from "../../../../../services/authorization";
import {Utils} from "../../../../../services/index"
import {UpdateIdentitiesOrg} from "../../../../../apollo-client/organization";
import {Mutation} from "react-apollo";

const Label = styled.label`
  font-size: 12px;
  font-family: Roboto Mono;
  color: #010101;
`;

const NetworkLabel = styled(Label)`
  margin-bottom: 0;
  font-weight: bold;
`;

const NetworkSubLabel = styled(Label)`
  color: rgba(0, 0, 0, 0.5);
`;

class FirstStep extends React.Component {
    constructor(props) {
        super(props);
        let data = props.data ? props.data : {};
        this.services = services.filter(element => element.visible);
        this.state = {
            organization: data,
            orgType: ORGANIZATION_TYPE.map(item => item),
            accounts: []
        };
    }

    componentWillMount() {
        if (this.props.data && !this.props.data.place) {
            let organization = this.props.data;
            organization.place = {
                location: {
                    address: "",
                    location: {lng: "", lat: ""}
                }
            };
            this.setState({organization: organization});
        }
    }

    changeOrgTypes(actives) {
        const selected = this.state.orgType.map((org, index) => {
            org["active"] = actives[index];
            return org;
        });
        const orgstype = selected.filter(element => element.active);
        const temp = this.state.organization;
        temp["orgType"] = orgstype;
        this.setState({orgType: selected, organization: temp}, () =>
            this.notifyParent()
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.organization)
            this.setState({organization: nextProps.data});
        if (nextProps.data && nextProps.data.orgType)
            this.setState({
                orgType: ORGANIZATION_TYPE.map(e => {
                    e["active"] = nextProps.data.orgType.some(
                        element => e.label === element.label
                    );
                    return e;
                })
            });
    }

    notifyParent(section, model, name, value) {
        if (model && name && value) {
            let organization = this.state.organization;
            organization[section][name] = value;
            this.setState(
                {organization: organization},
                () =>
                    this.props.onChange && this.props.onChange(this.state.organization)
            );
        } else this.props.onChange && this.props.onChange(this.state.organization);
    }

    notifyParentLocation(model, name, value) {
        if (model && name && value) {
            let organization = this.state.organization;
            organization.place[name] = value;
            this.setState(
                {organization: organization},
                () =>
                    this.props.onChange && this.props.onChange(this.state.organization)
            );
        } else this.props.onChange && this.props.onChange(this.state.organization);
    }

    handleLink = (service, updateIdentitiesOrg) => {
        Authorization.loginOrganization(service, (profile) => this.handleProfile(profile, service, updateIdentitiesOrg))
    }

    handleUnlink = (element, updateIdentitiesOrg) => {
        let id = element.user_id;
        let accounts = this.state.organization && this.state.organization.identities;
        const index = accounts.findIndex(item => item.user_id === id);
        accounts.splice(index, 1);

        updateIdentitiesOrg({
            variables: {
                id: this.state.organization._id,
                identities: accounts
            }
        });
        let organization = this.state.organization;
        organization['identities'] = accounts;
        this.setState({
            organization: organization
        }, () =>
            this.notifyParent())
    }

    handleProfile = (profile, service, updateIdentitiesOrg) => {

        let parsedProfile = Utils.getDataForService(profile, service);
        console.log(parsedProfile);
        let accounts = this.state.organization && this.state.organization.identities || [];

        let account = {
            provider: service,
            profileData: {...profile},
            user_id: profile.user_id,
            connection: "",
            isSocial: true
        }
        accounts.push(account)
        updateIdentitiesOrg({
            variables: {
                id: this.state.organization._id,
                identities: accounts
            }
        });

        let organization = this.state.organization;
        organization['identities'] = accounts;
        this.setState({
            organization: organization
        }, () =>
            this.notifyParent())
    }

    handleDataToShow = (element) => {
        let data = element.profileData || {};
        if (data.email) {
            const gettingNick = data.email.split("@");
            data.nickName = gettingNick[0];
        } else if (data.name) {
            const gettingNick = data.name.split(" ");
            data.nickName = gettingNick[0];
        }
        return data;
    }

    getAccountService = (service) => {
        return this.state.organization && this.state.organization.identities && this.state.organization.identities.length > 0 && this.state.organization.identities.filter(element => element.provider === service);
    }

    render() {
        return (
            <FormMainLayout>
                <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
                    <Input
                        required
                        name={"name"}
                        model={this.state.organization}
                        placeholderText={"Organization Name"}
                        getValue={this.notifyParent.bind(this)}
                    />
                    <GeoInputLocation
                        model={this.state.organization.place}
                        name={"location"}
                        placeholder={"Location"}
                        onChange={(model, name, value) =>
                            this.notifyParentLocation(model, name, value)
                        }
                    />
                </Layout>
                <CheckBoxList
                    placeholderText={"Organization Type"}
                    options={this.state.orgType}
                    columns={2}
                    checkboxVerticalSeparation={"10px"}
                    checkboxSize={"15px"}
                    getValue={actives => this.changeOrgTypes(actives)}
                />
                <Layout mdTemplateColumns={2} mdColGap={"20px"} rowGap={"5px"}>
                    <Input
                        required
                        name={"email"}
                        model={this.state.organization.contact}
                        placeholderText={"Verification Email"}
                        getValue={this.notifyParent.bind(this, "contact")}
                        validate={EMAIL_REGEX}
                    />
                    <Input
                        name={"phone"}
                        model={this.state.organization.contact}
                        placeholderText={"Contact Number"}
                        getValue={this.notifyParent.bind(this, "contact")}
                        validate={PHONE_REGEX}
                        title={"Example: +01 1234 5678"}
                    />
                </Layout>
                <Mutation
                    mutation={UpdateIdentitiesOrg}
                    onError={error => console.log("error updating the identities")}
                >
                    {(updateIdentitiesOrg, {profile}) => (
                        <Container mt={"5px"}>
                            <Container>
                                <NetworkLabel>Connect Networks</NetworkLabel>
                                <Container>
                                    <NetworkSubLabel>
                                        Connect from your social networks
                                    </NetworkSubLabel>
                                </Container>
                            </Container>
                            <Layout rowGap={"10px"}
                                    colGap={"10px"}
                                    minH={"115px"}
                                    customTemplateColumns={"repeat(auto-fit, minmax(80px, 1fr))"}>
                                {
                                    this.services.map((authService, position) => {
                                        const service = authService.label || authService.service;
                                        const accounts = this.getAccountService(authService.service);
                                        if (accounts && accounts.length) {
                                            return accounts.map((element, index) => {
                                                const data = this.handleDataToShow(element);
                                                return (
                                                    <SocialButton
                                                        height={"110px"}
                                                        key={index}
                                                        social={service}
                                                        connected={!!element}
                                                        data={data}
                                                        fields={["nickName"]}
                                                        onPlus={() =>
                                                            this.handleLink(authService.service, updateIdentitiesOrg)
                                                        }
                                                        onClose={() => this.handleUnlink(element, updateIdentitiesOrg)}
                                                    />
                                                );
                                            });
                                        } else
                                            return (
                                                <SocialButton
                                                    height={"110px"}
                                                    key={position}
                                                    social={service}
                                                    onClick={() =>
                                                        this.handleLink(authService.service, updateIdentitiesOrg)
                                                    }
                                                />
                                            );
                                    })}
                            </Layout>
                        </Container>
                    )}
                </Mutation>
            </FormMainLayout>
        );
    }
}

export default FirstStep;
