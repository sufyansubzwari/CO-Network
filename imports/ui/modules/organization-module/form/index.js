import React from "react";
import {
  MlWizardForm,
  WizardStepForm,
  WizardForm
} from "btech-base-forms-component";
import {
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  FifthStep,
  SixthStep
} from "./Steps";

import { ORGANIZATION_TYPE } from "./constants/constants";
import SeventhStep from "./Steps/SeventhStep";

class OrganizationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        organization: {
            info : {
                name: "",
                employees: {
                    value: "",
                    label: ""
                },
                orgType: [],
                description: [],
                actively: [],
                website: "",
                location: {
                    address: "",
                    location: { lat: "", lng: "" },
                    fullLocation: {}
                },

            },
            social : {
                github: "",
                linkedin: "",
                facebook: "",
                twitter: "",
                google: ""
            },
            contact: {
                email: "",
                phone: "",
                name: ""
            },
            services: {
                relocated: false,
                seeking: true,
                hostEvents: true
            },
            reason: {
                languages: "",
                bio: "",
                mission: "",
                culture: "",
                orgDefine: "",
                product: "",
                industry: ""
            },
            tech: {
                industry: [],
                salaryRange: {
                    min: "",
                    max: ""
                },
                stack: [],
                jobType: []
            },
            plan : 0
        }
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(org){
      this.setState({
          organization: org
      },
          () => this.handleOrgChange && this.handleOrgChange(org))
  }

  render() {
    return (
      <MlWizardForm title={"Organization Profile"} onFinish={() =>
          this.props.onFinish && this.props.onFinish(this.state.organization)
      }
                    onCancel={() => this.props.onCancel && this.props.onCancel()}>
        <WizardStepForm title={"Details"}>
          <FirstStep
              data={this.state.organization}
              onChange={organization => this.handleChange(organization)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Vision | Culture"}>
          <SecondStep data={this.state.organization}
                      onChange={organization => this.handleChange(organization)} />
        </WizardStepForm>
        <WizardStepForm title={"Community Engagement"}>
          <ThirdStep data={this.state.organization}
                     onChange={organization => this.handleChange(organization)} />
        </WizardStepForm>
        <WizardStepForm title={"Technical Recruitment"}>
          <FourthStep data={this.state.organization}
                      onChange={organization => this.handleChange(organization)} />
        </WizardStepForm>
        <WizardStepForm title={"Products | Services"}>
          <FifthStep data={this.state.organization}
                     onChange={organization => this.handleChange(organization)} />
        </WizardStepForm>
        <WizardStepForm title={"Media"}>
          <SixthStep data={this.state.organization}
                     onChange={organization => this.handleChange(organization)} />
        </WizardStepForm>
          <WizardStepForm title={"CO Network Services"}>
              <SeventhStep data={this.state.organization}
                         onChange={organization => this.handleChange(organization)} />
          </WizardStepForm>
      </MlWizardForm>
    );
  }
}

export default OrganizationForm;
