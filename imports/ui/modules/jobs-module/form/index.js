import React from 'react';
import {MlWizardForm, WizardStepForm, WizardForm} from 'btech-base-forms-component';
import {FirstStep, SecondStep, ThirdStep} from './Steps';


class JobsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div style={{width: 800, height:"100%"}}>
                <MlWizardForm title={'Post a Job'}>
                    <WizardStepForm title={'Job Details'}>
                        <FirstStep/>
                    </WizardStepForm>
                    <WizardStepForm title={'Job Requirements'}>
                        <SecondStep/>
                    </WizardStepForm>
                    <WizardStepForm title={'Organizational Culture'} >
                        <ThirdStep/>
                    </WizardStepForm>
                    <WizardStepForm title={'Submit'}>
                        <div>HERE GOES THE PAY SECTION</div>
                    </WizardStepForm>
                </MlWizardForm>
            </div>
        );
    }
}

export default JobsForm