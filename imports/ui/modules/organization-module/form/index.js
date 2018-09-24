import React from "react";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import {
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  FifthStep,
  SixthStep
} from "./Steps";

import SeventhStep from "./Steps/SeventhStep";
import PropTypes from "prop-types";

class OrganizationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: this.props.organization || {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(org) {
    this.setState(
      {
        organization: org
      },
      () => this.props.handleOrgChange && this.props.handleOrgChange(org)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization) {
      this.setState({
        organization: nextProps.organization
      });
    }
  }

  componentDidMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.organization
    ) {
      this.setState(
        { organization: this.props.location.state.organization },
        () =>
          this.props.handleOrgChange &&
          this.props.handleOrgChange(this.props.location.state.organization)
      );
    }
  }

  render() {
    return (
      <MlWizardForm
        title={"Organization Profile"}
        onFinish={() =>
          this.props.onFinish && this.props.onFinish(this.state.organization)
        }
        showProgress
        onCancel={() => this.props.onCancel && this.props.onCancel()}
      >
        <WizardStepForm title={"Details"}>
          <FirstStep
            data={this.state.organization}
            onChange={organization => this.handleChange(organization)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Vision | Culture"}>
          <SecondStep
            data={this.state.organization}
            onChange={organization => this.handleChange(organization)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Community Engagement"}>
          <ThirdStep
            data={this.state.organization}
            onChange={organization => this.handleChange(organization)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Technical Recruitment"}>
          <FourthStep
            data={this.state.organization}
            onChange={organization => this.handleChange(organization)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Products | Services"}>
          <FifthStep
            data={this.state.organization}
            onChange={organization => this.handleChange(organization)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Media"}>
          <SixthStep
            data={this.state.organization}
            onChange={organization => this.handleChange(organization)}
          />
        </WizardStepForm>
        <WizardStepForm title={"CO Network Services"}>
          <SeventhStep
            data={this.state.organization}
            onChange={organization => this.handleChange(organization)}
          />
        </WizardStepForm>
      </MlWizardForm>
    );
  }
}

OrganizationForm.defaultProps = {
  data: {}
};

OrganizationForm.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  handleOrgChange: PropTypes.func
};

export default OrganizationForm;
