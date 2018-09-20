import React, { Component } from "react";
import {
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  FifthStep,
  SixthStep
} from "./Steps/index";
import { MlWizardForm, WizardStepForm } from "btech-base-forms-component";
import SignUp from "./SignUp/SignUp";
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
      user: { ...props.user }
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
    if (nextProps.user) {
      this.setState({
        user: nextProps.user
      });
    }
  }

  componentWillMount() {}

  render() {
    console.log("MlWizardForm", this.state.user);
    return (
      <MlWizardForm
        title={"Member Profile"}
        onFinish={() =>
          this.props.onFinish && this.props.onFinish(this.state.event)
        }
        onCancel={() => this.props.onCancel && this.props.onCancel()}
      >
        <WizardStepForm title={"User Details"} isValid>
          <FirstStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"About Me | Passion"} isValid>
          <SecondStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Knowledge"} isValid>
          <ThirdStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Professional"} isValid>
          <FourthStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Achievements"} isValid>
          <FifthStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
        </WizardStepForm>
        <WizardStepForm title={"Speak Directory"} isValid>
          <SixthStep
            data={this.state.user}
            onChange={user => this.handleChange(user)}
          />
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
