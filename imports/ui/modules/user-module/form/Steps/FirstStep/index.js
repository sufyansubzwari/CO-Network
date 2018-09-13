import React from 'react';
import {WizardStepForm, Input, SocialButton} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';
import {GeoInputLocation} from 'btech-location'
import styled from 'styled-components'

import {ORGANIZATION_TYPE,EMAIL_REGEX} from "../../constants/constants";

const Label = styled.label`
    font-size: 12px;
    font-family: Roboto Mono;
    color: #010101;
`


class FirstStep extends React.Component {

    constructor(props) {
        super(props)

        let data = props.data ? props.data : {}

        this.state = {
            user: data,
            location: {
                address: "",
                location: { lat: "", lng: "" },
                fullLocation: {}
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.state.user)
            this.setState({user: nextProps.data});
    }

    notifyParent(model, name, value) {
        if (model && name && value) {
            let user = this.state.user;
            user[name] = value;
            this.setState(
                {user: user},
                () => this.props.onChange && this.props.onChange(this.state.user)
            );
        } else this.props.onChange && this.props.onChange(this.state.user);
    }

    handleInput(model, name, value) {
        console.log(this.state.user)
    }

    render() {

        return (

            <Layout rowGap={'25px'}>
                <Layout templateColumns={2} colGap={'20px'}>
                    <Input name={'name'} model={this.state.user.info} placeholderText={'Organization Name'}
                           getValue={this.notifyParent.bind(this)}/>
                    <Input name={'lastName'} model={this.state.user.info} placeholderText={'Last Name'}
                           getValue={this.notifyParent.bind(this)}/>
                </Layout>
                <GeoInputLocation model={this.state.user.info} name={'location'} placeholder={"Location"}/>
                <Layout templateColumns={2} colGap={'20px'}>
                    <Input name={'website'} model={this.state.user.info} placeholderText={'Website'}
                           getValue={this.notifyParent.bind(this)} />
                    <Input name={'email'} model={this.state.user.info} placeholderText={'Verification Email'}
                           getValue={this.notifyParent.bind(this)} validate={EMAIL_REGEX}/>
                </Layout>
                <Label>Connect Networks</Label>
                <Layout templateColumns={4} colGap={'10px'} height={'90px'}>
                    <SocialButton
                        social={'github'}
                        connected={this.state.user.social.github !== ""}
                        data={this.state.user.social.github}
                        onClick={() => console.log('trying to log for github')}
                    />
                    <SocialButton
                        social={'google'}
                        data={this.state.user.social.google}
                        onClick={this.handleGoogle}
                        onPlus={() => console.log('plus')}
                        connected={this.state.user.social.google !== ""}
                    />
                    <SocialButton
                        social={'facebook'}
                        data={this.state.user.social.facebook}
                        onClick={() => console.log('trying to log for facebook')}
                        fields={['account']}
                        connected={this.state.user.social.facebook !== ""}
                    />
                    <SocialButton
                        social={'twitter'}
                        data={this.state.user.social.twitter}
                        onClick={() => console.log('trying to log for twitter')}
                        loading={false}
                        connected={this.state.user.social.twitter !== ""}
                    />
                </Layout>
            </Layout>
        );
    }
}

export default FirstStep