import React from "react";
import { Input, SocialButton, CheckBoxList, CheckBox } from "btech-base-forms-component";
import { Container, Layout } from "btech-layout";
import styled from "styled-components";
import services from "../../../../../components/LoginModal/service.constant";
import { EMAIL_REGEX } from "../../../../../constants";
import Authorization from "../../../../../services/authorization";
// import { UpdateIdentities } from "../../../../../apollo-client/user";
import { Mutation } from "react-apollo";

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
        this.state = { apply: data };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.apply)
            this.setState({ apply: nextProps.data });
    }

    notifyParent(model, name, value) {
        if (model && name && value) {
            let apply = this.state.apply;
            apply[name] = value;
            this.setState(
                { apply: apply },
                () => this.props.onChange && this.props.onChange(this.state.apply)
            );
        } else this.props.onChange && this.props.onChange(this.state.apply);
    }

    handleSeeking(index, event) {
        let apply = this.state.apply;
        apply.remote = index === 0;
        this.setState(
            {
                apply: apply
            },
            () => this.notifyParent()
        );
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
        return this.state.apply
            ? `${provider}|${id}` === this.state.apply.user_id
            : false;
    }

    handleDataToShow(element) {
        let data = {};
        if (element && !element.profileData)
            data = this.state.apply ? this.state.apply : {};
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

    handleLinkSuccess(result) {
        const { updateIdentities } = result;
        const { _id, profile } = updateIdentities;
        const user = this.state.apply;
        user.identities = profile.identities;
        this.setState(
            { user: user },
            () => this.props.onChange && this.props.onChange(this.state.apply)
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
                        model={this.state.apply}
                        placeholderText={"First Name"}
                        getValue={this.notifyParent.bind(this)}
                    />
                    <Input
                        name={"lastName"}
                        model={this.state.apply}
                        placeholderText={"Last Name"}
                        getValue={this.notifyParent.bind(this)}
                    />
                </Layout>
                <Layout templateColumns={2} colGap={"20px"}>
                    <Input
                        name={"country"}
                        model={this.state.apply}
                        placeholderText={"Country"}
                        getValue={this.notifyParent.bind(this)}
                    />
                    <Input
                        name={"cities"}
                        model={this.state.apply}
                        placeholderText={"Preferred work cities"}
                        getValue={this.notifyParent.bind(this)}
                    />
                </Layout>
                <Layout templateColumns={2} colGap={"20px"}>
                    <Container>
                        <CheckBoxList
                            placeholderText={"Remote?"}
                            options={[]}
                        />
                        <Layout templateColumns={2}>
                        <CheckBox
                            text={"Yes"}
                            active={this.state.apply.remote}
                            onSelected={this.handleSeeking.bind(this, 0)}
                        />
                        <CheckBox
                            text={"No"}
                            active={!this.state.apply.remote}
                            onSelected={this.handleSeeking.bind(this, 1)}
                        />
                        </Layout>
                    </Container>
                    <Container/>
                </Layout>
                <Layout templateColumns={2} colGap={"20px"}>
                <Input
                    name={"email"}
                    model={this.state.apply}
                    placeholderText={"Email Address"}
                    getValue={this.notifyParent.bind(this)}
                    validate={EMAIL_REGEX}
                />
                <Input
                    name={"phone"}
                    model={this.state.apply}
                    placeholderText={"Phone number"}
                    getValue={this.notifyParent.bind(this)}
                />
            </Layout>
                <Layout templateColumns={2} colGap={"20px"}>
                    <Input
                        name={"website"}
                        model={this.state.apply}
                        placeholderText={"Website"}
                        getValue={this.notifyParent.bind(this)}
                        validate={EMAIL_REGEX}
                    />
                    <Container/>
                </Layout>
                {/*<Mutation*/}
                    {/*mutation={UpdateIdentities}*/}
                    {/*onCompleted={profile => this.handleLinkSuccess(profile)}*/}
                    {/*onError={error => this.handleLinkError(error)}*/}
                {/*>*/}
                    {/*{(updateIdentities, { profile }) => (*/}
                        {/*<Container>*/}
                            {/*<Container>*/}
                                {/*<NetworkLabel>Connect Networks</NetworkLabel>*/}
                                {/*<Container>*/}
                                    {/*<NetworkSubLabel>*/}
                                        {/*Connect from your social networks*/}
                                    {/*</NetworkSubLabel>*/}
                                {/*</Container>*/}
                            {/*</Container>*/}
                            {/*<Layout*/}
                                {/*rowGap={"10px"}*/}
                                {/*colGap={"10px"}*/}
                                {/*minH={"115px"}*/}
                                {/*customTemplateColumns={"repeat(auto-fit, minmax(100px, 1fr))"}*/}
                            {/*>*/}
                                {/*{this.services.map((authService, position) => {*/}
                                    {/*const service = authService.label || authService.service;*/}
                                    {/*const identities = this.getIdentitiesLinked(*/}
                                        {/*authService.service*/}
                                    {/*);*/}
                                    {/*if (identities.length) {*/}
                                        {/*return identities.map((element, index) => {*/}
                                            {/*const data = this.handleDataToShow(element);*/}
                                            {/*return (*/}
                                                {/*<SocialButton*/}
                                                    {/*height={"110px"}*/}
                                                    {/*key={index}*/}
                                                    {/*social={service}*/}
                                                    {/*connected={!!element}*/}
                                                    {/*data={data}*/}
                                                    {/*fields={["nickName"]}*/}
                                                    {/*hideCloseButton={this.isTheMainAccount(*/}
                                                        {/*authService.service,*/}
                                                        {/*element.user_id*/}
                                                    {/*)}*/}
                                                    {/*onPlus={() =>*/}
                                                        {/*this.handleLinkAccount(*/}
                                                            {/*authService.service,*/}
                                                            {/*updateIdentities*/}
                                                        {/*)*/}
                                                    {/*}*/}
                                                    {/*onClose={() =>*/}
                                                        {/*this.handleUnLinkAccount(*/}
                                                            {/*authService.service,*/}
                                                            {/*element,*/}
                                                            {/*updateIdentities*/}
                                                        {/*)*/}
                                                    {/*}*/}
                                                {/*/>*/}
                                            {/*);*/}
                                        {/*});*/}
                                    {/*} else*/}
                                        {/*return (*/}
                                            {/*<SocialButton*/}
                                                {/*height={"110px"}*/}
                                                {/*key={position}*/}
                                                {/*social={service}*/}
                                                {/*onClick={() =>*/}
                                                    {/*this.handleLinkAccount(*/}
                                                        {/*authService.service,*/}
                                                        {/*updateIdentities*/}
                                                    {/*)*/}
                                                {/*}*/}
                                            {/*/>*/}
                                        {/*);*/}
                                {/*})}*/}
                            {/*</Layout>*/}
                        {/*</Container>*/}
                    {/*)}*/}
                {/*</Mutation>*/}
            </Layout>
        );
    }
}

export default FirstStep;
