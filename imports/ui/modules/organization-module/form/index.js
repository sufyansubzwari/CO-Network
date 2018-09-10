import React from 'react';
import {MlWizardForm, WizardStepForm, WizardForm} from 'btech-base-forms-component';
import {FirstStep, SecondStep, ThirdStep, FourthStep, FifthStep, SixthStep} from './Steps';

import {ORGANIZATION_TYPE} from "./constants/constants";

class OrganizationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            details: {
                orgType: ORGANIZATION_TYPE
            },
            vision: {},
            community: {},
            technical: {},
            products: {},
            media: {}
        }

        this.handleStepChange = this.handleStepChange.bind(this);
    }

    handleStepChange(data, property) {
        if (property == 'details') {
            this.setState({
                details: data
            },() => this.forceUpdate())
        }
        if (property == 'vision') {
            this.setState({
                vision: data
            })
        }

    }

    render() {
        return (
            <div style={{width: 800, height:"100%"}}>
                <MlWizardForm title={'Organization Profile'}>
                    <WizardStepForm title={'Details'}>
                        <FirstStep data={this.state.details} onChange={this.handleStepChange}/>
                    </WizardStepForm>
                    <WizardStepForm title={'Vision | Culture'}>
                        <SecondStep data={this.state.vision}/>
                    </WizardStepForm>
                    <WizardStepForm title={'Community Engagement'}>
                        <ThirdStep data={this.state.community}/>
                    </WizardStepForm>
                    <WizardStepForm title={'Technical Recruitment'}>
                        <FourthStep data={this.state.technical}/>
                    </WizardStepForm>
                    <WizardStepForm title={'Products | Services'}>
                        <FifthStep data={this.state.products}/>
                    </WizardStepForm>
                    <WizardStepForm title={'Media'}>
                        <SixthStep data={this.state.media}/>
                    </WizardStepForm>
                </MlWizardForm>
            </div>
        );
    }
}

export default OrganizationForm