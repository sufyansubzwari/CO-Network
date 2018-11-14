import React, { Component } from "react";
import {
  FifthStep,
  FirstStep,
  FourthStep,
  SecondStep,
  SixthStep,
  ThirdStep
} from "./Steps/index";
import PaymentsOption from "../../payment-module/paymentOptions";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import PropTypes from "prop-types";

/**
 * @module User
 * @category UserForm
 * @description This component is a the container for the user form
 */
class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        ...props.user
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(user) {
    this.setState(
      {
        user: user
      },
      () =>
        this.props.handleChangeProfile && this.props.handleChangeProfile(user)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user !== this.state.user) {
      this.setState({
        user: nextProps.user
      });
    }
  }

  componentWillMount() {}

  render() {
    return (
      <MlWizardForm
        title={"Member Profile"}
        onFinish={() =>
          this.props.onFinish && this.props.onFinish(this.state.user)
        }
        editMode={this.props.curUser && !!this.props.curUser._id}
        edited={this.props.formChange}
        radioColor={"#000000"}
        onBackAction={() => this.props.onCancel && this.props.onCancel()}
        onCancel={() => this.props.onCancel && this.props.onCancel()}
        showProgress
        inactiveColor={"#A0A0A0"}
        finishButtonText={"Save"}
        saving={this.props.saving}
      >
        <WizardStepForm title={"User Details"}>
          <FirstStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
            getNavigationLinks={links => console.log(links)}
          />
        </WizardStepForm>
        <WizardStepForm title={"About Me | Passion"}>
          <SecondStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Knowledge"}>
          <ThirdStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Professional"}>
          <FourthStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Achievements"}>
          <FifthStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Speaker Directory"}>
          <SixthStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Payments Options"}>
          <PaymentsOption />
        </WizardStepForm>
      </MlWizardForm>
    );
  }
}

UserForm.defaultProps = {
  data: {}
};

UserForm.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  handleChangeProfile: PropTypes.func,
  user: PropTypes.object
};

export default UserForm;
