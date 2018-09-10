import React from 'react';
import {WizardStepForm, Input, CheckBoxList, SocialButton} from 'btech-base-forms-component';
import {Container, Layout} from 'btech-layout';

import {ORGANIZATION_TYPE,EMAIL_REGEX,PHONE_REGEX} from "../../constants/constants";

class FirstStep extends React.Component {

    constructor(props) {
        super(props)

        let data = props.data ? props.data : {}

        this.state = {
            details: data
        }

        this.handleInput = this.handleInput.bind(this)
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
    }

    notifyParent(data) {
        this.props.onChange && this.props.onChange(data,'details')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                details: nextProps.data
            }, () => this.notifyParent(this.state.details))
        }

    }

    handleInput(model, name, value) {
        console.log(this.state.details)
    }

    handleCheckBoxClick(actives){
        let newOrgTypes = this.state.details.orgType;
        actives.map( (ele,index) => newOrgTypes[index].active = ele )
        this.setState({
            details: {
                ...this.state.details,
                orgType: newOrgTypes
            }
        }, () => this.notifyParent(this.state.details))
    }

    render() {

        return (

            <Layout rowGap={'40px'}>
                <Layout templateColumns={2} colGap={'20px'}>
                    <Input name={'name'} model={this.state.details} placeholderText={'Organization Name'}
                           getValue={this.handleInput}/>
                    <Input name={'location'} model={this.state.details} placeholderText={'Location(HQ)'}
                           getValue={this.handleInput}/>
                </Layout>
                <CheckBoxList
                    placeholderText={'Organization Type'}
                    options={this.state.details.orgType}
                    columns={2}
                    checkboxVerticalSeparation={'10px'}
                    checkboxSize={'15px'}
                    getValue={this.handleCheckBoxClick}
                />
                <Layout templateColumns={2} colGap={'20px'}>
                    <Input name={'email'} model={this.state.details} placeholderText={'Verification Email'}
                           getValue={this.handleInput} validate={EMAIL_REGEX}/>
                    <Input name={'contactnumber'} model={this.state.details} placeholderText={'Contact Number'}
                           getValue={this.handleInput} validate={PHONE_REGEX}/>
                </Layout>
                <Layout templateColumns={4} colGap={'10px'} height={'90px'}>
                    <SocialButton
                        social={'github'}
                        connected={false}
                        data={{account: 'myaccount', email: 'myemail@fortest.com'}}
                        onClick={() => console.log('trying to log for github')}
                    />
                    <SocialButton
                        social={'google'}
                        data={{account: 'myaccount', email: 'myemail@fortest.com'}}
                        onClick={this.handleGoogle}
                        connected={this.state.googleconnected}
                        onPlus={() => console.log('plus')}
                    />
                    <SocialButton
                        social={'facebook'}
                        data={{account: 'myaccount', email: 'myemail@fortest.com'}}
                        onClick={() => console.log('trying to log for facebook')}
                        fields={['account']}
                    />
                    <SocialButton
                        social={'twitter'}
                        connected={false}
                        data={{account: 'myaccount', email: 'myemail@fortest.com'}}
                        onClick={() => console.log('trying to log for twitter')}
                        loading={false}
                    />
                </Layout>
            </Layout>
        );
    }
}

export default FirstStep